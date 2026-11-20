import { cn } from "@aetherstack/utils"

interface ThinkingIndicatorProps {
  /** `thinking` shows bouncing dots; `loading` shows a spinner ring. */
  state?: "thinking" | "loading"
  label?: string
  className?: string
}

const DOT_DELAYS = ["0ms", "150ms", "300ms"] as const

function ThinkingIndicator({
  state = "thinking",
  label = "Thinking…",
  className,
}: ThinkingIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-state={state}
      className={cn("text-muted-foreground flex items-center gap-2 text-sm", className)}
    >
      {state === "thinking" ? (
        <span aria-hidden="true" className="flex items-center gap-1">
          {DOT_DELAYS.map((delay) => (
            <span
              key={delay}
              className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current motion-reduce:animate-none"
              style={{ animationDelay: delay }}
            />
          ))}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      )}
      <span>{label}</span>
    </div>
  )
}

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
