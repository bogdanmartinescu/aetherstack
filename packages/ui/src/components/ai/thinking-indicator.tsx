import { cn } from "@aetherstack/utils"

interface ThinkingIndicatorProps {
  state?: "thinking" | "loading"
  label?: string
  className?: string
}

function ThinkingIndicator({
  label = "Thinking…",
  className,
}: ThinkingIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground text-sm", className)}>
      <span className="flex items-center gap-1">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </span>
      <span>{label}</span>
    </div>
  )
}

export { ThinkingIndicator }
