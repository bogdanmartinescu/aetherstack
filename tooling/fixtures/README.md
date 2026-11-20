# Consumer install fixtures (M0-07)

Isolated Next.js and Vite apps used to prove packed `@aetherstack/*` artifacts install and build **outside** the monorepo workspace.

## Requirements

- Node.js `>=20`
- pnpm `>=9`

## Run

From the repo root:

```bash
pnpm --filter @aetherstack/scripts consumer-install
```

This builds and packs publishable tarballs (applying `publishConfig`, rewriting `workspace:*`), copies each fixture into a temp directory, installs the tarballs with **npm** (avoids local pnpm ignored-build policies), and runs `npm run build`. It also smoke-tests `aether-ui add button` against a child-process registry server.

Also asserts Node `>=20` (matches root `engines`).
