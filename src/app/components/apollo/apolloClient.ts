import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const universalGraphLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_UNIVERSAL_GRAPH_URL}`,
  // For indexer access refer to
  // https://fnce-foundation.notion.site/Hack-The-Grid-18c8d1c8a2118073b928dc8de54e5e1a
});

export const client = new ApolloClient({
  link: universalGraphLink,
  cache: new InMemoryCache(),
});