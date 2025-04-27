# Lukso Mini-App Starter (Next.js 14)

A minimal starter template for building mini-apps on [Lukso](https://lukso.network/) with Next.js 14. This template provides the essential setup for interacting with Universal Profiles on the Lukso network, including metadata management and IPFS integration.

## Overview

This starter provides a foundation for building Lukso mini-apps with a modern frontend stack. It comes pre-configured with the necessary providers and components to interact with Universal Profiles, with minimal boilerplate so you can start building quickly. The template includes both mini-app functionality and a landing page for direct web access.

## Features

- ✅ Universal Profile integration
- ✅ Connection status management
- ✅ Profile data fetching and display
- ✅ Provider setup for all Lukso functionality
- ✅ GraphQL integration for profile metadata
- ✅ IPFS integration via Pinata
- ✅ Metadata update functionality
- ✅ Context-aware UI (mini-app vs landing page)
- ✅ Profile data management (name, description, images, etc.)

## Tech Stack

- **Frontend**: Next.js 14
- **Styling**: Tailwind CSS
- **Blockchain Interaction**: viem
- **Universal Profile**: UP Provider
- **Data Schemas**: ERC725.js
- **Data Fetching**: Apollo Client (for indexer interaction)
- **IPFS Integration**: Pinata API
- **State Management**: React Context

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/Deliquified/mini-app-starter.git
cd mini-store
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## How to Test Your Mini-App

1. Visit [universaleverything.io](https://universaleverything.io)
2. Connect your Universal Profile
3. Add a new grid item with URL: `http://localhost:3000`
4. Run this project locally with `npm run dev`
5. View your mini-app on your grid
6. When connected, you should see your profile image, name, assets owned & issued and connection status

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── apollo/
│   │   │   ├── apolloClient.ts      # Apollo setup for indexer
│   │   │   └── queries.ts           # GraphQL queries for profile data
│   │   ├── providers/
│   │   │   ├── profileProvider.tsx  # Fetches Universal Profile data
│   │   │   ├── upProvider.tsx       # UP Provider integration
│   │   │   └── providers.tsx        # Combined providers manager
│   │   └── LandingPage.tsx          # Landing page for direct web access
│   ├── helper/
│   │   └── pinata.ts                # IPFS upload helper functions
│   ├── pinata/
│   │   └── config.ts                # Pinata API configuration
│   ├── api/
│   │   └── pinataPinFile/
│   │       └── route.ts             # Pinata API route for file pinning
│   ├── page.tsx                     # Main page showing profile data
│   └── layout.tsx                   # App layout with providers
└── types/
    └── index.ts                     # TypeScript type definitions
```

## Key Features Explained

### Profile Data Management
The application uses GraphQL to fetch comprehensive profile data including:
- Basic info (name, description)
- Profile images and banner
- Tags and links
- Tokens and NFTs (both held and issued)

### IPFS Integration
The template includes Pinata integration for IPFS operations:
- Helper functions for uploading metadata
- Configuration for IPFS pinning
- Example implementation for updating profile data

### Context-Aware UI
The application intelligently handles different contexts:
- When running as a mini-app (in iframe): Shows the full profile management interface
- When accessed directly: Displays a landing page with project information

### Profile Updates
The template includes a working example of updating Universal Profile metadata:
1. Data preparation (LSP3 schema)
2. IPFS upload via Pinata
3. Hash encoding
4. Profile data update

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

Made by Deliquified Labs

## License

[MIT License](LICENSE)
