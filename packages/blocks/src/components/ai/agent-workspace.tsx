"use client"

import * as React from "react"
import { CheckCircle, XCircle, ChevronDown, ChevronRight, Lightbulb } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Card, CardContent, CardHeader, CardTitle, Progress, ScrollArea } from "@aetherstack/ui"

interface AgentStep {
  id: string
  toolName: string
  status: "pending" | "running" | "done" | "error"
  args?: Record<string, unknown>
  result?: unknown
}

interface AgentWorkspaceProps {
  task?: string
  steps?: AgentStep[]
  reasoning?: string
  output?: string
  isRunning?: boolean
  className?: string
}

function StepIcon({ status }: { status: AgentStep["status"] }) {
  switch (status) {
    case "pending":
      return <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />
    case "running":
      return <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    case "done":
      return <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
    case "error":
      return <XCircle className="h-4 w-4 shrink-0 text-destructive" />
  }
}

function StepItem({ step, index }: { step: AgentStep; index: number }) {
  const [open, setOpen] = React.useState(false)
  const hasDetails = step.args !== undefined || step.result !== undefined

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
        <StepIcon status={step.status} />
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
          {step.result !== undefined && (
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

function AgentWorkspace({
  task,
  steps = [],
  reasoning,
  output,
  isRunning = false,
  className,
}: AgentWorkspaceProps) {
  const [reasoningOpen, setReasoningOpen] = React.useState(false)
  const doneCount = steps.filter((s) => s.status === "done").length
  const progress = steps.length > 0 ? (doneCount / steps.length) * 100 : 0

  return (
    <div className={cn("flex flex-col gap-4 p-4", className)}>
      {task && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Task</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{task}</p>
            {isRunning && steps.length > 0 && (
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{doneCount} / {steps.length} steps</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tool calls</h3>
          <ScrollArea className="max-h-80">
            <div className="flex flex-col gap-2 pr-2">
              {steps.map((step, i) => (
                <StepItem key={step.id} step={step} index={i} />
              ))}
              {steps.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No steps yet</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {reasoning && (
          <div className="w-64 shrink-0">
            <Card>
              <CardHeader className="pb-2">
                <button
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
                  onClick={() => setReasoningOpen((o) => !o)}
                >
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  Reasoning
                  <span className="ml-auto">
                    {reasoningOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </span>
                </button>
              </CardHeader>
              {reasoningOpen && (
                <CardContent>
                  <div className="max-h-40 overflow-y-auto rounded bg-muted p-3 text-xs leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap">
                    {reasoning}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}
      </div>

      {output && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded bg-muted p-3 text-sm whitespace-pre-wrap font-mono overflow-x-auto">
              {output}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => void navigator.clipboard.writeText(output)}
            >
              Copy output
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { AgentWorkspace }
