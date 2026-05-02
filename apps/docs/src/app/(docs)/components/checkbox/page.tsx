"use client"

import { ComponentPage } from "@/components/component-page"
import { CheckboxPreview } from "@/components/previews/interactive-previews"
import { Label } from "@aetherstack/ui"

const MANUAL_SOURCE = `import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary",
      "ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }`

export default function CheckboxPage() {
  return (
    <ComponentPage
      name="Checkbox"
      description="A checkbox input built on Radix UI Checkbox. Supports checked, unchecked, and indeterminate states, with full keyboard accessibility and disabled support."
      radixSource="https://www.radix-ui.com/primitives/docs/components/checkbox"
      features={[
        "Checked, unchecked, and indeterminate states",
        "Fully keyboard accessible — toggle with Space",
        "Controlled and uncontrolled usage",
        "Disabled state with visual feedback",
        "Integrates with Label via htmlFor/id",
      ]}
      preview={<CheckboxPreview />}
      previewCode={`"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(value) => setChecked(Boolean(value))}
      />
      <Label htmlFor="terms">
        {checked ? "Checked" : "Unchecked"}
      </Label>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add checkbox`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-checkbox lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With label",
          preview: (
            <div className="flex items-center space-x-2">
              <CheckboxPreview />
            </div>
          ),
          code: `"use client"
import { useState } from "react"

export function CheckboxWithLabel() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(v) => setChecked(Boolean(v))}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`,
        },
        {
          title: "Disabled",
          preview: (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="dis1" disabled className="h-4 w-4 rounded-sm border border-primary opacity-50 cursor-not-allowed" />
                <Label htmlFor="dis1" className="opacity-50">Disabled unchecked</Label>
              </div>
            </div>
          ),
          code: `<Checkbox id="terms" disabled />
<Label htmlFor="terms" className="opacity-50">
  Disabled unchecked
</Label>`,
        },
        {
          title: "Checkbox group",
          description: "Build multi-select groups by rendering multiple checkboxes.",
          preview: (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-foreground mb-3">
                Notification preferences
              </legend>
              {["Email", "Push notifications", "SMS"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckboxPreview />
                  <Label>{item}</Label>
                </div>
              ))}
            </fieldset>
          ),
          code: `<fieldset className="space-y-3">
  <legend className="text-sm font-medium mb-3">Notifications</legend>
  {["Email", "Push", "SMS"].map((item) => (
    <div key={item} className="flex items-center space-x-2">
      <Checkbox id={item} />
      <Label htmlFor={item}>{item}</Label>
    </div>
  ))}
</fieldset>`,
        },
        {
          title: "Indeterminate",
          description: "Use the indeterminate state for a parent checkbox that represents a partially-selected group.",
          preview: (
            <div className="flex items-center space-x-2 opacity-80">
              <div className="h-4 w-4 rounded-sm border border-primary bg-primary flex items-center justify-center">
                <div className="h-0.5 w-2.5 bg-primary-foreground rounded" />
              </div>
              <Label>Select all (partial)</Label>
            </div>
          ),
          code: `<Checkbox
  id="select-all"
  checked={indeterminate ? "indeterminate" : allSelected}
  onCheckedChange={handleSelectAll}
/>
<Label htmlFor="select-all">Select all</Label>`,
        },
      ]}
      props={[
        {
          name: "checked",
          type: "boolean | 'indeterminate'",
          description: "Controlled checked state. Pass 'indeterminate' for the partial-selection state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          default: "false",
          description: "Uncontrolled initial checked state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean | 'indeterminate') => void",
          description: "Callback fired when the checked state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents interaction and applies reduced opacity.",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Marks the checkbox as required in a form.",
        },
        {
          name: "name",
          type: "string",
          description: "The name of the checkbox for form submission.",
        },
        {
          name: "value",
          type: "string",
          default: '"on"',
          description: "The value submitted with the form when the checkbox is checked.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names on the root element.",
        },
      ]}
      a11yNotes={[
        "Uses the native checkbox role — screen readers announce checked/unchecked/indeterminate state automatically.",
        "Always provide a visible label via Label with matching htmlFor, or aria-label for icon-only checkboxes.",
        "Space key toggles the checkbox. Tab moves focus.",
        "The indeterminate state is announced as 'mixed' by screen readers.",
      ]}
    />
  )
}
