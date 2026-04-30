import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/account-settings.tsx",
    "src/components/billing-overview.tsx",
    "src/components/dashboard-shell.tsx",
    "src/components/empty-dashboard.tsx",
    "src/components/login-block.tsx",
    "src/components/notification-center.tsx",
    "src/components/onboarding-checklist.tsx",
    "src/components/pricing-section.tsx",
    "src/components/signup-block.tsx",
    "src/components/team-settings.tsx",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "@aetherstack/ui",
    "@aetherstack/patterns",
    "@aetherstack/utils",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
