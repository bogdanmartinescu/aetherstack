"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

interface StreamingTextProps {
  content: string | AsyncIterable<string>
  className?: string
  onComplete?: () => void
}

function StreamingText({ content, className, onComplete }: StreamingTextProps) {
  const [displayed, setDisplayed] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(false)

  React.useEffect(() => {
    if (typeof content === "string") {
      setDisplayed(content)
      setIsStreaming(false)
      return
    }

    let cancelled = false
    setDisplayed("")
    setIsStreaming(true)

    async function consume() {
      for await (const chunk of content as AsyncIterable<string>) {
        if (cancelled) return
        setDisplayed((prev) => prev + chunk)
      }
      if (!cancelled) {
        setIsStreaming(false)
        onComplete?.()
      }
    }

    consume()

    return () => {
      cancelled = true
    }
  }, [content, onComplete])

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {displayed}
      {isStreaming && (
        <span className="animate-pulse inline-block w-0.5 h-4 bg-current align-middle ml-0.5" />
      )}
    </span>
  )
}

export { StreamingText }
