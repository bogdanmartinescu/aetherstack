# CF-02: Documentation Worker runbook

Status (2026-11-21): **deployed**. PR #31 merged the Next.js static-export
configuration; [CircleCI pipeline #20](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/20/details?useNewPipelines=true)
ran `verify`, `approve_docs_preview`, and `deploy_docs`. The Cloudflare dashboard
lists `aether-ui.dev` as a Custom Domain on `aether-ui-docs`, and a production
documentation page was loaded in the connected browser. Broader visual and accessibility
acceptance is still outstanding.

For the deployment matrix, DNS cutover, and rollback policy, see the
[operations guide](./README.md).

## Configuration

- Source: `apps/docs`; Next.js `output: "export"`, `trailingSlash: true`.
- Worker: `aether-ui-docs`; config: `apps/docs/wrangler.jsonc`.
- Static asset directory: `apps/docs/out` (built in CircleCI).
- Preview URL: `https://aether-ui-docs.hi-5be.workers.dev`.
- Production Custom Domain: `https://aether-ui.dev`.
- Asset handling: `404-page` and `auto-trailing-slash`.
- Response rules: `apps/docs/public/_headers` and `_redirects`.
- SEO metadata: statically generated `robots.txt`, `sitemap.xml`, and `llms.txt`.
- Redirect: `/components/code-block-ai` → `/components/code-block/` (301).

The documentation uses no Cloudflare database or server-side Next.js runtime. The
`robots.ts` and `sitemap.ts` routes must remain explicitly static to support the export.

## CI/CD and secrets

The `aether-cloudflare-deploy` CircleCI context holds the following variables:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `DOCS_SMOKE_BASE_URL=https://aether-ui-docs.hi-5be.workers.dev`

Never copy their secret values into this repository. GitHub Actions and Cloudflare
Workers Builds are not used.

## Redeployment procedure

1. Merge a reviewed PR after the normal CircleCI `verify` job passes.
2. Trigger a **new** pipeline on `main` with `deploy_docs=true`;
   keep `deploy_registry=false` and `publish_npm=false`.
3. Approve `approve_docs_preview` when the verification job is green.
4. Confirm `deploy_docs` builds the site, verifies exported pages, runs Wrangler,
   and passes the HTTP smoke script against `DOCS_SMOKE_BASE_URL`.
5. Validate the production hostname separately; the deploy job's preview smoke
   does not automatically test `https://aether-ui.dev`.
6. Inspect interactive examples, search, fonts, theme switching, desktop/mobile
   navigation, SEO, and accessibility. Record the deployed commit and Worker version.

Relevant commands from the monorepo root:

```bash
pnpm --filter @aetherstack/scripts build-registry
pnpm --filter @aetherstack/docs build
node scripts/verify-docs-output.mjs
node scripts/smoke-docs.mjs https://aether-ui-docs.hi-5be.workers.dev
node scripts/smoke-docs.mjs https://aether-ui.dev
```

## Custom domain and rollback

Cloudflare manages the `aether-ui.dev` Worker Custom Domain. If adding it reports
"externally managed DNS records", inspect **DNS → Records** and remove only
conflicting old A/AAAA/CNAME records for the apex after validating the replacement.
Preserve MX, TXT (SPF/DKIM/DMARC and verification), CAA, nameservers, and unrelated
subdomain records. Do **not** create a manual CNAME to `workers.dev`.

For a bad deployment, use Cloudflare's Worker version rollback to restore the
previous known-good version; for a bad DNS cutover, restore the last verified
hostname mapping. Re-run smoke checks and record the result.

## Open acceptance checks

- Production smoke command, deep links, SEO, redirects, JS/CSS, and not-found 404.
- Interactive component demos, responsive states, keyboard navigation, and theme/fonts.
- Version/commit metadata and rollback evidence.
- Published CLI integration with the production registry is a separate release gate.
