# Aetherstack Build Plan

Status: Phases 1–7.5 code complete · npm packages published at 0.1.0 · Phase 7 remaining items (CDN, versioning, CLI update/diff) + Phase 7.5 Track E (registry/docs/tests) pending
Project: Aetherstack
Design system: Aether UI

## Purpose

This document is the implementation roadmap for Aetherstack. It defines the build phases, expected deliverables, acceptance criteria, and sequencing for turning the current monorepo foundation into a production-grade, AI-native design system and registry product.

Phases 1–4 are complete and committed. Phase 4.6 is a stabilization sprint (see [the audit & stabilization plan](../../.cursor/plans/aetherstack_quality_stabilization_ea20042a.plan.md)) that tightens the truth-floor of what's already shipped before the AI-native expansion in Phase 5+.

---

## Product Goal

Aetherstack is the umbrella product and monorepo for **Aether UI**, a premium open-code design system and registry for any modern web product — SaaS dashboards, marketing sites, e-commerce, portfolios, internal tools, and beyond. Its registry format is compatible with the shadcn/ui convention, but it ships its own CLI (`aether-ui`), AI metadata, and an opt-in MCP server, and is independent of the shadcn CLI.

The system supports:

- public design-system primitives, patterns, and blocks
- a public installable registry consumed via a first-party CLI
- a future premium registry behind auth + license gating
- AI-native metadata so LLMs can generate, modify, and reason about Aether UI components
- documentation, demos, and examples that match the shipped reality
- a maintainable commercial-grade monorepo architecture

---

## Guiding Principles

1. Build foundations before breadth.
2. Prefer consistency over novelty.
3. Keep boundaries strict between tokens, primitives, patterns, blocks, and AI metadata.
4. Optimize for installability and maintainability, not just visual polish.
5. Keep the public system high quality enough to drive trust.
6. Reserve premium value for deeper blocks, complete shells, themes, and vertical kits.
7. Ship each phase with clear acceptance criteria.
8. Truth in docs: every claim is verifiable in CI before it appears in user-facing docs.

---

## Phase Overview

| Phase | Name | Goal |
|------|------|------|
| 1 | Foundation | Monorepo base, package structure, apps, docs scaffolding |
| 2 | Token System | Design tokens, theme contract, CSS variables, base semantics |
| 3 | Core Primitives | Stable foundational components for forms, layout, and interaction |
| 4 | App Patterns | Reusable product-level UI patterns + first 3 blocks (Dashboard Shell, Login, Signup) |
| 4.6 | Quality, Truth & Coverage | Reality stabilization — registry truth, reference apps, test coverage, CI hardening ✅ |
| 5 | AI Foundations | LLM-friendly metadata, `llms.txt`, MCP server, prompt-driven CLI flow ✅ |
| 6 | Component Gap-Fill | Net-new primitives, patterns, and blocks chosen by SaaS/AI value ✅ |
| 7 | Public Registry Hardened | Production-ready public registry, install flows, CDN, versioning (npm ✅) |
| 7.5 | Component Completeness | Full shadcn parity + marketing blocks + SaaS patterns + AI-native UI — code complete ✅ |
| 8 | Pro Architecture | Auth, license gating, premium namespace, billing flow |
| 9 | Pro Content + Launch | Vertical kits (CRM, Billing, Analytics), AI Recipes Pro, public launch |

---

# Phase 1 — Foundation

Status: Complete

## Goal
Create the monorepo base and product scaffolding.

## Delivered
- root monorepo structure (pnpm workspaces + Turborepo)
- shared config packages (`config-typescript`, `config-eslint`, `config-tailwind`)
- app scaffolds (`docs`, `studio`, `demo`, `registry-public` with static export)
- package scaffolds (`tokens`, `ui`, `patterns`, `blocks`, `themes`, `icons`, `utils`)
- registry packages (`registry-schema` with Zod types, `registry-build` helpers)
- registry placeholders for `@aether` (public) and `@aether-pro` (premium)
- `@aetherstack/cli` with `init`, `add`, and `list` commands, bundled via `tsup`
- `aether.json` consumer config contract
- validation + build scripts (`validate-registry`, `build-registry`) in `tooling/scripts`
- engineering standards doc, AI working rules (`CLAUDE.md`), product positioning, architecture overview
- roadmap/docs foundation

## Exit Criteria — all met
- repo installs cleanly
- apps run
- packages resolve
- TypeScript boundaries are working

---

# Phase 2 — Token System

Status: Complete

## Delivered
- semantic color system + base neutral palette + accent palettes
- typography, spacing, radius, shadow, motion scales
- CSS variable contract with light/dark theme support
- token exports for package consumption
- 26 vitest cases covering token shape, palette structure, and semantic mapping
- docs for token usage in `apps/docs/src/app/(docs)/tokens`

