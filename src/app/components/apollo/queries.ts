import { gql } from "@apollo/client";

// Get Universal Profile metadata from LUKSO GraphQL API
// Pass in the profile address as parameter
// Returns profile name, description, tags, links, background images, profile images,
// and following and followed profiles
// For making your own queries, refer to https://fnce-foundation.notion.site/Hack-The-Grid-18c8d1c8a2118073b928dc8de54e5e1a
export const GET_UNIVERSAL_PROFILE = gql`
  query GetUniversalProfile($profileAddress: String!) {
    Profile(where: { id: { _ilike: $profileAddress } }) {
      id
      name
      description
      createdTimestamp
      tags
      links {
        title
        url
      }
      backgroundImages {
        width
        height
        url
        verified
        method
        data
      }
      profileImages {
        url
      }
      lsp5ReceivedAssets {
        asset {
          id
        }
      }
      lsp12IssuedAssets {
        asset {
          id
        }
      }
      following {
        followee {
          id
          name
          description
          tags
          links {
            title
            url
          }
          backgroundImages {
            url
          }
          profileImages {
            url
          }
        }
      }
      followed {
        follower {
          id
          name
          description
          tags
          links {
            title
            url
          }
          backgroundImages {
            url
          }
          profileImages {
            url
          }
        }
      }
    }
  }
`;