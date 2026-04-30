"use client"

import type { Metadata } from "next"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Button,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const SOURCE = `"use client"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
// ... sub-components wrap DrawerPrimitive.*

export { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter,
         DrawerTitle, DrawerDescription, DrawerClose }`

export default function DrawerPage() {
  return (
    <ComponentPage
      name="Drawer"
      description="A bottom sheet drawer built on Vaul. Supports drag-to-dismiss, scale-background effect, and snapping. Ideal for mobile-first interactions."
      radixSource="https://github.com/emilkowalski/vaul"
      features={[
        "Drag handle with smooth dismiss gesture",
        "shouldScaleBackground scales the page content behind it",
        "Portal-rendered — never clipped by overflow parents",
        "Works on desktop and mobile",
      ]}
      preview={
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Move goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <p className="text-center text-sm text-muted-foreground">Drag down to dismiss.</p>
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      }
      previewCode={`import {
  Drawer, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@aetherstack/ui"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* content */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      cliInstall="npx aether-ui add drawer"
      manualInstallCode={SOURCE}
      manualSteps={[{ title: "Install dependencies", code: "npm install vaul", filename: "terminal" }]}
      examples={[
        {
          title: "Without scale background",
          description: "Disable the scale effect by setting shouldScaleBackground={false}.",
          preview: (
            <Drawer shouldScaleBackground={false}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">No scale</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Settings</DrawerTitle>
                    <DrawerDescription>Manage your preferences.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button variant="outline">Close</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ),
          code: `<Drawer shouldScaleBackground={false}>
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent>…</DrawerContent>
</Drawer>`,
        },
      ]}
      props={[
        { name: "shouldScaleBackground", type: "boolean", default: "true", description: "Scales and rounds the page behind the drawer when open." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
        { name: "snapPoints", type: "(number | string)[]", description: "Snap points for partial drawer heights, e.g. [0.5, 1]." },
      ]}
      a11yNotes={[
        "DrawerContent renders with role=\"dialog\" and focus is trapped inside while open.",
        "DrawerTitle and DrawerDescription provide accessible label and description.",
        "Drag-to-dismiss is supplemented by a close button for keyboard and pointer users.",
        "Escape key closes the drawer.",
      ]}
    />
  )
}
