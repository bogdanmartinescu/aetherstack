# Execution state — persistent agent checkpoint

Initialized 2026-11-20. Historical checkpoint entries below preserve prior observations; the most recent status is recorded at the end of this file.

- Active milestone: M0 — truth, stability and public distribution.
- Most recent deployment work: registry Worker PR #29 / CircleCI #11; docs Worker PR #31 / CircleCI #20; custom domains visible in Cloudflare.
- Next task: run and record production registry/docs smoke tests, verify an actual published CLI consumer, and reconcile release gate M0-08/M0-10. Next Worker migrations: demo and access-restricted Studio.
- Current infrastructure baseline: `main` at `dd9e3c6` (2026-11-21); registry and docs Workers deployed via approved CircleCI pipelines. Historical 2026-11-20 Vercel 404 is superseded.
- Known remaining risks: npm release organization permissions and package/version drift; clean external CLI install is unverified. Cloudflare Workers + CircleCI supersede the old Vercel and GitHub Actions deployment paths.
- Commercial status: M4 discovery only; paid kit implementation and M6 require explicit owner approval and demand evidence.
- Publishing status: no release or external submission authority granted by this plan.

## Task ledger

The rows below preserve the November 20 baseline snapshot for audit purposes,
including superseded Vercel deployment entries. For the current Cloudflare
status, use the latest checkpoint at the end of this file.

| Task    | Status                                | Branch/commit/PR                          | Verification evidence                                         | Blocker / next action                                          |
| ------- | ------------------------------------- | ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| M0-01   | DONE                                  | PR #8 → `main` (via #17)                  | baseline audit committed                                      | —                                                              |
| M0-02   | DONE                                  | PR #9 → `main`                            | LICENSE + provenance                                          | optional owner entity rename                                   |
| M0-03   | DONE                                  | PR #10 → `main` (via #17)                 | registry 151; graph checks                                    | —                                                              |
| M0-04   | DONE                                  | PR #11 → `main` (via #17)                 | CLI path/schema/dry-run tests                                 | —                                                              |
| M0-05   | DONE                                  | PR #12 → `main` (via #17)                 | MCP pack/stdio; publish still gated                           | authorized npm release                                         |
| M0-06   | DONE                                  | PR #13 → `main` (via #17)                 | counts/versions reconciled                                    | docs route gaps closed in follow-up (context-menu, code-block) |
| M0-07   | DONE                                  | PR #14 → `main` (via #17)                 | consumer-install fixtures + CI                                | —                                                              |
| M0-08   | BLOCKED                               | runbook + `vercel.json` + deploy workflow | live still 404; GHA deploy gated on `ENABLE_REGISTRY_DEPLOY`  | Owner: Vercel project + secrets/var + smoke                    |
| REL-001 | BLOCKED                               | `release.yml` publish gated               | Release on main tried npm publish → E404 for `@aetherstack/*` | Owner: npm org publish rights; manual workflow_dispatch        |
| M0-09   | DONE                                  | PR #15 → `main` (via #17)                 | governance docs + repo metadata                               | Sponsors enablement owner action                               |
| M0-10   | VERIFIED (local) / BLOCKED (external) | PR #16 → stack; stack → `main` PR #17     | local RC 8 PASS; CDN + npm BLOCKED                            | Owner CDN + release authority; re-run `pnpm m0-rc-verify`      |

All other tasks in platform-backlog.md are TODO unless gated. Add/update a row per task as work proceeds; never delete evidence for previous completed tasks. Use linked issue/PR and exact command/results, not just "tests pass."

## Checkpoint format (append per session)

- Date/time and agent/session:
- Milestone and task ID:
- Base and working branch:
- Changes and affected paths:
- Acceptance criteria and evidence (command, result, artifact):
- Required checks not run / blockers:
- Commit/PR and remote verification:
- Status: TODO / IN_PROGRESS / BLOCKED / VERIFIED / DONE / DEFERRED
- Next smallest action and prerequisites:

