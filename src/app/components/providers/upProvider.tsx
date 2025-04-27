/**
 * @component UpProvider
 * @description Context provider that manages Universal Profile (UP) wallet connections and state
 * for LUKSO blockchain interactions on Grid. It handles wallet connection status, account management, and chain
 * information while providing real-time updates through event listeners.
 *
 * @provides {UpProviderContext} Context containing:
 * - provider: UP-specific wallet provider instance
 * - client: Viem wallet client for blockchain interactions
 * - chainId: Current blockchain network ID
 * - accounts: Array of connected wallet addresses
 * - contextAccounts: Array of Universal Profile accounts
 * - walletConnected: Boolean indicating active wallet connection
 * - selectedAddress: Currently selected address for transactions
 * - isSearching: Loading state indicator
 * - isMiniApp: Boolean indicating if running in mini-app context
 */
"use client";

import {
  createClientUPProvider,
  type UPClientProvider,
} from "@lukso/up-provider";
import { createWalletClient, custom } from "viem";
import { lukso, luksoTestnet } from "viem/chains";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useMemo,
} from "react";

declare global {
  interface Window {
    lukso?: unknown;
    ethereum?: {
      isUniversalProfileExtension?: boolean;
    };
  }
}

interface UpProviderContext {
  provider: UPClientProvider | null;
  client: ReturnType<typeof createWalletClient> | null;
  chainId: number;
  accounts: Array<`0x${string}`>;
  contextAccounts: Array<`0x${string}`>;
  walletConnected: boolean;
  selectedAddress: `0x${string}` | null;
  setSelectedAddress: (address: `0x${string}` | null) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  isMiniApp: boolean;
}

const UpContext = createContext<UpProviderContext | undefined>(undefined);

// Function to check if we're in a mini-app context (iframe)
const isMiniAppContext = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const provider =
  typeof window !== "undefined" ? createClientUPProvider() : null;

export function useUpProvider() {
  const context = useContext(UpContext);
  if (!context) {
    throw new Error("useUpProvider must be used within a UpProvider");
  }
  return context;
}

interface UpProviderProps {
  children: ReactNode;
}

export function UpProvider({ children }: UpProviderProps) {
  const [chainId, setChainId] = useState<number>(0);
  const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
  const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<`0x${string}` | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isMiniApp] = useState(() => typeof window !== 'undefined' && isMiniAppContext());
  const [account] = accounts ?? [];
  const [contextAccount] = contextAccounts ?? [];

  const client = useMemo(() => {
    if (provider && chainId) {
      return createWalletClient({
        chain: chainId === 42 ? lukso : luksoTestnet,
        transport: custom(provider),
      });
    }
    return null;
  }, [chainId]);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!client || !provider) return;

        const _accounts = (await provider.request(
          "eth_accounts",
          []
        )) as Array<`0x${string}`>;
        if (!mounted) return;
        setAccounts(_accounts);

        const _chainId = (await provider.request("eth_chainId")) as number;
        if (!mounted) return;
        setChainId(_chainId);

        const _contextAccounts = provider.contextAccounts;
        if (!mounted) return;
        setContextAccounts(_contextAccounts);
        setWalletConnected(_accounts[0] != null && _contextAccounts[0] != null);
      } catch (error) {
        console.error(error);
      }
    }

    init();

    if (provider) {
      const accountsChanged = (_accounts: Array<`0x${string}`>) => {
        setAccounts(_accounts);
        setWalletConnected(_accounts[0] != null && contextAccount != null);
      };

      const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
        setContextAccounts(_accounts);
        setWalletConnected(account != null && _accounts[0] != null);
      };

      const chainChanged = (_chainId: number) => {
        setChainId(_chainId);
      };

      provider.on("accountsChanged", accountsChanged);
      provider.on("chainChanged", chainChanged);
      provider.on("contextAccountsChanged", contextAccountsChanged);

      return () => {
        mounted = false;
        provider.removeListener("accountsChanged", accountsChanged);
        provider.removeListener(
          "contextAccountsChanged",
          contextAccountsChanged
        );
        provider.removeListener("chainChanged", chainChanged);
      };
    }
  }, [client, account, contextAccount]);

  const data = useMemo(() => {
    return {
      provider,
      client,
      chainId,
      accounts,
      contextAccounts,
      walletConnected,
      selectedAddress,
      setSelectedAddress,
      isSearching,
      setIsSearching,
      isMiniApp,
    };
  }, [
    client,
    chainId,
    accounts,
    contextAccounts,
    walletConnected,
    selectedAddress,
    isSearching,
    isMiniApp,
  ]);

  return (
    <UpContext.Provider value={data}>
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    </UpContext.Provider>
  );
}