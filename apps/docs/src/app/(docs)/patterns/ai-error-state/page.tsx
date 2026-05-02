import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { AIErrorStatePreview } from "./preview"

export const metadata: Metadata = {
  title: "AI Error State",
  description: "A contextual error display for AI failures with pre-configured messages for common error types.",
}

export default function AIErrorStatePage() {
  return (
    <PatternPage
      name="AI Error State"
      description="A contextual error display for AI-specific failure modes. Accepts a type prop that maps to a pre-configured icon, heading, and description. Supports a custom message override and an optional onRetry callback that renders a retry button."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add ai-error-state"
      importCode={`import { AIErrorState } from "@aetherstack/patterns"`}
      usageCode={`import { AIErrorState } from "@aetherstack/patterns"

export function MyErrorState() {
  return (
    <AIErrorState
      type="rate-limit"
      onRetry={() => retryRequest()}
    />
  )
}

// With a custom message
export function CustomErrorState() {
  return (
    <AIErrorState
      type="generic"
      message="Something went wrong. Please check your API key."
      onRetry={() => retryRequest()}
    />
  )
}`}
      preview={<AIErrorStatePreview />}
      props={[
        { name: "type", type: '"rate-limit" | "context-length" | "provider-outage" | "network" | "generic"', default: '"generic"', description: "Error type that maps to a pre-configured icon, heading, and description." },
        { name: "message", type: "string", description: "Custom error message that overrides the default description for the selected type." },
        { name: "onRetry", type: "() => void", description: "When provided, renders a Retry button that calls this handler on click." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the root container." },
      ]}
      a11yNotes={[
        "The error container uses role='alert' so screen readers announce it immediately when mounted.",
        "The error icon is aria-hidden — the heading and description convey the full error context.",
        "The retry button uses a descriptive aria-label that includes the error type for context.",
      ]}
    />
  )
}
