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
  isLast: boolean
  orientation: "horizontal" | "vertical"
}

export interface StepperProps {
  steps: StepperItem[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
  className?: string
}

// ── StepperStep ───────────────────────────────────────────────────────────────

export function StepperStep({
  item,
  index,
  currentStep,
  isLast,
  orientation,
}: StepperStepProps) {
  const isCompleted = index < currentStep
  const isCurrent = index === currentStep

  return (
    <li
      className={cn(
        "flex gap-3",
        orientation === "horizontal" ? "flex-col items-center flex-1" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex items-center",
          orientation === "horizontal" ? "w-full" : "flex-col",
        )}
      >
        {/* Number circle */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
            isCompleted && "border-primary bg-primary text-primary-foreground",
            isCurrent && "border-primary bg-background text-primary",
            !isCompleted && !isCurrent && "border-muted-foreground bg-background text-muted-foreground",
          )}
          aria-current={isCurrent ? "step" : undefined}
        >
          {isCompleted ? (
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
          ) : (
            <span>{index + 1}</span>
          )}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className={cn(
              "transition-colors",
              orientation === "horizontal"
                ? "h-0.5 flex-1 mx-2"
                : "w-0.5 flex-1 my-2 ml-[15px]",
              index < currentStep ? "bg-primary" : "bg-border",
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Label and description */}
      <div
        className={cn(
          orientation === "horizontal" ? "text-center" : "pb-6",
          isLast && orientation === "vertical" && "pb-0",
        )}
      >
        <p
          className={cn(
            "text-sm font-medium",
            isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
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
          isLast={index === steps.length - 1}
          orientation={orientation}
        />
      ))}
    </ol>
  )
}
