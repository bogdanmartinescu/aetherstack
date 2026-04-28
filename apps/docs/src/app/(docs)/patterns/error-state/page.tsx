import type { Metadata } from "next"
import { ErrorState } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Error State",
  description: "Error icon, title, description and retry CTA.",
}

export default function ErrorStatePage() {
  return (
    <PatternPage
      name="Error State"
      description="A consistent presentation for failed data fetches or unexpected errors. Gives users context and a clear path forward."
      cliInstall="npx aether-ui add error-state"
      importCode={`import { ErrorState } from "@aetherstack/patterns"`}
      usageCode={`<ErrorState
  title="Failed to load members"
  description="We couldn't fetch your team data. Check your connection and try again."
  action={
    <Button variant="outline" onClick={refetch}>
      Try again
    </Button>
  }
/>

// Defaults work out of the box — no props required
<ErrorState />`}
      preview={
        <div className="w-full max-w-md">
          <ErrorState
            title="Failed to load members"
            description="We couldn't fetch your team data. Check your connection and try again."
            action={<Button variant="outline" size="sm">Try again</Button>}
          />
        </div>
      }
      props={[
        { name: "title", type: "string", default: '"Something went wrong"', description: "Error heading." },
        { name: "description", type: "string", default: '"An unexpected error occurred…"', description: "Explanatory message." },
        { name: "action", type: "ReactNode", description: "Retry or recovery CTA." },
        { name: "className", type: "string", description: "Additional classes on the container." },
      ]}
      a11yNotes={[
        "Renders with role=\"alert\" — error is announced immediately to screen readers.",
        "Pair with focus management: move focus to this component when it appears after a failed action.",
        "The retry action should re-trigger the same operation that failed.",
      ]}
    />
  )
}
