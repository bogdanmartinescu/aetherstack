# @aetherstack/ui

> Aether UI — 31 open-code, accessible UI primitives for modern web products.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/ui` ships compiled React component source for use as a **library dependency** inside monorepos or projects that prefer a traditional npm install. For the standard Aether UI workflow — where you own and edit the source — use the CLI instead.

## Install

```bash
pnpm add @aetherstack/ui
# or
npm install @aetherstack/ui
```

**Peer dependencies** (install separately):

```bash
pnpm add react react-dom tailwindcss
```

## Usage

```tsx
import { Button, Card, CardContent } from "@aetherstack/ui"

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button variant="default">Get started</Button>
      </CardContent>
    </Card>
  )
}
```

Individual imports are tree-shaken automatically:

```tsx
import { Button } from "@aetherstack/ui/button"
import { Dialog, DialogContent } from "@aetherstack/ui/dialog"
```

## Components (31)

**Original 16:** Badge, Button, Card, Checkbox, Dialog, Input, Label, RadioGroup, Select, Sheet, Skeleton, Switch, Table, Tabs, Textarea, Tooltip

**Phase 6 additions (15):** Accordion, Avatar/AvatarGroup, Calendar, Combobox, ContextMenu, DropdownMenu, HoverCard, Pagination, Progress, ScrollArea, Separator, Slider, Toast (+ `useToast`), Toggle, ToggleGroup

## CSS setup

This package requires a Tailwind CSS setup with the Aether UI token variables. Add to your `globals.css`:

```css
@import "@aetherstack/ui/globals.css";
```

Or install components via the CLI for a fully configured setup:

```bash
npx aether-ui init
```

## CLI-first workflow

For the recommended open-code workflow where you own component source:

```bash
npx aether-ui add button
npx aether-ui add dialog
```

See [aether-ui.dev/installation](https://aether-ui.dev/installation).

## License

MIT — see [LICENSE](../../LICENSE)
