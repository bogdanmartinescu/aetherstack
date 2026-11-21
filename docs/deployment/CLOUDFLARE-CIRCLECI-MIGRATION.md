# Aether UI Cloudflare and CircleCI migration

Migration reference for the AetherStack monorepo. Baseline: `main` at `1ea579b00b6c` on November 21, 2026.

Status: CircleCI verification is operational and the registry preview Worker is deployed at `https://aether-ui-registry.hi-5be.workers.dev/` through approved CircleCI pipeline #11. The production custom domain, npm publishing, and remaining application migrations are not yet verified.

This document complements [GOAL.md](../../GOAL.md), [AGENTS.md](../../AGENTS.md), [ROADMAP.md](../../ROADMAP.md), and [execution-state.md](../roadmap/execution-state.md). It supersedes the historical Vercel instructions in [the M0-08 runbook](../roadmap/audits/m0-08-cdn-runbook.md).

## Architecture decision

CircleCI is the exclusive build, test, validation, release, and deployment runner. GitHub remains the repository and pull request service. Cloudflare handles DNS, TLS, CDN, and web application hosting. npm remains the distribution service for published libraries, the CLI, and the local MCP server.

Do not enable GitHub Actions or Cloudflare Workers Builds alongside CircleCI. Do not introduce D1, R2, KV, or queues merely to host static documentation and registry JSON.

### Deployment targets

The public component registry in `apps/registry-public` uses the existing Next.js static export and deploys to `registry.aether-ui.dev` using Workers Static Assets.

The documentation application in `apps/docs` deploys to `aether-ui.dev`. Verify that Next.js static export can handle the current routes and interactive examples. Evaluate vinext only if static export has a documented blocker.

The example application in `apps/demo` deploys to `demo.aether-ui.dev` using Workers Static Assets after a successful static build.

The component playground in `apps/studio` deploys to `studio.aether-ui.dev`. Keep this application restricted with Cloudflare Access until the project explicitly makes it public.

The `packages/cli` and `packages/mcp-server` packages remain distributed through npm. TypeScript component packages, tokens, themes, utilities, and registry schema remain published through npm rather than served through Worker code.

## CF-00: Establish CircleCI

The repository-root `.circleci/config.yml` is the source of truth for CI. Use Node.js 22, pnpm 9.1.0, a frozen lockfile, and one serial verification job until actual duration and credit usage justify parallelization.

The verification job must run the repository's existing formatting, TypeScript, lint, registry validation, registry generation, generated-artifact freshness, unit tests, workspace builds, and isolated Next.js and Vite consumer installation checks.

The old `.github/workflows` CI, registry deployment, and release workflows were removed from `main` by PR #27. GitHub must not retain parallel production jobs after the CircleCI transition.

Connect the GitHub repository to CircleCI and confirm a green pull request pipeline. Protect `main` using the actual CircleCI required status check. YAML validation alone is not sufficient evidence that the migration succeeded.

### Pin pnpm without permission errors

CircleCI's `cimg/node:22.16` image may have a root-owned global pnpm installation. Installing pnpm globally into `/usr/local/lib/node_modules` can fail with `EACCES`.

Install the pinned version with `npm install --global --prefix "$HOME/.local/pnpm" pnpm@9.1.0`. Add `$HOME/.local/pnpm/bin` to `PATH` and persist the value through `$BASH_ENV`. Assert the version before running workspace installation. Never add `sudo` or weaken filesystem permissions to fix the problem.

### Keep npm authentication separate

Routine CircleCI verification reads public npm packages without an authentication token. Do not reference an unset `NPM_TOKEN` in the repository-level `.npmrc`.

The manually authorized package release job obtains `NPM_TOKEN` from the restricted `aether-npm-release` context. It writes a private `$HOME/.npmrc` and validates publishing permissions before invoking Changesets. No ordinary pull request is allowed to publish packages.

## CF-01: Deploy the public registry first

