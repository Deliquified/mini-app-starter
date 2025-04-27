"use client";

import { ReactNode } from "react";
import { UpProvider } from "./upProvider";
import { Toaster } from "sonner";
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/apolloClient';
import { ProfileProvider } from "./profileProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UpProvider>
        <ApolloProvider client={client}>
          <ProfileProvider>
            <Toaster />
            {children}
          </ProfileProvider>
        </ApolloProvider>
    </UpProvider>
  );
}