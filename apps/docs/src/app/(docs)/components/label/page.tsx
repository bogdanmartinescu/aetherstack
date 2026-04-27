import type { Metadata } from "next"
import { Label, Input, Checkbox } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Label",
  description: "An accessible label for form fields.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }`

export default function LabelPage() {
  return (
    <ComponentPage
      name="Label"
      description="An accessible form label built on Radix UI Label. Automatically handles clicking the label to focus the associated control, and applies visual feedback when the associated input is disabled."
      radixSource="https://www.radix-ui.com/primitives/docs/components/label"
      features={[
        "Clicking the label focuses the associated input",
        "Dimmed when the associated input has the peer-disabled state",
        "Built on Radix UI Label for reliable accessibility semantics",
        "Works with all form primitives: Input, Textarea, Checkbox, RadioGroup, Switch, Select",
      ]}
      preview={
        <div className="space-y-2">
          <Label htmlFor="label-preview">Email address</Label>
          <Input id="label-preview" type="email" placeholder="you@example.com" className="w-64" />
        </div>
      }
      previewCode={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
      cliInstall={`npx aether-ui add label`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-label class-variance-authority`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With Input",
          preview: (
            <div className="w-64 space-y-2">
              <Label htmlFor="ex-email">Email</Label>
              <Input id="ex-email" type="email" placeholder="you@example.com" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
        },
        {
          title: "With Checkbox",
          description: "Labels work naturally alongside Checkbox, RadioGroupItem, and Switch.",
          preview: (
            <div className="flex items-center space-x-2">
              <Checkbox id="label-cb-ex" />
              <Label htmlFor="label-cb-ex">Accept terms and conditions</Label>
            </div>
          ),
          code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
        },
        {
          title: "Disabled label",
          description: "When the associated input is disabled, the label automatically reduces opacity. This uses Tailwind's peer-disabled: variant.",
          preview: (
            <div className="w-64 space-y-2">
              <Label htmlFor="dis-ex">Disabled field</Label>
              <Input id="dis-ex" placeholder="Cannot edit" disabled />
            </div>
          ),
          code: `<div className="space-y-2">
  <Label htmlFor="field">Disabled field</Label>
  <Input id="field" placeholder="Cannot edit" disabled />
</div>`,
        },
        {
          title: "Required indicator",
          description: "Add a visual required indicator using a span inside the label.",
          preview: (
            <div className="w-64 space-y-2">
              <Label htmlFor="req-ex">
                Username{" "}
                <span className="text-destructive" aria-hidden="true">*</span>
              </Label>
              <Input id="req-ex" placeholder="@handle" required />
            </div>
          ),
          code: `<Label htmlFor="username">
  Username <span className="text-destructive" aria-hidden="true">*</span>
</Label>
<Input id="username" placeholder="@handle" required />`,
        },
      ]}
      props={[
        {
          name: "htmlFor",
          type: "string",
          description: "The id of the form element this label is associated with. Clicking the label focuses that element.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names.",
        },
        {
          name: "...props",
          type: "React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>",
          description: "All Radix Label root props — which extend React.LabelHTMLAttributes<HTMLLabelElement>.",
        },
      ]}
      a11yNotes={[
        "Always use Label with htmlFor matching the input's id — this creates an explicit association.",
        "Screen readers announce the label text when the user focuses the associated input.",
        "The peer-disabled variant requires the input to appear before the label in the DOM for the CSS selector to work.",
      ]}
    />
  )
}