Revalidate the current source manifest and generated artifacts using the existing registry scripts. The baseline registry contained 151 entries: 78 primitives, 39 patterns, and 34 blocks. Release validation should derive these counts rather than hardcode them.

Add pinned Wrangler tooling in the repository lockfile. Create `apps/registry-public/wrangler.jsonc` with a unique Worker name, the static `./out` assets directory, explicit 404 handling, and a current compatibility date.

Keep `apps/registry-public/next.config.mjs` in static-export mode. Build registry outputs first, then run the Next.js export. Verify that the output includes `r/registry.json`, `r/button.json`, and `llms.txt`.

Replace the Vercel-only header configuration with Cloudflare static asset header rules. Apply public CORS to registry JSON. Use short cache lifetimes for mutable registry endpoints; plan immutable, versioned component URLs for the future M2 lifecycle engine.

Add a CircleCI deployment job that invokes the pinned Wrangler version only after the verification job succeeds. Start with a preview Worker and manually approved production deployment. Use a protected `aether-cloudflare-deploy` context.

After preview validation, attach `registry.aether-ui.dev` to the Worker. Verify HTTP 200 for the aggregate JSON, individual component JSON, and `llms.txt`. Verify schema integrity, accurate cache headers, appropriate CORS, and HTTP 404 for unknown component names.

Complete an installation smoke test in an external clean project using the published `@aetherstack/cli` package and the production registry endpoint. Do not mark M0-08 complete based only on local artifact generation.

### CF-01 implementation status

The registry Worker configuration, static output checks, and a deployment runbook were merged in PR #29. See [CF-01 Registry Runbook](./REGISTRY-RUNBOOK.md). The preview Worker was deployed by the gated CircleCI workflow in [pipeline #11](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/11/details?useNewPipelines=true), and the public homepage is accessible at `https://aether-ui-registry.hi-5be.workers.dev/`. The canonical Custom Domain `registry.aether-ui.dev`, DNS/TLS verification, and published CLI installation remain outstanding. An exact Wrangler 4.165.0 installation is used as an interim CI bootstrap; move Wrangler into the pnpm lockfile in a follow-up maintenance change.

## CF-02: Migrate the documentation website

Audit `apps/docs` for server APIs, dynamic routes, Next.js Image optimization, redirects, generated metadata, client search, component preview dependencies, fonts, and theme state.

Try Next.js static export while preserving the current framework and monorepo `transpilePackages` setup. Do not combine the hosting migration with React, Tailwind, or Next.js major-version upgrades.

Verify that the export produces correct standalone HTML for every canonical route, direct navigation works, unknown pages return HTTP 404, and interactive examples behave correctly.

Verify SEO assets including canonical links, `robots.txt`, `sitemap.xml`, and `llms.txt`. Test light and dark modes, responsive layout, fonts, and navigation.

Fix the homepage GitHub destination to the actual `bogdanmartinescu/aetherstack` repository. Validate the public CLI command against the published package; do not advertise CLI `diff` and `update` functionality until implemented.

Create a separate Wrangler configuration and deploy a documentation preview using CircleCI. Promote the preview to `aether-ui.dev` only after the smoke tests pass.

## CF-03: Deploy the public demo

Enable and test static export for `apps/demo`. Ensure component demonstrations do not depend on undocumented server APIs and contain functional responsive states.

Deploy using a separate Cloudflare Worker, with its own version history and domain `demo.aether-ui.dev`. Verify direct links, styles, fonts, accessibility, asset caching, and rollback independently of the docs site.

## CF-04: Deploy Studio

Test static export and build of `apps/studio`. Deploy the current playground to a separate Worker at `studio.aether-ui.dev`.

Apply Cloudflare Access before exposing internal functionality. A future production Studio with accounts, saved themes, or private registries may justify a separate authenticated Worker API, D1, and R2. These services are not required for the initial migration.

## CF-05: Complete CircleCI deployment orchestration

Expand the CircleCI configuration with independent deployment jobs for the registry, documentation, demo, and Studio. Every production job must depend on successful verification and must be restricted to the protected `main` branch.

