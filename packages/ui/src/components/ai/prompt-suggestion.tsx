import * as React from "react"
import { cn } from "@aetherstack/utils"

interface PromptSuggestionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  label: string
  icon?: React.ReactNode
}

const PromptSuggestion = React.forwardRef<HTMLButtonElement, PromptSuggestionProps>(
  ({ label, icon, className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "border-input bg-background inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm",
        "ring-offset-background hover:bg-accent hover:text-accent-foreground transition-colors",
        "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && (
        <span aria-hidden="true" className="text-muted-foreground shrink-0 [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="min-w-0">{label}</span>
    </button>
  ),
)
PromptSuggestion.displayName = "PromptSuggestion"

export { PromptSuggestion }
export type { PromptSuggestionProps }
