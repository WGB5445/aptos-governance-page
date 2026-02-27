# Aptos Governance

Frontend app for Aptos governance workflows.

## Tech Stack

- React 18 + TypeScript
- Vite 7
- pnpm
- MUI
- Apollo Client + react-query

## Requirements

- Node.js 20+
- pnpm 10+

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:5173`.

## Scripts

- `pnpm dev`: start local dev server
- `pnpm build`: production build to `dist/`
- `pnpm preview`: preview production build locally
- `pnpm test`: run unit tests once (Vitest)
- `pnpm test:watch`: run tests in watch mode
- `pnpm typecheck`: run TypeScript type checking
- `pnpm fmt`: format source files with Prettier

## Environment Variables

Use Vite-prefixed env variables:

- `VITE_GA_TRACKING_ID`
- `VITE_ADOBE_FONTS` (optional; when omitted, Adobe Typekit is not loaded)
- `VITE_APTOS_DEVNET_URL`
- `VITE_INDEXER_GRAPHQL_MAINNET`
- `VITE_INDEXER_GRAPHQL_TESTNET`
- `VITE_INDEXER_GRAPHQL_DEVNET`

Migration note:

- `REACT_APP_*` variables from CRA are now `VITE_*`.

Legacy -> Vite mapping:

- `REACT_APP_ADOBE_FONTS` -> `VITE_ADOBE_FONTS`
- `REACT_APP_INDEXER_GRAPHQL_MAINNET` -> `VITE_INDEXER_GRAPHQL_MAINNET`
- `REACT_APP_INDEXER_GRAPHQL_TESTNET` -> `VITE_INDEXER_GRAPHQL_TESTNET`
- `REACT_APP_INDEXER_GRAPHQL_DEVNET` -> `VITE_INDEXER_GRAPHQL_DEVNET`
- `APTOS_DEVNET_URL` -> `VITE_APTOS_DEVNET_URL`
- `GA_TRACKING_ID` -> `VITE_GA_TRACKING_ID`

## Quality Gates

Run before creating a PR:

```bash
pnpm typecheck
pnpm test
pnpm build
```

## Project Structure

- `src/`: app code
- `public/`: static assets copied as-is
- `dist/`: production output (generated)
