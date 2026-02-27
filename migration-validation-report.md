# Migration Validation Report

## Scope

- Package manager migration: Yarn -> pnpm
- Build tool migration: CRA (`react-scripts`) -> Vite
- Test runner migration: Jest (via CRA) -> Vitest

## Baseline (Before Migration)

- Date: 2026-02-27
- `yarn build`: pass
- `CI=true yarn test --watchAll=false`: pass (2 suites, 5 tests)
- `npx tsc --noEmit`: fail (existing test typing issues in baseline)

## Post Migration (After Changes)

- `pnpm typecheck`: pass
- `pnpm test`: pass (2 files, 5 tests)
- `pnpm build`: pass

## Functional Risk Controls Applied

- Preserved app/runtime dependency major versions from pre-migration lock for critical libs (React/MUI/TypeScript).
- Limited code changes to tooling integration points:
  - env access (`process.env` -> `import.meta.env`)
  - app bootstrapping entry for Vite
  - SVG import compatibility for Vite
  - test runtime compatibility (Vitest)
- No governance business logic changes were introduced.

## Known Non-Blocking Warnings

- Build warns when `VITE_ADOBE_FONTS` is unset; define it in `.env.local` to remove warning.
- Bundle size warning (>500kB chunk) existed as optimization opportunity; no functional impact.
