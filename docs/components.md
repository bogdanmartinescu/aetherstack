# Component System

Package: `@aetherstack/ui`  
Status: Phase 3 — complete

---

## Overview

Aether UI's core primitive set is a flat library of 15 components covering forms, layout, interaction, and feedback. Every component:

- is token-driven (no hardcoded visual values)
- is keyboard-accessible and ARIA-compliant
- uses CVA (class-variance-authority) for variant management
- ships as open-code — the source is copied into the consumer project, not wrapped

---

## Component Inventory

| Component | Type | Radix primitive | Description |
|---|---|---|---|
| `Button` | Interactive | `@radix-ui/react-slot` (asChild) | Action trigger — 6 variants, 4 sizes |
| `Badge` | Display | — | Status/category label — 4 variants |
| `Input` | Form | — | Single-line text input |
| `Textarea` | Form | — | Multi-line text input |
| `Label` | Form | `@radix-ui/react-label` | Accessible form label |
| `Checkbox` | Form | `@radix-ui/react-checkbox` | Toggleable checked state |
| `RadioGroup` | Form | `@radix-ui/react-radio-group` | Single-select option group |
| `Switch` | Form | `@radix-ui/react-switch` | On/off toggle |
| `Select` | Form | `@radix-ui/react-select` | Single-select dropdown |
| `Tabs` | Navigation | `@radix-ui/react-tabs` | Layered content panels |
| `Dialog` | Overlay | `@radix-ui/react-dialog` | Modal dialog |
| `Sheet` | Overlay | `@radix-ui/react-dialog` | Side-panel drawer (4 sides) |
| `Tooltip` | Overlay | `@radix-ui/react-tooltip` | Contextual hover label |
| `Card` | Layout | — | Surface container — Header, Title, Description, Content, Footer |
| `Table` | Layout | — | Semantic data table |
| `Skeleton` | Feedback | — | Loading placeholder |

---

## Variant Conventions

All interactive components use the same variant/size API shape:

```tsx
// Standard pattern
<Component variant="default | secondary | outline | ghost | destructive | link" size="sm | default | lg | icon" />
```

Not every component uses every variant — only those that make semantic sense. The API shape is consistent across the library.

### CVA pattern

All variant-bearing components use `class-variance-authority`:

```ts
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", secondary: "...", ... },
      size:    { sm: "...", default: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
```

---

## asChild Pattern

Interactive components that can render as a different element accept an `asChild` prop powered by `@radix-ui/react-slot`. This avoids nested button/anchor problems:

```tsx
// Button renders as an anchor — no nested <button><a> anti-pattern
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>

// Tooltip trigger around any element
<TooltipTrigger asChild>
  <button>Hover me</button>
</TooltipTrigger>
```

---

## Accessibility

All primitives meet WCAG 2.1 AA requirements:

- **Focus management**: all interactive elements have visible focus rings using `focus-visible:ring-2 focus-visible:ring-ring`
- **Keyboard navigation**: Radix primitives handle full keyboard interaction for Tabs, Select, Dialog, Sheet, Tooltip, Checkbox, Switch, and RadioGroup
- **ARIA**: Radix primitives provide correct ARIA roles, states, and properties automatically
- **Disabled states**: all form components support `disabled` with consistent visual treatment (`disabled:opacity-50 disabled:cursor-not-allowed`)
- **Screen reader text**: close buttons in Dialog and Sheet include `<span className="sr-only">Close</span>`

---

## Usage

### Install via CLI (Phase 6+)

```bash
npx aether-ui add button
npx aether-ui add dialog sheet tabs
```

### Import directly

```tsx
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@aetherstack/ui"
```

### With TooltipProvider

Tooltip requires a `TooltipProvider` at the root of the component tree (typically in the layout):

```tsx
import { TooltipProvider } from "@aetherstack/ui"

export default function RootLayout({ children }) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  )
}
```

---

## Token contract

Components use only semantic CSS variables from `@aetherstack/tokens`. Relevant variables:

| Variable | Usage |
|---|---|
| `--primary` / `--primary-foreground` | Primary buttons, checkbox, switch active state |
| `--secondary` / `--secondary-foreground` | Secondary buttons, badge |
| `--destructive` / `--destructive-foreground` | Destructive buttons and badges |
| `--muted` / `--muted-foreground` | Placeholder text, skeleton, tab list background |
| `--accent` / `--accent-foreground` | Hover states for ghost/outline variants |
| `--background` / `--foreground` | Input/textarea backgrounds, card content |
| `--card` / `--card-foreground` | Card surface |
| `--popover` / `--popover-foreground` | Select dropdown, tooltip, dialog surfaces |
| `--border` | Border for inputs, cards, tables |
| `--input` | Input border color |
| `--ring` | Focus ring for all interactive elements |
| `--radius` | Base border radius (all components scale from this) |

---

## Adding a New Primitive

1. Create `packages/ui/src/components/<name>.tsx`
2. Export from `packages/ui/src/index.ts`
3. Add to exports map in `packages/ui/package.json`
4. Add tests in `packages/ui/src/__tests__/primitives.test.tsx`
5. Add to studio page for visual review
6. Document in this file and the docs app `/components` page
7. Ensure no hardcoded visual values — use tokens only

---

## Testing

Tests live in `packages/ui/src/__tests__/primitives.test.tsx` (Vitest + Testing Library).

Coverage per primitive:
- default render
- each variant/size where applicable
- disabled state
- keyboard interaction (keyboard-accessible components)
- Dialog: open/close cycle including Escape key

Run tests:

```bash
pnpm --filter @aetherstack/ui test
```
