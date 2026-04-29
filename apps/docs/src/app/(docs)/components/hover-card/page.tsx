import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import {
  HoverCardPreview,
  HoverCardLinkPreview,
} from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Hover Card",
  description: "A popover that appears when hovering over a trigger element. Ideal for previewing user profiles and link details.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }`

export default function HoverCardPage() {
  return (
    <ComponentPage
      name="Hover Card"
      description="A popover card revealed on hover. Built on Radix UI HoverCard — handles open/close delays, portal rendering, and ARIA attributes automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/hover-card"
      features={[
        "Opens on hover with a configurable open/close delay",
        "Positioned via Floating UI — avoids viewport clipping",
        "Animated open/close transitions",
        "Rendered in a portal to avoid z-index conflicts",
        "Configurable side, alignment, and offset",
        "Accessible — announced as a dialog to screen readers",
      ]}
      preview={<HoverCardPreview />}
      previewCode={`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { CalendarDays, User } from "lucide-react"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary underline underline-offset-4">
          Hover over me
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">@johndoe</p>
            <p className="text-xs text-muted-foreground">Joined December 2021</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Full-stack developer. Building cool things on the web.
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`}
      cliInstall={`npx aether-ui add hover-card`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-hover-card`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "User profile preview",
          description: "Show a mini profile card when hovering over a username or avatar link.",
          preview: <HoverCardPreview />,
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/profile" className="text-primary underline underline-offset-4">
      @johndoe
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-64">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <User className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold">@johndoe</p>
        <p className="text-xs text-muted-foreground">Joined December 2021</p>
      </div>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">
      Full-stack developer. Building cool things on the web.
    </p>
  </HoverCardContent>
</HoverCard>`,
        },
        {
          title: "Link preview",
          description: "Preview metadata for a link — package name, description, and stats.",
          preview: <HoverCardLinkPreview />,
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-primary underline underline-offset-4">
      @aetherstack/ui
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-72" side="top">
    <div>
      <p className="text-sm font-semibold">@aetherstack/ui</p>
      <p className="mt-1 text-xs text-muted-foreground">
        A beautifully designed component library built with Radix UI and Tailwind CSS.
      </p>
      <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
        <span>⭐ 1.2k</span>
        <span>🍴 142 forks</span>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "HoverCard (Root)",
          props: [
            {
              name: "openDelay",
              type: "number",
              default: "700",
              description: "Milliseconds to wait before opening after the pointer enters.",
            },
            {
              name: "closeDelay",
              type: "number",
              default: "300",
              description: "Milliseconds to wait before closing after the pointer leaves.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Callback when the open state changes.",
            },
          ],
        },
        {
          title: "HoverCardTrigger",
          props: [
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Render as the child element. Use with an <a> tag or Button for correct semantics.",
            },
          ],
        },
        {
          title: "HoverCardContent",
          props: [
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "Alignment of the card relative to the trigger.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"bottom"',
              description: "Preferred side for the card to appear on.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Offset in pixels between the card and the trigger.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Intended for supplementary preview content — do not place critical actions inside.",
        "Not keyboard accessible by design — hover cards are invisible to keyboard-only users.",
        "Content inside the card is read by screen readers when the card is open.",
        "Use a Dialog or Popover instead if the content needs to be keyboard accessible.",
      ]}
    />
  )
}
