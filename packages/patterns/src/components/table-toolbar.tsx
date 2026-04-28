import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── FilterPill ────────────────────────────────────────────────────────────────

export interface FilterPillProps {
  label: string
  onRemove?: () => void
  className?: string
}

export function FilterPill({ label, onRemove, className }: FilterPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground",
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted-foreground/20 hover:text-foreground"
          aria-label={`Remove filter: ${label}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

// ── FilterToolbar ─────────────────────────────────────────────────────────────

export interface ActiveFilter {
  id: string
  label: string
  onRemove: () => void
}

export interface FilterToolbarProps {
  activeFilters?: ActiveFilter[]
  onClearAll?: () => void
  /** Additional filter controls (dropdowns, date pickers, etc.) */
  children?: React.ReactNode
  className?: string
}

export function FilterToolbar({
  activeFilters = [],
  onClearAll,
  children,
  className,
}: FilterToolbarProps) {
  const hasFilters = activeFilters.length > 0

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
      {hasFilters && (
        <>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          {activeFilters.map((f) => (
            <FilterPill key={f.id} label={f.label} onRemove={f.onRemove} />
          ))}
          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </>
      )}
    </div>
  )
}

// ── TableToolbar ──────────────────────────────────────────────────────────────

export interface TableToolbarProps {
  /** Left slot — typically a search input */
  search?: React.ReactNode
  /** Middle slot — filter controls */
  filters?: React.ReactNode
  /** Right slot — action buttons (Export, Invite, etc.) */
  actions?: React.ReactNode
  className?: string
}

export function TableToolbar({
  search,
  filters,
  actions,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 py-3",
        className,
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {search}
        {filters}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  )
}
