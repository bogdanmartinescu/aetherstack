# npm release preparation — REL-001

**Status: prepared for verification, NOT published.** This runbook does not
grant authorization for an npm release. Maintain the separation between
Cloudflare Workers deployments and package publication.

## Scope

Public packages live in `packages/*` and are published in the
`@aetherstack` npm organization. The public CLI is `@aetherstack/cli`,
whose executable is `aether-ui`. Do **not** publish `aether-ui` as an
unscoped package. The internal `@aetherstack/registry-build` package is
marked `private: true`, consistent with its tooling-only role.

Source versions in the monorepo may be ahead of the current npm `latest`
versions. Compare actual npm metadata and validate all tarballs. A patch
Changeset records the CLI version-reporting fix. Before authorizing publication,
apply `pnpm changeset version` on a separate reviewed release-preparation PR,
commit the resulting version/changelog/lockfile changes, and repeat all checks.
The online release preflight rejects pending, unapplied Changesets.

## Preflight on a branch / local environment

1. Run `pnpm install --frozen-lockfile` using Node.js 22 and pnpm 9.1.0.
2. Run `pnpm format:check && pnpm typecheck && pnpm lint && pnpm test`.
3. Run `pnpm --filter @aetherstack/scripts build-registry && pnpm build`.
4. Run `node scripts/verify-cli-docs.mjs`.
5. Run `node scripts/verify-npm-packages.mjs --offline`. It packs **all
   non-private workspace packages**, checks archive entrypoints and resolved
   workspace dependencies; it does not publish or access npm.
6. Run `pnpm consumer-install` (Next.js and Vite pack/install fixtures).
7. Check the canonical production registry URL using
   `node scripts/smoke-registry.mjs https://registry.aether-ui.dev`.
8. Install the **currently published** CLI from npm in a fresh external
   consumer and verify `init`, `list`, `add button`, and a successful
   consumer build. Note published/working versions separately.

Do not call M0-08/M0-10 complete before the external consumer works.

## Owner-controlled CircleCI release

1. Confirm npm organization write access and the intended public package
   list, new version numbers, package dependencies and changelog.
2. Ensure the restricted `aether-npm-release` CircleCI context contains a
   valid `NPM_TOKEN` with the required publish permissions, without printing it.
3. Trigger a **new** CircleCI pipeline on `main` with `publish_npm=true`;
   `deploy_docs=false`, `deploy_registry=false`.
4. Require successful `verify`, then approve `approve_npm_release` only
   after the release inventory and dependency versions are reviewed.
5. `publish_npm` runs `npm whoami` under private npm authentication,
   builds packages, runs `node scripts/verify-npm-packages.mjs --online`,
   and only then executes `pnpm changeset publish`.
6. Compare npm package versions and dist-tags with the intended release and
   repeat the external CLI/consumer build against the production registry.
7. Record exact released versions, job URL, Git SHA and validation evidence
   in `docs/roadmap/execution-state.md`.

`--online` validates archive contents and rejects npm version downgrades.
It reads public npm metadata but **does not reserve or publish versions**.
If another publisher releases a version between preflight and
`changeset publish`, npm may reject that package; stop and reconcile
instead of retrying blindly.

## Remaining external gates

- GitHub `main` branch protection must require the actual CircleCI `verify`
  status (and preferably review approval). This is set in GitHub Settings,
  not inferred from a successful build.
- The owner must confirm npm write permissions and explicitly authorize
  the exact package set. Never publish only to satisfy an automated check.
- The first public release must prove a clean consumer can install and build;
  local workspace tests alone are insufficient.
