"use client"

import * as React from "react"
import { CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"

interface ToolCallCardProps {
  toolName: string
  args?: Record<string, unknown>
  result?: unknown
  status: "pending" | "running" | "done" | "error"
  error?: string
  className?: string
}

function ToolCallCard({
  toolName,
  args,
  result,
  status,
  error,
  className,
}: ToolCallCardProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={cn("rounded-lg border border-border bg-card", className)}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm">
            <div className="flex items-center gap-2">
              <StatusIcon status={status} />
              <span className="font-mono font-medium">{toolName}</span>
              <span className="text-xs text-muted-foreground capitalize">{status}</span>
            </div>
            {open ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
            {args && (
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Arguments</p>
                <pre className="rounded bg-muted p-3 text-xs overflow-x-auto font-mono">
                  {JSON.stringify(args, null, 2)}
                </pre>
              </div>
            )}
            {error && (
              <div>
                <p className="mb-1 text-xs font-medium text-destructive uppercase tracking-wide">Error</p>
                <pre className="rounded bg-destructive/10 p-3 text-xs overflow-x-auto font-mono text-destructive">
                  {error}
                </pre>
              </div>
            )}
            {result !== undefined && !error && (
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Result</p>
                <pre className="rounded bg-muted p-3 text-xs overflow-x-auto font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

function StatusIcon({ status }: { status: ToolCallCardProps["status"] }) {
  switch (status) {
    case "pending":
      return <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/40" />
    case "running":
      return (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )
    case "done":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />
  }
}

export { ToolCallCard }
