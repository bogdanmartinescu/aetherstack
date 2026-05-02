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

// Phase 7.5 additions

// Navigation
export { AppHeader } from "./components/app-header"
export type {
  AppHeaderProps,
  AppHeaderNavItem,
} from "./components/app-header"

export { MarketingNavbar } from "./components/marketing-navbar"
export type {
  MarketingNavbarProps,
  MarketingNavbarNavItem,
  MarketingNavbarCta,
} from "./components/marketing-navbar"

// Footer
export { FooterSection } from "./components/footer-section"
export type {
  FooterSectionProps,
  FooterColumn,
  FooterSocialLink,
  FooterLegalLink,
} from "./components/footer-section"

// Marketing sections
export { LandingHero } from "./components/landing-hero"
export type {
  LandingHeroProps,
  LandingHeroCta,
} from "./components/landing-hero"

export { FeaturesSection } from "./components/features-section"
export type {
  FeaturesSectionProps,
  Feature,
} from "./components/features-section"

export { TestimonialsSection } from "./components/testimonials-section"
export type {
  TestimonialsSectionProps,
  Testimonial,
} from "./components/testimonials-section"

export { CTASection } from "./components/cta-section"
export type {
  CTASectionProps,
  CTASectionCta,
} from "./components/cta-section"

export { FAQSection } from "./components/faq-section"
export type {
  FAQSectionProps,
  FAQItem,
} from "./components/faq-section"

export { LogoCloud } from "./components/logo-cloud"
export type {
  LogoCloudProps,
  LogoCloudLogo,
} from "./components/logo-cloud"

export { StatsSection } from "./components/stats-section"
export type {
  StatsSectionProps,
  Stat,
} from "./components/stats-section"

// Pricing
export { PricingComparison } from "./components/pricing-comparison"
export type {
  PricingComparisonProps,
  ComparisonTier,
  ComparisonFeature,
} from "./components/pricing-comparison"

// User & errors
export { UserProfilePage } from "./components/user-profile-page"
export type {
  UserProfilePageProps,
  UserProfileUser,
  UserProfileStat,
  UserProfileTab,
} from "./components/user-profile-page"

export { ErrorPage } from "./components/error-page"
export type { ErrorPageProps } from "./components/error-page"

// Acquisition & content
export { WaitlistBlock } from "./components/waitlist-block"
export type { WaitlistBlockProps } from "./components/waitlist-block"

export { ChangelogBlock } from "./components/changelog-block"
export type {
  ChangelogBlockProps,
  ChangelogEntry,
  ChangeGroup,
  ChangeType,
} from "./components/changelog-block"

// AI-native blocks (Phase 7.5 Track D)
export * from "./components/ai"
