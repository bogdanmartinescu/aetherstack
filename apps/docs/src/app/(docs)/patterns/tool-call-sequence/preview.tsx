"use client"

import * as React from "react"
import { ToolCallSequence } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

type StepStatus = "pending" | "running" | "done" | "error"

interface Step {
  id: string
  toolName: string
  status: StepStatus
  args?: Record<string, unknown>
  result?: unknown
  error?: string
}

const INITIAL_STEPS: Step[] = [
  { id: "1", toolName: "search_web", status: "done", args: { query: "latest React news" }, result: { count: 5, top: "React 19 released" } },
  { id: "2", toolName: "read_file", status: "done", args: { path: "src/app.tsx" }, result: { lines: 42 } },
  { id: "3", toolName: "run_tests", status: "running", args: { suite: "unit" } },
  { id: "4", toolName: "deploy", status: "pending" },
]

export function ToolCallSequencePreview() {
  const [steps, setSteps] = React.useState<Step[]>(INITIAL_STEPS)
  const [running, setRunning] = React.useState(false)

  function simulate() {
    setRunning(true)
    setSteps(INITIAL_STEPS)
    let delay = 0
    const updates: Array<{ id: string; status: StepStatus; result?: unknown; error?: string }> = [
      { id: "3", status: "done", result: { passed: 24, failed: 0 } },
      { id: "4", status: "running" },
      { id: "4", status: "error", error: "Deployment failed: health check timeout" },
    ]
    updates.forEach((update, i) => {
      delay += 900
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === update.id ? { ...s, status: update.status, result: update.result, error: update.error } : s
          )
        )
        if (i === updates.length - 1) setRunning(false)
      }, delay)
    })
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <ToolCallSequence steps={steps} />
      <Button size="sm" variant="outline" onClick={simulate} disabled={running}>
        Replay simulation
      </Button>
    </div>
  )
}
