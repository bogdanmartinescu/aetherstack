import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { RadioGroupPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Radio Group",
  description: "A set of radio buttons for selecting a single option.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary",
      "ring-offset-background",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }`

export default function RadioGroupPage() {
  return (
    <ComponentPage
      name="RadioGroup"
      description="A group of radio buttons for selecting exactly one option from a set. Built on Radix UI RadioGroup — handles roving focus, keyboard navigation, and ARIA automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/radio-group"
      features={[
        "Single selection — selecting one item deselects others",
        "Roving focus — Arrow keys navigate between items",
        "Controlled and uncontrolled usage",
        "Disabled individual items or the entire group",
        "Works with Label via htmlFor/id",
      ]}
      preview={<RadioGroupPreview />}
      previewCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`}
      cliInstall={`npx aether-ui add radio-group`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-radio-group lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Controlled",
          description: "Use value and onValueChange for controlled usage.",
          preview: <RadioGroupPreview />,
          code: `"use client"
import { useState } from "react"

export function ControlledRadioGroup() {
  const [value, setValue] = useState("default")

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`,
        },
        {
          title: "Horizontal layout",
          preview: (
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-foreground">Plan</legend>
              <div className="flex gap-4">
                {["Starter", "Pro", "Enterprise"].map((p) => (
                  <div key={p} className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full border border-primary" />
                    <span className="text-sm text-foreground">{p}</span>
                  </div>
                ))}
              </div>
            </fieldset>
          ),
          code: `<RadioGroup className="flex gap-4" defaultValue="pro">
  {["Starter", "Pro", "Enterprise"].map((plan) => (
    <div key={plan} className="flex items-center space-x-2">
      <RadioGroupItem value={plan.toLowerCase()} id={plan} />
      <Label htmlFor={plan}>{plan}</Label>
    </div>
  ))}
</RadioGroup>`,
        },
        {
          title: "Card-style options",
          description: "Wrap each item in a Card for a richer selection UI.",
          preview: (
            <div className="grid gap-3 w-full max-w-xs">
              {["Monthly", "Yearly (save 20%)"].map((opt, i) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${i === 1 ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"}`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border ${i === 1 ? "border-primary bg-primary" : "border-primary"} flex items-center justify-center`}>
                    {i === 1 && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{opt.split(" (")[0]}</p>
                    {opt.includes("(") && (
                      <p className="text-xs text-muted-foreground">{opt.split("(")[1].replace(")", "")}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          ),
          code: `"use client"
import { useState } from "react"

export function CardRadioGroup() {
  const [selected, setSelected] = useState("monthly")
  const options = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly", description: "save 20%" },
  ]
  return (
    <RadioGroup value={selected} onValueChange={setSelected} className="grid gap-3">
      {options.map((opt) => (
        <Label
          key={opt.value}
          htmlFor={opt.value}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
            selected === opt.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
          )}
        >
          <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" />
          <div>
            <p className="font-medium">{opt.label}</p>
            {opt.description && (
              <p className="text-xs text-muted-foreground">{opt.description}</p>
            )}
          </div>
        </Label>
      ))}
    </RadioGroup>
  )
}`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "RadioGroup",
          props: [
            { name: "value", type: "string", description: "Controlled selected value." },
            { name: "defaultValue", type: "string", description: "Uncontrolled initial selected value." },
            { name: "onValueChange", type: "(value: string) => void", description: "Callback when the selected value changes." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables all items in the group." },
            { name: "required", type: "boolean", default: "false", description: "Required in form context." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Affects arrow key navigation direction." },
            { name: "className", type: "string", description: "Defaults to grid gap-2." },
          ],
        },
        {
          title: "RadioGroupItem",
          props: [
            { name: "value", type: "string", required: true, description: "The value of this radio button." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables this individual item." },
            { name: "className", type: "string", description: "Additional classes on the radio button." },
          ],
        },
      ]}
      a11yNotes={[
        "Arrow keys navigate between items within the group — Tab moves focus to/from the group, not between items.",
        "Always wrap in a <fieldset> with a <legend> for form accessibility.",
        "Each RadioGroupItem must have an associated Label.",
        "Screen readers announce the group name (from legend) and each option's label.",
      ]}
    />
  )
}
