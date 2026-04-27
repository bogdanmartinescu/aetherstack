import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { SelectPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Select",
  description: "A single-select dropdown built on Radix UI.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
      "ring-offset-background placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// ... (SelectContent, SelectItem, SelectLabel, SelectSeparator)
// Full source available at github.com/aetherstack/ui/packages/ui/src/components/select.tsx

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }`

export default function SelectPage() {
  return (
    <ComponentPage
      name="Select"
      description="A fully accessible single-select dropdown built on Radix UI Select. Handles positioning, keyboard navigation, search, and ARIA attributes automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/select"
      features={[
        "Keyboard navigable — Arrow keys, Home, End, type-to-search",
        "Portal-based dropdown — renders outside the DOM flow",
        "Scroll buttons when content overflows",
        "Groups with labels via SelectGroup + SelectLabel",
        "Separator support via SelectSeparator",
        "Controlled and uncontrolled",
      ]}
      preview={<SelectPreview />}
      previewCode={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
        <SelectItem value="vite">Vite</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
      cliInstall={`npx aether-ui add select`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-select lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With label",
          preview: (
            <div className="w-60 space-y-2">
              <span className="text-sm font-medium text-foreground">Framework</span>
              <SelectPreview />
            </div>
          ),
          code: `import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select…" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        },
        {
          title: "Grouped options",
          description: "Use SelectGroup and SelectLabel to group related options.",
          preview: <SelectPreview />,
          code: `<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Time (ET)</SelectItem>
      <SelectItem value="cst">Central Time (CT)</SelectItem>
      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">London (GMT)</SelectItem>
      <SelectItem value="cet">Paris (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        },
        {
          title: "Controlled",
          preview: <SelectPreview />,
          code: `"use client"
import { useState } from "react"

export function ControlledSelect() {
  const [value, setValue] = useState("")
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
        },
        {
          title: "Disabled items",
          preview: <SelectPreview />,
          code: `<SelectContent>
  <SelectItem value="active">Active</SelectItem>
  <SelectItem value="draft" disabled>Draft (coming soon)</SelectItem>
  <SelectItem value="archived">Archived</SelectItem>
</SelectContent>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Select (Root)",
          props: [
            { name: "value", type: "string", description: "Controlled selected value." },
            { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
            { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables the entire select." },
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
          ],
        },
        {
          title: "SelectTrigger",
          props: [
            { name: "className", type: "string", description: "Use w-* to control width. Defaults to w-full." },
          ],
        },
        {
          title: "SelectItem",
          props: [
            { name: "value", type: "string", required: true, description: "The item value." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables this specific item." },
          ],
        },
        {
          title: "SelectContent",
          props: [
            { name: "position", type: '"popper" | "item-aligned"', default: '"popper"', description: "Positioning strategy." },
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side to open." },
            { name: "sideOffset", type: "number", default: "4", description: "Distance from trigger in px." },
          ],
        },
      ]}
      a11yNotes={[
        "Uses the combobox ARIA pattern — trigger has role='combobox', options have role='option'.",
        "Type characters to jump to matching options.",
        "Arrow keys navigate options. Enter or Space selects. Escape closes.",
        "Always associate with a Label via htmlFor on the SelectTrigger id.",
      ]}
    />
  )
}
