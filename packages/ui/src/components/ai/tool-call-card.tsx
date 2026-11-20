"use client"

import * as React from "react"
import { CircleCheck, CircleX, ChevronRight } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"

type ToolCallStatus = "pending" | "running" | "done" | "error"

interface ToolCallCardProps {
  toolName: string
  args?: Record<string, unknown>
  result?: unknown
  status: ToolCallStatus
  error?: string
  /** Execution time in milliseconds, shown next to the status. */
  duration?: number
  defaultOpen?: boolean
  className?: string
}

function formatPayload(value: unknown): string {
  if (typeof value === "string") return value
  try {
    return (
      JSON.stringify(value, (_key, v: unknown) => (typeof v === "bigint" ? v.toString() : v), 2) ??
      String(value)
    )
  } catch {
    return String(value)
  }
}

function formatDuration(ms: number): string {
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
}

function ToolCallCard({
  toolName,
  args,
  result,
  status,
  error,
  duration,
  defaultOpen = false,
  className,
}: ToolCallCardProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const hasArgs = args !== undefined && Object.keys(args).length > 0
  const hasResult = result !== undefined && !error
  const hasDetails = hasArgs || hasResult || Boolean(error)

  const header = (
    <>
      <div className="flex min-w-0 items-center gap-2">
        <StatusIcon status={status} />
        <span className="truncate font-mono font-medium">{toolName}</span>
        <span
          className={cn(
            "shrink-0 text-xs capitalize",
            status === "error" ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {status}
        </span>
        {duration !== undefined && (
          <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
            · {formatDuration(duration)}
          </span>
        )}
      </div>
      {hasDetails && (
        <ChevronRight
          aria-hidden="true"
          className={cn(
            "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-90",
          )}
        />
      )}
    </>
  )

  return (
    <Collapsible open={open} onOpenChange={setOpen} disabled={!hasDetails}>
      <div
        data-status={status}
        className={cn(
          "bg-card rounded-lg border",
          status === "error" ? "border-destructive/40" : "border-border",
          className,
        )}
      >
        {hasDetails ? (
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-left text-sm",
                "ring-offset-background hover:bg-accent/50 transition-colors",
                "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
              )}
            >
              {header}
            </button>
          </CollapsibleTrigger>
        ) : (
          <div className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm">
            {header}
          </div>
        )}

        <CollapsibleContent>
          <div className="border-border space-y-3 border-t px-4 pb-4 pt-3">
            {hasArgs && <PayloadSection label="Arguments" value={formatPayload(args)} />}
            {error && <PayloadSection label="Error" value={error} tone="destructive" />}
            {hasResult && <PayloadSection label="Result" value={formatPayload(result)} />}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

function PayloadSection({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "destructive"
}) {
  return (
    <div>
      <p
        className={cn(
          "mb-1 text-xs font-medium uppercase tracking-wide",
          tone === "destructive" ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <pre
        tabIndex={0}
        className={cn(
          "max-h-64 overflow-auto whitespace-pre-wrap break-words rounded p-3 font-mono text-xs",
          "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2",
          tone === "destructive" ? "bg-destructive/10 text-destructive" : "bg-muted",
        )}
      >
        {value}
      </pre>
    </div>
  )
}

function StatusIcon({ status }: { status: ToolCallStatus }) {
  switch (status) {
    case "pending":
      return (
        <span
          aria-hidden="true"
          className="border-muted-foreground/40 h-4 w-4 shrink-0 rounded-full border-2"
        />
      )
    case "running":
      return (
        <span
          aria-hidden="true"
          className="border-primary h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-t-transparent motion-reduce:animate-none"
        />
      )
    case "done":
      return (
        <CircleCheck
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
        />
      )
    case "error":
      return <CircleX aria-hidden="true" className="text-destructive h-4 w-4 shrink-0" />
  }
}

export { ToolCallCard }
export type { ToolCallCardProps, ToolCallStatus }
