import * as React from "react"
import { cn } from "@aetherstack/utils"

interface PromptSuggestionProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

function PromptSuggestion({ label, icon, onClick, className }: PromptSuggestionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm",
        "hover:bg-accent hover:text-accent-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}
      <span>{label}</span>
    </button>
  )
}

export { PromptSuggestion }
