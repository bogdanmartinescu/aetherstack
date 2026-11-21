# Aether UI — Cloudflare Hosting and CircleCI Migration

**Status:** implementation plan; CI migration introduced in the associated pull request. **Owner-controlled:** connecting CircleCI, creating Cloudflare resources, configuring secrets, DNS cutover and actual npm publishing.  
**Baseline inspected:** `1ea579b00b6c` (`main`, 2026-11-21).  
**Execution authority:** [GOAL.md](../../GOAL.md), [AGENTS.md](../../AGENTS.md), [ROADMAP.md](../../ROADMAP.md), [execution state](../roadmap/execution-state.md). This plan supersedes the Vercel path in the [historical M0-08 runbook](../roadmap/audits/m0-08-cdn-runbook.md).

## 1. Architectural decision

**Use CircleCI exclusively for CI/CD:** checks, tests, builds, release verification and eventually Wrangler deployments. Keep GitHub for Git, issues and PRs; keep npm for the CLI, MCP server and library packages. Do **not** use GitHub Actions, Vercel deploy workflows or Cloudflare Workers Builds as independent build systems. Cloudflare provides DNS, SSL, CDN and Workers Static Assets. Prefer Workers over new Pages deployments.

| Existing application/package               | Current implementation                                | Target                                                                           |
| ------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| `apps/registry-public`                     | Next.js 16, `output: "export"`, static `out/`         | `registry.aether-ui.dev`: Worker Static Assets                                   |
| `apps/docs`                                | Next.js 16, component demos, no observed API handlers | `aether-ui.dev`: test static export first, otherwise evaluate vinext             |
| `apps/demo`                                | Next.js 16, no observed API handlers                  | `demo.aether-ui.dev`: static Worker                                              |
| `apps/studio`                              | Next.js 16, component playground                      | `studio.aether-ui.dev`: static Worker; restrict with Access until public release |
| `packages/cli`                             | Node CLI `@aetherstack/cli`                           | npm; registry hostname unchanged                                                 |
| `packages/mcp-server`                      | stdio MCP package                                     | npm; no Cloudflare hosting needed                                                |
| `packages/{ui,patterns,blocks,tokens,...}` | npm packages                                          | npm; no runtime hosting move                                                     |

Do not rewrite UI packages, migrate framework versions or add D1/R2/Queues for static registry assets. Future private registries and team services can use Workers + R2/D1 after explicit business gates, independently from this hosting migration.

## 2. CircleCI migration (CF-00: introduced, live verification pending)

- Repo-root `.circleci/config.yml` becomes the single CI definition. It currently verifies the complete monorepo with **Node 22 + pnpm 9.1.0**, frozen install, formatting, typecheck, lint, public registry validation/regeneration/freshness, tests, workspace build and isolated Next/Vite consumer installs.
- A **disabled-by-default** pipeline parameter `publish_npm=false` allows an authorized manual npm release on `main` after validation, using a restricted `aether-npm-release` CircleCI context. A release still requires valid org publishing rights and owner approval. No push/PR automatically publishes packages.
- Legacy `.github/workflows/{ci,release,deploy-registry}.yml` are removed in this migration PR. They remain active on the existing `main` until the replacement PR is merged; do not enable both systems after cutover.
- **Owner setup:** connect `bogdanmartinescu/aetherstack` to CircleCI; select `.circleci/config.yml`, enable push/PR pipelines, add a protected context called `aether-npm-release` only when npm publish is desired, restrict use to trusted maintainers and `main`.
- **Mandatory gate:** run `circleci config validate .circleci/config.yml` locally when CLI is available, then confirm a real CircleCI PR pipeline passes every step. Do not declare CI migrated from YAML syntax alone.
- Enable CircleCI required status checks in GitHub branch protection. Verify the exact status check name before requiring it; only then merge/retire GitHub Actions. Consider change-protected CircleCI deployment contexts and least-privilege GitHub integration.
- **Free-credit strategy:** start with one serial verification job to avoid duplicated pnpm installs/builds; profile job time and use CircleCI caching or path filtering only after measuring. Never skip important checks solely to reduce credits.

### Expected CI stages

`checkout → install pinned pnpm → frozen dependencies → format → typecheck → lint → validate/build registry → freshness → tests → full build → consumer-install → success`.

This configuration covers the *build/validation* part of the migration immediately; it does **not** imply that Cloudflare projects are already provisioned or deployments are active.

## 3. M0-08 becomes Cloudflare-first: CF-01 registry