### Checkpoint 2026-11-20 — M0-01

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-01.
- Base and working branch: `main` 6942f57 → `chore/m0-01-baseline-audit`.
- Changes and affected paths: `tooling/scripts/src/audit-inventory.ts` (read-only inventory), `tooling/scripts/package.json` (`audit-inventory` script), `docs/roadmap/audits/m0-01-baseline-audit.md`, this file.
- Acceptance criteria and evidence: checked-in audit with commit hash, reproducible commands, per-layer counts (ui 78/44, patterns 39/17, blocks 34/10 source modules vs registry items; 80 modules not installable) and gap list. Command results recorded in the audit.
- Required checks not run / blockers: clean consuming-project install (M0-07 scope). `format:check` fails on pre-existing files; not weakened, recorded as a gap.
- Commit/PR and remote verification: PR #8 open.
- Status: VERIFIED.
- Next smallest action and prerequisites: merge PR #8; then M0-02 (started in parallel on top of `ebabd81`).

### Checkpoint 2026-11-20 — M0-02

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-02.
- Base and working branch: `ebabd81` (M0-01) → `chore/m0-02-licenses`.
- Changes and affected paths: root `LICENSE`; `packages/*/LICENSE` (14); package `files` arrays; `license` on root, apps, tooling; `docs/roadmap/audits/m0-02-license-provenance.md`; README license link; this file.
- Acceptance criteria and evidence: provenance report; MIT text consistent; no retroactive relicensing (packages already declared MIT); copyright holder from sole git authorship; `pnpm --filter @aetherstack/utils exec npm pack --dry-run` includes LICENSE.
- Required checks not run / blockers: none for acceptance. Full workspace typecheck/test not required for license-only files. Entity-name copyright remains an optional owner edit.
- Commit/PR and remote verification: PR #9 → https://github.com/bogdanmartinescu/aetherstack/pull/9 (base `chore/m0-01-baseline-audit`).
- Status: VERIFIED.
- Next smallest action and prerequisites: merge PR #8 then #9 (or retarget #9 to main after #8); start M0-03 registry completeness.

### Checkpoint 2026-11-20 — M0-03

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-03.
- Base and working branch: `chore/m0-02-licenses` → `chore/m0-03-registry-completeness`.
- Changes and affected paths: `register-missing-modules.ts`; validate-registry cycle/dangling enforcement; `findDependencyCycles` in registry-build; `registry/public/registry.json` 71→151; generated `r/*` + llms.txt.
- Acceptance criteria and evidence: `validate-registry` public 151 valid; `build-registry` wrote 151 items; `audit-inventory` `sourceModulesNotInRegistry` empty for ui/patterns/blocks; registry-build tests include cycle cases (21 pass).
- Required checks not run / blockers: docs route naming mismatches left for M0-06; consumer install M0-07; CDN M0-08.
- Commit/PR and remote verification: PR #10 → https://github.com/bogdanmartinescu/aetherstack/pull/10
- Status: VERIFIED.
- Next smallest action: merge #8→#9→#10 into main; start M0-04 CLI hardening.

### Checkpoint 2026-11-20 — M0-04

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-04.
- Base and working branch: `chore/m0-03-registry-completeness` → `chore/m0-04-cli-hardening`.
- Changes and affected paths: `packages/cli` — `commands/generate.ts`, `init.ts`, `add.ts`, `list.ts`; `lib/installer.ts`, `lib/paths.ts`; config alias path refine; tests; changeset; this file.
- Acceptance criteria and evidence: `pnpm --filter @aetherstack/cli test` — 62 passed (network fail, malformed manifest, traversal, absolute paths, existing files, dry-run, rollback); typecheck pass.
- Required checks not run / blockers: live registry still 404 (M0-08); clean consumer fixture installs (M0-07); no published CLI release in this task.
- Commit/PR and remote verification: PR #11 → https://github.com/bogdanmartinescu/aetherstack/pull/11
- Status: VERIFIED.
- Next smallest action: merge #8→#11; start M0-05 MCP packaging.

### Checkpoint 2026-11-20 — M0-05

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-05.
- Base and working branch: `chore/m0-04-cli-hardening` → `chore/m0-05-mcp-packaging`.
- Changes and affected paths: `packages/mcp-server` tsup/registry/version/index; pack + stdio tests; README; changeset; this file.
- Acceptance criteria and evidence: `pnpm --filter @aetherstack/mcp-server test` — 24 passed (registry errors, pack item count = 151, stdio list_tools + list_components); typecheck pass after env typing fix.
- Required checks not run / blockers: publishing a new npm version requires release authority (AGENTS.md); live CDN still M0-08.
- Commit/PR and remote verification: PR #12 → https://github.com/bogdanmartinescu/aetherstack/pull/12
- Status: VERIFIED.
- Next smallest action: merge #8→#12; then M0-06 docs/count reconcile.

