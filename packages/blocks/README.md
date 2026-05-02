# @aetherstack/blocks

> Aether UI — 10 full-section layout blocks for SaaS dashboards and product UIs.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/blocks` ships complete, installable UI sections — auth pages, settings panels, billing flows, team management, notification centers. Each block is self-contained and ready to drop into a Next.js route.

## Install

```bash
pnpm add @aetherstack/blocks @aetherstack/patterns @aetherstack/ui @aetherstack/utils
```

**Peer dependencies:**

```bash
pnpm add react react-dom tailwindcss
```

## Usage

```tsx
import { AccountSettings } from "@aetherstack/blocks"

export default function SettingsPage() {
  return (
    <AccountSettings
      defaultValues={{ name: "Jane Doe", email: "jane@example.com" }}
      onSave={async (data) => {
        await updateProfile(data)
      }}
    />
  )
}
```

## Blocks (10)

**Dashboard:** DashboardShell, EmptyDashboard  
**Auth:** LoginBlock, SignupBlock  
**Settings:** AccountSettings, TeamSettings  
**Billing:** BillingOverview  
**Onboarding:** OnboardingChecklist  
**Notifications:** NotificationCenter  
**Marketing:** PricingSection  

## CLI-first workflow

```bash
npx aether-ui add dashboard-shell
npx aether-ui add account-settings
npx aether-ui add pricing-section
```

See [aether-ui.dev/blocks](https://aether-ui.dev/blocks).

## License

MIT — see [LICENSE](../../LICENSE)