1. Reconfirm source inventory with `pnpm --filter @aetherstack/scripts validate-registry`, `build-registry`, `pnpm build`, `pnpm consumer-install`. Current source manifest contains **151** entries: 78 primitives, 39 patterns, 34 blocks; do not hardcode these counts into release checks.
2. Add a root-pinned `wrangler` devDependency and update the pnpm lockfile through pnpm. Add `apps/registry-public/wrangler.jsonc` with a **distinct** Worker name, `assets.directory: "./out"`, `assets.not_found_handling: "404-page"`, and an appropriate compatibility date. Maintain the existing static Next export.
3. Replace `vercel.json` with `public/_headers`. Declare public CORS for registry JSON. Verify specific manifest caching vs `/r/*` wildcard and ensure only one effective `Cache-Control` header. Do not mark mutable aliases immutable.
4. In the CircleCI deploy job (CF-05), build registry artifacts *before* `apps/registry-public` static export, confirm `out/r/registry.json`, `out/r/button.json`, `out/llms.txt`, then deploy via pinned `pnpm exec wrangler deploy --config apps/registry-public/wrangler.jsonc`.
5. Use a preview `workers.dev` Worker first; owner attaches `registry.aether-ui.dev` as a Custom Domain only after preview tests. Registry deployment must be manual/approval-gated initially, and only originate from validated `main`.
6. Verify HTTP 200 for `/r/registry.json`, `/r/button.json`, `/llms.txt`, expected JSON schema/count, CORS/caching, 404 for invalid names and actual `npx @aetherstack/cli add button` from a clean external project using the **published** CLI.

**Exit:** production registry installation succeeds. Preserve the canonical registry URL so consumer config, docs and CLI need no hostname change.

## 4. CF-02 documentation migration

1. Inventory `apps/docs` for server-only features, image optimization, dynamic routes, redirects, font dependencies, `sitemap.xml`, `robots.txt`, `llms.txt`, external URLs and search. No API routes were found in the inspected tree, but verify at build time.
2. Try Next.js `output: "export"` with `trailingSlash` and image rules only where required. Preserve monorepo `transpilePackages`; do not change Next/React/Tailwind versions as part of hosting migration.
3. Ensure every documented URL exports its correct HTML; check deep links, working examples, client-side interactions, 404 behavior, light/dark theme, fonts, screenshots and SEO metadata.
4. Add `apps/docs/wrangler.jsonc`; deploy preview via CircleCI + Wrangler; only use **vinext** after a documented static-export blocker and an ADR.
5. Fix the GitHub CTA to `https://github.com/bogdanmartinescu/aetherstack` and public installation text to `npx @aetherstack/cli` if the current unscoped command is not actually owned/published. Do not advertise unimplemented `diff`/`update` commands.
6. Deploy and validate `aether-ui.dev` while preserving the old host as rollback until complete.

**Exit:** all canonical docs routes and UI examples work, and online inventory matches the published registry.

## 5. CF-03 demo and CF-04 Studio

- Test static export for both Next.js apps and deploy independently on Workers Static Assets. No server-only APIs were found in the inspected route tree; confirm on build.
- Demo: public, responsive and accessible showcase, realistic states with no unimplemented backend claims.
- Studio: internal at first; apply Cloudflare Access for authentication, then release publicly only after product/QA readiness. Never mistake demo-only components for production APIs.
- Verify custom-domain TLS, deep routing, assets, previews, return status codes and ability to roll back each application independently.

## 6. CF-05 CircleCI-based deployment orchestration (next implementation)

Only CircleCI invokes Wrangler. Do **not** enable Cloudflare Workers Builds/Git integration in parallel.

