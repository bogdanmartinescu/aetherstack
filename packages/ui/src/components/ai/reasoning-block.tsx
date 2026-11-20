"use client"

import * as React from "react"
import { Lightbulb, ChevronRight } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"

interface ReasoningBlockProps {
  content: React.ReactNode
  /** Overrides the header label. */
  title?: string
  /** Shows a live "Thinking…" header while the model is still reasoning. */
  isStreaming?: boolean
  /** Reasoning time in seconds; rendered as "Thought for Ns" once finished. */
  duration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

function getTitle(
  title: string | undefined,
  isStreaming: boolean,
  duration: number | undefined,
): string {
  if (title) return title
  if (isStreaming) return "Thinking…"
  if (duration !== undefined) return `Thought for ${Math.max(1, Math.round(duration))}s`
  return "Reasoning"
}

function ReasoningBlock({
  content,
  title,
  isStreaming = false,
  duration,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: ReasoningBlockProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Collapsible open={open} onOpenChange={handleOpenChange}>
      <div
        data-streaming={isStreaming || undefined}
        className={cn("rounded-lg border border-border bg-card", className)}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
            )}
          >
            <Lightbulb
              aria-hidden="true"
              className={cn(
                "h-4 w-4 shrink-0",
                isStreaming && "animate-pulse text-primary motion-reduce:animate-none",
              )}
            />
            <span className="font-medium">{getTitle(title, isStreaming, duration)}</span>
            <ChevronRight
              aria-hidden="true"
              className={cn(
                "ml-auto h-4 w-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
                open && "rotate-90",
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border px-4 pb-4 pt-3">
            <div
              tabIndex={0}
              className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded bg-muted p-3 font-mono text-xs leading-relaxed text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {content}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export { ReasoningBlock }
export type { ReasoningBlockProps }
