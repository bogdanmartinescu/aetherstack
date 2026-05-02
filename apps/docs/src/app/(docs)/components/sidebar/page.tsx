import type { Metadata } from "next"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { LayoutDashboard, Settings, Users, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Sidebar",
  description: "A context-driven collapsible sidebar with icon-only collapsed mode.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Full source: packages/ui/src/components/sidebar.tsx`

function SidebarPreview() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border" style={{ height: 280 }}>
      <SidebarProvider defaultOpen>
        <div className="flex h-full">
          <Sidebar>
            <SidebarHeader className="p-3 border-b border-border">
              <span className="text-sm font-semibold">My App</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-3 border-t border-border">
              <SidebarMenuButton>
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4 bg-background">
            <div className="flex items-center gap-2 mb-3">
              <SidebarTrigger />
              <span className="text-sm font-medium">Main content</span>
            </div>
            <p className="text-xs text-muted-foreground">Click the trigger to collapse the sidebar.</p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default function SidebarPage() {
  return (
    <ComponentPage
      name="Sidebar"
      description="A context-driven collapsible sidebar with icon-only collapsed mode. Uses SidebarProvider for state management so any descendant can trigger open/close."
      features={[
        "Collapsible to 64px icon-only mode",
        "Full 240px open mode with labels",
        "Context-based state via SidebarProvider",
        "Flexible menu, group, and footer slots",
      ]}
      preview={<SidebarPreview />}
      previewCode={`"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings } from "lucide-react"

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <span className="font-semibold">My App</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  )
}`}
      cliInstall={`npx aether-ui add sidebar`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With group labels",
          description: "Use SidebarGroup with SidebarGroupLabel to organize menu sections.",
          preview: (
            <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border" style={{ height: 240 }}>
              <SidebarProvider defaultOpen>
                <div className="flex h-full">
                  <Sidebar>
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Overview</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Users className="h-4 w-4" />
                              <span>Team</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                </div>
              </SidebarProvider>
            </div>
          ),
          code: `<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "SidebarProvider",
          props: [
            {
              name: "defaultOpen",
              type: "boolean",
              default: "true",
              description: "Initial open state (uncontrolled).",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Callback fired when the sidebar open state changes.",
            },
          ],
        },
        {
          title: "SidebarMenuButton",
          props: [
            {
              name: "isActive",
              type: "boolean",
              default: "false",
              description: "Highlights the button as the currently active route.",
            },
            {
              name: "asChild",
              type: "boolean",
              description: "Render as a child component (e.g. a Next.js Link).",
            },
          ],
        },
        {
          title: "useSidebar",
          props: [
            {
              name: "open",
              type: "boolean",
              description: "Current open state of the sidebar.",
            },
            {
              name: "setOpen",
              type: "(open: boolean) => void",
              description: "Programmatically set the sidebar open state.",
            },
            {
              name: "toggle",
              type: "() => void",
              description: "Toggle the sidebar between open and collapsed.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "SidebarTrigger renders as a Button with an aria-label describing the open/close action.",
        "When collapsed to icon-only mode, visible text labels are hidden but remain in the DOM for screen readers.",
        "Use SidebarMenuButton with asChild and a Next.js Link for proper keyboard and screen reader navigation.",
        "Ensure SidebarMenuButton isActive is set on the current route for aria-current support.",
      ]}
    />
  )
}
