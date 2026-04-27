# Token System

Package: `@aetherstack/tokens`  
Status: Phase 2 — complete

---

## Overview

Aether UI's token system is the base dependency for every other package. It defines the complete visual language: colors, typography, spacing, radius, shadows, and motion. Nothing above the token layer should hardcode a visual value that belongs here.

Tokens are authored in TypeScript for strict typing, consumed by Tailwind via CSS variables, and available for programmatic use in tooling, testing, and theming.

---

## Architecture

```
@aetherstack/tokens
  ├── colors      — raw palette + semantic CSS variable map
  ├── typography  — font sizes, weights, letter-spacing, line-height
  ├── spacing     — rem-based spacing scale
  ├── radius      — border-radius scale relative to --radius
  ├── shadows     — box-shadow values
  └── motion      — animation durations and easing functions

@aetherstack/themes
  └── default     — Aether UI default light/dark theme + generateCssVariables()
```

---

## CSS Variable Contract

All apps must include the following CSS variables in their `:root` / `.dark` selectors. The canonical source of these values is `semanticColors` in `@aetherstack/tokens/colors`.

### Surfaces

| Variable | Purpose |
|---|---|
| `--background` | Page/app background |
| `--foreground` | Default text |
| `--card` | Card/panel surface |
| `--card-foreground` | Text on card |
| `--popover` | Popover/dropdown surface |
| `--popover-foreground` | Text in popover |

### Interactive

| Variable | Purpose |
|---|---|
| `--primary` | Primary action color |
| `--primary-foreground` | Text on primary background |
| `--secondary` | Secondary action/surface |
| `--secondary-foreground` | Text on secondary |
| `--destructive` | Error/danger action |
| `--destructive-foreground` | Text on destructive |
| `--ring` | Focus ring color |

### Content

| Variable | Purpose |
|---|---|
| `--muted` | Muted surface (subtle background) |
| `--muted-foreground` | Muted/secondary text |
| `--accent` | Hover/accent surface |
| `--accent-foreground` | Text on accent |

### Structure

| Variable | Purpose |
|---|---|
| `--border` | Border color |
| `--input` | Input border/background |
| `--radius` | Base border radius (scaled by radius tokens) |

### Sidebar

The sidebar variables follow the same pattern prefixed with `--sidebar-`:
`--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.

---

## Usage

### In components (Tailwind)

All Tailwind color utilities in Aether UI resolve to CSS variables. No hardcoded values.

```tsx
// Correct — uses the token system
<div className="bg-background text-foreground border border-border rounded-md" />

// Correct — primary variant
<button className="bg-primary text-primary-foreground hover:bg-primary/90" />

// Wrong — hardcodes a visual value that should come from tokens
<div className="bg-[#7c3aed] text-white" />
```

### In TypeScript

Import token values directly from `@aetherstack/tokens`:

```ts
import { palette, semanticColors, spacing, durations, easings } from "@aetherstack/tokens"

// Raw palette value
palette.violet[600] // → "269 74% 57%"

// Semantic CSS variable → value (light)
semanticColors.light["--primary"] // → "269 74% 57%"

// Motion
durations.normal   // → "200ms"
easings.inOut      // → "cubic-bezier(0.4, 0, 0.2, 1)"
```

### Generating CSS programmatically (Phase 3+)

`@aetherstack/themes` will expose a `generateCssVariables(theme)` utility for producing `:root { ... }` / `.dark { ... }` CSS blocks programmatically. This is useful for build-time CSS generation, server-side theme injection, and registry base items.

This API ships in Phase 3 once the themes package is wired into the app layer. Until then, CSS variables are maintained manually in each app's `globals.css` (see the note in that file).

---

## Radius System

The base `--radius` variable is set per-theme (default: `0.5rem`). All derived radius values use `calc()` relative to `--radius`, so the entire scale shifts proportionally when a theme changes the base:

```
none  → 0px
sm    → calc(var(--radius) - 4px)
md    → calc(var(--radius) - 2px)
lg    → var(--radius)
xl    → calc(var(--radius) + 4px)
2xl   → calc(var(--radius) + 8px)
3xl   → calc(var(--radius) + 16px)
full  → 9999px
```

---

## Motion System

Durations and easings from `@aetherstack/tokens/motion`:

```
Durations:  instant (0ms), fast (100ms), normal (200ms), slow (300ms), slower (500ms), lazy (700ms)
Easings:    linear, in, out, inOut, spring, overshoot
Transitions: colors, opacity, shadow, transform, all  (pre-composed shorthands)
```

Default component transitions use `normal` duration with `inOut` easing.

---

## Design Principles

### Palette vs semantic tokens

The **palette** (`palette.violet[600]`, etc.) contains raw visual values.  
**Semantic tokens** (`--primary`, `--background`, etc.) map intent to palette values.

Components must use semantic tokens, not palette values directly. Palette values should only appear in `semanticColors` (colors.ts) and theme files.

### No hardcoded values in components

If a component needs a color, spacing, radius, or shadow, it must use a token. If no appropriate token exists, add one — don't hardcode.

### Dark mode is structural

Dark mode support is not optional. Every new semantic token must have both a light and dark value in `semanticColors`.

---

## Adding New Tokens

1. Add the value to the appropriate file in `packages/tokens/src/`
2. Export it from `packages/tokens/src/index.ts`
3. If it requires a CSS variable, add it to `semanticColors` in `colors.ts` (both light and dark)
4. Update all `apps/*/src/app/globals.css` files to reflect the new variable
5. Add coverage to `packages/tokens/src/__tests__/tokens.test.ts`
6. Document it here

---

## Live Reference

The token showcase in the docs app (`/tokens`) renders all token values interactively including the full palette, semantic colors with light/dark swatches, typography scale, spacing, radius, shadows, and motion values.
