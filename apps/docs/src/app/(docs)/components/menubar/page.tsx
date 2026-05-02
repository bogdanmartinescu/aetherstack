import type { Metadata } from "next"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Menubar",
  description: "An application-level menu bar for top-level navigation commands.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// Full source: packages/ui/src/components/menubar.tsx`

export default function MenubarPage() {
  return (
    <ComponentPage
      name="Menubar"
      description="An application-level menu bar for top-level navigation commands. Keyboard navigable with full support for sub-menus, checkboxes, radio groups, and keyboard shortcuts display."
      radixSource="https://www.radix-ui.com/primitives/docs/components/menubar"
      features={[
        "Keyboard navigable with arrow keys",
        "Supports sub-menus, checkboxes, and radio groups",
        "Built on Radix UI Menubar primitive",
        "Includes shortcuts display via MenubarShortcut",
      ]}
      preview={
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Save <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>Show Sidebar</MenubarCheckboxItem>
              <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Zoom</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Zoom In</MenubarItem>
                  <MenubarItem>Zoom Out</MenubarItem>
                  <MenubarItem>Reset Zoom</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      }
      previewCode={`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
      cliInstall={`npx aether-ui add menubar`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-menubar lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With sub-menu",
          description: "Nest MenubarSub inside any MenubarContent for fly-out sub-menus.",
          preview: (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Bold</MenubarItem>
                  <MenubarItem>Italic</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Font Size</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Small</MenubarItem>
                      <MenubarItem>Medium</MenubarItem>
                      <MenubarItem>Large</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `<MenubarMenu>
  <MenubarTrigger>Format</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>Bold</MenubarItem>
    <MenubarSeparator />
    <MenubarSub>
      <MenubarSubTrigger>Font Size</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>Small</MenubarItem>
        <MenubarItem>Large</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`,
        },
        {
          title: "With checkbox items",
          description: "Use MenubarCheckboxItem for toggleable settings.",
          preview: (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem checked>Word Wrap</MenubarCheckboxItem>
                  <MenubarCheckboxItem>Line Numbers</MenubarCheckboxItem>
                  <MenubarCheckboxItem>Minimap</MenubarCheckboxItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          code: `<MenubarMenu>
  <MenubarTrigger>View</MenubarTrigger>
  <MenubarContent>
    <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
      Word Wrap
    </MenubarCheckboxItem>
    <MenubarCheckboxItem checked={lineNumbers} onCheckedChange={setLineNumbers}>
      Line Numbers
    </MenubarCheckboxItem>
  </MenubarContent>
</MenubarMenu>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Menubar",
          props: [
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the root menubar element.",
            },
          ],
        },
        {
          title: "MenubarItem",
          props: [
            {
              name: "inset",
              type: "boolean",
              description: "Adds left padding to align text with items that have icons.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Prevents the item from being selected.",
            },
          ],
        },
        {
          title: "MenubarShortcut",
          props: [
            {
              name: "children",
              type: "ReactNode",
              description: "The keyboard shortcut text to display right-aligned (e.g. ⌘S).",
            },
          ],
        },
        {
          title: "MenubarCheckboxItem",
          props: [
            {
              name: "checked",
              type: "boolean",
              description: "Controlled checked state.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              description: "Callback fired when the checked state changes.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Menubar follows the ARIA menubar pattern — arrow keys navigate between menus and items.",
        "Escape closes the open menu and returns focus to the trigger.",
        "Each MenubarMenu is a menu landmark; MenubarContent uses role='menu'.",
        "MenubarCheckboxItem has role='menuitemcheckbox' with aria-checked managed by Radix UI.",
      ]}
    />
  )
}
