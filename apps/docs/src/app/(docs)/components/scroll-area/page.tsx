import type { Metadata } from "next"
import { ScrollArea, ScrollBar } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Scroll Area",
  description: "Augments native scroll functionality for custom, cross-browser scrollbar styling.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = "ScrollArea"

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }`

const tags = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)

const horizontalItems = [
  "Dashboard", "Analytics", "Reports", "Users", "Settings",
  "Billing", "Integrations", "Docs", "Support", "Changelog",
  "API", "Webhooks",
]

export default function ScrollAreaPage() {
  return (
    <ComponentPage
      name="Scroll Area"
      description="Augments native scroll functionality for custom, cross-browser consistent scrollbar styling — without sacrificing accessibility."
      radixSource="https://www.radix-ui.com/primitives/docs/components/scroll-area"
      features={[
        "Custom styled scrollbar that looks consistent across browsers",
        "Supports vertical and horizontal scroll orientations",
        "ScrollBar is separate — add it explicitly for horizontal scroll",
        "Scrollbar auto-hides when not scrolling (OS-level behavior preserved)",
        "Forwards ref to the underlying Radix ScrollArea root",
      ]}
      preview={
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <div className="space-y-2">
            {tags.map((tag) => (
              <div key={tag} className="text-sm text-muted-foreground">
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea>
      }
      previewCode={`import { ScrollArea } from "@/components/ui/scroll-area"

const items = Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`}
      cliInstall={`npx aether-ui add scroll-area`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-scroll-area`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Vertical scroll",
          description: "Set a fixed height on ScrollArea and let content overflow naturally. The custom scrollbar appears automatically.",
          preview: (
            <ScrollArea className="h-[180px] w-[300px] rounded-md border p-4">
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div key={tag} className="rounded bg-muted px-2 py-1 text-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: `<ScrollArea className="h-[180px] w-[300px] rounded-md border p-4">
  <div className="space-y-2">
    {items.map((item) => (
      <div key={item} className="rounded bg-muted px-2 py-1 text-sm">
        {item}
      </div>
    ))}
  </div>
</ScrollArea>`,
        },
        {
          title: "Horizontal scroll",
          description: "Add a ScrollBar with orientation=\"horizontal\" for horizontal overflow. Use whitespace-nowrap to prevent wrapping.",
          preview: (
            <ScrollArea className="w-[300px] rounded-md border">
              <div className="flex w-max gap-2 p-4">
                {horizontalItems.map((item) => (
                  <div
                    key={item}
                    className="flex h-10 w-24 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ),
          code: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="w-[300px] rounded-md border">
  <div className="flex w-max gap-2 p-4">
    {items.map((item) => (
      <div key={item} className="shrink-0 w-24 h-10 ...">
        {item}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          description: "Applied to the root element. Use to set height, width, border-radius, etc.",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Content to display inside the scrollable viewport.",
        },
        {
          name: "...props",
          type: "React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>",
          description: "All Radix ScrollArea Root props are forwarded.",
        },
      ]}
      propGroups={[
        {
          title: "ScrollBar",
          props: [
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              default: '"vertical"',
              description: "Controls the scrollbar axis. Add a ScrollBar with orientation=\"horizontal\" for horizontal scroll.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the scrollbar track.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Scroll area uses native browser scrolling internally — keyboard scroll (arrow keys, Page Up/Down) works as expected.",
        "The custom scrollbar is purely visual; it does not affect focus or ARIA semantics.",
        "Ensure scrollable regions have a visible focus indicator when focused via keyboard.",
      ]}
    />
  )
}
