"use client"

import { ComponentPage } from "@/components/component-page"
import { TabsPreview } from "@/components/previews/interactive-previews"

const MANUAL_SOURCE = `import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
      "ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }`

export default function TabsPage() {
  return (
    <ComponentPage
      name="Tabs"
      description="Layered content sections with tab-based navigation. Built on Radix UI Tabs — handles roving focus, keyboard navigation, and ARIA tabpanel semantics automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/tabs"
      features={[
        "Arrow key navigation between tabs",
        "Active tab shows bg-background with a subtle shadow",
        "Controlled and uncontrolled usage",
        "Content panels are hidden (not removed) when inactive",
        "Full keyboard accessibility",
      ]}
      preview={<TabsPreview />}
      previewCode={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Account settings content.
      </TabsContent>
      <TabsContent value="password">
        Password settings content.
      </TabsContent>
    </Tabs>
  )
}`}
      cliInstall={`npx aether-ui add tabs`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-tabs`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Default",
          preview: <TabsPreview />,
          code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>`,
        },
        {
          title: "Full width tabs",
          description: "Make the TabsList and triggers fill the full container width.",
          preview: <TabsPreview />,
          code: `<Tabs defaultValue="account">
  <TabsList className="w-full">
    <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
    <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
    <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account</TabsContent>
  <TabsContent value="billing">Billing</TabsContent>
  <TabsContent value="team">Team</TabsContent>
</Tabs>`,
        },
        {
          title: "Controlled",
          preview: <TabsPreview />,
          code: `"use client"
import { useState } from "react"

export function ControlledTabs() {
  const [tab, setTab] = useState("account")
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
    </Tabs>
  )
}`,
        },
        {
          title: "With disabled tab",
          preview: <TabsPreview />,
          code: `<TabsTrigger value="pro" disabled>
  Pro features (upgrade required)
</TabsTrigger>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Tabs (Root)",
          props: [
            { name: "defaultValue", type: "string", description: "Uncontrolled active tab value." },
            { name: "value", type: "string", description: "Controlled active tab value." },
            { name: "onValueChange", type: "(value: string) => void", description: "Callback when active tab changes." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction — affects arrow key behavior." },
            { name: "activationMode", type: '"automatic" | "manual"', default: '"automatic"', description: "Whether tabs activate on focus (automatic) or require Enter/Space (manual)." },
          ],
        },
        {
          title: "TabsTrigger",
          props: [
            { name: "value", type: "string", required: true, description: "Matches a TabsContent value." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables this tab." },
          ],
        },
        {
          title: "TabsContent",
          props: [
            { name: "value", type: "string", required: true, description: "Matches a TabsTrigger value." },
            { name: "forceMount", type: "boolean", description: "Keep the content in the DOM even when inactive (useful for forms that should not lose state)." },
          ],
        },
      ]}
      a11yNotes={[
        "Uses the tablist/tab/tabpanel ARIA pattern.",
        "Arrow keys navigate between tabs. Home goes to first, End to last.",
        "Tab key moves focus between the tab list and the active tab panel.",
        "Inactive panels are hidden with aria-hidden='true' but remain in the DOM.",
        "Use forceMount on TabsContent to keep form state alive across tab switches.",
      ]}
    />
  )
}
