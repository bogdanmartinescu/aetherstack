"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

interface StreamingTextProps {
  content: string | AsyncIterable<string>
  className?: string
  /** Called once an `AsyncIterable` finishes. Not called for plain strings. */
  onComplete?: () => void
  /** Called if the `AsyncIterable` throws. Text received so far is kept. */
  onError?: (error: unknown) => void
  /** Show the blinking caret while streaming. Defaults to `true`. */
  showCursor?: boolean
}

function StreamingText({
  content,
  className,
  onComplete,
  onError,
  showCursor = true,
}: StreamingTextProps) {
  const [displayed, setDisplayed] = React.useState(typeof content === "string" ? content : "")
  const [isStreaming, setIsStreaming] = React.useState(false)

  // Callbacks live in refs so an inline handler doesn't restart the effect,
  // which would re-iterate a one-shot AsyncIterable.
  const onCompleteRef = React.useRef(onComplete)
  const onErrorRef = React.useRef(onError)
  onCompleteRef.current = onComplete
  onErrorRef.current = onError

  React.useEffect(() => {
    if (typeof content === "string") {
      setDisplayed(content)
      setIsStreaming(false)
      return
    }

    let cancelled = false
    setDisplayed("")
    setIsStreaming(true)

    async function consume(stream: AsyncIterable<string>) {
      try {
        for await (const chunk of stream) {
          if (cancelled) return
          setDisplayed((prev) => prev + chunk)
        }
        if (!cancelled) onCompleteRef.current?.()
      } catch (error) {
        if (!cancelled) onErrorRef.current?.(error)
      } finally {
        if (!cancelled) setIsStreaming(false)
      }
    }

    void consume(content)

    return () => {
      cancelled = true
    }
  }, [content])

  return (
    <span
      className={cn("whitespace-pre-wrap", className)}
      aria-busy={isStreaming || undefined}
      data-streaming={isStreaming || undefined}
    >
      {displayed}
      {isStreaming && showCursor && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle motion-reduce:animate-none"
        />
      )}
    </span>
  )
}

export { StreamingText }
export type { StreamingTextProps }
