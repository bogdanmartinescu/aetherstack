import type { Config } from "tailwindcss"
import baseConfig from "@aetherstack/tailwind-config"

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/patterns/src/**/*.{ts,tsx}",
    "../../packages/blocks/src/**/*.{ts,tsx}",
  ],
}

export default config
