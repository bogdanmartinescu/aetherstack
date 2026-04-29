import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import {
  ToggleGroupPreview,
  ToggleGroupMultiplePreview,
  ToggleGroupOutlinePreview,
} from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Toggle Group",
  description: "A set of two-state toggle buttons that can enforce single or multiple selection.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toggleVariants } from "./toggle"

type ToggleGroupContextValue = VariantProps<typeof toggleVariants>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))
ToggleGroup.displayName = "ToggleGroup"

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }`

export default function ToggleGroupPage() {
  return (
    <ComponentPage
      name="Toggle Group"
      description="A group of toggle buttons with shared variant and size context. Supports single-select and multi-select modes. Built on Radix UI ToggleGroup."
      radixSource="https://www.radix-ui.com/primitives/docs/components/toggle-group"
      features={[
        "type='single' enforces at most one item active at a time",
        "type='multiple' allows any number of items to be active",
        "variant and size propagate from ToggleGroup to all child ToggleGroupItems",
        "Individual items can override variant and size from context",
        "Controlled via value/onValueChange or uncontrolled via defaultValue",
        "Full keyboard navigation — arrow keys move between items",
      ]}
      preview={<ToggleGroupPreview />}
      previewCode={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`}
      cliInstall={`npx aether-ui add toggle-group`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-toggle-group class-variance-authority`,
          filename: "terminal",
        },
        {
          title: "Add the Toggle component",
          code: `npx aether-ui add toggle`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Single select",
          description: "type='single' — only one item can be active at a time. Ideal for exclusive options like text alignment.",
          preview: <ToggleGroupPreview />,
          code: `import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight />
  </ToggleGroupItem>
</ToggleGroup>`,
        },
        {
          title: "Multiple select",
          description: "type='multiple' — any number of items can be active simultaneously. Ideal for text formatting options.",
          preview: <ToggleGroupMultiplePreview />,
          code: `import { Bold, Italic, Underline } from "lucide-react"

<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline />
  </ToggleGroupItem>
</ToggleGroup>`,
        },
        {
          title: "Outline variant",
          description: "Set variant='outline' on ToggleGroup to apply it to all items at once.",
          preview: <ToggleGroupOutlinePreview />,
          code: `import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

<ToggleGroup type="single" variant="outline" defaultValue="left">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight />
  </ToggleGroupItem>
</ToggleGroup>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "ToggleGroup",
          props: [
            {
              name: "type",
              type: '"single" | "multiple"',
              description: "Selection mode. Required. single allows one active item; multiple allows any number.",
            },
            {
              name: "value",
              type: "string | string[]",
              description: "Controlled active value(s). String for single, string[] for multiple.",
            },
            {
              name: "defaultValue",
              type: "string | string[]",
              description: "Uncontrolled initial active value(s).",
            },
            {
              name: "onValueChange",
              type: "(value: string | string[]) => void",
              description: "Callback when the active value(s) change.",
            },
            {
              name: "variant",
              type: '"default" | "outline"',
              default: '"default"',
              description: "Visual style applied to all child ToggleGroupItems.",
            },
            {
              name: "size",
              type: '"default" | "sm" | "lg"',
              default: '"default"',
              description: "Size applied to all child ToggleGroupItems.",
            },
          ],
        },
        {
          title: "ToggleGroupItem",
          props: [
            {
              name: "value",
              type: "string",
              description: "Unique identifier for this item within the group. Required.",
            },
            {
              name: "variant",
              type: '"default" | "outline"',
              description: "Overrides the variant from ToggleGroup context for this item only.",
            },
            {
              name: "size",
              type: '"default" | "sm" | "lg"',
              description: "Overrides the size from ToggleGroup context for this item only.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables this item independently of the group.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Has role='group' — screen readers announce it as a toolbar group.",
        "Each item has role='radio' (single) or role='checkbox' (multiple) with aria-checked.",
        "Always provide aria-label on icon-only ToggleGroupItems.",
        "Arrow keys move focus between items; Space or Enter toggles the focused item.",
        "Disabled items are skipped during keyboard navigation.",
      ]}
    />
  )
}