## Acceptance Criteria — all met
- tokens are defined centrally and consumed consistently
- no primitive hardcodes visual values that should come from tokens
- theme switching is structurally supported
- token naming is stable and semantically meaningful

---

# Phase 3 — Core Primitives

Status: Complete

## Delivered
- 16 primitives in `packages/ui/src/components/`: Badge, Button, Card, Checkbox, Dialog, Input, Label, Radio Group, Select, Sheet, Skeleton, Switch, Table, Tabs, Textarea, Tooltip
- shared variant conventions, accessibility pass, docs examples per component
- 56 vitest cases covering default render, variants/sizes, disabled state, keyboard interaction
- visual sanity in `apps/studio` for each primitive

## Phase 3 Extras (delivered beyond spec)

### Infrastructure
- **Next.js 16.2.4** (Turbopack-enabled) across all four apps
- **npm publishing pipeline** via `tsup` for `@aetherstack/ui`, `@aetherstack/tokens`, `@aetherstack/utils`
- **CI (GitHub Actions)** with parallel Typecheck/Lint, Test, and Build jobs
- **PR template** + `develop` branch model

### Documentation (apps/docs)
| Route | Content |
|-------|---------|
| `/introduction` | shadcn/ui-style intro: design principles, architecture layers, tech stack, quick-start, comparison table |
| `/installation` | Setup for Next.js App Router, Pages Router, Vite + React, Remix, Astro, TanStack Start |
| `/cli` | Full CLI reference: `init`, `add`, `diff`, `update`, `list`, `aether.json` schema |
| `/tokens` | Design token reference |
| `/icons` | Lucide React integration: 80+ icon reference grid, a11y notes |
| `/fonts` | 6-font catalog with live UI demo |
| `/components` | Component index with category grouping |
| `/components/[slug]` | Individual pages for all 16 primitives |
| `/blocks` | Block gallery (Dashboard / Login / Signup) |
| `/charts` | Recharts integration with 4 live chart examples |
| `/patterns` | Pattern index + per-pattern pages |

### Theme + font system
- `next-themes` light/dark/system toggle
- 6 curated Google Fonts swappable via `data-font` attribute on `<html>`, FOUC-prevention inline script

---

# Phase 4 — App Patterns + First Blocks

Status: Complete

## Delivered

### Patterns (packages/patterns)
12 patterns in 9 source files: **FormField** (+ FormLabel, FormControl, FormDescription, FormMessage, useFormField), **PageHeader** (+ Breadcrumb), **SectionHeader** (+ SettingsSection), **EmptyState**, **LoadingState**, **ErrorState**, **MetricCard**, **TableToolbar** (+ FilterToolbar, FilterPill), and **NavItem** / **NavGroup** / **SidebarNav**.

85 vitest cases covering composition contracts, slots, props, error states, and a11y attributes.

### First three blocks (packages/blocks)
- **DashboardShell** — collapsible sidebar, topbar with search/notifications, content slot
- **LoginBlock** — email + password form with validation, optional split-panel layout
- **SignupBlock** — name + email + password form with validation and terms/privacy links

## Acceptance Criteria — all met
- patterns depend on primitives, not parallel implementations
- pattern APIs feel product-oriented and reusable
- docs explain where patterns and blocks should be used
- demo and studio consume patterns and blocks (post-Phase-4.6)
- no pattern duplicates logic that belongs in primitives

---

# Phase 4.6 — Quality, Truth & Coverage

Status: Complete

## Goal
Close the gap between what the build plan claimed and what was actually shipped. Make every claim verifiable in CI before stacking new phases on top.

## Tracks (see [stabilization plan](../../.cursor/plans/aetherstack_quality_stabilization_ea20042a.plan.md) for full detail)

### Track A — Registry truth
- `registry/public/registry.json` populated with all 28 items (16 primitives + 9 patterns + 3 blocks)
- `registry/pro/registry.json` populated with two `pro: true` placeholders
- `tooling/scripts/build-registry.ts` emits one `r/<name>.json` per item alongside the aggregate manifest
- CLI integration test runs `init` + `add` against a fixture project in CI

### Track B — Reference app reality
- `apps/demo` rebuilt with `/dashboard`, `/users`, `/settings`, `/login` routes using `DashboardShell`, `LoginBlock`, real patterns, and recharts — no placeholder text
- `apps/studio` extended with Patterns and Blocks sections so the playground reflects everything we ship

### Track C — Test coverage
- Vitest suites added to `cli` (config / lib/registry / lib/installer + integration), `registry-schema`, `registry-build`, and `blocks`
- All workspace packages with logic now run in CI

