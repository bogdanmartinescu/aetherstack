# Execution state — persistent agent checkpoint

Initialized 2026-11-20. No implementation or release checks have been run as part of this planning change. Historical completion claims are not verified here.

- Active milestone: M0 — truth, stability and public distribution.
- Last completed task: M0-08 deploy workflow + release publish gate (PR #22).
- Next task: owner enables `ENABLE_REGISTRY_DEPLOY` + Vercel secrets; fix npm org publish rights; dispatch Release; re-run `pnpm m0-rc-verify`. Parallel: docs route gap fix in flight.
- Baseline reviewed: `main` at `13f4c46`. Live registry still 404 `DEPLOYMENT_NOT_FOUND` (rechecked 2026-11-20).
- Known prior observations (reverify): CDN BLOCKED; npm Release job E404 on `@aetherstack/*` PUT (org/token). Workspace versions ahead of npm (e.g. ui local 0.5.x vs npm 0.4.0).
- Commercial status: M4 discovery only; paid kit implementation and M6 require explicit owner approval and demand evidence.
- Publishing status: no release or external submission authority granted by this plan.

## Task ledger

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
- Status: IN_PROGRESS until PR merges.
- Next: owner CDN/npm gates unchanged.

## Phase gate log

Record milestone, all required task IDs, exact suite/results, known limitations, remaining blockers and owner decisions. No milestone marked completed until all applicable requirements are verified. On restart inspect git history and reconcile this file rather than blindly redoing work.

### Phase gate — M0 (partial, 2026-11-20)

- Required tasks M0-01..M0-10: local engineering on `main` via PR #17; M0-08 live deploy BLOCKED; M0-10 external npm/CDN BLOCKED.
- Suite: see `docs/roadmap/audits/m0-10-rc-verification.md` (HEAD at run: `eb3628c`; report regenerated after typecheck fix).
- Milestone exit: **not satisfied** until live `registry.aether-ui.dev` returns 200 for `/r/registry.json` and authorized publish path is verified.
