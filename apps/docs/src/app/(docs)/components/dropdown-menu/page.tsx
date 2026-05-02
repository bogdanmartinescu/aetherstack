"use client"

import { ComponentPage } from "@/components/component-page"
import {
  DropdownMenuPreview,
  DropdownMenuGroupPreview,
  DropdownMenuCheckboxPreview,
  DropdownMenuShortcutsPreview,
} from "@/components/previews/interactive-previews"

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuContent = React.forwardRef<...>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out ...",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

const DropdownMenuItem = React.forwardRef<...>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))

const DropdownMenuCheckboxItem = React.forwardRef<...>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn("...", className)} checked={checked} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))

const DropdownMenuLabel = React.forwardRef<...>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold", inset && "pl-8", className)}
    {...props}
  />
))

const DropdownMenuSeparator = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}

// + DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioItem
// Full source: packages/ui/src/components/dropdown-menu.tsx

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
}`

export default function DropdownMenuPage() {
  return (
    <ComponentPage
      name="Dropdown Menu"
      description="A floating menu anchored to a trigger. Built on Radix UI DropdownMenu — handles focus management, keyboard navigation, and ARIA menu patterns automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/dropdown-menu"
      features={[
        "Full keyboard navigation — arrow keys, Enter, Escape, Tab",
        "Focus is trapped within the menu while open",
        "Supports grouped items with labels",
        "Checkbox and radio item variants for toggleable options",
        "Keyboard shortcut display with DropdownMenuShortcut",
        "Sub-menus via DropdownMenuSub + DropdownMenuSubTrigger",
        "Animated open/close with Tailwind data-state classes",
      ]}
      preview={<DropdownMenuPreview />}
      previewCode={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
      cliInstall={`npx aether-ui add dropdown-menu`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-dropdown-menu lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With groups",
          description: "Use DropdownMenuGroup and DropdownMenuLabel to organize items into named sections.",
          preview: <DropdownMenuGroupPreview />,
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>Team</DropdownMenuLabel>
      <DropdownMenuItem>Invite members</DropdownMenuItem>
      <DropdownMenuItem>Team settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        },
        {
          title: "With checkboxes",
          description: "Use DropdownMenuCheckboxItem for toggleable boolean options like view settings.",
          preview: <DropdownMenuCheckboxPreview />,
          code: `"use client"
import { useState } from "react"

export function ViewOptions() {
  const [showStatus, setShowStatus] = useState(true)
  const [showTimeline, setShowTimeline] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Show columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showTimeline}
          onCheckedChange={setShowTimeline}
        >
          Timeline
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
        },
        {
          title: "With shortcuts",
          description: "Add DropdownMenuShortcut to display keyboard shortcut hints alongside items.",
          preview: <DropdownMenuShortcutsPreview />,
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-48">
    <DropdownMenuItem>
      New file <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Save <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "DropdownMenuTrigger",
          props: [
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Render as the child element instead of a button. Pass a Button component for proper styling.",
            },
          ],
        },
        {
          title: "DropdownMenuContent",
          props: [
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "Alignment of the menu relative to the trigger.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"bottom"',
              description: "Preferred side for the menu to open on.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Offset in pixels from the trigger element.",
            },
          ],
        },
        {
          title: "DropdownMenuItem",
          props: [
            {
              name: "inset",
              type: "boolean",
              default: "false",
              description: "Adds left padding to align with items that have icons.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents interaction and applies reduced opacity.",
            },
            {
              name: "onSelect",
              type: "(e: Event) => void",
              description: "Callback when the item is selected. Call e.preventDefault() to keep the menu open.",
            },
          ],
        },
        {
          title: "DropdownMenuLabel",
          props: [
            {
              name: "inset",
              type: "boolean",
              default: "false",
              description: "Adds left padding to align with inset menu items.",
            },
          ],
        },
        {
          title: "DropdownMenuShortcut",
          props: [
            {
              name: "children",
              type: "ReactNode",
              description: "The keyboard shortcut string to display (e.g. ⌘S, ⌫, Ctrl+K).",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Has role='menu' — screen readers announce it as a menu.",
        "Arrow keys move focus between items; Enter or Space selects.",
        "Escape closes the menu and returns focus to the trigger.",
        "Disabled items have aria-disabled='true' and are skipped during keyboard navigation.",
        "DropdownMenuLabel is decorative — use it for visual grouping only, not as an item.",
      ]}
    />
  )
}
