"use client";

import { useState, useEffect } from "react";
import { useProfile } from "./components/providers/profileProvider";
import { useUpProvider } from "./components/providers/upProvider";
import { ERC725 } from '@erc725/erc725.js';
import { createPublicClient, http } from 'viem';
import { lukso } from 'viem/chains';
import toast from 'react-hot-toast';
import { uploadMetadataToIPFS } from "./helper/pinata";
import { LandingPage } from "./components/LandingPage";

// Helper function to transform IPFS URL to Universal Profile cloud URL
function transformIpfsUrl(ipfsUrl: string): string {
  if (!ipfsUrl || !ipfsUrl.startsWith('ipfs://')) return '';
  const hash = ipfsUrl.replace('ipfs://', '');
  return `https://api.universalprofile.cloud/ipfs/${hash}`;
}

export default function Home() {
  const { profileData } = useProfile();
  const { walletConnected, isMiniApp, client, accounts } = useUpProvider();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [newName, setNewName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    console.log('Setting isClient to true');
    setIsClient(true);
  }, []);

  console.log('Page render state:', { isClient, isMiniApp, walletConnected });

  const handleNameUpdate = async () => {
    /**
     * This is an example on how you could update metadata on a universal profile.
     * In this case we're only updating the name of the Universal Profile.
     * 
     * To update any type of metadata on a universal profile, we've to follow the 4 steps:
     * 
     * 1. Prepare the data - this means having the data structured appropriately, in this case LSP3 as a json
     * 2. Upload prepared data to desired hosting solution. In most cases we use IPFS, so we simply pin the file to IPFS with our helper function uploadMetadataToIPFS
     * 3. Once data is pinned to IPFS, we receive its hash. We use this hash to encode verifiableUri.
     * 4. Once we've encoded data with verifiableUri, we can set the data on the profile
     */
    if (!newName.trim() || !client || !accounts?.[0]) return;
    setIsUpdating(true);

    try {
      // Step 1: Prepare LSP3Profile data
      const metadata = {
        ...profileData,
        name: newName.trim(),
        LSP3Profile: {
          ...profileData,
          name: newName.trim()
        }
      };

      console.log("Metadata:", metadata);

      // Step 2: Upload to IPFS
      const metadataIpfsUrl = await uploadMetadataToIPFS(metadata);
      console.log("Updated profile metadata uploaded to IPFS:", metadataIpfsUrl);

      // Step 3: Encode the data with LSP3Profile schema
      const schema = [{
        name: 'LSP3Profile',
        key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
        keyType: 'Singleton',
        valueType: 'bytes',
        valueContent: 'VerifiableURI'
      }];

      const erc725 = new ERC725(schema);

      // Encode metadata
      const encodedData = erc725.encodeData([{
        keyName: 'LSP3Profile',
        value: {
          json: metadata,
          url: `ipfs://${metadataIpfsUrl.split('/ipfs/')[1]}`,
        },
      }]);

      toast("Updating your profile name...", {
        duration: 5000,
        position: "bottom-center",
        style: {
          background: "#303030",
          color: "#f0f0f0",
          border: "1px solid #303030"
        }
      });

      // Step 4: Make the transaction
      const txHash = await client?.writeContract({
        address: accounts[0],
        abi: [{ 
          name: "setData",
          type: "function",
          inputs: [
            { name: "key", type: "bytes32" },
            { name: "value", type: "bytes" }
          ],
          outputs: [],
          stateMutability: "payable"
        }],
        functionName: "setData",
        args: [
          schema[0].key as `0x${string}`,
          encodedData.values[0] as `0x${string}`
        ],
        account: accounts[0],
        chain: lukso
      });

      toast("Name updated successfully!", {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#303030",
          color: "#f0f0f0",
          border: "1px solid #303030"
        }
      });

      // Check receipt in background
      const publicClient = createPublicClient({
        chain: lukso,
        transport: http(),
      });
      
      publicClient.waitForTransactionReceipt({ 
        hash: txHash as `0x${string}`
      }).then(receipt => {
        if (!receipt) {
          console.error("Transaction failed:", txHash);
        }
      }).catch(error => {
        console.error("Error checking transaction receipt:", error);
      });

      setNewName(''); // Clear input after successful update

    } catch (error) {
      console.error("Error updating name:", error);
      toast("Failed to update name", {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#303030",
          color: "#f0f0f0",
          border: "1px solid #303030"
        }
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Copy to clipboard function for asset addresses
  const copyToClipboard = async (text: string) => {
    try {
      // Try using the Clipboard API first
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback method using a temporary input element
      const input = document.createElement('input');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!isClient) {
    console.log('Rendering null during server-side rendering');
    return null;
  }

  if (!isMiniApp) {
    return (
      <LandingPage />
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-2 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Universal Profile</h1>
            <div className="flex items-center">
              <div className={`w-2.5 h-2.5 rounded-full mr-2 ${walletConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {walletConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          
          {/* Name Update Section */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Update Profile Name
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleNameUpdate}
                disabled={isUpdating || !newName.trim()}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <img 
              src={profileData?.profileImages[0]?.url ? transformIpfsUrl(profileData.profileImages[0].url) : ""} 
              alt="Profile avatar" 
              className="w-16 h-16 rounded-full flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = "";
              }}
            />
            <div className="min-w-0"> {/* Add min-w-0 to allow text truncation */}
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                {profileData?.name || "Anonymous Profile"}
              </h2>
              {profileData?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                  {profileData.description}
                </p>
              )}
            </div>
          </div>

          {profileData?.tags && profileData.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profileData?.links && profileData.links.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Links</h3>
              <div className="space-y-1">
                {profileData.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {(profileData?.lsp5ReceivedAssets?.length || profileData?.lsp12IssuedAssets?.length) ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Assets</h3>
              {profileData?.lsp5ReceivedAssets?.length ? (
                <div className="mb-3">
                  <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Received</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.lsp5ReceivedAssets.map((asset, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(asset.asset.id)}
                        className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer"
                        title="Click to copy"
                      >
                        {copiedId === asset.asset.id ? 'Copied!' : `${asset.asset.id.slice(0, 6)}...${asset.asset.id.slice(-4)}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {profileData?.lsp12IssuedAssets?.length ? (
                <div>
                  <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.lsp12IssuedAssets.map((asset, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(asset.asset.id)}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                        title="Click to copy"
                      >
                        {copiedId === asset.asset.id ? 'Copied!' : `${asset.asset.id.slice(0, 6)}...${asset.asset.id.slice(-4)}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
