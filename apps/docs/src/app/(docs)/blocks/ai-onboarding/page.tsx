import type { Metadata } from "next"
import { BlockPage } from "@/components/block-page"
import { AIOnboardingPreview } from "./preview"

export const metadata: Metadata = {
  title: "AI Onboarding",
  description: "A multi-step onboarding flow for introducing users to an AI feature or product.",
}

export default function AIOnboardingPage() {
  return (
    <BlockPage
      name="AI Onboarding"
      category="AI"
      description="A multi-step onboarding flow built on the Stepper pattern. Each step renders a card with a configurable title, description, and content slot. Navigation is handled internally with Back / Continue buttons and a final Get started CTA."
      cliInstall="npx aether-ui add ai-onboarding"
      previewHeight="400px"
      importCode={`import { AIOnboarding } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { AIOnboarding } from "@aetherstack/blocks"
import { Input, Label } from "@aetherstack/ui"

const steps = [
  {
    id: "api-key",
    title: "Add your API key",
    description: "Connect your AI provider",
    content: (
      <div className="flex flex-col gap-2">
        <Label>API Key</Label>
        <Input placeholder="sk-…" type="password" />
      </div>
    ),
  },
  {
    id: "model",
    title: "Choose a model",
    description: "Select your preferred AI model",
    content: <p className="text-sm text-muted-foreground">Pick the model that fits your needs.</p>,
  },
  {
    id: "try",
    title: "Try an example",
    description: "See AI in action",
    content: <p className="text-sm text-muted-foreground">Send your first message to see how it works.</p>,
  },
]

export function SetupFlow() {
  return (
    <AIOnboarding
      steps={steps}
      onComplete={() => console.log("Onboarding complete")}
    />
  )
}`}
      preview={<AIOnboardingPreview />}
      props={[
        { name: "steps", type: "OnboardingStep[]", description: "Array of step objects. Each has id, title, optional description, and a content ReactNode. Defaults to a 3-step API key / model / try-it flow." },
        { name: "onComplete", type: "() => void", description: "Called when the user clicks 'Get started' on the final step." },
        { name: "className", type: "string", description: "Additional classes on the root wrapper." },
      ]}
      a11yNotes={[
        "Step progress is rendered with the Stepper pattern which uses a visually styled list.",
        "Back button is disabled (not hidden) on the first step to preserve keyboard flow.",
        "The step card title is a semantic heading inside CardHeader.",
      ]}
    />
  )
}
