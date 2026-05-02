import { cn } from "@aetherstack/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@aetherstack/ui"
import { Badge } from "@aetherstack/ui"

interface OutputItem {
  model: string
  content: string
  timestamp?: string
}

interface CompareOutputProps {
  outputs: OutputItem[]
  className?: string
}

function CompareOutput({ outputs, className }: CompareOutputProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        outputs.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
        className,
      )}
    >
      {outputs.map((output, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-sm font-medium">
                <Badge variant="outline" className="font-normal">
                  {output.model}
                </Badge>
              </CardTitle>
              {output.timestamp && (
                <span className="text-xs text-muted-foreground">{output.timestamp}</span>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{output.content}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { CompareOutput }