### Track D — CI hardening
- Build job runs on every PR (no longer push-only)
- `validate-registry` + `build-registry` diff check enforce registry truth
- Changeset check fails on PRs that touch `packages/*/src/**` without a `.changeset/*.md`
- New test suites wired into the CI test job

### Track E — Cleanups & truth in docs
- `@aetherstack/icons` populated with custom AetherMark / AetherGlyph / AetherSpark / AetherStack icons on top of the lucide-react re-export
- Stray `console.log` removed from docs installation page
- Build plan rewritten (this file)
- Component counts on the introduction page sourced from `src/index.ts` exports at build time
- `pnpm install-hooks` callout added to `CONTRIBUTING.md`

## Acceptance Criteria
- `aether-ui add <any-shipped-item>` installs the file into a fixture project with no errors
- `apps/registry-public/public/r/` contains exactly N+1 JSON files (one per item plus the aggregate)
- `apps/demo` boots and shows three real routes plus `/login`
- `pnpm test` runs vitest in `cli`, `registry-schema`, `registry-build`, `blocks`, plus existing `tokens`, `ui`, `patterns` — all green
- A PR that modifies `packages/ui/src/components/button.tsx` without a changeset fails CI
- A PR that introduces a build error fails CI
- The introduction page no longer hard-codes "16 primitives"

---

# Phase 5 — AI Foundations

Status: Complete

## Goal
Make Aether UI the most LLM-friendly design system in the ecosystem. Treat AI agents as a primary consumer alongside human developers.

## Delivered

### AI Metadata (`packages/registry-schema`)
- `RegistryItemAi` schema added to `registryItemSchema`: `intent`, `prompts`, `composition`, `slots`
- All 28 public registry items carry an `ai` block
- `validate-registry` enforces AI metadata on all public items — CI rejects items missing it
- 8 new tests for the `registryItemAiSchema` and `registryItemSchema.ai` integration

### `llms.txt` (`apps/registry-public/public/llms.txt`)
- Generated by `build-registry.ts` on every build run
- Lists every item with install command, intent, slots, composition hints, and example prompts
- Includes quick-start, architecture overview, and canonical composition recipes
- CI stale-artefact check now covers `llms.txt` in addition to `apps/registry-public/public/r/`

### MCP Server (`packages/mcp-server`)
- `@aetherstack/mcp-server` — stdio MCP server using `@modelcontextprotocol/sdk`
- Tools: `list_components`, `get_component`, `install_component`, `compose_block`
- Bundled `registry.json` baked in at build time; overrideable via `AETHER_REGISTRY_URL` / `AETHER_REGISTRY_FILE`
- 11 vitest tests covering all five canonical recipes and keyword fallback resolution
- CI test job includes `@aetherstack/mcp-server`

### Prompt-Driven CLI (`packages/cli`)
- `aether-ui generate "<description>"` resolves to component `add` calls + a starter `page.tsx`
- `resolveGenerate` in `packages/cli/src/lib/generate.ts` covers 5 canonical recipes and 22 keyword rules
- `--dry-run` flag previews without writing files; `--no-starter` skips the starter file
- 8 new tests for `resolveGenerate` covering recipes, keywords, and edge cases

### Docs (`apps/docs/src/app/(docs)/llms/page.tsx`)
- `/llms` route documents: `llms.txt` URL, AI metadata schema, MCP server setup (Cursor + Claude Desktop), `generate` command, canonical recipes, and a copy-paste system prompt snippet
- "AI & LLMs" added to sidebar "Getting started" group

## Acceptance Criteria — all met
- An LLM can fetch `llms.txt` and produce a syntactically valid install plan for "make me a SaaS dashboard" ✓
- The MCP server exposes all four tools with correct schemas ✓
- AI metadata is required for new public-registry items (CI rejects items missing it) ✓
- The prompt-driven CLI resolves 5 canonical demo prompts deterministically ✓

## Notes
This is Aether UI's primary differentiation lever. Get this right before adding more components.

---

# Phase 6 — Component Gap-Fill

Status: Complete

## Goal
Bring the public surface to "good enough for any SaaS product" by filling gaps prioritized by SaaS frequency and AI-prompt frequency.

## Delivered

### Primitives
- DropdownMenu / ContextMenu (Radix popover backbone)
- Combobox (autocomplete select with search)
- Calendar / DatePicker
- Toast (notifications system)
- Avatar / AvatarGroup
- Progress / Slider
- ScrollArea
- Separator
- Accordion
- HoverCard
- Toggle / ToggleGroup
- Pagination

### Patterns
- DataTable (sortable, paginated, with column visibility)
- CommandPalette (⌘K searchable command surface)
- StatGroup (multi-metric dashboard row)
- Stepper / Wizard
- KanbanColumn
- ActivityFeed
- FileDropzone
- ColorPicker

