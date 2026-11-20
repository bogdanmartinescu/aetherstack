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
          <p className="text-muted-foreground mx-auto max-w-sm text-sm">{description}</p>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="grid w-full max-w-lg gap-2 sm:grid-cols-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggestionClick?.(s.prompt)}
              className={cn(
                "border-input bg-background flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              )}
            >
              {s.icon && <span className="text-muted-foreground shrink-0">{s.icon}</span>}
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ConversationStarter }
