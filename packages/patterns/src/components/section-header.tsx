import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface SectionHeaderProps {
  title: string
  description?: string
  /** Optional right-aligned element (e.g. an edit button) */
  action?: React.ReactNode
  className?: string
  /** Render `<h2>` (default) or another heading level */
  as?: "h1" | "h2" | "h3" | "h4"
}

export function SectionHeader({
  title,
  description,
  action,
  className,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div className="min-w-0 flex-1">
        <Heading className="text-base font-semibold text-foreground">
          {title}
        </Heading>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ── SettingsSection ───────────────────────────────────────────────────────────

export interface SettingsSectionProps {
  title: string
  description?: string
  /** Optional action rendered in the header (e.g. Save button) */
  headerAction?: React.ReactNode
  /** Optional footer content (e.g. Save / Cancel buttons) */
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function SettingsSection({
  title,
  description,
  headerAction,
  footer,
  className,
  children,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card",
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
      <SectionHeader
        title={title}
        {...(description !== undefined && { description })}
        action={headerAction}
      />
      </div>

      {/* Content */}
      <div className="px-6 py-5">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-2 rounded-b-lg border-t border-border bg-muted/30 px-6 py-3">
          {footer}
        </div>
      )}
    </section>
  )
}
