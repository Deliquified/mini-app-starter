// Interfaces for universal profile
export interface ProfileLink {
    title: string;
    url: string;
  }
  
export interface ProfileImage {
    url: string;
  }
  
export interface BackgroundImage {
    url: string;
    width: number;
    height: number;
    verified: boolean;
    method: string;
    data: string;
  }
  
export interface FollowerProfile {
    id: string;
    name: string;
    description: string;
    tags: string[];
    links: ProfileLink[];
    backgroundImages: BackgroundImage[];
    profileImages: ProfileImage[];
  }
  
export interface Following {
    followee: FollowerProfile;
  }
  
export interface Followed {
    follower: FollowerProfile;
  }
  
export interface LSP5Asset {
    asset: {
      id: string;
    };
  }
  
export interface LSP12Asset {
    asset: {
      id: string;
    };
  }
  
export interface UniversalProfileDetails {
    id: string;
    name: string;
    description: string;
    createdTimestamp: string;
    tags: string[];
    links: ProfileLink[];
    backgroundImages: BackgroundImage[];
    profileImages: ProfileImage[];
    lsp5ReceivedAssets: LSP5Asset[];
    lsp12IssuedAssets: LSP12Asset[];
    following: Following[];
    followed: Followed[];
  }
  
export interface GetUniversalProfileResponse {
    Profile: UniversalProfileDetails[];
  }