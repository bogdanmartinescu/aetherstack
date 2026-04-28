/**
 * @aetherstack/patterns
 *
 * Higher-level UI compositions built on @aetherstack/ui primitives.
 * Each pattern represents a common product-level interaction or layout
 * found across SaaS dashboards and admin interfaces.
 */

// Form
export {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from "./components/form-field"
export type {
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./components/form-field"

// Page structure
export { PageHeader, Breadcrumb } from "./components/page-header"
export type { PageHeaderProps, BreadcrumbProps, BreadcrumbItem } from "./components/page-header"

export { SectionHeader, SettingsSection } from "./components/section-header"
export type { SectionHeaderProps, SettingsSectionProps } from "./components/section-header"

// State patterns
export { EmptyState } from "./components/empty-state"
export type { EmptyStateProps } from "./components/empty-state"

export { LoadingState } from "./components/loading-state"
export type { LoadingStateProps } from "./components/loading-state"

export { ErrorState } from "./components/error-state"
export type { ErrorStateProps } from "./components/error-state"

// Data display
export { MetricCard } from "./components/metric-card"
export type { MetricCardProps, MetricTrend } from "./components/metric-card"

// Toolbars
export { TableToolbar, FilterToolbar, FilterPill } from "./components/table-toolbar"
export type {
  TableToolbarProps,
  FilterToolbarProps,
  FilterPillProps,
  ActiveFilter,
} from "./components/table-toolbar"

// Navigation
export { NavItem, NavGroup, SidebarNav } from "./components/nav"
export type { NavItemProps, NavGroupProps, SidebarNavProps } from "./components/nav"