### Blocks
- AccountSettings block
- BillingOverview block
- OnboardingChecklist block
- PricingSection block
- TeamSettings block
- NotificationCenter block
- EmptyDashboard block

## Acceptance Criteria
- Every new item ships with: source code in the right package, vitest tests, docs page, AI metadata, registry entry, per-item JSON output
- No primitive hardcodes visual values that belong in tokens
- All items installable end-to-end through the CLI
- Studio playground updated alongside each new item

## Notes
Quantity matters here — but not at the cost of consistency. Reject any item that breaks Phase 4 patterns or skips its acceptance gates.

---

# Phase 7 — Public Registry Hardened

Status: In progress — npm publish complete ✅

## Goal
Make the public registry production-quality: durable URLs, versioning, CDN delivery, and a polished install experience.

## Deliverables
- production registry domain (`registry.aether-ui.dev`) backed by a CDN
- per-item versioning with semver and `version` field; CLI prefers exact versions when pinned
- `aether-ui update` command upgrades installed items to their latest registry version
- `aether-ui diff` command shows changes between installed file and registry version
- `aether-ui registry list-namespaces` enumerates `@aether`, `@aether-pro`, and any third-party registries
- npm publish flow for `@aetherstack/cli` so `npx @aetherstack/cli init` works for end users ✅ (0.1.0 published)
- install-test harness expanded: clean Next.js, Vite, and Remix fixture projects in CI

## Acceptance Criteria
- A new user can run `npx @aetherstack/cli init && npx @aetherstack/cli add dashboard-shell` against the public CDN with zero local setup
- Every published item has a stable `/r/<name>@<version>.json` URL
- CI runs end-to-end install tests against three real frameworks
- Docs cover the full install + update + diff workflow

---

# Phase 7.5 — Component Completeness

Status: Code complete ✅ · Track E (registry/docs/tests) pending

## Goal

Reach full shadcn/ui component parity and add the marketing-site + SaaS utility blocks that make Aether UI usable for any web product — not just dashboards. After this phase the system should be "good enough for a complete commercial product" without any pro tier.

## Context

After Phase 6 the component inventory stood at **38 primitives · 17 patterns · 10 blocks**. Tracks A–D have been completed, bringing the total to **65 primitives (51 + 14 AI) · 39 patterns (29 + 10 AI) · 34 blocks (25 + 9 AI)**. Systematic comparison with shadcn/ui, common SaaS product requirements, and the AI-native product landscape identified four categories of gaps, all now addressed:

1. **Primitive gaps** — components that shadcn ships as primitives but we haven't yet built
2. **Pattern gaps** — higher-level compositions that appear in every real SaaS product
3. **Block gaps** — full page-section blocks needed for marketing sites, user profiles, and error handling
4. **AI-native UI gaps** — purpose-built components, patterns, and layouts for AI-powered apps (chat interfaces, agent workspaces, prompt builders, streaming output)

---

## Deliverables

### Track A — Missing Primitives (`packages/ui`)

**High priority** (shadcn parity):

- **ButtonGroup** — segmented/grouped button row with shared border treatment
- **Carousel** — Embla-based card/image slider with prev/next controls and dots
- **Chart** — standalone Recharts wrapper primitive (variant: Bar, Line, Area, Pie, Donut)
- **DatePicker** — Calendar + Popover composite (single date; DateRangePicker lives in patterns)
- **InputGroup** — Input with prefix/suffix slot addons (icon, text, or button)
- **InputOTP** — accessible one-time password / PIN input (built on `input-otp` library)
- **NavigationMenu** — full navigation menu with triggers, submenus, and keyboard support (Radix)
- **Sidebar** — standalone collapsible sidebar primitive (decoupled from DashboardShell)
- **Sonner** — modern opinionated toast built on `sonner` (complements existing Toast)

**Medium priority** (coverage completeness):

- **AspectRatio** — simple ratio-locking wrapper (Radix AspectRatio)
- **Menubar** — application-level menu bar (File, Edit, View…) (Radix Menubar)
- **Resizable** — split-pane resizable layout panels (react-resizable-panels)

### Track B — Missing Patterns (`packages/patterns`)

**High priority**:

- **DateRangePicker** — date range selection built on Calendar + Popover
- **MultiSelect** — checkbox-based multi-select with tag/chip display and search
- **SearchInput** — input with clear button, keyboard shortcut badge, and loading state
- **ConfirmDialog** — reusable confirmation / destructive-action dialog with slot for description
- **NotificationBell** — bell icon with unread-count badge + notification dropdown
- **ProfileDropdown** — user avatar + name + dropdown with nav links and sign-out

**Medium priority**:

- **InlineEdit** — click-to-edit text field with save/cancel controls
- **SortableList** — drag-and-drop sortable list (dnd-kit)
- **ThemeSwitcher** — light / dark / system toggle pattern
- **ChatMessageList** — chat bubble list with avatar, timestamp, and message grouping
- **UploadProgress** — file upload state with progress bar, filename, and cancel action
- **TimelineFeed** — vertical timeline with date markers and event entries

