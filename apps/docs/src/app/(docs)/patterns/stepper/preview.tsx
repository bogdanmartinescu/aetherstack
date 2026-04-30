"use client"

import * as React from "react"
import { Stepper } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

const STEPS = [
  { id: "account", label: "Account", description: "Create your account" },
  { id: "profile", label: "Profile", description: "Set up your profile" },
  { id: "billing", label: "Billing", description: "Add payment method" },
  { id: "confirm", label: "Confirm", description: "Review and confirm" },
]

export function StepperPreview() {
  const [step, setStep] = React.useState(1)

  return (
    <div className="w-full max-w-xl space-y-6">
      <Stepper steps={STEPS} currentStep={step} orientation="horizontal" />
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </span>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
