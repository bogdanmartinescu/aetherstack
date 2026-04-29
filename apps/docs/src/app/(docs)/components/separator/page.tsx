import type { Metadata } from "next"
import { Separator } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Separator",
  description: "Visually or semantically separates content with a horizontal or vertical line.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = "Separator"

export { Separator }`

export default function SeparatorPage() {
  return (
    <ComponentPage
      name="Separator"
      description="Visually or semantically separates content. Renders as a 1px line in horizontal or vertical orientation."
      radixSource="https://www.radix-ui.com/primitives/docs/components/separator"
      features={[
        "Horizontal (default) and vertical orientations",
        'Decorative mode (default) — renders as role="none" to avoid unnecessary ARIA noise',
        'Semantic mode — set decorative={false} to render with role="separator" for meaningful dividers',
        "1px bg-border line by default, fully overridable via className",
        "Forwards ref to the underlying Radix Separator root",
      ]}
      preview={
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Aether UI</p>
            <p className="text-sm text-muted-foreground">A copy-paste component library.</p>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-sm font-medium">Components</p>
            <p className="text-sm text-muted-foreground">Accessible, composable, unstyled primitives.</p>
          </div>
        </div>
      }
      previewCode={`import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">Aether UI</p>
        <p className="text-sm text-muted-foreground">A copy-paste component library.</p>
      </div>
      <Separator />
      <div className="space-y-1">
        <p className="text-sm font-medium">Components</p>
        <p className="text-sm text-muted-foreground">Accessible, composable primitives.</p>
      </div>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add separator`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-separator`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Horizontal",
          description: "The default orientation. Renders a full-width 1px horizontal line.",
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <p className="text-sm font-medium">Above the separator</p>
              <Separator />
              <p className="text-sm text-muted-foreground">Below the separator</p>
            </div>
          ),
          code: `<div className="space-y-3">
  <p className="text-sm font-medium">Above the separator</p>
  <Separator />
  <p className="text-sm text-muted-foreground">Below the separator</p>
</div>`,
        },
        {
          title: "Vertical",
          description: 'Set orientation="vertical" and place the separator inside a flex row to divide elements side by side.',
          preview: (
            <div className="flex h-8 items-center gap-3">
              <span className="text-sm font-medium">Blog</span>
              <Separator orientation="vertical" />
              <span className="text-sm font-medium">Docs</span>
              <Separator orientation="vertical" />
              <span className="text-sm font-medium">API</span>
            </div>
          ),
          code: `<div className="flex h-8 items-center gap-3">
  <span className="text-sm">Blog</span>
  <Separator orientation="vertical" />
  <span className="text-sm">Docs</span>
  <Separator orientation="vertical" />
  <span className="text-sm">API</span>
</div>`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Controls the axis of the separator line. Use "vertical" inside flex rows.',
        },
        {
          name: "decorative",
          type: "boolean",
          default: "true",
          description: 'When true, the separator is purely visual (role="none"). Set to false for semantic separators that should be announced by screen readers.',
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names to override color, thickness, or margins.",
        },
        {
          name: "...props",
          type: "React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>",
          description: "All Radix Separator Root props are forwarded.",
        },
      ]}
      a11yNotes={[
        'Decorative separators (decorative={true}, the default) render with role="none" — they are invisible to screen readers, which is correct for purely visual dividers.',
        'Set decorative={false} only when the separator conveys meaningful structure (e.g. separating distinct sections in a navigation landmark). This renders role="separator" and announces the divider.',
        "Vertical separators inside flex rows do not need explicit height — they inherit the parent's height via h-full.",
      ]}
    />
  )
}