### Track C — Missing Blocks (`packages/blocks`)

**High priority** (marketing site completeness):

- **AppHeader** — full application top navigation bar with logo, nav links, and user menu
- **MarketingNavbar** — marketing site nav with logo, link group, CTA button, mobile hamburger
- **FooterSection** — site footer with multi-column link groups, social icons, copyright line
- **LandingHero** — hero section with headline, subheading, primary + secondary CTA, optional media
- **FeaturesSection** — features grid / alternating list with icon, title, and description per feature
- **TestimonialsSection** — customer quotes grid with avatar, name, role, and quote text
- **CTASection** — full-width call-to-action banner with heading, subtext, and button
- **FAQSection** — FAQ list rendered with Accordion inside a section header

**Medium priority**:

- **LogoCloud** — partner / trusted-by logo grid (greyscale, responsive)
- **StatsSection** — marketing stats row (large numbers with labels)
- **UserProfilePage** — user profile view block with avatar, bio, and stat tiles
- **ErrorPage** — 404 / 500 full-page error state with illustration slot and back link
- **PricingComparison** — feature comparison table across tiers (complements PricingSection)

**Low priority**:

- **WaitlistBlock** — email waitlist / early-access signup with success state
- **ChangelogBlock** — release notes / changelog feed block

### Track D — AI-Native UI (`packages/ui`, `packages/patterns`, `packages/blocks`)

These items live in `ai/` subdirectories within each package and are registered under the `@aether/ai-*` namespace. They depend only on existing primitives and must work standalone so teams can build AI features without adopting the full system.

#### AI Primitives (`packages/ui/src/components/ai/`)

**High priority**:

- **StreamingText** — animated token-by-token text renderer with blinking cursor; accepts a streaming `string | AsyncIterable<string>` prop
- **ThinkingIndicator** — animated dots / pulsing indicator shown while the model is generating; supports `thinking` and `loading` states
- **MarkdownRenderer** — renders LLM markdown output (headings, paragraphs, ordered/unordered lists, tables, inline code, fenced code blocks via `CodeBlock`)
- **CodeBlock** — syntax-highlighted code block with copy-to-clipboard button, language badge, and optional filename header (uses `shiki` or `highlight.js`)
- **PromptInput** — auto-growing textarea with integrated send button, character/token counter, keyboard shortcut hint, and an attach-file slot
- **ChatBubble** — user or assistant message bubble with role avatar, timestamp, and a trailing actions slot (copy, regenerate, feedback)
- **SourceCard** — citation/source reference card with title, URL, favicon, and optional excerpt; used below AI responses
- **FeedbackButtons** — thumbs-up / thumbs-down with toggled state and optional reason-selection follow-up

**Medium priority**:

- **ModelBadge** — pill displaying model name and provider logo/icon (e.g. "GPT-4o", "Claude 3.5")
- **TokenCounter** — live context-window usage bar (tokens used / max) with colour-coded danger threshold
- **PromptSuggestion** — clickable suggested-prompt chip; supports icon prefix
- **ToolCallCard** — collapsed/expanded card showing an AI tool invocation (name, args) and its result or error state
- **ReasoningBlock** — collapsible chain-of-thought / reasoning trace block with header toggle

**Low priority**:

- **AttachmentChip** — compact chip for a file or image attached to the prompt area; shows file icon, name, size, and remove button

#### AI Patterns (`packages/patterns/src/components/ai/`)

**High priority**:

- **ConversationThread** — scrollable message list composing `ChatBubble`, `StreamingText`, `ThinkingIndicator`, and `SourceCard`; auto-scrolls to bottom on new messages
- **PromptBuilder** — structured prompt composer with system / user / assistant turn cards, add-turn button, and character count per turn
- **ModelSelector** — dropdown/combobox to switch between AI models grouped by provider; shows model capability tags (vision, tools, etc.)
- **AIResponseCard** — card wrapping `MarkdownRenderer` + `StreamingText` output with header (model badge, timestamp) and footer (feedback, copy, regenerate)
- **PromptLibrary** — searchable grid of saved and example prompts with category filter and one-click insert action

**Medium priority**:

- **ToolCallSequence** — ordered list of tool calls with step-number, name, and status indicator (pending / running / done / error)
- **ConversationStarter** — empty-state layout with `PromptSuggestion` chips shown when no messages exist yet
- **VoiceInput** — mic button with waveform animation and live transcription display; toggles PromptInput content
- **AIErrorState** — error state specific to AI failures: rate-limit, context-length exceeded, provider outage, with appropriate recovery actions

**Low priority**:

