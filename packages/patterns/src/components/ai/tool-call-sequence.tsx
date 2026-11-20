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
      return <span className="border-muted-foreground/40 h-4 w-4 shrink-0 rounded-full border-2" />
    case "running":
      return (
        <span className="border-primary h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-t-transparent" />
      )
    case "done":
      return <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
    case "error":
      return <XCircle className="text-destructive h-4 w-4 shrink-0" />
  }
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = React.useState(false)
  const hasDetails = step.args ?? step.result ?? step.error

  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <button
        className="hover:bg-accent/50 flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors"
        onClick={() => hasDetails && setOpen((o) => !o)}
        disabled={!hasDetails}
      >
        <span className="bg-muted text-muted-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium">
          {index + 1}
        </span>
        <StepStatusIcon status={step.status} />
        <span className="flex-1 text-left font-mono font-medium">{step.toolName}</span>
        <span className="text-muted-foreground text-xs capitalize">{step.status}</span>
        {hasDetails &&
          (open ? (
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          ) : (
            <ChevronRight className="text-muted-foreground h-4 w-4" />
          ))}
      </button>
      {open && hasDetails && (
        <div className="border-border space-y-3 border-t px-4 pb-4 pt-3">
          {step.args && (
            <div>
              <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">
                Arguments
              </p>
              <pre className="bg-muted overflow-x-auto rounded p-3 font-mono text-xs">
                {JSON.stringify(step.args, null, 2)}
              </pre>
            </div>
          )}
          {step.error && (
            <div>
              <p className="text-destructive mb-1 text-xs font-medium uppercase tracking-wide">
                Error
              </p>
              <pre className="bg-destructive/10 text-destructive overflow-x-auto rounded p-3 font-mono text-xs">
                {step.error}
              </pre>
            </div>
          )}
          {step.result !== undefined && !step.error && (
            <div>
              <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">
                Result
              </p>
              <pre className="bg-muted overflow-x-auto rounded p-3 font-mono text-xs">
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
