import type { Config } from "tailwindcss"
import baseConfig from "@aetherstack/tailwind-config"

const config: Config = {
  ...baseConfig,
  content: ["./src/**/*.{ts,tsx}"],
}

export default config
