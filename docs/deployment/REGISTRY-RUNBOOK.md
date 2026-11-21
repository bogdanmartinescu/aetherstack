# CF-01: Registry Worker runbook

Status (2026-11-21): **preview deployed; production Custom Domain configured**.
PR #29 added the Worker and CI checks.
[CircleCI pipeline #11](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/11/details?useNewPipelines=true)
ran `verify`, `approve_registry_preview`, and `deploy_registry`.
The preview homepage loaded, the owner confirmed registry JSON was accessible,
and Cloudflare's DNS view shows `registry.aether-ui.dev` as a Worker-managed
hostname for `aether-ui-registry`. Production HTTP/CLI release acceptance is
not yet fully recorded.

See the [deployment operations guide](./README.md) for shared CircleCI,
Custom Domain, and rollback procedures.

## Configuration and build

- Source: `apps/registry-public`; Next.js static export to `out/`.
- Worker: `aether-ui-registry`; config: `apps/registry-public/wrangler.jsonc`.
- Preview URL: `https://aether-ui-registry.hi-5be.workers.dev`.
- Production URL: `https://registry.aether-ui.dev`.
- Public assets: `/r/registry.json`, `/r/button.json`, `/llms.txt`.
- Headers: `apps/registry-public/public/_headers` (JSON CORS and cache policies).
- Validation: `scripts/verify-registry-output.mjs` and `scripts/smoke-registry.mjs`.
- Wrangler: exactly `4.165.0` installed by CI into a user-owned prefix.
  Move Wrangler to the pnpm lockfile as future dependency maintenance.

## CircleCI deployment

The restricted `aether-cloudflare-deploy` context supplies:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `REGISTRY_SMOKE_BASE_URL=https://aether-ui-registry.hi-5be.workers.dev`

The normal `verify` job builds and checks registry artifacts but **does not deploy**.
For a registry redeploy:

1. Merge a reviewed change after CircleCI verification.
2. Trigger a new pipeline on `main` with `deploy_registry=true`;
   leave `deploy_docs=false` and `publish_npm=false`.
3. Approve `approve_registry_preview`.
4. Confirm the Wrangler `deploy_registry` job and preview HTTP smoke test pass.
5. Run the production smoke command, check the Custom Domain, and record the
   commit, Worker version, headers, and exact result.

```bash
node scripts/smoke-registry.mjs https://aether-ui-registry.hi-5be.workers.dev
node scripts/smoke-registry.mjs https://registry.aether-ui.dev
```

The smoke script checks aggregate and component JSON, AI discovery content,
CORS, caching, and 404 behavior. Do not expose secret values in logs.

## DNS and failure recovery

Cloudflare manages the Worker Custom Domain record. If Cloudflare rejects a
hostname because it has externally managed A/AAAA/CNAME records, first
inspect the *exact* hostname and old provider, then remove only the conflicting
records. Preserve unrelated DNS, including MX, TXT, and nameservers. A manual
CNAME to the `workers.dev` preview is not required.

If an update breaks the registry, roll back to the last known-good Worker
deployment in Cloudflare and verify preview and production routes. Treat DNS
rollback separately from deployment rollback.

**M0-08 remains open** until a clean external consumer installs a component
using the actually published `@aetherstack/cli` package against the production
registry and successfully builds.
