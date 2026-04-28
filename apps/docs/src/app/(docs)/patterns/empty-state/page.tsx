import type { Metadata } from "next"
import { EmptyState } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"
import { Users } from "lucide-react"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Empty State",
  description: "Icon, title, description and CTA for zero-data views.",
}

export default function EmptyStatePage() {
  return (
    <PatternPage
      name="Empty State"
      description="A consistent presentation for views with no data yet. Guides users toward the first meaningful action."
      cliInstall="npx aether-ui add empty-state"
      importCode={`import { EmptyState } from "@aetherstack/patterns"`}
      usageCode={`import { Users } from "lucide-react"
import { EmptyState } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

<EmptyState
  icon={<Users className="h-5 w-5" />}
  title="No team members yet"
  description="Invite your colleagues to collaborate on projects and manage permissions."
  action={<Button>Invite member</Button>}
  secondaryAction={<Button variant="outline">Learn more</Button>}
/>`}
      preview={
        <div className="w-full max-w-md">
          <EmptyState
            icon={<Users className="h-5 w-5" />}
            title="No team members yet"
            description="Invite your colleagues to collaborate on projects and manage permissions."
            action={<Button size="sm">Invite member</Button>}
            secondaryAction={<Button variant="outline" size="sm">Learn more</Button>}
          />
        </div>
      }
      props={[
        { name: "title", type: "string", required: true, description: "Short, friendly heading." },
        { name: "icon", type: "ReactNode", description: "Icon displayed in the muted circle above the title. Recommended: Lucide icon, h-5 w-5." },
        { name: "description", type: "string", description: "Explanatory text below the title." },
        { name: "action", type: "ReactNode", description: "Primary CTA — typically a Button." },
        { name: "secondaryAction", type: "ReactNode", description: "Secondary CTA — typically an outline or ghost Button." },
        { name: "className", type: "string", description: "Additional classes. Overrides the dashed-border default container." },
      ]}
      a11yNotes={[
        "The icon is purely decorative — wrap in aria-hidden or use a Lucide icon (already aria-hidden by default).",
        "Do not hide empty states from assistive technologies — they're informative content.",
        "Ensure the CTA button has a descriptive label that makes sense out of context.",
      ]}
    />
  )
}
