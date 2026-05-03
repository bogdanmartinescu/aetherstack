# @aetherstack/tokens

> Aether UI design tokens — colors, spacing, typography, radius, shadows, motion.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/tokens` exports the typed token contract that all Aether UI components are built on. Use it to reference token values in code, extend your Tailwind config, or share the token contract across your own packages.

## Install

```bash
pnpm add @aetherstack/tokens
```

## Usage

Import everything from the root or use sub-path imports for individual token groups:

```ts
// All token groups
import { palette, semanticColors, fontSizes, spacing, radius, shadows, motion } from "@aetherstack/tokens"

// Sub-path imports (tree-shakeable)
import { palette, semanticColors } from "@aetherstack/tokens/colors"
import { fontSizes, fontWeights, fontFamilies } from "@aetherstack/tokens/typography"
import { spacing } from "@aetherstack/tokens/spacing"
import { radius } from "@aetherstack/tokens/radius"
import { shadows } from "@aetherstack/tokens/shadows"
import { motion } from "@aetherstack/tokens/motion"
```

### Tailwind integration

```ts
// tailwind.config.ts
import { palette } from "@aetherstack/tokens/colors"
import { fontSizes, fontWeights } from "@aetherstack/tokens/typography"
import { spacing } from "@aetherstack/tokens/spacing"

export default {
  theme: {
    extend: {
      fontSize: fontSizes,
      fontWeight: fontWeights,
      spacing,
    },
  },
}
```

### CSS variables

Aether UI components consume a CSS variable contract injected by `globals.css`. The `semanticColors` export maps those variable names to their HSL values for programmatic use:

```ts
import { semanticColors } from "@aetherstack/tokens/colors"

// semanticColors.light["--primary"] === "269 74% 57%"
// semanticColors.dark["--primary"]  === "267 84% 65%"
```

## Documentation

- [Token reference](https://aether-ui.dev/tokens) — full color, spacing, typography, radius, and motion scales
- [Component reference](https://aether-ui.dev/components) — components built on these tokens
- [Installation guide](https://aether-ui.dev/installation) — Tailwind + token setup

## License

MIT — see [LICENSE](../../LICENSE)