- **AISettingsPanel** — collapsible panel for temperature, max tokens, top-p, and system prompt override

#### AI Blocks / Layouts (`packages/blocks/src/components/ai/`)

**High priority**:

- **ChatLayout** — full-page layout: `ChatSidebar` on the left, main `ConversationThread` in the centre, `PromptInput` pinned at the bottom; responsive (sidebar collapses to sheet on mobile)
- **ChatSidebar** — conversation history list with search, "New chat" button, date grouping, rename/delete per-item, and optional folder grouping
- **AIAssistantPanel** — slide-in sheet/drawer embedding a `ConversationThread` + `PromptInput` for in-app AI assistant without a full-page layout
- **AIOnboarding** — first-time AI feature setup: API key entry, model selection, and example prompts to try; step-by-step using `Stepper`
- **AgentWorkspace** — multi-step agent task UI: task description at the top, `ToolCallSequence` log in the centre, scratchpad/reasoning panel on the right, final output at the bottom

**Medium priority**:

- **CompareOutput** — side-by-side model output comparison with two `AIResponseCard` columns and diff highlighting for changed spans
- **AISettings** — settings block for model configuration (model, temperature, max tokens), system prompt textarea, and API key management with masked display
- **PromptLibraryPage** — full-page prompt library with category sidebar, search, `PromptLibrary` grid, and CRUD modal

**Low priority**:

- **AIUsageDashboard** — token usage and cost breakdown charts with request-count stats; consumes `Chart` and `StatGroup`

### Track E — Registry, Docs, and AI Metadata

- Every new item: source code, vitest tests, docs page, AI metadata block, registry entry, per-item JSON
- AI items registered under `@aether/ai-*` namespace in the public registry
- `llms.txt` regenerated — all new items included with AI-specific composition recipes
- Studio playground updated: new "AI UI" section alongside existing sections
- `generate` CLI recipes extended: `"make me a chat app"`, `"add an AI assistant panel"`, `"prompt builder"`, `"agent task view"`

---

## Acceptance Criteria

- ✅ `packages/ui` reaches **51 + 14 AI = 65 primitives total**
- ✅ `packages/patterns` reaches **29 + 10 AI = 39 patterns total**
- ✅ `packages/blocks` reaches **25 + 9 AI = 34 blocks total**
- ⏳ Every item installable end-to-end via `aether-ui add <name>` (Track E)
- ⏳ Every item has AI metadata; CI rejects items missing it (Track E)
- ⏳ `apps/docs` has a docs page for each new item, with an "AI UI" section in the sidebar (Track E)
- ✅ No primitive hardcodes visual values that belong in tokens
- ⏳ `pnpm test` remains green across all packages (Track E)
- ✅ `ChatLayout` block renders a functional end-to-end chat UI using only `@aetherstack/*` packages

---

## Notes

- Phase 7 remaining items (CDN, per-item versioning, `update`/`diff` CLI commands) can run in parallel with Tracks A–D above — they are independent
- Do not start Phase 8 (Pro Architecture) until the Acceptance Criteria above are met
- New peer dependencies: `embla-carousel-react` (Carousel), `@dnd-kit/sortable` (SortableList), `input-otp` (InputOTP), `sonner` (Sonner), `react-resizable-panels` (Resizable), `shiki` or `highlight.js` (CodeBlock), `react-markdown` or custom renderer (MarkdownRenderer)
- Add peer deps in the lowest appropriate package; never in shared config packages
- AI items must not depend on any specific AI SDK — they accept plain strings, `AsyncIterable<string>`, and callback props; the consumer wires their own SDK

---

# Phase 8 — Pro Architecture

Status: Pending

## Goal
Build the commercial layer: Clerk auth, Stripe billing, license gating, and the premium-namespace runtime — without destabilizing the public system.

## Deliverables

### `apps/account` — Account Dashboard
- New Next.js App Router app at `account.aether-ui.dev`
- Clerk authentication — sign in, sign up, profile management; no custom auth UI required
- Pages:
  - `/` — license overview (tier, seats used, expiry)
  - `/billing` — Stripe Customer Portal redirect (invoices, plan changes, cancellation)
  - `/license` — license key display + seat invites (Team tier)
  - `/cli-auth` — device-flow polling endpoint for `aether-ui login`
  - `/api/stripe/webhook` — Stripe event handler that writes to Clerk `privateMetadata`
- Uses `@aetherstack/ui` and `@aetherstack/tokens` throughout

### License System
- **Identity:** Clerk — `privateMetadata.license` stores `{ tier, status, seats, stripe_customer_id }`
- **Session token:** Clerk custom session template adds `license_tier` as a JWT claim; 1-hour TTL with auto-refresh
- **No external database required** for basic license storage — Clerk handles identity and metadata
- **CLI credentials:** stored in `~/.aetherui/config.json` after device flow completes
- Stripe Checkout for Pro ($79/yr) and Team ($199/yr) tiers; webhook fires on `checkout.session.completed` and `customer.subscription.*` events to keep Clerk metadata in sync

