import type { Metadata } from "next"
import { SettingsSection } from "@aetherstack/patterns"
import { Button, Input, Label } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Settings Section",
  description: "Structured settings card with header, content, and optional footer.",
}

export default function SettingsSectionPage() {
  return (
    <PatternPage
      name="Settings Section"
      description="A card-style section for settings pages: a bordered container with a header, body, and optional footer bar with save/cancel actions."
      cliInstall="npx aether-ui add settings-section"
      importCode={`import { SettingsSection } from "@aetherstack/patterns"`}
      usageCode={`<SettingsSection
  title="Profile"
  description="Update your personal details."
  footer={
    <>
      <Button variant="outline">Cancel</Button>
      <Button>Save changes</Button>
    </>
  }
>
  <div className="space-y-4">
    <div className="space-y-1.5">
      <Label htmlFor="display-name">Display name</Label>
      <Input id="display-name" defaultValue="Jane Smith" />
    </div>
    <div className="space-y-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue="jane@acme.com" />
    </div>
  </div>
</SettingsSection>`}
      preview={
        <div className="w-full max-w-xl">
          <SettingsSection
            title="Profile"
            description="Update your personal details."
            footer={
              <>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save changes</Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="dp-name">Display name</Label>
                <Input id="dp-name" defaultValue="Jane Smith" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dp-email">Email</Label>
                <Input id="dp-email" type="email" defaultValue="jane@acme.com" />
              </div>
            </div>
          </SettingsSection>
        </div>
      }
      props={[
        { name: "title", type: "string", required: true, description: "Section heading." },
        { name: "description", type: "string", description: "Subtext in the header." },
        { name: "headerAction", type: "ReactNode", description: "Optional action in the header row." },
        { name: "footer", type: "ReactNode", description: "Footer bar content — right-aligned. Typically Save/Cancel buttons." },
        { name: "children", type: "ReactNode", required: true, description: "Section body content." },
        { name: "className", type: "string", description: "Additional classes on the outer section element." },
      ]}
    />
  )
}
