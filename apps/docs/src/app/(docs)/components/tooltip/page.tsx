import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { TooltipPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Tooltip",
  description: "A contextual label shown on hover or focus.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }`

export default function TooltipPage() {
  return (
    <ComponentPage
      name="Tooltip"
      description="A small contextual label that appears on hover or keyboard focus. Built on Radix UI Tooltip. Requires a TooltipProvider ancestor — add it once at your app root or layout."
      radixSource="https://www.radix-ui.com/primitives/docs/components/tooltip"
      features={[
        "Opens on hover and keyboard focus",
        "Animated entry/exit with fade and zoom",
        "Portal-based — renders outside the DOM flow",
        "Configurable delay, side, alignment",
        "Requires TooltipProvider once at the root",
      ]}
      preview={<TooltipPreview />}
      previewCode={`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

// Add TooltipProvider once in your layout or root component
export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`}
      cliInstall={`npx aether-ui add tooltip`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-tooltip`,
          filename: "terminal",
        },
        {
          title: "Add TooltipProvider to your root layout",
          code: `import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`,
          filename: "src/app/layout.tsx",
        },
      ]}
      examples={[
        {
          title: "Icon button tooltip",
          description: "Always add tooltips to icon-only buttons.",
          preview: <TooltipPreview />,
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon" aria-label="Copy to clipboard">
        <Copy className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy to clipboard</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: "Different sides",
          description: "Control tooltip position with the side prop.",
          preview: <TooltipPreview />,
          code: `<TooltipProvider>
  {(["top", "right", "bottom", "left"] as const).map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger asChild>
        <Button variant="outline" className="capitalize">{side}</Button>
      </TooltipTrigger>
      <TooltipContent side={side}>
        Tooltip on {side}
      </TooltipContent>
    </Tooltip>
  ))}
</TooltipProvider>`,
        },
        {
          title: "With delay",
          description: "Use delayDuration to control how long before the tooltip appears.",
          preview: <TooltipPreview />,
          code: `<TooltipProvider delayDuration={700}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">700ms delay</Button>
    </TooltipTrigger>
    <TooltipContent>Took a moment to appear</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: "Rich tooltip content",
          preview: <TooltipPreview />,
          code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <HelpCircle className="h-4 w-4 text-muted-foreground" />
    </Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <p className="font-medium">Pro plan required</p>
    <p className="text-xs opacity-80 mt-1">
      This feature is available on the Pro plan and above.
    </p>
  </TooltipContent>
</Tooltip>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "TooltipProvider",
          props: [
            { name: "delayDuration", type: "number", default: "700", description: "Milliseconds before the tooltip opens after hovering." },
            { name: "skipDelayDuration", type: "number", default: "300", description: "Milliseconds before delay is skipped (when moving between tooltips quickly)." },
            { name: "disableHoverableContent", type: "boolean", default: "false", description: "When true, tooltip closes immediately when the pointer moves to the content." },
          ],
        },
        {
          title: "Tooltip (Root)",
          props: [
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
            { name: "delayDuration", type: "number", description: "Override the provider delay for this specific tooltip." },
          ],
        },
        {
          title: "TooltipContent",
          props: [
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side to render." },
            { name: "sideOffset", type: "number", default: "4", description: "Distance from the trigger in pixels." },
            { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment relative to the trigger." },
            { name: "className", type: "string", description: "Additional classes. Use max-w-* for rich content." },
          ],
        },
      ]}
      a11yNotes={[
        "Tooltip text is announced by screen readers when the trigger receives focus.",
        "Tooltip content is not interactive — do not put buttons or links inside a tooltip.",
        "For interactive content on hover, use Popover (not included in this set) instead.",
        "Always add aria-label to icon-only triggers — the tooltip alone is not sufficient for screen readers that don't use hover.",
        "Tooltips must not contain essential information — always ensure the UI is usable without tooltip text visible.",
      ]}
    />
  )
}
