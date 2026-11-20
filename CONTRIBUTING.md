# Contributing to Aetherstack

Thanks for your interest in Aetherstack / Aether UI. This document covers the minimum you need to
work in the repo. The full quality bar lives in
[`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) — treat
that as the source of truth.

Agent and milestone sequencing live in [`AGENTS.md`](AGENTS.md), [`GOAL.md`](GOAL.md),
[`ROADMAP.md`](ROADMAP.md), and [`docs/roadmap/execution-state.md`](docs/roadmap/execution-state.md).

## Dev Setup

Prerequisites (must match root `package.json` `engines`):

- Node.js **20+**
- pnpm **9+** (repo pins `pnpm@9.1.0` via `packageManager`)

```bash
pnpm install          # install all workspace deps
pnpm install-hooks    # install git hooks (auto-bumps version on commit)
pnpm dev              # run all apps in parallel (docs / studio / demo / registry-public)
pnpm typecheck        # type-check the whole workspace
pnpm lint             # lint the whole workspace
pnpm test             # run package tests
pnpm build            # build everything
```

`pnpm install-hooks` is a one-time per-clone step that wires up the workspace
git hooks under `.git/hooks/`. The current pre-commit hook auto-increments the
root `package.json` patch version on every commit; without it, your version
will fall behind the rest of the team.

Useful scoped commands:

```bash
pnpm --filter @aetherstack/ui test
pnpm --filter @aetherstack/cli build
pnpm --filter docs dev
```

Registry and CLI:

```bash
pnpm --filter @aetherstack/scripts validate-registry   # validate registry/*/registry.json
pnpm --filter @aetherstack/scripts build-registry      # emit apps/registry-public/public/r + llms.txt
pnpm consumer-install                                  # pack + Next/Vite clean-install fixtures (M0-07)
pnpm --filter @aetherstack/cli test                    # includes local registry integration
```

## Branching

- Short-lived branches off `main` (or the current task stack base — see `execution-state.md`).
- Name them descriptively: `feat/token-system`, `fix/button-focus-ring`, `docs/roadmap-phase-2`, `chore/m0-09-governance`.
- Rebase or merge `main` often; squash-merge PRs into `main`.
- Do not commit directly to `main`.

## Commit Messages

Use Conventional Commits:

- `feat: add dialog primitive`
- `fix: correct button focus ring in dark mode`
- `docs: clarify registry format compatibility`
- `chore: bump tsup to 8.1`
- `refactor: extract variant helper from button`
- `test: add a11y tests for tabs`
- `ci: add registry validation step`

Keep the subject under ~72 characters. Put the _why_ in the body when it isn't obvious.
Reference backlog task IDs when applicable (e.g. `feat(M0-07): …`).

## Pre-PR Checklist

Before opening a PR:

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes for affected packages
- [ ] `pnpm build` passes when packages/apps change
- [ ] Registry changes: `validate-registry` + `build-registry` with no stale artefact diff
- [ ] Distribution changes: `pnpm consumer-install` when pack/export behaviour changes
- [ ] Tests added/updated where logic or regression risk justifies it
- [ ] Docs updated if you changed a public API, package boundary, or architectural decision
- [ ] No cross-layer leaks (see the dependency rules in [`CLAUDE.md`](CLAUDE.md))
- [ ] Changeset added for user-visible package changes (`pnpm changeset`)

## Security

Report vulnerabilities privately — see [`SECURITY.md`](SECURITY.md). Do not open public issues
for undisclosed security problems.

## Governance

Project decision-making and maintainer expectations are summarized in
[`docs/governance/overview.md`](docs/governance/overview.md). Conduct expectations are in
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Where to Look Next

- [`docs/roadmap/platform-backlog.md`](docs/roadmap/platform-backlog.md) — executable task backlog
- [`docs/roadmap/execution-state.md`](docs/roadmap/execution-state.md) — current checkpoint
- [`docs/architecture/overview.md`](docs/architecture/overview.md) — repo layout, dependency graph, naming glossary
- [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) — the full quality bar
- [`docs/product/positioning.md`](docs/product/positioning.md) — product vision and audience

If your change spans more than one milestone or touches the public contract of a shared package,
please open an issue first so we can agree on the shape before you invest time in the implementation.
