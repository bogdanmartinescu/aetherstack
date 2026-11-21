# CF-01 registry Worker deployment

**Status:** configuration prepared; Cloudflare deployment is not yet verified. This runbook uses CircleCI exclusively.

## Implementation

The registry Worker configuration is `apps/registry-public/wrangler.jsonc`. The asset source is the existing Next.js static export (`apps/registry-public/out`). Cloudflare's `_headers` rules live in `apps/registry-public/public/_headers`; the static export must copy them into the deployment output.

The CI pipeline runs `pnpm --filter @aetherstack/scripts validate-registry`, `pnpm --filter @aetherstack/scripts build-registry`, `pnpm --filter @aetherstack/registry-public build`, and `node scripts/verify-registry-output.mjs`.

The separate CircleCI deployment job installs **exactly Wrangler 4.165.0** into a user-owned prefix. It is intentionally not an automatic push deployment. Project-lockfile integration is a later maintenance task; until then, do not replace the exact version with `latest`.

## Required CircleCI setup

Create a restricted context named `aether-cloudflare-deploy` and restrict access to authorized maintainers, protected branches, and the AetherStack project.

Add `CLOUDFLARE_ACCOUNT_ID` (32 hexadecimal characters), `CLOUDFLARE_API_TOKEN` (least-privilege Worker edit permissions), and `REGISTRY_SMOKE_BASE_URL` (the intended HTTPS preview URL for `aether-ui-registry`, ending in `.workers.dev`).

The owner must enable the account's `workers.dev` subdomain and confirm the preview hostname in the Cloudflare dashboard. Do not add Cloudflare tokens or account details to GitHub or repository files.

## Runbook

1. Merge the CF-01 PR only after CircleCI's normal `verify` job passes.
2. Check CircleCI context restrictions and populate the three required variables. Confirm the `REGISTRY_SMOKE_BASE_URL` hostname matches the Worker output.
3. Manually trigger a CircleCI pipeline on `main` with the boolean parameter `deploy_registry=true`. Do not enable `publish_npm` for this operation.
4. Approve the `approve_registry_preview` hold job. The deployment job must run only after the full `verify` job.
5. Verify the static export, Wrangler version, Worker deployment and HTTP smoke checks complete successfully.
6. Confirm the Worker was deployed to the preview endpoint and inspect HTTP response headers independently.
7. When approved, attach `registry.aether-ui.dev` as a Cloudflare Worker Custom Domain. Preserve unrelated DNS, email, and verification records.
8. Re-run `node scripts/smoke-registry.mjs https://registry.aether-ui.dev` against the production hostname. Test the published CLI from a clean external consumer.
9. Record the Worker version, deployment SHA, custom-domain status, and installation results in `docs/roadmap/execution-state.md`.

The deployment job never attaches the production Custom Domain by itself. `deploy_registry=false` is the default and PR pipelines cannot schedule a deploy. Requiring explicit approval prevents accidental deployment if a pipeline parameter is set incorrectly.

## Acceptance and rollback

The smoke script checks the root page, manifest JSON, Button JSON, AI discovery file, public CORS and cache headers, and a missing-item 404. The export checker validates the exact manifest-to-item-file mapping and generated static assets.

If export validation fails, fix the registry generator or artifacts; do not bypass the check. If the deployment fails, preserve the current running Worker. If the deployed registry returns invalid data, roll back the Worker to a known-good deployment through Cloudflare and re-run the smoke script. For a DNS cutover failure, restore the previous verified route without deleting unrelated DNS records.

**M0-08 and CF-01 remain incomplete until the live registry works and a published CLI consumer can install a component.**
