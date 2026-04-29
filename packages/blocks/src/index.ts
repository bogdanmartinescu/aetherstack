/**
 * @aetherstack/blocks
 *
 * Installable full-section layouts built on patterns + primitives.
 * Install via the CLI: npx aether-ui add <block-name>
 */

// Shells
export { DashboardShell } from "./components/dashboard-shell"
export type {
  DashboardShellProps,
  DashboardNavItem,
  DashboardNavGroup,
} from "./components/dashboard-shell"

// Auth pages
export { LoginBlock } from "./components/login-block"
export type { LoginBlockProps } from "./components/login-block"

export { SignupBlock } from "./components/signup-block"
export type { SignupBlockProps } from "./components/signup-block"

// Dashboard & onboarding
export { EmptyDashboard } from "./components/empty-dashboard"
export type { EmptyDashboardProps } from "./components/empty-dashboard"

export { OnboardingChecklist } from "./components/onboarding-checklist"
export type { OnboardingChecklistProps, OnboardingStep } from "./components/onboarding-checklist"

// Billing
export { BillingOverview } from "./components/billing-overview"
export type {
  BillingOverviewProps,
  BillingPlan,
  UsageMetric,
} from "./components/billing-overview"

// Settings
export { AccountSettings } from "./components/account-settings"
export type {
  AccountSettingsProps,
  AccountSettingsData,
} from "./components/account-settings"

export { TeamSettings } from "./components/team-settings"
export type {
  TeamSettingsProps,
  TeamMember,
  TeamMemberRole,
} from "./components/team-settings"

// Notifications
export { NotificationCenter, NotificationItem } from "./components/notification-center"
export type {
  NotificationCenterProps,
  NotificationEntry,
  NotificationType,
} from "./components/notification-center"

// Marketing
export { PricingSection } from "./components/pricing-section"
export type {
  PricingSectionProps,
  PricingTier,
  PricingFeature,
} from "./components/pricing-section"
