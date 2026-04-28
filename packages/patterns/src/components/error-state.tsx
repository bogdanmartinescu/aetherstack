import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface ErrorStateProps {
  title?: string
  description?: string
  /** Primary CTA — typically a retry Button */
  action?: React.ReactNode
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      {/* Error icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>
      <h3 className="mb-1 text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-5 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  )
}
