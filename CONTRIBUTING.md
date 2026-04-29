# Contributing to Aetherstack

Thanks for your interest in Aetherstack / Aether UI. This document covers the minimum you need to
work in the repo. The full quality bar lives in
[`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) — treat
that as the source of truth.

## Dev Setup

Prerequisites:
- Node.js 18+
- pnpm 9+

```bash
pnpm install          # install all workspace deps
pnpm install-hooks    # install git hooks (auto-bumps version on commit)
pnpm dev              # run all apps in parallel (docs / studio / demo / registry-public)
pnpm typecheck        # type-check the whole workspace
pnpm lint             # lint the whole workspace
pnpm build            # build everything
```

`pnpm install-hooks` is a one-time per-clone step that wires up the workspace
git hooks under `.git/hooks/`. The current pre-commit hook auto-increments the
root `package.json` patch version on every commit; without it, your version
will fall behind the rest of the team.

Useful scoped commands:

```bash
pnpm --filter @aetherstack/ui dev
pnpm --filter @aetherstack/cli build
pnpm --filter docs dev
```

Registry and CLI:

```bash
pnpm validate:registry                       # validate registry/*/registry.json
pnpm build:registry                          # copy public manifest to apps/registry-public
pnpm --filter @aetherstack/cli dev -- list   # run the CLI from source (tsx)
```

## Branching

- Short-lived branches off `main`.
- Name them descriptively: `feat/token-system`, `fix/button-focus-ring`, `docs/roadmap-phase-2`.
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

## Pre-PR Checklist

Before opening a PR:

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] Tests added/updated where logic or regression risk justifies it
- [ ] Docs updated if you changed a public API, package boundary, or architectural decision
- [ ] No cross-layer leaks (see the dependency rules in [`CLAUDE.md`](CLAUDE.md))
- [ ] Changeset added for user-visible package changes (`pnpm changeset`)

## Where to Look Next

- [`docs/roadmap/build-plan.md`](docs/roadmap/build-plan.md) — current phase, deliverables, and acceptance criteria
- [`docs/architecture/overview.md`](docs/architecture/overview.md) — repo layout, dependency graph, naming glossary
- [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) — the full quality bar
- [`docs/product/positioning.md`](docs/product/positioning.md) — product vision and audience

If your change spans more than one phase or touches the public contract of a shared package, please
open an issue first so we can agree on the shape before you invest time in the implementation.