### CLI Auth Layer (`packages/cli`)
- `aether-ui login` — device flow: opens browser to `account.aether-ui.dev/cli-auth`, polls for JWT, saves to `~/.aetherui/config.json`
- `aether-ui logout` — clears stored credentials
- `aether-ui whoami` — prints current user email and license tier
- `aether-ui add <pro-item>` — detects `pro: true` on the registry item; reads JWT, verifies `license_tier` claim locally; shows a clear upgrade link if unlicensed
- New file: `packages/cli/src/lib/auth.ts` — reads/writes `~/.aetherui/config.json`, validates JWT claims offline (1-hour window), handles token refresh

### Pro Registry Gating
- `@aether-pro` namespace fully wired: registry, CDN, schema-level `pro: true` enforcement
- JWT-validated API route in `apps/account` proxies pro registry item JSON — public registry stays on CDN with no auth
- Separation rules enforced: pro items live in `registry/pro/**` with their own build pipeline and never appear in public registry artifacts
- Pro `llms.txt` generated separately and gated behind license

## Acceptance Criteria
- A non-licensed user cannot download any `pro: true` registry item
- A licensed user can install pro items via the CLI without a manual auth step after `aether-ui login`
- `aether-ui login` completes the device flow and stores a valid JWT locally
- `aether-ui add <pro-item>` fails with a clear, actionable error for unlicensed users (includes upgrade link)
- Stripe webhook correctly writes `license_tier` to Clerk `privateMetadata` on successful payment
- A Team-tier user can manage seats and invite collaborators via `apps/account`
- Pro items can be added or revoked without rebuilding the public registry
- Account, billing, and license flows are self-serve and documented

## Notes
Resist the urge to ship pro content before the gating works end-to-end. Architecture first, content second. The account app must use `@aetherstack/ui` components — Aether UI should eat its own cooking.

---

# Phase 9 — Pro Content + Launch

Status: Pending

## Goal
Ship enough premium value to justify the paid tier — across advanced components, page templates, vertical kits, and themes for any product type — then launch publicly.

## Deliverables

### Advanced Components (pro-gated, `@aether-pro` namespace)
- **RichText editor** — Tiptap-based rich text integration (public primitives shipped in Phase 7.5)

Note: Many components originally listed here (DataTable, CommandPalette, DatePicker, Combobox, FileDropzone, Toast, Avatar, Stepper, Kanban, ActivityFeed, ColorPicker) were shipped as public items in Phases 6–7.5. Phase 9 advanced components focus on pro-tier extensions and vertical-specific compositions.

### AI Pro Extensions (pro-gated, `@aether-pro/ai-*` namespace)
Extends the public AI-native UI (shipped in Phase 7.5 Track D) with pro-tier capabilities:
- **MultiAgentWorkspace** — multi-agent orchestration view with agent swimlanes and message routing
- **FunctionCallingDebugger** — tool call inspector with full request/response diff and replay
- **EmbeddingVisualizer** — 2D/3D embedding space visualization for semantic search UIs
- **FineTuneMonitor** — training run metrics block (loss curve, eval, checkpoint status)
- **AIAuditLog** — compliance-grade log of all AI interactions with filtering and export
- **CustomModelCard** — model card block for showcasing self-hosted or fine-tuned models
- **PromptVersionDiff** — side-by-side diff of two prompt versions with output comparison

### Page Templates (pro-gated)
- SaaS landing page (hero, features, pricing, CTA)
- Marketing site sections (testimonials, logos, FAQ)
- Full settings page (profile, billing, notifications, team)
- User management page with roles and invites
- Analytics dashboard with charts and KPI grid
- Blog home + article layout
- Portfolio / agency site sections
- E-commerce product listing + detail + cart
- Waitlist + early-access page
- Changelog / release notes page

### Vertical Kits (pro-gated)
- **SaaS Kit** — landing, auth, onboarding, dashboard, settings, billing
- **CRM Kit** — Contacts page, Deal Pipeline kanban, Activity Timeline block, Contact Drawer
- **Billing Kit** — Subscription management, Invoice history, Usage charts, Plan picker
- **Analytics Kit** — Multi-chart dashboards, Funnel charts, Cohort retention, Custom report builder
- **Marketing Kit** — Hero, features, testimonials, pricing, blog, footer sections (built on Phase 7.5 marketing blocks)
- **E-commerce Kit** — Product listing, detail, cart, checkout
- **AI App Kit** — Full opinionated AI application scaffold: `ChatLayout` + `ChatSidebar` + `AgentWorkspace` + `AISettings` + `AIOnboarding` wired together with a model-provider config layer (built on Phase 7.5 AI blocks)

