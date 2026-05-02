"use client"

import * as React from "react"
import { Lightbulb, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"

interface ReasoningBlockProps {
  content: string
  defaultOpen?: boolean
  className?: string
}

function ReasoningBlock({ content, defaultOpen = false, className }: ReasoningBlockProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={cn("rounded-lg border border-border bg-card", className)}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Lightbulb className="h-4 w-4 shrink-0" />
            <span className="font-medium">Reasoning</span>
            <span className="ml-auto">
              {open ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border px-4 pb-4 pt-3">
            <div className="max-h-64 overflow-y-auto rounded bg-muted p-3 text-xs leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export { ReasoningBlock }
