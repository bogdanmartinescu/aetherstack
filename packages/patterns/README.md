# @aetherstack/patterns

> Aether UI — 39 higher-level UI patterns built on `@aetherstack/ui` primitives.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/patterns` provides product-level UI compositions that combine multiple primitives into common SaaS interface elements: forms, data tables, navigation, stat displays, command palettes, kanban boards, and more.

## Install

```bash
pnpm add @aetherstack/patterns @aetherstack/ui @aetherstack/utils
```

**Peer dependencies:**

```bash
pnpm add react react-dom tailwindcss
```

## Usage

```tsx
import { DataTable, StatGroup, StatItem } from "@aetherstack/patterns"

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
]

export function UsersPage() {
  return (
    <>
      <StatGroup cols={3}>
        <StatItem label="Total users" value="1,284" delta={12} />
        <StatItem label="Active" value="847" delta={-3} />
        <StatItem label="New this week" value="38" delta={21} />
      </StatGroup>
      <DataTable columns={columns} data={users} searchable searchKeys={["name", "email"]} />
    </>
  )
}
```

## Patterns (29)

**Data display:** DataTable, MetricCard, StatGroup  
**Commands:** CommandPalette  
**Navigation:** PageHeader (+ Breadcrumb), SectionHeader (+ SettingsSection), SidebarNav (+ NavItem, NavGroup)  
**Forms:** FormField, InlineEdit  
**Filtering:** TableToolbar (+ FilterToolbar), MultiSelect, DateRangePicker, SearchInput  
**State:** EmptyState, LoadingState, ErrorState  
**Task management:** Kanban, Stepper, SortableList  
**File handling:** FileDropzone, UploadProgress  
**User:** ProfileDropdown, NotificationBell, ThemeSwitcher  
**Styling:** ColorPicker  
**Content:** ActivityFeed, ChatMessageList, ConfirmDialog, TimelineFeed  

## AI-native patterns (10)

SDK-agnostic conversation and agent UI. Accept both `string` and `AsyncIterable<string>` props.

```tsx
import {
  ConversationThread,
  PromptBuilder,
  ModelSelector,
  AIResponseCard,
  PromptLibrary,
  ToolCallSequence,
  ConversationStarter,
  VoiceInput,
  AIErrorState,
  AISettingsPanel,
} from "@aetherstack/patterns/ai"
```

## CLI-first workflow

```bash
npx aether-ui add data-table
npx aether-ui add command-palette
npx aether-ui add kanban
npx aether-ui add date-range-picker
```

See [aether-ui.dev/patterns](https://aether-ui.dev/patterns).

## Documentation

- [Pattern reference](https://aether-ui.dev/patterns) — all 39 patterns with props, usage, and examples
- [Component reference](https://aether-ui.dev/components) — underlying UI primitives
- [Installation guide](https://aether-ui.dev/installation) — project setup
- [CLI reference](https://aether-ui.dev/cli) — `aether-ui add`, `init`, `generate`

## License

MIT — see [LICENSE](../../LICENSE)
