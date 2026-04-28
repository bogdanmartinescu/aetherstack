import { Skeleton } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ── LoadingState ──────────────────────────────────────────────────────────────

export interface LoadingStateProps {
  /** "spinner" shows a centred spinner; "skeleton" shows skeleton rows */
  variant?: "spinner" | "skeleton"
  /** Number of skeleton rows (only used when variant="skeleton") */
  rows?: number
  text?: string
  className?: string
}

export function LoadingState({
  variant = "spinner",
  rows = 4,
  text = "Loading…",
  className,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-3 p-4", className)} aria-busy="true" aria-label={text}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {i === 0 && <Skeleton className="h-9 w-9 shrink-0 rounded-full" />}
            <div className="flex-1 space-y-2">
              <Skeleton className={cn("h-4", i === 0 ? "w-3/4" : i % 2 === 0 ? "w-5/6" : "w-4/5")} />
              {i === 0 && <Skeleton className="h-3 w-1/2" />}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className,
      )}
      aria-busy="true"
      aria-label={text}
    >
      <Spinner className="h-8 w-8 text-primary" />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
