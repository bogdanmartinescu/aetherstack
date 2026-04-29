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

// Stats
export { StatGroup, StatItem } from "./components/stat-group"
export type { StatGroupProps, StatItemProps } from "./components/stat-group"

// Stepper / Wizard
export { Stepper, StepperStep } from "./components/stepper"
export type { StepperProps, StepperStepProps, StepperItem } from "./components/stepper"

// Activity Feed
export { ActivityFeed, ActivityItem } from "./components/activity-feed"
export type { ActivityFeedProps, ActivityItemProps, ActivityEntry } from "./components/activity-feed"

// File Dropzone
export { FileDropzone } from "./components/file-dropzone"
export type { FileDropzoneProps } from "./components/file-dropzone"

// Data Table
export { DataTable } from "./components/data-table"
export type { DataTableProps, DataTableColumn } from "./components/data-table"

// Command Palette
export {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandGroup,
  CommandItem,
  CommandPaletteSeparator,
  CommandPaletteDialog,
} from "./components/command-palette"
export type {
  CommandPaletteProps,
  CommandPaletteInputProps,
  CommandPaletteListProps,
  CommandPaletteEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandPaletteSeparatorProps,
  CommandPaletteDialogProps,
} from "./components/command-palette"

// Kanban
export { KanbanBoard, KanbanColumn, KanbanCard } from "./components/kanban"
export type { KanbanBoardProps, KanbanColumnProps, KanbanCardProps, KanbanItem } from "./components/kanban"

// Color Picker
export { ColorPicker, ColorSwatch } from "./components/color-picker"
export type { ColorPickerProps, ColorSwatchProps } from "./components/color-picker"
