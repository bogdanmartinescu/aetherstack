"use client"

import type { Metadata } from "next"
import { Popover, PopoverContent, PopoverTrigger, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const SOURCE = `import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close

const PopoverContent = React.forwardRef<...>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn("z-50 w-72 rounded-md border border-border bg-popover p-4 ...", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
)

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }`

export default function PopoverPage() {
  return (
    <ComponentPage
      name="Popover"
      description="A floating non-modal overlay anchored to a trigger. Use for detail cards, filter panels, or any contextual content that doesn't need to block interaction."
      radixSource="https://www.radix-ui.com/primitives/docs/components/popover"
      features={[
        "8 placement positions via side + align props",
        "Animates in/out with Tailwind data-state utilities",
        "Renders in a Portal — never clipped by overflow:hidden parents",
        "Closes on Escape, outside click, and when trigger unmounts",
      ]}
      preview={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Width</span>
                  <span className="font-mono">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-mono">auto</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      }
      previewCode={`import { Popover, PopoverContent, PopoverTrigger } from "@aetherstack/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm">Popover content goes here.</p>
  </PopoverContent>
</Popover>`}
      cliInstall="npx aether-ui add popover"
      manualInstallCode={SOURCE}
      manualSteps={[{ title: "Install dependencies", code: "npm install @radix-ui/react-popover", filename: "terminal" }]}
      examples={[
        {
          title: "Alignment",
          description: "Control the horizontal alignment of the popover relative to the trigger.",
          preview: (
            <div className="flex gap-2">
              {(["start", "center", "end"] as const).map((align) => (
                <Popover key={align}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">{align}</Button>
                  </PopoverTrigger>
                  <PopoverContent align={align} className="text-xs">
                    Aligned to <strong>{align}</strong>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          ),
          code: `<PopoverContent align="start">…</PopoverContent>
<PopoverContent align="center">…</PopoverContent>
<PopoverContent align="end">…</PopoverContent>`,
        },
      ]}
      props={[
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Horizontal alignment of the popover relative to the trigger." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap in pixels between the trigger and the popover." },
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side to open on." },
        { name: "className", type: "string", description: "Additional classes on PopoverContent." },
      ]}
      a11yNotes={[
        "PopoverTrigger sets aria-expanded and aria-controls automatically.",
        "The popover panel has role=\"dialog\" — focus moves into it on open.",
        "Escape closes the popover and returns focus to the trigger.",
      ]}
    />
  )
}
