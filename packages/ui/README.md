# @aetherstack/ui

> Aether UI — 65 open-code, accessible UI primitives for modern web products.

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

## Components (51)

**Accordion, Alert, AlertDialog, AspectRatio, Avatar** (+ AvatarGroup)**, Badge, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, ContextMenu, DatePicker, Dialog, Drawer, DropdownMenu, HoverCard, Input, InputGroup, InputOTP, Kbd, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast** (+ `useToast`)**, Toggle, ToggleGroup, Tooltip, VisuallyHidden**

## AI-native primitives (14)

SDK-agnostic streaming-ready components. Accept both `string` and `AsyncIterable<string>` props; you wire your own AI SDK.

```tsx
import {
  StreamingText,
  PromptInput,
  ChatBubble,
  ThinkingIndicator,
  MarkdownRenderer,
  CodeBlock,
  SourceCard,
  FeedbackButtons,
  ModelBadge,
  TokenCounter,
  PromptSuggestion,
  ToolCallCard,
  ReasoningBlock,
  AttachmentChip,
} from "@aetherstack/ui/ai"
```

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
npx aether-ui add sidebar
```

See [aether-ui.dev/installation](https://aether-ui.dev/installation).

## Documentation

- [Component reference](https://aether-ui.dev/components) — all 65 components with props, usage, and examples
- [Installation guide](https://aether-ui.dev/installation) — Next.js, Vite, Remix, Astro setup
- [CLI reference](https://aether-ui.dev/cli) — `aether-ui add`, `init`, `generate`
- [AI & MCP](https://aether-ui.dev/llms) — MCP server setup, AI metadata, prompt recipes
- [Design tokens](https://aether-ui.dev/tokens) — color, spacing, typography, radius reference

## License

MIT — see [LICENSE](../../LICENSE)
