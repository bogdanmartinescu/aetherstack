import type { Metadata } from "next"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const navTriggerStyle =
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"

export const metadata: Metadata = {
  title: "Navigation Menu",
  description: "A full navigation menu with animated submenus and keyboard support.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Full source: packages/ui/src/components/navigation-menu.tsx`

export default function NavigationMenuPage() {
  return (
    <ComponentPage
      name="Navigation Menu"
      description="A full navigation menu with animated content panels and keyboard support. Supports nested content areas that slide in on hover or focus, built on Radix UI NavigationMenu."
      radixSource="https://www.radix-ui.com/primitives/docs/components/navigation-menu"
      features={[
        "Supports nested content panels",
        "Animated show/hide with slide transitions",
        "Keyboard accessible (arrow keys, Escape)",
        "Built on Radix UI NavigationMenu",
      ]}
      preview={
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4 w-[280px]">
                  <li>
                    <NavigationMenuLink className="block rounded-md p-2 hover:bg-muted" href="#">
                      <div className="text-sm font-medium">Aether UI</div>
                      <div className="text-xs text-muted-foreground">Design system primitives</div>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink className="block rounded-md p-2 hover:bg-muted" href="#">
                      <div className="text-sm font-medium">Aether CLI</div>
                      <div className="text-xs text-muted-foreground">Component installation tool</div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navTriggerStyle} href="#">
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navTriggerStyle} href="#">
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      }
      previewCode={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 w-[280px]">
              <li>
                <NavigationMenuLink href="/ui" className="block rounded-md p-2 hover:bg-muted">
                  <div className="text-sm font-medium">Aether UI</div>
                  <div className="text-xs text-muted-foreground">Design system primitives</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navTriggerStyle} href="/docs">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`}
      cliInstall={`npx aether-ui add navigation-menu`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-navigation-menu class-variance-authority lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Simple link list",
          description: "Use navTriggerStyle for standalone links with consistent hover treatment.",
          preview: (
            <NavigationMenu>
              <NavigationMenuList>
                {["Home", "About", "Pricing", "Contact"].map((item) => (
                  <NavigationMenuItem key={item}>
                    <NavigationMenuLink className={navTriggerStyle} href="#">
                      {item}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          ),
          code: `<NavigationMenu>
  <NavigationMenuList>
    {["Home", "About", "Pricing"].map((item) => (
      <NavigationMenuItem key={item}>
        <NavigationMenuLink className={navTriggerStyle} href={\`/\${item.toLowerCase()}\`}>
          {item}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
</NavigationMenu>`,
        },
        {
          title: "With content panel",
          description: "Use NavigationMenuContent to show a rich dropdown panel.",
          preview: (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-2 p-4 w-[340px]">
                      {["Documentation", "API Reference", "Changelog", "Community"].map((r) => (
                        <NavigationMenuLink
                          key={r}
                          className="block rounded-md p-2 text-sm hover:bg-muted"
                          href="#"
                        >
                          {r}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ),
          code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid grid-cols-2 gap-2 p-4 w-[340px]">
          {resources.map((r) => (
            <NavigationMenuLink key={r.href} href={r.href} className="block rounded-md p-2 text-sm hover:bg-muted">
              {r.label}
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "NavigationMenu",
          props: [
            {
              name: "value",
              type: "string",
              description: "Controlled active item value.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Callback when the active item changes.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the root element.",
            },
          ],
        },
        {
          title: "NavigationMenuTrigger",
          props: [
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes.",
            },
          ],
        },
        {
          title: "NavigationMenuLink",
          props: [
            {
              name: "asChild",
              type: "boolean",
              description: "Merge props onto child element instead of rendering an anchor.",
            },
            {
              name: "active",
              type: "boolean",
              description: "Marks the link as the current page (aria-current='page').",
            },
          ],
        },
        {
          title: "navigationMenuTriggerStyle",
          props: [
            {
              name: "()",
              type: "string",
              description: "Utility function — returns a className string for standalone NavigationMenuLink items.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "NavigationMenu implements the ARIA navigation menu pattern with role='navigation'.",
        "Arrow keys navigate between top-level items; Enter or Space opens sub-content.",
        "Escape closes open content panels and returns focus to the trigger.",
        "Use NavigationMenuLink active prop to set aria-current='page' on the active route.",
      ]}
    />
  )
}
