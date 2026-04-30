import type { Metadata } from "next"
import { OnboardingChecklist } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Onboarding Checklist",
  description: "Step-by-step onboarding checklist with progress bar and hide-completed toggle.",
}

const STEPS = [
  { id: "profile", title: "Complete your profile", description: "Add your name and avatar.", completed: true },
  { id: "project", title: "Create your first project", description: "Set up a new workspace project.", completed: true },
  { id: "team", title: "Invite a team member", description: "Collaborate by inviting colleagues.", completed: false },
  { id: "billing", title: "Add a payment method", description: "Upgrade to unlock premium features.", completed: false },
  { id: "deploy", title: "Deploy to production", description: "Go live with your first deployment.", completed: false },
]

export default function OnboardingChecklistPage() {
  return (
    <BlockPage
      name="Onboarding Checklist"
      category="Onboarding"
      description="A guided onboarding checklist with a progress bar, toggleable steps, and a 'hide completed' option. Step state is managed internally with an external sync callback."
      cliInstall="npx aether-ui add onboarding-checklist"
      previewHeight="460px"
      importCode={`import { OnboardingChecklist } from "@aetherstack/blocks"
import type { OnboardingStep } from "@aetherstack/blocks"`}
      usageCode={`import { OnboardingChecklist } from "@aetherstack/blocks"

const steps = [
  { id: "profile", title: "Complete your profile", completed: true },
  { id: "project", title: "Create your first project", completed: false },
  { id: "team",    title: "Invite a team member",    completed: false },
]

export default function WelcomePage() {
  return (
    <OnboardingChecklist
      steps={steps}
      title="Get started"
      description="Complete these steps to set up your workspace."
      onStepToggle={(id, completed) => updateStep(id, completed)}
    />
  )
}`}
      preview={
        <div className="p-6">
          <OnboardingChecklist steps={STEPS} />
        </div>
      }
      props={[
        { name: "steps", type: "OnboardingStep[]", required: true, description: "Array of steps. Each has id, title, optional description, optional completed flag, and optional href." },
        { name: "title", type: "string", default: '"Get started"', description: "Section heading." },
        { name: "description", type: "string", description: "Supporting description below the heading." },
        { name: "onStepToggle", type: "(id: string, completed: boolean) => void", description: "Called when the user checks or unchecks a step." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Steps use the Checkbox primitive which carries proper aria-checked state.",
        "The progress bar uses the Progress primitive with a descriptive aria-label.",
        "Completed steps are visually distinguished and have a strikethrough label.",
      ]}
    />
  )
}
