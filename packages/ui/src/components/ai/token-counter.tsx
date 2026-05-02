import { cn } from "@aetherstack/utils"
import { Progress } from "../progress"

interface TokenCounterProps {
  used: number
  max: number
  className?: string
}

function TokenCounter({ used, max, className }: TokenCounterProps) {
  const percentage = max > 0 ? Math.min((used / max) * 100, 100) : 0
  const isNearLimit = percentage >= 80

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Context window</span>
        <span className={cn("font-mono", isNearLimit ? "text-destructive" : "text-muted-foreground")}>
          {used.toLocaleString()} / {max.toLocaleString()} tokens
        </span>
      </div>
      <Progress
        value={percentage}
        className={cn("h-1.5", isNearLimit && "[&>div]:bg-destructive")}
      />
    </div>
  )
}

export { TokenCounter }
