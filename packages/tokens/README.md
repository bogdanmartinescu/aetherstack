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

```ts
import { colors } from "@aetherstack/tokens/colors"
import { spacing } from "@aetherstack/tokens/spacing"
import { typography } from "@aetherstack/tokens/typography"
import { radius } from "@aetherstack/tokens/radius"
import { shadows } from "@aetherstack/tokens/shadows"
import { motion } from "@aetherstack/tokens/motion"
```

### Tailwind integration

```ts
// tailwind.config.ts
import { colors, spacing, typography, radius } from "@aetherstack/tokens"

export default {
  theme: {
    extend: {
      colors: colors.extend,
      spacing,
      borderRadius: radius,
    },
  },
}
```

## License

MIT — see [LICENSE](../../LICENSE)
