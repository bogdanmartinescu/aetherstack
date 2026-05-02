import { cn } from "@aetherstack/utils"
import { Badge } from "../badge"

interface ModelBadgeProps {
  model: string
  provider?: string
  className?: string
}

function ModelBadge({ model, provider, className }: ModelBadgeProps) {
  return (
    <Badge variant="outline" className={cn("gap-1 font-normal", className)}>
      {provider && (
        <span className="text-muted-foreground">{provider}/</span>
      )}
      <span>{model}</span>
    </Badge>
  )
}

export { ModelBadge }
