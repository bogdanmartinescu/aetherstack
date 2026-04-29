import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import {
  TogglePreview,
  ToggleOutlinePreview,
  ToggleSizesPreview,
} from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Toggle",
  description: "A two-state button that can be on or off. Built on Radix UI Toggle.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }`

export default function TogglePage() {
  return (
    <ComponentPage
      name="Toggle"
      description="A two-state button that switches between on and off. Built on Radix UI Toggle — handles pressed state, ARIA, and keyboard interaction automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/toggle"
      features={[
        "Two variants: default (ghost-style) and outline (bordered)",
        "Three sizes: sm, default, lg",
        "Controlled and uncontrolled modes via pressed / defaultPressed",
        "Built-in ARIA pressed state — screen readers announce on/off",
        "First-class Lucide icon support — icons auto-sized to 16px",
        "Forwards ref to the underlying element",
      ]}
      preview={<TogglePreview />}
      previewCode={`import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  )
}`}
      cliInstall={`npx aether-ui add toggle`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-toggle class-variance-authority`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Default",
          description: "The default ghost-style toggle. Background fills on hover; accent fill when pressed.",
          preview: <TogglePreview />,
          code: `import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>`,
        },
        {
          title: "Outline variant",
          description: "A bordered toggle for use in toolbars where visual separation is needed.",
          preview: <ToggleOutlinePreview />,
          code: `import { Bold, Italic, Underline } from "lucide-react"

<Toggle variant="outline" aria-label="Toggle bold">
  <Bold />
</Toggle>
<Toggle variant="outline" aria-label="Toggle italic">
  <Italic />
</Toggle>
<Toggle variant="outline" aria-label="Toggle underline">
  <Underline />
</Toggle>`,
        },
        {
          title: "Sizes",
          description: "Three sizes — sm, default, and lg — to match surrounding UI density.",
          preview: <ToggleSizesPreview />,
          code: `import { Bold } from "lucide-react"

<Toggle size="sm" aria-label="Toggle bold">
  <Bold />
</Toggle>
<Toggle size="default" aria-label="Toggle bold">
  <Bold />
</Toggle>
<Toggle size="lg" aria-label="Toggle bold">
  <Bold />
</Toggle>`,
        },
        {
          title: "Disabled",
          description: "Disabled toggles are non-interactive and visually dimmed.",
          preview: <TogglePreview />,
          code: `import { Bold } from "lucide-react"

<Toggle disabled aria-label="Toggle bold">
  <Bold />
</Toggle>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "outline"',
          default: '"default"',
          description: "Visual style. Default is ghost-style; outline adds a border.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          default: '"default"',
          description: "Controls padding and height.",
        },
        {
          name: "pressed",
          type: "boolean",
          description: "Controlled pressed state. Use with onPressedChange.",
        },
        {
          name: "defaultPressed",
          type: "boolean",
          default: "false",
          description: "Uncontrolled initial pressed state.",
        },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          description: "Callback fired when the pressed state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents interaction and applies reduced opacity.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names merged onto the toggle element.",
        },
      ]}
      a11yNotes={[
        "Has role='button' with aria-pressed — screen readers announce the current on/off state.",
        "Always provide aria-label when the toggle contains only an icon.",
        "Keyboard accessible — toggle with Enter or Space.",
        "Focus ring is always visible on keyboard navigation (focus-visible).",
        "Disabled state has aria-disabled='true' and prevents all pointer events.",
      ]}
    />
  )
}