After CF-01..04 static exports are proven, expand `.circleci/config.yml` with distinct jobs:
- `deploy_registry`, `deploy_docs`, `deploy_demo`, `deploy_studio`. Jobs `requires: [verify]`; `main` only; use the restricted `aether-cloudflare-deploy` context.
- Declare pipeline parameters such as `deploy_registry=false`, `deploy_docs=false`, or use explicit CircleCI approval steps. Require operator approval before initial production cutover; enable controlled auto-deploy only after a successful staged run.
- Validate that `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist without logging values. Cloudflare API token: minimum Worker editing permissions for existing Workers; add routes/custom domain permissions only when needed. Restrict CircleCI context to protected branches/maintainers.
- Use a pinned Wrangler version in pnpm lockfile, never unpinned `npx --yes wrangler@latest` for production. Each job builds from one commit SHA and records deployed Worker name, SHA and URL.
- Run live smoke tests **after** deployment and fail on non-200/invalid content. Protect simultaneous production deploys; maintain per-app logs and rollback identifiers.
- Include shared files and lockfile in monorepo change detection. Introduce CircleCI path filtering only after correctness is demonstrated, with broad fallbacks for shared packages and registry generator changes.
- Keep npm publishing **separate** from web deploys. CircleCI's manual release context requires `NPM_TOKEN`, org publish rights, versioned Changesets and post-publication verification.

## 7. CF-06 DNS and cutover

1. Inventory current Cloudflare zone, authoritative nameservers, `A/AAAA/CNAME`, redirects and email MX/SPF/DKIM/DMARC records. Never blindly replace a live DNS zone.
2. Deploy preview Worker names first. Attach `registry.aether-ui.dev`, then `aether-ui.dev`, `demo.aether-ui.dev`, `studio.aether-ui.dev` one at a time. Configure `www` redirect if appropriate.
3. Verify TLS, canonical URLs, asset cache headers, CORS, 404, AI discovery, robots/sitemap and no search-indexed temporary `workers.dev` pages.
4. Maintain rollback to the previous known-good Cloudflare Worker version; preserve existing docs hosting until cutover is confirmed.
5. After all sites are green, remove Vercel tokens/projects and obsolete configuration through reviewed changes. Never delete active DNS records before documenting their replacement.

## 8. CF-07 acceptance, release and M0 closeout

| Test                   | Required                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| CircleCI PR validation | Format, TS, ESLint, unit/integration, build, registry, consumer fixture pass              |
| CLI clean install      | Published CLI retrieves actual production manifest/item and installs usable source        |
| Registry endpoints     | Aggregate, component, `llms.txt` 200 + schema/count + CORS/cache; bad slug 404            |
| Docs                   | All canonical pages/metadata, demos and deep links; unknown URL 404                       |
| Demo/Studio            | Correct routing, CSS/fonts, responsive states; Studio Access as planned                   |
| Deployment             | Reproducible CircleCI job, constrained context, recorded commit/build version             |
| Rollback               | Previous Worker version can be restored and rechecked                                     |
| npm                    | Manual CircleCI publish path validated with authorized token and package access           |
| Governance             | GitHub branch protection requires CircleCI checks; no GitHub Actions or Cloudflare Builds |
| Documentation          | README, migration state, incident runbooks and build instructions current                 |

Update `docs/roadmap/execution-state.md` and `docs/roadmap/audits/m0-10-rc-verification.md` with fresh results. **M0 is not complete** while a production deployment or authorized package release gate remains blocked.

## 9. Secret handling and operator checklist

| Place                                                | Variables                                       | Notes                                                          |
| ---------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------- |
| CircleCI `aether-cloudflare-deploy` context (future) | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` | Scope token narrowly; protect context                          |
| CircleCI `aether-npm-release` context                | `NPM_TOKEN`                                     | Only when owner authorizes publishing and org permissions work |
| GitHub                                               | Branch rules, reviews, CircleCI required checks | **No** deployment credentials or Actions workflows             |
| Cloudflare                                           | Worker names, Custom Domains, DNS, Access       | No automatic Cloudflare Builds                                 |
| Repository                                           | Wrangler configs, CI definition, docs           | Never commit token values or `.env` secrets                    |

### Owner prerequisites

Connect the repo in CircleCI and confirm first CI green; later create Cloudflare API token/account scope and Worker projects, attach hostnames after preview smoke tests, set restricted CircleCI context values; independently resolve existing npm `E404` publication permissions. The agent may prepare code/PRs, but should not claim live provisioning, account changes, deployments or payment actions until confirmed.

## 10. CI failure, rollback and ongoing maintenance

- **Validation fails:** block merge, fix the code; do not disable checks or silently deploy. A CircleCI context/credits outage is an explicit blocker, not a pass.
- **Cloudflare deployment fails:** leave previous version serving and retain preview/artifacts; diagnose Wrangler output and permissions.
- **Smoke test fails after deploy:** revert to prior Worker version, rerun checks and record incident. Restore previous DNS routing only if necessary and safe.
- **npm publish fails:** do not change package names/versions blindly; verify org rights, token scopes, version status and `npm whoami`; keep release manual.
- Weekly monitor CI duration/credits, registry reachability, release mismatch, CDN cache, package integration. Monthly review security, dependency updates, costs, live installation and agent docs.

## 11. Implementation order for an AI agent

1. Re-read `AGENTS.md`, this document, current `main`, repository scripts and execution state.
2. Verify CircleCI is connected and its validation pipeline is green (CF-00); do not mark this done from committed YAML alone.
3. Implement CF-01 registry config, output and preview tests in a focused branch/PR; add a manual CircleCI deployment job with protected context. No live cutover without owner authorization.
4. Implement CF-02 docs static-export adaptation, then CF-03 demo and CF-04 Studio in separate tested PRs.
5. Integrate CF-05 deployment gating, shared-package change detection, smoke/rollback; configure CircleCI contexts with owner action.
6. Perform authorized CF-06 domain cutover, then CF-07 end-to-end validation and update the M0 state.
7. Resume M1–M7 product roadmap. Keep the four app deployments separate and never replace runtime npm/stdio packaging with Cloudflare hosting.

### References
- [CircleCI configuration](https://circleci.com/docs/reference/configuration-reference/)
- [CircleCI pipeline configuration validation](https://circleci.com/docs/guides/toolkit/how-to-use-the-circleci-local-cli/)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Worker permissions](https://developers.cloudflare.com/workers/authorization/)
- [Cloudflare static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
