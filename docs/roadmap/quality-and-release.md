# Quality, release and continuous maintenance policy

Use existing engineering standards as baseline. Do not change scripts merely to make checks pass. Inspect actual root/package scripts before running; record exact commands, versions and exit status. At baseline establish pnpm install --frozen-lockfile with documented Node/pnpm versions, pnpm lint, pnpm typecheck, pnpm test, pnpm build, pnpm format:check, registry validation/build through actual tooling scripts. Some checks may need setup; a missing required script becomes an implementation task, not fabricated success.

## Required verification matrix

- All changes: git diff --check, targeted review, applicable formatting; docs-only changes verify Markdown links and task dependency references.
- Shared runtime code: strict TS, lint, relevant Vitest/React Testing Library behavior tests; build affected and consuming packages.
- Registry/CLI/MCP: deterministic generator, schema/graph/path/security tests, npm pack artifacts installed outside workspace, real CLI and stdio tests, invalid/offline/error cases; ensure generated docs and manifests match.
- UI/recipes: responsive narrow/wide viewports, light/dark themes, meaningful loading/empty/error/success states, keyboard/focus and axe checks plus manual accessibility review (WCAG 2.2 AA target, no blanket compliance claim), Playwright functional/visual fixtures. Test declared framework matrix, regression snapshots reviewed not blindly updated.
- Source upgrades: local edits preserved, conflicts preview, traversal/symlink rejection, idempotent dry-run, rollback and failure recovery.
- Cloud/commerce: threat model, tenant negatives, auth/revoke, storage/cache isolation, webhooks, privacy, rate limits, backup/restore and cost alerts; sandbox before live service.
- Benchmark: fixed task and scoring, comparable repeated runs, actual output/test evidence, no invented results.

## Component DoD

Correct package and export; semantic tokens and consistent API; strict TS; declared dependencies; registry/AI metadata; docs/example; accessible interactions and responsive states; tests; clean consumer install; appropriate changeset; no outstanding critical regressions. Recipe additionally needs schema, dependency plan, adapters and states, reproducible build. Feature acceptance criteria from backlog must pass.

## Release pipeline

PR -> static checks -> targeted/full tests -> framework matrix -> UI regression/accessibility -> npm pack and clean install -> registry artifact validation -> Changesets/changelog/migrations -> review -> authorized release -> verify actual npm/CDN/docs/MCP artifact. Use protected release workflow, trusted npm publishing and provenance where supported; never leak credentials. Keep dev/preview and production separate. Publish only after authorization; record release versions and verification. If failure, stop rollout; follow documented revert/deprecation and registry alias rollback without mutating immutable artifacts.

## Continuous cycle

Mon plan/triage (2h), Tue core (3h), Wed AI/recipes (3h), Thu quality (3h), Fri docs/release (3h), Sat community (3h). Weekly patch as needed; monthly minor, security promptly, major only with documented migration. Review dependency advisories, stale artifacts, accessibility regressions and installation experience. Maintain issue/PR links, state and metrics; select next task by impact and evidence, not arbitrary count. For new work record ID, scope, dependencies and explicit tests.
