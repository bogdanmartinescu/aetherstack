# Cloudflare Workers + CircleCI deployment operations

Operational snapshot: **2026-11-21**. This is the starting point for current
deployment operations. Historical Vercel procedures are retained only in
[`m0-08-cdn-runbook.md`](../roadmap/audits/m0-08-cdn-runbook.md) for audit
purposes; do not use them to deploy.

## Current deployment inventory

| Application | Worker | Preview hostname | Canonical hostname | Evidence and next gate |
| --- | --- | --- | --- | --- |
| Public registry | `aether-ui-registry` | `aether-ui-registry.hi-5be.workers.dev` | `registry.aether-ui.dev` | [CircleCI #11](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/11/details?useNewPipelines=true) deployed; preview loaded, owner confirmed JSON, Cloudflare DNS shows Worker mapping. Production smoke and published CLI install remain open. |
| Documentation | `aether-ui-docs` | `aether-ui-docs.hi-5be.workers.dev` | `aether-ui.dev` | [CircleCI #20](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/20/details?useNewPipelines=true) deployed; Custom Domain visible in Cloudflare and `/components/tooltip/` loaded on the production site. Full production regression checks remain open. |
| Demo | Planned | Not provisioned | `demo.aether-ui.dev` | CF-03: static export, gated Worker deployment, smoke checks, DNS |
| Studio | Planned, private | Not provisioned | `studio.aether-ui.dev` | CF-04: export, Cloudflare Access policy, gated deploy |

Both deployed applications use **Workers Static Assets**: Next.js generates files
during CI, and Wrangler publishes the `out/` directory. Static hosting does
not require D1, R2, KV, a runtime API, or Cloudflare Workers Builds.

## Source of truth

- [CircleCI configuration](../../.circleci/config.yml) — build, deployment
  parameters, approvals, and credentials contexts.
- [Registry Wrangler config](../../apps/registry-public/wrangler.jsonc) —
  `aether-ui-registry` with exported `./out` assets.
- [Docs Wrangler config](../../apps/docs/wrangler.jsonc) —
  `aether-ui-docs` with exported `./out` assets.
- [Registry runbook](./REGISTRY-RUNBOOK.md) and
  [docs runbook](./DOCS-RUNBOOK.md) — application-specific verification.
- [Migration plan](./CLOUDFLARE-CIRCLECI-MIGRATION.md) and
  [execution state](../roadmap/execution-state.md) — remaining milestones.

GitHub stores source and pull requests. CircleCI is the exclusive build,
validation, publishing, and deploy runner. The npm publish job is separate
from Cloudflare Workers deploys and must remain manually authorized.

## CircleCI settings

The restricted context `aether-cloudflare-deploy` must contain the
following names (store sensitive values **only** in CircleCI):

| Environment variable | Usage |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Selects Cloudflare account |
| `CLOUDFLARE_API_TOKEN` | Workers deployment API token |
| `REGISTRY_SMOKE_BASE_URL` | `https://aether-ui-registry.hi-5be.workers.dev` |
| `DOCS_SMOKE_BASE_URL` | `https://aether-ui-docs.hi-5be.workers.dev` |

The separate `aether-npm-release` context owns `NPM_TOKEN`. Do not copy
Cloudflare credentials into the npm release context, commit secrets, or enable
GitHub Actions/Cloudflare Workers Builds.

Ordinary pushes and pull requests only run `verify`. They do **not** deploy
Workers; a green `verify` alone never means a release happened.

To publish a reviewed change, start a **new** CircleCI pipeline on `main` with
one of these Boolean parameters, then approve the hold job after `verify`:

| Target | Parameter set to `true` | Manual approval | Deployment job |
| --- | --- | --- | --- |
| Registry | `deploy_registry` | `approve_registry_preview` | `deploy_registry` |
| Documentation | `deploy_docs` | `approve_docs_preview` | `deploy_docs` |
| npm packages | `publish_npm` | Separate authorization required | `publish_npm` |

Leave unrelated Boolean parameters `false`. The npm job uses a dedicated
context and is **not** part of a website deploy. A deployment passes only
when its deploy job and HTTP smoke test succeed.

## DNS cutover and recovery

Workers Custom Domains must be attached under each Worker's **Domains &
Routes**. Cloudflare manages the DNS and certificate for the selected
hostname; do not create a manual CNAME pointing at `workers.dev`.

If adding `aether-ui.dev` or `registry.aether-ui.dev` reports
"Hostname already has externally managed DNS records", do the following:

1. Inspect **Cloudflare → aether-ui.dev → DNS → Records**.
2. Identify only A/AAAA/CNAME records for the **exact** conflicting
   hostname (`@` for the apex, or `registry` for the registry).
3. Confirm the intended replacement Worker is healthy on its preview URL.
4. Remove only obsolete host records for that same hostname, then attach
   the Worker Custom Domain and let Cloudflare create the new mapping.
5. Preserve MX, SPF/DKIM/DMARC and verification TXT, CAA, nameservers,
   and records for other hostnames. Do not bulk-delete DNS.
6. Check HTTPS, HTML/JSON, assets, deep links, redirects, SEO files,
   caches and 404s; log the result in the execution state.

In the observed DNS view, `registry.aether-ui.dev` appeared as a Cloudflare
Worker record. The domain also contains a separate old
`_domainconnect` CNAME referring to Vercel; this is **not** the apex
website record and is not an instruction to remove unrelated records.
Review legacy records only as a separately approved cleanup.

## Verify and roll back

From the monorepo root after building the respective application:

```bash
node scripts/verify-registry-output.mjs
node scripts/verify-docs-output.mjs

node scripts/smoke-registry.mjs https://aether-ui-registry.hi-5be.workers.dev
node scripts/smoke-registry.mjs https://registry.aether-ui.dev

node scripts/smoke-docs.mjs https://aether-ui-docs.hi-5be.workers.dev
node scripts/smoke-docs.mjs https://aether-ui.dev
```

Record the HTTP results, Worker deployment version and commit SHA. Validate
interactive documentation separately in a real browser. If a Worker release
regresses, restore the last known-good version through Cloudflare and
recheck both hostnames. DNS recovery is a separate action: restore the
previous verified route only if a cutover fails.

## Outstanding release gates

- Production registry endpoint smoke with schema, cache, CORS, and 404 checks.
- Published `@aetherstack/cli` package: install a component from the
  canonical registry in a clean external project and compile the consumer.
- Documentation visual/accessibility/mobile tests and canonical-domain smoke.
- Demo and Studio Worker migration; Studio must be access-restricted.
- Record proven rollout and rollback evidence. Keep M0-08/M0-10 open until
  every required gate has passed.