### Checkpoint 2026-11-20 — M0-06

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-06.
- Base and working branch: `chore/m0-05-mcp-packaging` → `chore/m0-06-docs-counts`.
- Changes and affected paths: root README; `packages/ui/README.md`; `CLAUDE.md`; `apps/docs` introduction/installation; `docs/roadmap/build-plan.md` inventory note; this file.
- Acceptance criteria and evidence: public copy uses 78/39/34 (151) and live package versions; docs intro/install read `REGISTRY_STATS`; no remaining "65+" / "0.1.0 for all packages" claims in primary surfaces.
- Required checks not run / blockers: live link crawl of aether-ui.dev deferred to deploy; CONTRIBUTING Node/scripts belong to M0-09.
- Commit/PR and remote verification: PR #13 → https://github.com/bogdanmartinescu/aetherstack/pull/13
- Status: VERIFIED.
- Next smallest action: merge #8→#13; start M0-07 clean-install fixtures (blocked on merge for CI against tip; can begin on stack tip).

### Checkpoint 2026-11-20 — M0-07

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-07.
- Base and working branch: `chore/m0-06-docs-counts` → `chore/m0-07-consumer-install`.
- Changes and affected paths: `tooling/scripts` pack + consumer-install; `tooling/fixtures/{next,vite}-app`; CI consumer-install job; `packages/ui/tsup.config.ts` flat exports; CLI engines>=20; changesets; this file.
- Acceptance criteria and evidence: `pnpm consumer-install` exit 0 — Next build, Vite build, CLI `add button` against local registry; packed manifests have no `workspace:*` / no `.ts` main; Node engines asserted.
- Required checks not run / blockers: Remix fixture deferred (backlog only requires Next/Vite); live CDN M0-08; npm publish still gated.
- Commit/PR and remote verification: PR #14 → https://github.com/bogdanmartinescu/aetherstack/pull/14
- Status: VERIFIED.
- Next smallest action: merge #8→#14; M0-08 needs owner for CDN; M0-09 governance is next code-ready P0.

### Checkpoint 2026-11-20 — M0-09 (+ M0-08 readiness docs)

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-09 (M0-08 runbook only).
- Base and working branch: `chore/m0-07-consumer-install` → `chore/m0-09-governance`.
- Changes and affected paths: CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, docs/governance/\*, README links, PR template, m0-08 CDN runbook; GitHub description/topics via `gh repo edit`.
- Acceptance criteria and evidence: CONTRIBUTING matches engines/scripts; no FUNDING.yml; sponsorship proposal documents owner gate; `gh repo view` shows description + topics.
- Required checks not run / blockers: M0-08 live deploy; Sponsors account; M0-10 full RC suite after merges.
- Commit/PR and remote verification: PR #15 → https://github.com/bogdanmartinescu/aetherstack/pull/15
- Status: M0-09 VERIFIED; M0-08 BLOCKED on owner deploy.
- Next smallest action: merge #8→#15; owner deploys registry CDN; then M0-10 RC gate.

### Checkpoint 2026-11-20 — M0-10 (+ M0-08 vercel.json)

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-10 (M0-08 deploy config hardening only).
- Base and working branch: `chore/m0-09-governance` → `chore/m0-10-rc-verification`.
- Changes and affected paths: `tooling/scripts/src/m0-rc-verify.ts` + package scripts; `apps/registry-public/vercel.json`; m0-08 runbook deploy steps; unused `dirname` import fix in `pack-publishable.ts`; audit `docs/roadmap/audits/m0-10-rc-verification.md`; this file.
- Acceptance criteria and evidence: `pnpm m0-rc-verify` exit 0 with **0 required local FAIL**; 8 PASS; live-registry + npm-publish recorded BLOCKED (owner). First run failed typecheck on unused `dirname` — fixed before re-run.
- Required checks not run / blockers: production CDN smoke (M0-08); authorized `changeset publish` / npm; Sponsors account. `format:check` still fails pre-existing (not CI-enforced).
- Commit/PR and remote verification: PR #16 → https://github.com/bogdanmartinescu/aetherstack/pull/16 (base `chore/m0-09-governance`).
- Status: VERIFIED locally; BLOCKED externally — **do not mark M0 or M0-10 DONE**.
- Next smallest action: merge #8→#16 stack; owner deploys CDN per runbook; grant release authority; re-run `pnpm m0-rc-verify`.

