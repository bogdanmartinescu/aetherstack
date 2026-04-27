# Product Positioning

## What is Aether UI?

**Aether UI** is a premium open-code design system purpose-built for:
- SaaS dashboards
- Admin interfaces
- Internal tooling
- B2B application UIs

It is not a general-purpose component library. Every design decision is optimized for
**dense, data-rich, professional interfaces** — not marketing sites or consumer apps.

Aether UI uses a registry format compatible with the shadcn/ui convention, but ships its own CLI
and installer. It does not depend on the shadcn CLI and is not built on top of shadcn/ui — the two
are independent products that share a registry-JSON shape.

---

## The Problem It Solves

Building a high-quality SaaS dashboard from scratch is expensive and repetitive.
Existing solutions fall into two categories:

1. **Raw shadcn/ui** — great primitives, but no opinionated composition layer.
   Teams assemble their own patterns from scratch every time.

2. **Closed component kits** — polished, but locked-in and not customizable.
   You can't own the code or adapt it to your design language.

Aether UI sits in the gap: **open-code components with a strong opinionated
design language**, installable via the Aether UI CLI and fully owned by the
consuming team.

---

## Who Is It For?

**Primary audience:**
- Indie hackers and solo developers building SaaS products
- Small product teams who want a professional baseline fast
- Developers who appreciate clean, maintainable, well-structured component code

**Secondary audience:**
- Design systems engineers who want a reference for shadcn-based systems
- Teams evaluating or migrating away from closed component kits

---

## Positioning Statement

> Aether UI is the design system for serious SaaS builders who want premium
> quality without vendor lock-in. Open code, its own CLI, and a shadcn-compatible
> registry format. Fully composable. Ready for production from day one.

---

## Registry Tiers

### Public Registry (`@aether`)
- Free, open-source
- Core UI primitives, common patterns, starter blocks
- Installable via the Aether UI CLI: `npx @aetherstack/cli add [component]`

### Pro Registry (`@aether-pro`) — Future
- Premium blocks and full page templates
- Advanced dashboard patterns (data grids, KPI cards, analytics)
- License-gated, per-project or team subscription
- Same code-ownership model — you get the source

Both tiers install through the same `aether-ui` CLI using a single `aether.json` config;
the pro tier just points at a license-gated registry URL.

---

## Design Language

Aether UI uses a violet-primary color system with neutral grays and clean
typography. The aesthetic is:
- **Professional, not flashy**
- **Dense but readable**
- **Dark-mode native**
- **System-font first, with Inter as the fallback**

The design language is encoded in `@aetherstack/tokens` as CSS variables,
making it trivially overridable per project.

---

## Differentiation from Competitors

| | Aether UI | shadcn/ui | Tremor | MUI |
|---|---|---|---|---|
| Open code | ✓ | ✓ | ✓ | ✗ |
| Registry-based install | ✓ | ✓ | ✗ | ✗ |
| SaaS-focused | ✓ | ✗ | ✓ | ✗ |
| Full blocks | ✓ (pro) | ✗ | partial | ✗ |
| Premium tier | ✓ | ✗ | ✓ | ✓ |
| Monorepo design system | ✓ | ✗ | ✗ | ✓ |
