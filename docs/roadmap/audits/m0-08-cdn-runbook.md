# M0-08 — Registry CDN readiness & rollback runbook

**Status:** readiness docs only. Live deploy and smoke tests require owner authorization
(Vercel project / DNS for `registry.aether-ui.dev`). Do not mark M0-08 DONE until the live
endpoint is verified.

## Current failure mode (from M0-01)

`https://registry.aether-ui.dev` resolves in DNS but returns Vercel `DEPLOYMENT_NOT_FOUND`
(404) for `/`, `/r/registry.json`, and `/r/button.json`.

## Intended public surface

| Path               | Purpose                  | Cache guidance                                                          |
| ------------------ | ------------------------ | ----------------------------------------------------------------------- |
| `/r/registry.json` | Aggregate manifest       | Short TTL or `s-maxage` with stale-while-revalidate; not immutable      |
| `/r/<name>.json`   | Per-item install payload | Prefer immutable once versioned URLs exist (`/r/<name>@<version>.json`) |
| `/llms.txt`        | AI discovery index       | Short/medium TTL; regenerate with registry build                        |

Source of artefacts today: `apps/registry-public` (static files from
`pnpm --filter @aetherstack/scripts build-registry`).

Cache headers for Vercel are declared in `apps/registry-public/vercel.json`
(manifest short TTL + SWR; per-item JSON medium TTL; `llms.txt` medium TTL).

## Deploy checklist (owner)

### Option A — GitHub Actions (preferred)

Workflow: `.github/workflows/deploy-registry.yml` (skipped until enabled).

1. Confirm ownership of the Vercel project and DNS for `registry.aether-ui.dev`.
2. Create a Vercel project that can receive a static upload of `apps/registry-public/out`
   (Framework Preset: Other / static; attach the `registry.aether-ui.dev` domain).
3. In the GitHub repo settings:
   - Variable `ENABLE_REGISTRY_DEPLOY` = `true`
   - Secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
4. Run **Actions → Deploy public registry → Run workflow**, or push a change under
   `apps/registry-public/**` / registry sources.
5. Confirm the job’s smoke step passes (`/r/registry.json`, `/r/button.json`, `/llms.txt` → 200).
6. Confirm response `Cache-Control` matches `apps/registry-public/vercel.json` intent
   (may require Vercel project header config if static upload ignores `vercel.json`).
7. Record the deployment URL/commit in `docs/roadmap/execution-state.md`.

### Option B — Manual Vercel project

1. Confirm ownership of the Vercel project and DNS for `registry.aether-ui.dev`.
2. Create/connect a Vercel project with **Root Directory** `apps/registry-public`
   (Next.js `output: "export"` → `out/`).
3. Build command: ensure registry artefacts are current before `next build`, e.g.
   from repo root in CI: `pnpm --filter @aetherstack/scripts build-registry && pnpm --filter @aetherstack/registry-public build`,
   or deploy committed `public/r` that already passes the CI stale-artefact check.
4. Preview deploy: smoke `GET /r/registry.json` and `GET /r/button.json` (200 + JSON).
5. Confirm response `Cache-Control` matches `vercel.json` intent.
6. Production promote only after preview checks pass.
7. Record the deployment URL/commit in `docs/roadmap/execution-state.md`.

## Caching / versioning plan (interim → M2)

- **Interim (M0):** serve latest artefacts at `/r/*.json`. Document that clients may see updates
  without a version bump.
- **Target (M2):** immutable `/r/<name>@<version>.json` plus stable aliases; content hashes in
  manifests; never mutate an already-published versioned object.

## Rollback

1. **Vercel:** redeploy the previous successful production deployment (instant rollback).
2. **Git:** revert the bad registry commit, re-run `build-registry`, redeploy.
3. **Do not** overwrite historical versioned URLs once M2 immutability ships; publish a new
   version and move the alias instead.
4. If CLI defaults are broken, temporary mitigation for users: `aether-ui … --registry <preview-url>`.

## Smoke commands (after authorized deploy)

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://registry.aether-ui.dev/r/registry.json
curl -sS https://registry.aether-ui.dev/r/button.json | head -c 200
curl -sS -o /dev/null -w "%{http_code}\n" https://registry.aether-ui.dev/llms.txt
```

Expected: HTTP 200 for each; button JSON includes `"name":"button"`.

## Credentials

No deploy tokens or Vercel credentials belong in this repository. Use GitHub Actions / Vercel
project environment secrets only when the owner configures them.

## Related: npm publish gate

`.github/workflows/release.yml` opens Version Packages PRs on push to `main`, but **npm
publish only runs on manual `workflow_dispatch`**. Auto-publish was failing with
`E404 PUT @aetherstack/<pkg>` (token/org cannot create those package names). Owner must
grant publish rights on the `@aetherstack` npm org, then run **Actions → Release → Run
workflow** with publish enabled.
