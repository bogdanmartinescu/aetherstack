import * as React from "react"
import { cn } from "@aetherstack/utils"

interface Suggestion {
  label: string
  icon?: React.ReactNode
  prompt: string
}

interface ConversationStarterProps {
  title?: string
  description?: string
  suggestions?: Suggestion[]
  onSuggestionClick?: (prompt: string) => void
  className?: string
}

function ConversationStarter({
  title = "How can I help you today?",
  description = "Choose a suggestion below or type your own message.",
  suggestions = [],
  onSuggestionClick,
  className,
}: ConversationStarterProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6 px-4 py-12 text-center", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2 w-full max-w-lg">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggestionClick?.(s.prompt)}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-3 text-sm text-left",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              {s.icon && <span className="shrink-0 text-muted-foreground">{s.icon}</span>}
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ConversationStarter }
