# Aether UI platform roadmap — 2027

Status: proposed development program, initialized 2026-11-20. Dates are target windows, not promises. [Backlog](docs/roadmap/platform-backlog.md) is the execution order; [state](docs/roadmap/execution-state.md) is the checkpoint. Existing phases 1–7.5 remain historical records; their unfinished registry, CDN, versioning and documentation obligations are included in M0/M2 below. Historical Pro phases 8–9 are deferred until M4 approval.

## Milestones and dependencies

| Milestone | Target window | Scope | Gate |
| --- | --- | --- | --- |
| M0 | Nov–Dec 2026 | Baseline audit, licensing, complete registry, production docs, distribution & CI | Clean external install, verified live registry, honest inventory |
| M1 | Jan–Feb 2027 | Modern compatibility, shadcn interoperability, showcase apps, MCP/skills, public launch readiness | Full supported matrix + documented demo + submissions ready |
| M2 | Mar–Apr 2027 | Versioned registry, lockfile, diff/update/migration, machine-readable recipes | Safe source lifecycle + deterministic tested feature installation |
| M3 | May–Jul 2027 | Doctor, richer MCP/agent tools, evaluation benchmarks, Core stability | Verified diagnostics, reproducible evaluation, release-ready Core 1.0 candidate |
| M4 | May–Aug 2027, gated | Premium SaaS and AI kits; sponsorships and demand validation | Explicit owner approval and demonstrated willingness to pay |
| M5 | Jul–Sep 2027 | Studio theme editor, block and recipe composition, export | Round-trip token/export validation, evidence of usage |
| M6 | Sep–Nov 2027, gated | Private registries, organizational policies, hosted Cloud pilot | 5 interested teams, approval/budget, 3 paid pilot orgs and secure tenant isolation |
| M7 | Ongoing | Maintenance, growth, support, governance | Monthly quality review and quarterly evidence-driven roadmap |

M0 -> M1 -> M2 -> M3 -> M5 is the public engineering critical path. M4 discovery may run alongside public work; M4 paid implementation and M6 require explicit approval. M6 depends on stable registry/Doctor/Studio contracts and demand, not on a calendar date. M7 begins immediately and recurs.

## Feature scope and completion
- Core: validated primitives, patterns, blocks, token/theme compatibility, responsive and accessible states; prioritize gaps in forms, data tables, navigation, file management, collaboration, admin permissions, AI streaming/citations/tool calls and internationalization.
- CLI: init/list/add/generate stabilization; search/info, version pins, lockfile, diff/update/remove/migrate, recipe, doctor, theme, registry commands; dry-run, conflicts and rollback.
- AI: structured metadata, local MCP, client setup, public skills, project context, recipe/search/plan/validation tools; deterministic composition independent of LLM provider.
- Recipes: SaaS, AI, CRM, commerce, analytics, admin, booking and developer tools; 20 by midyear, 40 stretch by year-end, never count untested entries.
- Doctor: dependency/configuration, token and deprecated API checks; actionable findings, scoped fixes, JSON reports and CI mode. Do not claim static detection proves accessibility compliance.
- Studio: playground, theme editor, responsive preview, existing-block composition, export, recipe editing. No general-purpose site builder.
- Pro: two complete premium frontend kits first; additional kits conditional. Cloud: private registry and governance infrastructure only after validation.
- Public launch: docs, examples, npm metadata, shadcn directory compatibility, official MCP registry, skills distribution, developer outreach.

## Governance
Use 15–20 hours/week planning assumption, 35% feature work, 25% maintenance, 20% AI/validation, 10% docs, 10% growth. Weekly triage; monthly minor release as justified; patch/security releases as needed, quarterly strategy review. Use semantic versioning and Changesets. Scope can change through documented ADR or owner decision; never silently redefine completion.

## First actions
Read GOAL.md and AGENTS.md, begin M0-01. Do not assume counts, deployment, npm versions or previous tests are current. All newly proposed implementation tasks start TODO or gated.
