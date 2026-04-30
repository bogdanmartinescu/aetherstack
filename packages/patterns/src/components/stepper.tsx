import { cn } from "@aetherstack/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StepperItem {
  id: string
  label: string
  description?: string
}

export interface StepperStepProps {
  item: StepperItem
  index: number
  currentStep: number
  isFirst: boolean
  isLast: boolean
  orientation: "horizontal" | "vertical"
}

export interface StepperProps {
  steps: StepperItem[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
  className?: string
}

// ── CheckIcon ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ── StepperStep ───────────────────────────────────────────────────────────────

export function StepperStep({
  item,
  index,
  currentStep,
  isFirst,
  isLast,
  orientation,
}: StepperStepProps) {
  const isCompleted = index < currentStep
  const isCurrent = index === currentStep

  const circleClass = cn(
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
    isCompleted && "border-primary bg-primary text-primary-foreground",
    isCurrent && "border-primary bg-background text-primary",
    !isCompleted && !isCurrent && "border-muted-foreground/40 bg-background text-muted-foreground",
  )

  const labelClass = cn(
    "text-sm font-medium leading-tight transition-colors",
    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
  )

  // ── Horizontal ──────────────────────────────────────────────────────────────
  if (orientation === "horizontal") {
    // Each step owns two half-connectors so the circle stays centered.
    // Left half: filled when this step or a previous step is active/done.
    // Right half: filled only when this step is already completed.
    const leftFilled = !isFirst && index <= currentStep
    const rightFilled = !isLast && index < currentStep

    return (
      <li className="flex flex-1 flex-col items-center gap-2">
        {/* Circle row */}
        <div className="flex w-full items-center">
          <div
            className={cn(
              "h-0.5 flex-1 transition-colors",
              isFirst ? "invisible" : leftFilled ? "bg-primary" : "bg-border",
            )}
            aria-hidden="true"
          />
          <div
            className={circleClass}
            aria-current={isCurrent ? "step" : undefined}
          >
            {isCompleted ? <CheckIcon /> : <span>{index + 1}</span>}
          </div>
          <div
            className={cn(
              "h-0.5 flex-1 transition-colors",
              isLast ? "invisible" : rightFilled ? "bg-primary" : "bg-border",
            )}
            aria-hidden="true"
          />
        </div>

        {/* Label */}
        <div className="text-center">
          <p className={labelClass}>{item.label}</p>
          {item.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
          )}
        </div>
      </li>
    )
  }

  // ── Vertical ────────────────────────────────────────────────────────────────
  return (
    <li className="flex gap-4">
      {/* Circle + connector column */}
      <div className="flex flex-col items-center">
        <div
          className={circleClass}
          aria-current={isCurrent ? "step" : undefined}
        >
          {isCompleted ? <CheckIcon /> : <span>{index + 1}</span>}
        </div>
        {!isLast && (
          <div
            className={cn(
              "mt-1 w-0.5 flex-1 transition-colors",
              isCompleted ? "bg-primary" : "bg-border",
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Label + description */}
      <div className={cn("min-w-0 pt-1", !isLast && "pb-8")}>
        <p className={labelClass}>{item.label}</p>
        {item.description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </li>
  )
}

// ── Stepper ───────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
}: StepperProps) {
  return (
    <ol
      className={cn(
        orientation === "horizontal" ? "flex items-start" : "flex flex-col",
        className,
      )}
      aria-label="Progress steps"
    >
      {steps.map((step, index) => (
        <StepperStep
          key={step.id}
          item={step}
          index={index}
          currentStep={currentStep}
          isFirst={index === 0}
          isLast={index === steps.length - 1}
          orientation={orientation}
        />
      ))}
    </ol>
  )
}
