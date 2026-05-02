import * as React from "react"
import { WifiOff, Clock, AlertTriangle, ServerOff, Zap } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button } from "@aetherstack/ui"

type ErrorType = "rate-limit" | "context-length" | "provider-outage" | "network" | "generic"

interface ErrorConfig {
  icon: React.ReactNode
  headline: string
  description: string
  action: string
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  "rate-limit": {
    icon: <Clock className="h-8 w-8" />,
    headline: "Rate limit reached",
    description: "You've hit the API rate limit. Please wait a moment before trying again.",
    action: "Try again",
  },
  "context-length": {
    icon: <Zap className="h-8 w-8" />,
    headline: "Context window full",
    description: "The conversation is too long for this model. Start a new chat to continue.",
    action: "New chat",
  },
  "provider-outage": {
    icon: <ServerOff className="h-8 w-8" />,
    headline: "Provider outage",
    description: "The AI provider is experiencing issues. Check their status page for updates.",
    action: "Retry",
  },
  network: {
    icon: <WifiOff className="h-8 w-8" />,
    headline: "Connection lost",
    description: "Check your internet connection and try again.",
    action: "Retry",
  },
  generic: {
    icon: <AlertTriangle className="h-8 w-8" />,
    headline: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    action: "Try again",
  },
}

interface AIErrorStateProps {
  type?: ErrorType
  message?: string
  onRetry?: () => void
  className?: string
}

function AIErrorState({
  type = "generic",
  message,
  onRetry,
  className,
}: AIErrorStateProps) {
  const config = ERROR_CONFIGS[type]

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center",
        className,
      )}
    >
      <span className="text-muted-foreground">{config.icon}</span>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">{config.headline}</h3>
        <p className="text-sm text-muted-foreground">{message ?? config.description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {config.action}
        </Button>
      )}
    </div>
  )
}

export { AIErrorState }