Use a restricted CircleCI context named `aether-cloudflare-deploy` for `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. Give the token minimum required Worker deployment permissions and do not print values in CI logs.

Initially require explicit approval before production deployment. After a complete staged run succeeds, allow controlled automatic deployments where appropriate.

Pin Wrangler in the lockfile and execute it from CircleCI. Avoid installing an unpinned latest version during production deployment. Record the commit SHA, deployed Worker identifier, endpoint, and deployment version for rollback.

Run HTTP and content smoke tests after each deployment. Introduce monorepo path filtering only when shared-package dependencies, registry generation, and the lockfile are correctly accounted for.

Keep npm releases separate from web deployments. The CircleCI package-publishing job remains manually authorized and is blocked until npm organization publishing permissions are confirmed.

## CF-06: Perform DNS and custom-domain cutover

Inventory DNS and preserve current email and verification records, including MX, SPF, DKIM, and DMARC. Confirm Cloudflare zone ownership and authoritative nameserver activation.

Attach the production registry first, then documentation, demo, and Studio. Verify Cloudflare-managed TLS, canonical URLs, HTTP response codes, assets, redirects, and cache policies at each cutover.

Prevent temporary preview deployments from being indexed. Do not delete a functioning website or the previous deployment path until the new Cloudflare site is independently verified.

Capture the prior known-good Worker version before every deployment. Use Cloudflare Worker rollback when code deployment fails. Treat any future database schema migrations as separate rollback operations.

After stable cutover, remove obsolete Vercel configuration and credentials in a reviewed change.

## CF-07: Release acceptance and M0 closeout

CircleCI must validate formatting, TypeScript, ESLint, test suites, registry generation and freshness, package builds, application builds, and clean consumer installs.

The registry must serve valid aggregate and per-item JSON, serve AI discovery metadata, enforce expected cache and CORS rules, and return HTTP 404 for invalid paths.

The published CLI must be able to fetch and install a component from the live Cloudflare registry. Verify actual consumer compilation rather than only file downloads.

The documentation and demo must function on canonical domains. Studio must have the intended access policy. Deep links, responsive layout, SEO, and accessibility must be checked.

Deployment jobs must use restricted credentials and produce reproducible releases with recorded commit identifiers and tested rollback procedures.

GitHub branch protection must require CircleCI rather than GitHub Actions. npm publication must remain manually gated until appropriate credentials and ownership are confirmed.

Update `docs/roadmap/execution-state.md` and the M0 release-candidate verification records with evidence from actual CircleCI runs and live Cloudflare endpoints. M0 is not complete while external registry or npm release gates are blocked.

## Secret ownership

CircleCI deployment context: `aether-cloudflare-deploy`, containing `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.

CircleCI release context: `aether-npm-release`, containing `NPM_TOKEN`.

GitHub: branch protection, reviews, status checks, and source control only.

Cloudflare: Worker projects, DNS, custom domains, TLS certificates, and Studio Access.

Repository: Wrangler configurations, CircleCI pipeline, source code, and migration documentation, with no committed credentials.

## Execution contract for AI coding agents

Work through CF-00 to CF-07 in dependency order. At the start of every session, read `AGENTS.md`, the current `main` branch, this migration plan, and the persistent execution state.

Implement each milestone in a small pull request with tests, an acceptance checklist, and the exact command results. Update the execution state and push only reviewed changes.

Stop at owner-controlled gates involving CircleCI contexts, Cloudflare credentials, DNS, release authority, public deployment, or publishing payments. Do not claim success before the external action and smoke test have been independently verified.

After full migration acceptance, resume the existing M1 through M7 product roadmap.

## References

See the [CircleCI configuration reference](https://circleci.com/docs/reference/configuration-reference/), [CircleCI environment variable guidance](https://circleci.com/docs/guides/security/env-vars/), [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), and [Cloudflare authorization documentation](https://developers.cloudflare.com/workers/authorization/).
