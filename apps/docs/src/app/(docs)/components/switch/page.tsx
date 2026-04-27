import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { SwitchPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Switch",
  description: "An on/off toggle control.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }`

export default function SwitchPage() {
  return (
    <ComponentPage
      name="Switch"
      description="An on/off toggle control built on Radix UI Switch. Semantically equivalent to a checkbox but styled as a slide toggle. Use it for settings that take immediate effect without a submit step."
      radixSource="https://www.radix-ui.com/primitives/docs/components/switch"
      features={[
        "Smooth sliding thumb animation via translate",
        "Space and Enter key toggle",
        "Controlled and uncontrolled usage",
        "Disabled state",
        "Peer CSS for Label dimming",
      ]}
      preview={<SwitchPreview />}
      previewCode={`"use client"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SwitchDemo() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="flex items-center space-x-3">
      <Switch id="mode" checked={enabled} onCheckedChange={setEnabled} />
      <Label htmlFor="mode">{enabled ? "Enabled" : "Disabled"}</Label>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add switch`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-switch`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Settings list",
          description: "Common pattern: a list of toggleable settings.",
          preview: (
            <div className="w-full max-w-sm space-y-4">
              {["Email notifications", "Push notifications", "Marketing emails"].map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s}</p>
                    <p className="text-xs text-muted-foreground">
                      {s === "Marketing emails" ? "We respect your inbox." : "Delivered to your inbox."}
                    </p>
                  </div>
                  <SwitchPreview />
                </div>
              ))}
            </div>
          ),
          code: `const settings = [
  { id: "email", label: "Email notifications", description: "Delivered to your inbox." },
  { id: "push", label: "Push notifications", description: "Real-time alerts." },
]

{settings.map((s) => (
  <div key={s.id} className="flex items-center justify-between">
    <div>
      <Label htmlFor={s.id} className="font-medium">{s.label}</Label>
      <p className="text-xs text-muted-foreground">{s.description}</p>
    </div>
    <Switch id={s.id} />
  </div>
))}`,
        },
        {
          title: "Disabled",
          preview: (
            <div className="flex items-center space-x-2">
              <div className="inline-flex h-6 w-11 items-center rounded-full bg-input opacity-50 cursor-not-allowed">
                <div className="h-5 w-5 rounded-full bg-background shadow-lg translate-x-0 ml-0.5" />
              </div>
              <span className="text-sm text-muted-foreground opacity-50">Disabled</span>
            </div>
          ),
          code: `<Switch id="disabled" disabled />
<Label htmlFor="disabled" className="opacity-50">Disabled</Label>`,
        },
      ]}
      props={[
        {
          name: "checked",
          type: "boolean",
          description: "Controlled on/off state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          default: "false",
          description: "Uncontrolled initial state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Callback when the toggle state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents interaction.",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Required in form context.",
        },
        {
          name: "name",
          type: "string",
          description: "Form field name for submission.",
        },
        {
          name: "value",
          type: "string",
          default: '"on"',
          description: "Value submitted when the switch is on.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes.",
        },
      ]}
      a11yNotes={[
        "Has role='switch' — screen readers announce 'on' or 'off' states.",
        "Space key toggles the switch. Enter activates it.",
        "Always pair with a Label for a descriptive accessible name.",
        "Prefer Switch over Checkbox when the setting takes immediate effect — semantically clearer.",
      ]}
    />
  )
}