### Premium Themes (pro-gated)
- **Slate Pro** — cool-gray, professional
- **Indigo Pro** — indigo accent, modern
- **Onyx** — deep dark, high-contrast
- **Rose** — warm, premium consumer feel
- **Emerald** — fresh green-accent palette

### AI Pro (pro-gated)
- Pro `llms.txt` with all pro-item entries and kit composition recipes, gated behind license
- 50+ extended `generate` recipes that resolve to pro blocks and templates
- MCP `compose_block` and `compose_template` tools serving pro items when a valid JWT is present
- AI Recipes Pro — opinionated prompt → feature-scaffold flows (e.g. "make me a project management tool", "build a chat app with agent tools"), each backed by composed pro blocks and the Phase 7.5 AI-native UI primitives
- Pro AI extensions: MultiAgentWorkspace, FunctionCallingDebugger, EmbeddingVisualizer, FineTuneMonitor, AIAuditLog, CustomModelCard, PromptVersionDiff

### Figma Kit (pro-gated)
- Full Figma component library matching the Aether UI system, with auto-layout and design tokens bound to the token system

### Release Polish
- changesets release flow finalized for both `@aetherstack/*` and `@aether-pro/*`
- versioning policy documented
- regression checklist for docs, demo, and registry
- contribution guidelines + issue templates + release notes process
- launch-ready README, marketing copy, comparison page vs shadcn/ui
- Lighthouse pass on `apps/docs` and `account.aether-ui.dev`
- visual regression baseline (Playwright + Percy or equivalent) for primitives and blocks

## Acceptance Criteria
- A subscriber can subscribe, install at least one vertical kit, and ship a working product feature in under 30 minutes
- All pro content is correctly gated — unlicensed users get helpful upgrade prompts, not raw errors
- The Figma kit covers 100% of shipped pro components
- Repo is maintainable long-term
- Public-facing quality bar is enforceable and verified in CI

## Notes
This is the public-launch milestone. Defer any item that's not directly required for it. The general-UI scope means templates and kits should serve a broad range of product types — not only SaaS dashboards.

---

## Suggested Build Sequence

Recommended order:

1. ~~Phase 2 — Token System~~ ✅
2. ~~Phase 3 — Core Primitives~~ ✅
3. ~~Phase 4 — App Patterns + First Blocks~~ ✅
4. ~~Phase 4.6 — Quality, Truth & Coverage~~ ✅
5. ~~Phase 5 — AI Foundations~~ ✅
6. ~~Phase 6 — Component Gap-Fill~~ ✅
7. Phase 7 — Public Registry Hardened (npm ✅, CDN/versioning/CLI update+diff pending)
8. **Phase 7.5 — Component Completeness** (code ✅ — Track E: registry/docs/tests pending)
9. Phase 8 — Pro Architecture
10. Phase 9 — Pro Content + Launch

---

## Recommended Milestone Strategy

### Milestone A — Foundation ✅
Phases 2–3 — Aether Base + stable primitives

### Milestone B — Composability ✅
Phase 4 — Aether UI useful for app teams

### Milestone B.5 — Trust ✅
Phase 4.6 — Truth, coverage, CI parity with claims

### Milestone C — AI Native ✅
Phase 5 — Differentiated, LLM-first design system

### Milestone D — Breadth (in progress)
Phases 6–7.5 — Public registry production-ready with full component coverage (shadcn parity + marketing blocks + AI-native UI). Code complete; Track E (registry/docs/tests) and Phase 7 CDN/versioning remaining.

### Milestone E — Commercial
Phases 8–9 — Pro tier live, launch ready

---

## Definition of Done Per Phase

A phase is done only when:

- code is committed and builds cleanly on PRs (not just on merge)
- every claim in this build plan is reflected in shipped code or CI
- docs for the phase exist and match reality
- package boundaries remain clean
- exported APIs are deliberate
- acceptance criteria are met in CI
- demo/docs reflect the new functionality where relevant

---

## Out of Scope for Now

The following should not be prioritized until Phase 9 (or beyond):

- multiple framework targets beyond Next.js / Vite / Remix
- CMS/database integrations
- advanced analytics / telemetry on the platform itself
- mobile-native rendering targets

---

## Standards Enforcement

The following documents define and reinforce implementation quality:

- `CLAUDE.md`
- `docs/architecture/engineering-standards.md`
- `CONTRIBUTING.md`

These standards are enforced through:

- strict TypeScript
- ESLint rules
- formatting rules
- package boundary discipline
- review checklists
- automated CI checks (typecheck, lint, tests, registry validation, build, changeset enforcement)

No new phase should weaken these standards for convenience.
