"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Checkbox } from "@aetherstack/ui"

export interface OnboardingStep {
  id: string
  title: string
  description?: string
  completed?: boolean
  href?: string
}

export interface OnboardingChecklistProps {
  steps: OnboardingStep[]
  title?: string
  description?: string
  onStepToggle?: (id: string, completed: boolean) => void
  className?: string
}

export function OnboardingChecklist({
  steps,
  title = "Get started",
  description = "Complete these steps to set up your workspace.",
  onStepToggle,
  className,
}: OnboardingChecklistProps) {
  const [localSteps, setLocalSteps] = React.useState<OnboardingStep[]>(steps)
  const [hideCompleted, setHideCompleted] = React.useState(false)

  React.useEffect(() => {
    setLocalSteps(steps)
  }, [steps])

  const completed = localSteps.filter((s) => s.completed).length
  const total = localSteps.length
  const progressPct = total === 0 ? 0 : Math.round((completed / total) * 100)

  function handleToggle(id: string) {
    setLocalSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
    )
    const step = localSteps.find((s) => s.id === id)
    if (step) onStepToggle?.(id, !step.completed)
  }

  const visibleSteps = hideCompleted
    ? localSteps.filter((s) => !s.completed)
    : localSteps

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <span className="text-xs text-muted-foreground">
            {completed} of {total} completed
          </span>
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-1.5 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Steps */}
      <ol className="space-y-3">
        {visibleSteps.map((step) => (
          <li
            key={step.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors",
              step.completed
                ? "opacity-60"
                : "hover:border-border hover:bg-muted/40",
            )}
          >
            <Checkbox
              id={`step-${step.id}`}
              checked={Boolean(step.completed)}
              onCheckedChange={() => handleToggle(step.id)}
              className="mt-0.5 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <label
                htmlFor={`step-${step.id}`}
                className={cn(
                  "block cursor-pointer text-sm font-medium",
                  step.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {step.title}
              </label>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              )}
              {step.href && !step.completed && (
                <a
                  href={step.href}
                  className="mt-1 inline-block text-xs font-medium text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more →
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Toggle completed */}
      {localSteps.some((s) => s.completed) && (
        <button
          type="button"
          onClick={() => setHideCompleted((v) => !v)}
          className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none"
        >
          {hideCompleted ? "Show completed steps" : "Hide completed steps"}
        </button>
      )}
    </div>
  )
}
