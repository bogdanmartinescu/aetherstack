"use client"

import { ComponentPage } from "@/components/component-page"
import { DROPDOWN_MENU_SOURCE } from "@/lib/registry-source"
import {
  DropdownMenuPreview,
  DropdownMenuGroupPreview,
  DropdownMenuCheckboxPreview,
  DropdownMenuShortcutsPreview,
} from "@/components/previews/interactive-previews"

const MANUAL_SOURCE = DROPDOWN_MENU_SOURCE

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
      cliInstall={`npx @aetherstack/cli add dropdown-menu`}
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
          description:
            "Use DropdownMenuGroup and DropdownMenuLabel to organize items into named sections.",
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
          description:
            "Use DropdownMenuCheckboxItem for toggleable boolean options like view settings.",
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
          description:
            "Add DropdownMenuShortcut to display keyboard shortcut hints alongside items.",
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
              description:
                "Render as the child element instead of a button. Pass a Button component for proper styling.",
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
              description:
                "Callback when the item is selected. Call e.preventDefault() to keep the menu open.",
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
