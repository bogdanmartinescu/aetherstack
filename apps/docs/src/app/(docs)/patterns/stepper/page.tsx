import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { StepperPreview } from "./preview"

export const metadata: Metadata = {
  title: "Stepper",
  description: "Multi-step progress indicator with horizontal and vertical orientations.",
}

export default function StepperPage() {
  return (
    <PatternPage
      name="Stepper"
      description="A multi-step progress indicator that shows completed, current, and upcoming steps. Supports horizontal and vertical orientations with connector lines and optional step descriptions."
      cliInstall="npx aether-ui add stepper"
      importCode={`import { Stepper } from "@aetherstack/patterns"
import type { StepperItem } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { Stepper } from "@aetherstack/patterns"

const steps = [
  { id: "account", label: "Account",  description: "Create your account" },
  { id: "profile", label: "Profile",  description: "Set up your profile" },
  { id: "billing", label: "Billing",  description: "Add payment method" },
  { id: "confirm", label: "Confirm",  description: "Review and confirm" },
]

export function MyWizard() {
  const [currentStep, setCurrentStep] = React.useState(0)
  return (
    <>
      <Stepper steps={steps} currentStep={currentStep} orientation="horizontal" />
      {/* render step content … */}
    </>
  )
}`}
      preview={<StepperPreview />}
      props={[
        { name: "steps", type: "StepperItem[]", required: true, description: "Array of steps. Each item needs id, label, and optional description." },
        { name: "currentStep", type: "number", required: true, description: "Zero-based index of the active step. Steps below it are rendered as completed." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction of the stepper." },
        { name: "className", type: "string", description: "Additional classes on the <ol> element." },
      ]}
      a11yNotes={[
        "Rendered as an <ol aria-label=\"Progress steps\"> — correct semantic structure for an ordered sequence.",
        "The active step circle receives aria-current=\"step\".",
        "Completed steps show a checkmark icon (aria-hidden) instead of a number.",
        "Connector lines are aria-hidden decorative elements.",
      ]}
    />
  )
}
