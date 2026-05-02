# @aetherstack/utils

> Shared utility functions for Aether UI — primarily the `cn` class-name helper.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## Install

```bash
pnpm add @aetherstack/utils
```

## Usage

```ts
import { cn } from "@aetherstack/utils"

// Merge Tailwind classes without conflicts
const className = cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-primary text-primary-foreground",
  className,
)
```

`cn` combines [clsx](https://github.com/lukeed/clsx) and [tailwind-merge](https://github.com/dcastil/tailwind-merge) so conflicting Tailwind utilities are resolved correctly.

## License

MIT — see [LICENSE](../../LICENSE)
