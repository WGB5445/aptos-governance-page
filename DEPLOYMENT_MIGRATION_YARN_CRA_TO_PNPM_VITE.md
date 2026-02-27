# Deployment Migration Guide: Yarn/CRA -> pnpm/Vite

## 1. Background and Evidence (from git history)

This repository completed the deployment/tooling migration in these key commits:

- `945058a` (`2026-02-27`): `chore: migrate to pnpm and vite with env/docs updates`
- `c904310` (`2026-02-27`): wallet UI fix after migration
- `7d5776c` (`2026-02-27`): wallet/sdk follow-up + CI quality gates

Key migration artifacts in git:

- Added: `vite.config.ts`, `index.html`, `pnpm-lock.yaml`, `src/vite-env.d.ts`
- Removed: `public/index.html`, `src/react-app-env.d.ts`, `yarn.lock`
- Updated: `package.json` scripts and package manager metadata

## 2. What changed for deployment

### 2.1 Build tool and output

- Before (CRA): `react-scripts build`
- Now (Vite): `vite build`
- Output folder changed from `build/` to `dist/`

Deployment systems must publish `dist/` (not `build/`).

### 2.2 Package manager

- Before: Yarn classic (`yarn.lock`, `packageManager: yarn@...`)
- Now: pnpm (`pnpm-lock.yaml`, `packageManager: pnpm@10.17.1`)

Use pnpm in CI/CD and hosting build commands.

### 2.3 Environment variables

- Before (CRA): `process.env.REACT_APP_*` + `process.env.GA_TRACKING_ID`
- Now (Vite): `import.meta.env.VITE_*`

Current expected variables:

- `VITE_GA_TRACKING_ID`
- `VITE_ADOBE_FONTS`
- `VITE_APTOS_DEVNET_URL`
- `VITE_INDEXER_GRAPHQL_MAINNET`
- `VITE_INDEXER_GRAPHQL_TESTNET`
- `VITE_INDEXER_GRAPHQL_DEVNET`

Mapping from old names:

- `REACT_APP_ADOBE_FONTS` -> `VITE_ADOBE_FONTS`
- `REACT_APP_INDEXER_GRAPHQL_MAINNET` -> `VITE_INDEXER_GRAPHQL_MAINNET`
- `REACT_APP_INDEXER_GRAPHQL_TESTNET` -> `VITE_INDEXER_GRAPHQL_TESTNET`
- `REACT_APP_INDEXER_GRAPHQL_DEVNET` -> `VITE_INDEXER_GRAPHQL_DEVNET`
- `APTOS_DEVNET_URL` -> `VITE_APTOS_DEVNET_URL`
- `GA_TRACKING_ID` -> `VITE_GA_TRACKING_ID`

## 3. Command migration matrix

| Scenario | Before (Yarn/CRA) | Now (pnpm/Vite) |
|---|---|---|
| Install deps | `yarn install --frozen-lockfile` | `pnpm install --frozen-lockfile` |
| Local dev | `yarn start` | `pnpm dev` or `pnpm start` |
| Test | `CI=true yarn test --watchAll=false` | `pnpm test` |
| Typecheck | `npx tsc --noEmit` | `pnpm typecheck` |
| Production build | `yarn build` | `pnpm build` |
| Preview build | n/a | `pnpm preview` |
| Format check | n/a | `pnpm fmt:check` |
| Lint | n/a / custom | `pnpm lint` |

## 4. CI migration checklist

If your CI still uses Yarn/CRA, update:

1. Setup pnpm and Node 20.
2. Install with `pnpm install --frozen-lockfile`.
3. Replace build/test/typecheck commands with pnpm scripts.
4. Publish `dist/` artifacts.
5. Ensure all environment variables are renamed to `VITE_*`.

Reference workflow now in repo:

- `.github/workflows/ci.yml`

Current CI steps:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm fmt:check`
4. `pnpm typecheck`
5. `pnpm test`
6. `pnpm build`

## 5. Hosting platform migration examples

### 5.1 Netlify

- Build command: `pnpm build`
- Publish directory: `dist`
- Install command (optional override): `pnpm install --frozen-lockfile`

### 5.2 Vercel

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: `dist`
- Framework preset: Vite (recommended)

### 5.3 Docker/Nginx (static)

Build stage should run `pnpm build` and copy `dist/` into Nginx web root.
Do not copy `build/` anymore.

## 6. Validation gates before switching deployment

Run these locally or in pipeline:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm fmt:check
pnpm typecheck
pnpm test
pnpm build
```

If all pass, deployment migration is considered ready.

## 7. Common pitfalls

1. Publishing `build/` instead of `dist/` (blank site / missing files).
2. Forgetting to rename env variables to `VITE_*` (runtime config missing).
3. Using `yarn` in CI while `pnpm-lock.yaml` is source of truth.
4. Assuming CRA HTML templating (`%PUBLIC_URL%`) still exists.

## 8. Rollback plan

If production deployment fails after migration:

1. Revert deployment config first (commands/output/env names), not business code.
2. Re-run validation gates.
3. If needed, temporarily pin to previous known-good deployment commit while keeping migration branch intact for fixes.

