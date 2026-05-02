# Product Positioning

## What is Aether UI?

**Aether UI** is a premium open-code design system built for:
- SaaS dashboards and admin interfaces
- Marketing and landing pages
- Internal tooling and B2B application UIs
- AI-powered applications (chat interfaces, agent workspaces, prompt builders)

It ships a layered architecture — primitives, patterns, and blocks — across a public registry with
AI-native metadata and an MCP server for agent integration. Every design decision is optimized for
**serious, maintainable, production-quality web products**.

Aether UI uses a registry format compatible with the shadcn/ui convention, but ships its own CLI
and installer. It does not depend on the shadcn CLI and is not built on top of shadcn/ui — the two
are independent products that share a registry-JSON shape.

---

## The Problem It Solves

Building a high-quality web product from scratch is expensive and repetitive.
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
- Indie hackers and solo developers building SaaS products or AI applications
- Small product teams who want a professional baseline fast
- Developers who appreciate clean, maintainable, well-structured component code

**Secondary audience:**
- Design systems engineers who want a reference for shadcn-based systems
- Teams evaluating or migrating away from closed component kits
- AI engineers building LLM-powered interfaces (chat, agent, prompt UIs)

---

## Positioning Statement

> Aether UI is the design system for serious builders who want premium quality without vendor
> lock-in. Open code, its own CLI, AI-native metadata, and a shadcn-compatible registry format.
> Fully composable. Ready for production from day one.

---

## Registry Tiers

### Public Registry (`@aether`)
- Free, open-source
- 65 UI primitives (including 14 AI-native), 39 patterns (including 10 AI-native), 34 blocks (including 9 AI-native)
- Installable via the Aether UI CLI: `npx @aetherstack/cli add [component]`
- All items carry AI metadata; consumable via the MCP server

### Pro Registry (`@aether-pro`) — Future
- Premium blocks and full page templates
- Advanced vertical kits (SaaS, CRM, Billing, Analytics, AI App)
- License-gated, per-project or team subscription
- Same code-ownership model — you get the source

Both tiers install through the same `aether-ui` CLI using a single `aether.json` config;
the pro tier just points at a license-gated registry URL.

---

## AI-Native Differentiation

Aether UI is the first design system built with LLMs as a primary consumer alongside human
developers:

- **AI metadata on every item** — `intent`, `prompts`, `composition`, `slots` fields on every
  registry entry let AI agents understand what components do and how to compose them
- **`llms.txt`** — machine-readable component index with install commands, composition recipes,
  and canonical prompt patterns
- **MCP server** (`@aetherstack/mcp-server`) — stdio MCP server with `list_components`,
  `get_component`, `install_component`, and `compose_block` tools
- **Prompt-driven CLI** — `aether-ui generate "make me a SaaS dashboard"` resolves component
  selections and writes a starter `page.tsx`
- **AI-native UI primitives** — `StreamingText`, `PromptInput`, `ChatBubble`, `MarkdownRenderer`,
  and 10 more primitives built for chat and agent interfaces
- **AI-native patterns and blocks** — `ConversationThread`, `ChatLayout`, `AgentWorkspace`,
  `AIAssistantPanel`, and more, all SDK-agnostic

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
| Marketing blocks | ✓ | ✗ | ✗ | ✗ |
| AI-native UI primitives | ✓ | ✗ | ✗ | ✗ |
| MCP server | ✓ | ✗ | ✗ | ✗ |
| LLM-readable metadata | ✓ | ✗ | ✗ | ✗ |
| Full blocks (public) | ✓ | ✗ | partial | ✗ |
| Premium tier | ✓ (future) | ✗ | ✓ | ✓ |
| Monorepo design system | ✓ | ✗ | ✗ | ✓ |
