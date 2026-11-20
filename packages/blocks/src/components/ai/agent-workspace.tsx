"use client"

import * as React from "react"
import { CheckCircle, XCircle, ChevronDown, ChevronRight, Lightbulb } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  ScrollArea,
} from "@aetherstack/ui"

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

function StepItem({ step, index }: { step: AgentStep; index: number }) {
  const [open, setOpen] = React.useState(false)
  const hasDetails = step.args !== undefined || step.result !== undefined

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
        <StepIcon status={step.status} />
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
          {step.result !== undefined && (
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
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {doneCount} / {steps.length} steps
                  </span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Tool calls
          </h3>
          <ScrollArea className="max-h-80">
            <div className="flex flex-col gap-2 pr-2">
              {steps.map((step, i) => (
                <StepItem key={step.id} step={step} index={i} />
              ))}
              {steps.length === 0 && (
                <p className="text-muted-foreground py-4 text-center text-sm">No steps yet</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {reasoning && (
          <div className="w-64 shrink-0">
            <Card>
              <CardHeader className="pb-2">
                <button
                  className="text-muted-foreground hover:text-foreground flex w-full items-center gap-2 text-sm font-medium transition-colors"
                  onClick={() => setReasoningOpen((o) => !o)}
                >
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  Reasoning
                  <span className="ml-auto">
                    {reasoningOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                </button>
              </CardHeader>
              {reasoningOpen && (
                <CardContent>
                  <div className="bg-muted text-muted-foreground max-h-40 overflow-y-auto whitespace-pre-wrap rounded p-3 font-mono text-xs leading-relaxed">
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
            <div className="bg-muted overflow-x-auto whitespace-pre-wrap rounded p-3 font-mono text-sm">
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
