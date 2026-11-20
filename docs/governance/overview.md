# Governance overview

Aetherstack / Aether UI is maintained as an open-source design-system monorepo under the MIT
license. This document records how decisions are made while the project is still primarily
maintainer-driven.

## Roles

| Role | Responsibility |
| --- | --- |
| Maintainer (repository owner) | Merge authority, releases, npm publish, domain/CDN, commercial gates (M4/M6) |
| Contributors | PRs against documented standards; no direct pushes to `main` |
| Agents / automation | Follow [`AGENTS.md`](../../AGENTS.md); never invent completion or publish without authority |

## Decision process

1. **Engineering standards** in [`docs/architecture/engineering-standards.md`](../architecture/engineering-standards.md) bind day-to-day code.
2. **Roadmap sequencing** is governed by [`ROADMAP.md`](../../ROADMAP.md) and the task backlog in
   [`docs/roadmap/platform-backlog.md`](../roadmap/platform-backlog.md). Execution status is recorded
   in [`docs/roadmap/execution-state.md`](../roadmap/execution-state.md).
3. **Architectural changes** should land with an ADR under `docs/architecture/` (or an equivalent
   design note) when they affect package boundaries, registry contracts, or distribution.
4. **Commercial / Cloud work** (M4 implementation beyond discovery, M6) requires explicit owner
   approval and demand evidence — see `AGENTS.md`.

## Releases

- User-facing package changes require a Changeset.
- Publishing to npm and deploying production CDN endpoints require maintainer authorization.
- Immutable registry artefacts must not be silently rewritten; prefer new versions and aliases
  (see future M2 versioning ADR).

## Conduct and security

- [`CODE_OF_CONDUCT.md`](../../CODE_OF_CONDUCT.md)
- [`SECURITY.md`](../../SECURITY.md)

## Sponsorship

GitHub Sponsors / `FUNDING.yml` is **not** enabled until a verified sponsorship account exists.
A draft proposal for the owner lives in [`sponsorship-proposal.md`](sponsorship-proposal.md).
