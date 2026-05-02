"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@aetherstack/ui"
import { Stepper } from "@aetherstack/patterns"

interface OnboardingStep {
  id: string
  title: string
  description?: string
  content: React.ReactNode
}

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: "api-key",
    title: "Add your API key",
    description: "Connect your AI provider",
    content: <p className="text-sm text-muted-foreground">Enter your API key to get started.</p>,
  },
  {
    id: "model",
    title: "Choose a model",
    description: "Select your preferred AI model",
    content: <p className="text-sm text-muted-foreground">Pick a model that fits your needs.</p>,
  },
  {
    id: "try",
    title: "Try an example",
    description: "See AI in action",
    content: <p className="text-sm text-muted-foreground">Send your first message to see how it works.</p>,
  },
]

interface AIOnboardingProps {
  steps?: OnboardingStep[]
  onComplete?: () => void
  className?: string
}

function AIOnboarding({
  steps = DEFAULT_STEPS,
  onComplete,
  className,
}: AIOnboardingProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  function next() {
    if (isLast) {
      onComplete?.()
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  function back() {
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  const stepperItems = steps.map((s) => ({
    id: s.id,
    label: s.title,
    ...(s.description !== undefined ? { description: s.description } : {}),
  }))

  return (
    <div className={cn("flex flex-col gap-6 max-w-lg mx-auto py-8", className)}>
      <Stepper steps={stepperItems} currentStep={currentStep} orientation="horizontal" />

      {step && (
        <Card>
          <CardHeader>
            <CardTitle>{step.title}</CardTitle>
            {step.description && <CardDescription>{step.description}</CardDescription>}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {step.content}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={back}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button onClick={next}>
                {isLast ? "Get started" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { AIOnboarding }
