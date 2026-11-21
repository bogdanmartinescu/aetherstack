# @aetherstack/cli

## 0.1.3

### Patch Changes

- 839aaa9: Use package metadata for the CLI version so `aether-ui --version` reports the packaged version accurately.

## 0.1.2

### Patch Changes

- e50759d: Harden CLI registry fetch, path safety, and dry-run behavior (M0-04)
  - `aether-ui generate` now uses `fetchRegistry` (`/r/registry.json` + Zod) instead of an unvalidated `/registry.json` cast
  - Install targets and config aliases reject absolute paths and `..` escapes; registry file fetches reject unsafe paths
  - Mid-install failures roll back newly created files; `add`/`init` dry-run validate without writing

- e3bed25: Align CLI `engines.node` with the monorepo requirement (`>=20`) used by consumer-install fixtures.

## 0.1.1

### Patch Changes

- 287b767: missing components and blocks
- Updated dependencies [287b767]
  - @aetherstack/registry-schema@0.0.2

## 0.1.0

### Minor Changes

- Initial public release (0.1.0)

  First stable public release of Aether UI — an open-code, AI-native design system and component registry.

  **@aetherstack/ui** — 31 primitives including Accordion, Avatar, Calendar, Combobox, ContextMenu, DropdownMenu, HoverCard, Pagination, Progress, ScrollArea, Separator, Slider, Toast, Toggle, ToggleGroup, and all original 16 components.

  **@aetherstack/patterns** — 20 higher-level patterns including DataTable, CommandPalette, StatGroup, Stepper, ActivityFeed, FileDropzone, Kanban, ColorPicker, and all original 12 patterns.

  **@aetherstack/blocks** — 10 full-section blocks including AccountSettings, BillingOverview, EmptyDashboard, NotificationCenter, OnboardingChecklist, PricingSection, TeamSettings, DashboardShell, LoginBlock, SignupBlock.

  **@aetherstack/tokens** — Design token contract: colors, spacing, typography, radius, shadows, motion.

  **@aetherstack/utils** — Shared `cn` utility (clsx + tailwind-merge).

  **@aetherstack/cli** — `aether-ui` CLI: `init`, `add`, `list`, `generate` commands.

  **@aetherstack/mcp-server** — MCP server exposing the registry to LLM agents (Cursor, Claude Desktop).

  All packages ship AI metadata (`intent`, `prompts`, `composition`, `slots`) on every registry item, a machine-readable `llms.txt`, and 58 installable registry items with per-item JSON.
