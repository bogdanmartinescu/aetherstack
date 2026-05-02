# @aetherstack/patterns

> Aether UI — 20 higher-level UI patterns built on `@aetherstack/ui` primitives.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/patterns` provides product-level UI compositions that combine multiple primitives into common SaaS interface elements: forms, data tables, navigation, stat displays, command palettes, and more.

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

## Patterns (20)

**Data display:** DataTable, StatGroup, MetricCard  
**Commands:** CommandPalette  
**Navigation:** PageHeader, Breadcrumb, SectionHeader, SettingsSection, SidebarNav  
**Forms:** FormField  
**State:** EmptyState, LoadingState, ErrorState  
**Activity:** ActivityFeed  
**Task management:** Stepper, Kanban  
**File handling:** FileDropzone  
**Styling:** ColorPicker  
**Filtering:** TableToolbar, FilterToolbar  

## CLI-first workflow

```bash
npx aether-ui add data-table
npx aether-ui add command-palette
```

See [aether-ui.dev/patterns](https://aether-ui.dev/patterns).

## License

MIT — see [LICENSE](../../LICENSE)
