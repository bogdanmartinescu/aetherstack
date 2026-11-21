# CF-02 Docs Cloudflare Worker Preview

Status: preview implementation prepared, not yet deployed. The docs Worker is independent of the deployed registry Worker.

## Configuration

- Worker: `aether-ui-docs`, static assets from `apps/docs/out`
- Preview hostname: `https://aether-ui-docs.hi-5be.workers.dev`
- Production hostname after preview validation: `aether-ui.dev`
- Runtime: Cloudflare Workers Static Assets, no Worker script and no Cloudflare Builds
- Build: `pnpm --filter @aetherstack/scripts build-registry` then `pnpm --filter @aetherstack/docs build`
- Validation: `node scripts/verify-docs-output.mjs` checks all page routes and static assets
- Public smoke: `node scripts/smoke-docs.mjs https://aether-ui-docs.hi-5be.workers.dev`

Next.js outputs static HTML with trailing slashes. Cloudflare uses `404-page` for non-existent routes and `auto-trailing-slash` for exported folder indexes. Cloudflare `_redirects` preserves the legacy `/components/code-block-ai` route as a 301 to `/components/code-block/`.

## Operator-controlled configuration

Reuse the protected CircleCI context `aether-cloudflare-deploy` with `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. Add one environment variable:

`DOCS_SMOKE_BASE_URL=https://aether-ui-docs.hi-5be.workers.dev`

Do not attach the domain or enable Cloudflare Workers Builds while the preview has not been independently validated.

## Release sequence

1. Wait for the normal CircleCI `verify` job to pass on this PR. This includes a full Next.js static export and route inventory check.
2. Merge the PR. Trigger a new CircleCI pipeline on `main` with `deploy_docs=true`, leaving `publish_npm=false` and `deploy_registry=false`.
3. Approve `approve_docs_preview` only after the validation job succeeds. `deploy_docs` then creates the Worker if absent.
4. Confirm all smoke checks in the deploy job pass. Inspect `/`, `/components/button/`, `/patterns/`, the hashed Next.js JS asset, `/llms.txt`, old-slug 301 and invalid-route 404.
5. Verify interactive examples, theme switching, font selection, keyboard operation, narrow-screen navigation, metadata and CSS in a real browser.
6. Record the Worker version and Git commit. Attach `aether-ui.dev` through Workers Custom Domains **only** after assessing existing DNS and obtaining approval for the website cutover.
7. Repeat smoke tests on `https://aether-ui.dev` and verify the published CLI against the live registry.
8. Keep previous known-good Workers versions available for rollback.

This PR **does not deploy docs, change DNS, release npm packages or enable automatic deployment**. If static export fails, fix the actual incompatibility rather than disabling checks or silently switching to a dynamic runtime.
