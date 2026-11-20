"use client"

import * as React from "react"
import { Copy, RefreshCw } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Card, CardContent, CardFooter, CardHeader, Badge } from "@aetherstack/ui"

interface FeedbackProps {
  onThumbsUp?: () => void
  onThumbsDown?: () => void
}

interface AIResponseCardProps {
  content: string
  isStreaming?: boolean
  model?: string
  timestamp?: string
  onCopy?: () => void
  onRegenerate?: () => void
  feedbackProps?: FeedbackProps
  className?: string
}

function AIResponseCard({
  content,
  isStreaming = false,
  model,
  timestamp,
  onCopy,
  onRegenerate,
  feedbackProps,
  className,
}: AIResponseCardProps) {
  const [thumbs, setThumbs] = React.useState<"up" | "down" | null>(null)
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    void navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.()
    })
  }

  return (
    <Card className={cn("", className)}>
      {(model ?? timestamp) && (
        <CardHeader className="pb-3">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            {model && (
              <Badge variant="outline" className="gap-1 font-normal">
                {model}
              </Badge>
            )}
            {timestamp && <span>{timestamp}</span>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn(!(model ?? timestamp) && "pt-6")}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
          {isStreaming && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle" />
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <div className="flex items-center gap-1">
          {feedbackProps && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => {
                  setThumbs("up")
                  feedbackProps.onThumbsUp?.()
                }}
                disabled={thumbs === "down"}
                aria-label="Thumbs up"
              >
                <span className={cn("text-sm", thumbs === "up" && "text-primary")}>👍</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => {
                  setThumbs("down")
                  feedbackProps.onThumbsDown?.()
                }}
                disabled={thumbs === "up"}
                aria-label="Thumbs down"
              >
                <span className={cn("text-sm", thumbs === "down" && "text-destructive")}>👎</span>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onRegenerate && (
            <Button variant="ghost" size="sm" onClick={onRegenerate}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Regenerate
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="mr-1.5 h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { AIResponseCard }
