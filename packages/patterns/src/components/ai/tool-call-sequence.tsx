"use client"

import * as React from "react"
import { CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface Step {
  id: string
  toolName: string
  status: "pending" | "running" | "done" | "error"
  args?: Record<string, unknown>
  result?: unknown
  error?: string
}

interface ToolCallSequenceProps {
  steps: Step[]
  className?: string
}

function StepStatusIcon({ status }: { status: Step["status"] }) {
  switch (status) {
    case "pending":
      return <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />
    case "running":
      return (
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )
    case "done":
      return <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
    case "error":
      return <XCircle className="h-4 w-4 shrink-0 text-destructive" />
  }
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = React.useState(false)
  const hasDetails = step.args ?? step.result ?? step.error

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-accent/50 transition-colors"
        onClick={() => hasDetails && setOpen((o) => !o)}
        disabled={!hasDetails}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
          {index + 1}
        </span>
        <StepStatusIcon status={step.status} />
        <span className="flex-1 text-left font-mono font-medium">{step.toolName}</span>
        <span className="text-xs text-muted-foreground capitalize">{step.status}</span>
        {hasDetails && (
          open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && hasDetails && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          {step.args && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Arguments</p>
              <pre className="rounded bg-muted p-3 text-xs overflow-x-auto font-mono">
                {JSON.stringify(step.args, null, 2)}
              </pre>
            </div>
          )}
          {step.error && (
            <div>
              <p className="mb-1 text-xs font-medium text-destructive uppercase tracking-wide">Error</p>
              <pre className="rounded bg-destructive/10 p-3 text-xs overflow-x-auto font-mono text-destructive">
                {step.error}
              </pre>
            </div>
          )}
          {step.result !== undefined && !step.error && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Result</p>
              <pre className="rounded bg-muted p-3 text-xs overflow-x-auto font-mono">
                {JSON.stringify(step.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ToolCallSequence({ steps, className }: ToolCallSequenceProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {steps.map((step, i) => (
        <StepRow key={step.id} step={step} index={i} />
      ))}
    </div>
  )
}

export { ToolCallSequence }
