import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface EmptyStateProps {
  /** Icon element — recommended size: h-10 w-10 */
  icon?: React.ReactNode
  title: string
  description?: string
  /** Primary CTA — typically a Button */
  action?: React.ReactNode
  /** Secondary CTA */
  secondaryAction?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-16 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-5 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