### Checkpoint 2026-11-20 — post-merge maintenance (format)

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / maintenance while M0-08 BLOCKED.
- Base and working branch: `main` `030dd2a` → `chore/m0-format-and-ledger-sync`.
- Changes: Prettier across tracked sources; `.prettierignore` excludes `.worktrees` + generated registry artefacts; CI enforces `format:check`; ledger marks M0-01..09 DONE after PR #17.
- Evidence: `pnpm format:check` exit 0; `pnpm typecheck` exit 0; live registry still 404 `DEPLOYMENT_NOT_FOUND`.
- Status: DONE (PR #19 merged). Side effect: REG-001 stale registry artefacts.
- Next: owner M0-08 deploy; do not start M1 until M0 exit gate clears.

### Checkpoint 2026-11-20 — REG-001 stale registry after Prettier

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / REG-001 (release-blocking CI regression).
- Base and working branch: `main` `81fb6c3` → `fix/m0-ci-registry-fonts`.
- Changes: rebuild `apps/registry-public/public/r` from formatted sources; CI build retries for flaky `next/font/google` 502s.
- Evidence: `pnpm --filter @aetherstack/scripts build-registry`; local stale check clean after commit; CI Registry was failing on main.
- Commit/PR: https://github.com/bogdanmartinescu/aetherstack/pull/21
- Status: DONE (PR #21 merged).
- Next: owner CDN still BLOCKED.

### Checkpoint 2026-11-20 — M0-08 deploy workflow + REL-001 publish gate

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-08 readiness + REL-001.
- Base and working branch: `main` `13f4c46` → `chore/m0-08-deploy-and-release-gate`.
- Changes: `deploy-registry.yml` (gated on `ENABLE_REGISTRY_DEPLOY`); `release.yml` publish only on `workflow_dispatch`; runbook Option A + npm note; ledger REL-001.
- Evidence: Release failure log E404 PUT `@aetherstack/*`; npm view ui=0.4.0 vs workspace ahead; live registry still 404.
- Commit/PR: https://github.com/bogdanmartinescu/aetherstack/pull/22
- Status: IN_PROGRESS until PR merges; M0-08/REL-001 remain BLOCKED on owner.
- Next: owner configures Vercel + npm org; enable var; dispatch workflows; smoke; `pnpm m0-rc-verify`.

### Checkpoint 2026-11-20 — docs route gaps (context-menu / code-block)

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-06 follow-up (docs routes).
- Base and working branch: `main` `1a687b9` → `chore/m0-docs-route-gaps`.
- Changes: add `/components/context-menu`; move docs from `code-block-ai` → `code-block` with redirect; sidebar + preview.
- Evidence: `pnpm --filter @aetherstack/docs typecheck` exit 0. CDN still 404; no Vercel CLI/secrets in environment.
- Commit/PR: https://github.com/bogdanmartinescu/aetherstack/pull/24
- Status: IN_PROGRESS until PR merges.
- Next: owner CDN/npm gates unchanged.

### Checkpoint 2026-11-20 — M0-08 deploy attempted (secrets missing)

- Date/time and agent/session: 2026-11-20, Cursor agent session.
- Milestone and task ID: M0 / M0-08.
- Evidence: Variable `ENABLE_REGISTRY_DEPLOY=true` set. Deploy workflow run 44831134934 failed preflight — missing `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Live registry still 404.
- Status: BLOCKED on owner Vercel secrets + project/DNS.
- Next: owner creates Vercel project for registry, adds three secrets, Actions → Deploy public registry → Run workflow.

## Phase gate log

Record milestone, all required task IDs, exact suite/results, known limitations, remaining blockers and owner decisions. No milestone marked completed until all applicable requirements are verified. On restart inspect git history and reconcile this file rather than blindly redoing work.

### Phase gate — M0 (partial, 2026-11-20)

- Required tasks M0-01..M0-10: local engineering on `main` via PR #17; M0-08 live deploy BLOCKED; M0-10 external npm/CDN BLOCKED.
- Suite: see `docs/roadmap/audits/m0-10-rc-verification.md` (HEAD at run: `eb3628c`; report regenerated after typecheck fix).
- Milestone exit: **not satisfied** until live `registry.aether-ui.dev` returns 200 for `/r/registry.json` and authorized publish path is verified.

### Checkpoint 2026-11-21 — Cloudflare + CircleCI migration plan

- Milestone: M0 infrastructure pivot (CF-00..CF-07); previous Vercel/CDN instructions are historical.
- Changes: CircleCI validation and manual-gated npm release config; removed GitHub Actions workflow files in PR; added docs/deployment/CLOUDFLARE-CIRCLECI-MIGRATION.md; linked roadmap and README.
- Status: CI migration PREPARED, NOT VERIFIED. CircleCI project connection, pipeline run, Cloudflare worker deployments, domain cutover and npm release have **not** been performed.
- Next: Connect repository to CircleCI, validate config, obtain green PR run, enable CircleCI required check, merge PR; implement CF-01 registry Worker preview and deployment with protected CircleCI context. Never label M0-08 complete until live endpoint tests pass.

### Checkpoint 2026-11-21 — CF-01 Cloudflare registry deployment preparation

- Branch: `feat/cf-01-cloudflare-registry-preview`, based on `ac18373e6306` on `main`.
- Scope: registry Worker Static Assets configuration, Cloudflare `_headers`, local export and remote HTTP smoke checks, manual CircleCI approval and deployment job, owner runbook. Remove obsolete Vercel registry config.
- Acceptance: normal CircleCI verification green; generated output matches manifest, deploy job is gated behind `deploy_registry=true` on `main`, restricted context and manual approval; preview and production HTTP smoke pass when owner has configured the account.
- Current state: PREPARED FOR PR, NOT DEPLOYED. No Cloudflare credentials, domain attachment, Worker version or smoke result has been confirmed. The PR's CI result must be recorded after it completes.
- Owner gate: set `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `REGISTRY_SMOKE_BASE_URL` in restricted CircleCI context; authorize preview deployment and custom-domain attachment separately. npm organization publishing remains blocked until validated.
- Next: merge after green CI; trigger protected preview pipeline, approve it, verify Cloudflare Worker URL, then attach `registry.aether-ui.dev` and smoke-check production.

### Checkpoint 2026-11-21 — CF-01 registry Worker preview deployed

- Milestone: M0 / CF-00 verified, CF-01 preview deployment operational (production domain still pending).
- Source: PR #29 merged to `main` at `1d227aff020738513cdfc70e33216d69fdcdeb55`.
- Deployment evidence: CircleCI [pipeline #11](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/11/details?useNewPipelines=true) ran `verify`, `approve_registry_preview`, and `deploy_registry` after explicit operator approval. The user reported the pipeline green.
- Live preview: [`https://aether-ui-registry.hi-5be.workers.dev/`](https://aether-ui-registry.hi-5be.workers.dev/). The browser rendered the public Aether UI Registry homepage. The deployment workflow includes `node scripts/smoke-registry.mjs` for JSON, CORS, cache-control, `llms.txt`, root, and 404 assertions. These checks were not independently re-run from this documentation session.
- State: **CF-01 preview deployed**, not complete. `registry.aether-ui.dev` Custom Domain not yet verified; published npm CLI installation from the production URL and M0-08 external acceptance remain pending.
- Next: inspect existing DNS records before adding the `registry.aether-ui.dev` Worker Custom Domain; verify TLS, JSON, headers, 404, live CLI installation and rollback. Avoid enabling independent Cloudflare Builds or GitHub Actions.

### Checkpoint 2026-11-21 — Cloudflare Worker Custom Domains observed

- Infrastructure: Cloudflare Workers Static Assets + CircleCI; no Vercel or GitHub Actions deployment path. Operational instructions: [deployment README](../deployment/README.md).
- CF-01: PR #29 merged at `1d227aff`; approved [CircleCI pipeline #11](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/11/details?useNewPipelines=true) deployed `aether-ui-registry`; preview homepage loaded, owner confirmed JSON, and Cloudflare DNS showed a Worker mapping for `registry.aether-ui.dev`.
- CF-02: PR #31 merged at `dd9e3c6`; approved [CircleCI pipeline #20](https://app.circleci.com/pipelines/gh/bogdanmartinescu/aetherstack/20/details?useNewPipelines=true) deployed `aether-ui-docs`; Cloudflare's Worker dashboard listed `aether-ui.dev` as a Custom Domain and the production `/components/tooltip/` page rendered in the browser.
- CI: deployment jobs are opt-in (`deploy_registry`/`deploy_docs` default `false`), require passing `verify` and distinct manual approval, use the restricted `aether-cloudflare-deploy` context and Wrangler 4.165.0. The separate npm release gate remains restricted.
- DNS: previous custom-domain attachment error from externally managed A/AAAA/CNAME was resolved by the latest visible dashboard state; the exact DNS changes were not executed or audited in this documentation session. Do not remove unrelated DNS records, especially mail authentication or validation entries.
- Verified observation boundaries: connected browser loaded one production docs page; Cloudflare dashboard displayed the Custom Domain / Worker mapping. Complete independent production smoke output, published CLI clean-install result, Worker version IDs, performance/accessibility, and rollback evidence have **not** been supplied.
- Next actions: record production `node scripts/smoke-registry.mjs https://registry.aether-ui.dev`, `node scripts/smoke-docs.mjs https://aether-ui.dev`, and an actual published CLI install/build; only then re-evaluate M0-08/M0-10. CF-03 demo and CF-04 Studio are not deployed.

### Checkpoint 2026-11-21 — npm release preparation (CLI 0.1.3)

- Branch: `chore/release-cli-0.1.3`, based on `main` at `e345dc6` (PR #33 merged, CircleCI `verify` green).
- Changes: applied the pending Changeset by hand (the Changesets CLI was not runnable in this session): `@aetherstack/cli` 0.1.2 → 0.1.3, changelog entry, Changeset file removed. No other package versions changed.
- Static review (no install/build/test run in this session): all 151 registry items have unique names, AI metadata and existing source files; no source imports lack a declared dependency; CLI and MCP server bundle `@aetherstack/registry-schema` inline. Notes: `icons`, `registry-schema` and `themes` publish raw TypeScript (no build, no `publishConfig`), so consumers need a transpiler; `ui` declares `clsx`, `tailwind-merge` and `date-fns` without importing them.
- Required checks not run here: `verify-npm-packages.mjs --offline/--online`, consumer install, external published-CLI install. CircleCI `verify` on this PR is the first run.
- Status: PREPARED, NOT PUBLISHED. Publishing needs owner approval of `approve_npm_release`.
- Next: merge after green `verify`, run `publish_npm=true` on `main`, then record versions, job URL and an external clean-consumer install.

### Checkpoint 2026-11-21 — docs command and manual-source correction

- Branch: `docs/scoped-cli-and-manual-source`, based on `main` at `8ebb025`.
- Finding: about 156 docs pages, the package READMEs, `docs/components.md` and the `llms.txt` generator told users to run `npx aether-ui ...`, but the CLI is published only as `@aetherstack/cli` (see the npm release runbook). All occurrences now read `npx @aetherstack/cli ...`; the two checked-in `llms.txt` copies were edited to match the generator and should be confirmed by CI's artifact-currency check.
- Finding: 13 component pages (carousel, chart, date-picker, dialog, dropdown-menu, input-group, input-otp, menubar, navigation-menu, resizable, sheet, sidebar, toast) showed truncated "manual install" source. They now use the item's real source from `apps/registry-public/public/r/<name>.json` through the existing static-import module `apps/docs/src/lib/registry-source.ts` (works in client pages; imports of `@aetherstack/utils` are rewritten to `@/lib/utils` for display).
- Added accessibility notes for `model-badge` and `prompt-suggestion`.
- Not verified here: `pnpm build`, lint, typecheck and the docs output check have not run in this session; CircleCI `verify` on the PR is the first run.
- Open: runtime messages in `@aetherstack/cli` and `@aetherstack/mcp-server` still print bare `aether-ui add ...`; changing them needs a package release. Six patterns (filter-toolbar, form-field, metric-card, section-header, settings-section, table-toolbar) have no accessibility notes.

### Checkpoint 2026-11-21 — Code block syntax highlighting

- Branch: `feat/code-syntax-highlighting`. Added a dependency-free tokenizer to the `code-block` registry item (`packages/ui/src/components/ai/code-block.tsx`, languages: ts/tsx/js/jsx, json, bash, css). Colours come from `--code-*` HSL variables with built-in light/dark fallbacks; palette contrast ≥ 4.5:1 on `bg-muted` computed by script (not a browser/axe run).
- Docs `CodeBlock` reuses `HighlightedCode` from `@aetherstack/ui` and infers the language from `lang`, `filename` (`terminal`, extension) or the code.
- `code-block.json` and the aggregate `registry.json` were updated by hand from the source (round-trip checked); `build-registry` was not run. `@aetherstack/ui` gains new exports (`HighlightedCode`, `highlightCode`) but no changeset is added, so a package release still needs one.
- Not run here: build, typecheck, Vitest, visual check. CircleCI `verify` is the first real check.
