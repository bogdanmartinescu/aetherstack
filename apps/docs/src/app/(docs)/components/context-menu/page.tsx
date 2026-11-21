"use client"

import { ComponentPage } from "@/components/component-page"
import { ContextMenuPreview } from "@/components/previews/interactive-previews"

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

// Content, Item, CheckboxItem, RadioItem, Label, Separator, Shortcut,
// SubTrigger, SubContent — see packages/ui/src/components/context-menu.tsx

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuRadioGroup,
}`

export default function ContextMenuPage() {
  return (
    <ComponentPage
      name="Context Menu"
      description="A right-click (or long-press) menu. Built on Radix UI ContextMenu — handles focus, keyboard navigation, and ARIA menu patterns automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/context-menu"
      features={[
        "Opens on right-click / contextmenu; long-press on touch",
        "Full keyboard navigation — arrow keys, Enter, Escape",
        "Checkbox and radio item variants",
        "Keyboard shortcut display with ContextMenuShortcut",
        "Sub-menus via ContextMenuSub + ContextMenuSubTrigger",
        "Animated open/close with Tailwind data-state classes",
      ]}
      preview={<ContextMenuPreview />}
      previewCode={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
      cliInstall={`npx @aetherstack/cli add context-menu`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-context-menu lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Basic context menu",
          description: "Right-click the dashed area to open the menu.",
          preview: <ContextMenuPreview />,
          code: `<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
      ]}
      props={[
        {
          name: "ContextMenuTrigger",
          type: "React.ComponentPropsWithoutRef",
          description:
            "Element that receives the contextmenu event. Use asChild to wrap custom markup.",
        },
        {
          name: "ContextMenuContent",
          type: "React.ComponentPropsWithoutRef",
          description: "The popup menu panel. Portaled by default.",
        },
        {
          name: "ContextMenuItem",
          type: "React.ComponentPropsWithoutRef & { inset?: boolean }",
          description: "A selectable menu row. Supports disabled and inset.",
        },
        {
          name: "ContextMenuShortcut",
          type: "React.HTMLAttributes<HTMLSpanElement>",
          description: "Right-aligned shortcut hint inside an item.",
        },
      ]}
      a11yNotes={[
        "Uses role=menu / menuitem from Radix; Escape closes and restores focus.",
        "Provide a visible trigger affordance (e.g. “Right-click here”) so the control is discoverable.",
        "Touch: long-press opens the menu where supported by the browser.",
      ]}
    />
  )
}
