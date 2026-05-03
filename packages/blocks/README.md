# @aetherstack/blocks

> Aether UI — 34 full-section layout blocks for SaaS, marketing, and AI-powered products.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/blocks` ships complete, installable UI sections — auth pages, settings panels, billing flows, marketing pages, and AI-native chat layouts. Each block is self-contained and ready to drop into a Next.js route.

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

## Blocks (25)

**Dashboard:** DashboardShell, EmptyDashboard  
**Auth:** LoginBlock, SignupBlock  
**Settings:** AccountSettings, TeamSettings  
**Billing:** BillingOverview  
**Onboarding:** OnboardingChecklist  
**Notifications:** NotificationCenter  
**Marketing:** AppHeader, MarketingNavbar, FooterSection, LandingHero, FeaturesSection, TestimonialsSection, CTASection, FAQSection, LogoCloud, StatsSection, PricingSection, PricingComparison  
**Pages:** UserProfilePage, ErrorPage, WaitlistBlock, ChangelogBlock  

## AI-native blocks (9)

Full-page AI application layouts. SDK-agnostic — wire your own AI SDK.

```tsx
import {
  ChatLayout,
  ChatSidebar,
  AIAssistantPanel,
  AIOnboarding,
  AgentWorkspace,
  CompareOutput,
  AISettings,
  PromptLibraryPage,
  AIUsageDashboard,
} from "@aetherstack/blocks/ai"
```

## CLI-first workflow

```bash
npx aether-ui add dashboard-shell
npx aether-ui add account-settings
npx aether-ui add landing-hero
npx aether-ui add chat-layout
```

See [aether-ui.dev/blocks](https://aether-ui.dev/blocks).

## Documentation

- [Block reference](https://aether-ui.dev/blocks) — all 34 blocks with props, usage, and examples
- [Pattern reference](https://aether-ui.dev/patterns) — composable patterns used inside blocks
- [Installation guide](https://aether-ui.dev/installation) — project setup
- [CLI reference](https://aether-ui.dev/cli) — `aether-ui add`, `init`, `generate`

## License

MIT — see [LICENSE](../../LICENSE)
