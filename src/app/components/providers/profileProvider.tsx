'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUpProvider } from "./upProvider";
import { client } from "../apollo/apolloClient";
import { ProfileImage } from "@/types/universalProfile";
import { GET_UNIVERSAL_PROFILE } from "../apollo/queries";

interface ProfileData {
  id: string;
  name: string;
  description: string;
  profileImages: ProfileImage[];
  tags: string[];
  links: { title: string; url: string }[];
  lsp5ReceivedAssets: { asset: { id: string } }[];
  lsp12IssuedAssets: { asset: { id: string } }[];
}

interface ProfileContextType {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  isLoading: boolean;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { accounts, walletConnected } = useUpProvider();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('ProfileProvider useEffect triggered:', { walletConnected, accounts });

    async function fetchProfile() {
      if (!walletConnected || !accounts[0]) {
        console.log('Skipping profile fetch - not connected or no accounts:', { walletConnected, accounts });
        setProfileData(null);
        return;
      }

      console.log('Starting profile fetch for account:', accounts[0]);
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await client.query({
          query: GET_UNIVERSAL_PROFILE,
          variables: { profileAddress: accounts[0] }
        });

        console.log('GraphQL response:', data);

        if (data?.Profile?.[0]) {
          const profile = data.Profile[0];
          setProfileData({
            id: profile.id,
            name: profile.name,
            description: profile.description,
            profileImages: profile.profileImages,
            tags: profile.tags,
            links: profile.links,
            lsp5ReceivedAssets: profile.lsp5ReceivedAssets,
            lsp12IssuedAssets: profile.lsp12IssuedAssets
          });
          console.log('Profile data updated successfully');
        } else {
          console.log('No profile data found in response');
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error('GraphQL query error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [walletConnected, accounts]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
}