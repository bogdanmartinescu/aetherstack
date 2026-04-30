"use client"

import type { Metadata } from "next"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const SOURCE = `import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

// ... (see full source in registry)`

export default function AlertDialogPage() {
  return (
    <ComponentPage
      name="Alert Dialog"
      description="A modal confirmation dialog that interrupts the user to confirm a destructive or irreversible action. Focus-trapped, keyboard-accessible, and WAI-ARIA compliant."
      radixSource="https://www.radix-ui.com/primitives/docs/components/alert-dialog"
      features={[
        "Blocks all page interaction until resolved",
        "Separate Action (confirm) and Cancel buttons with correct keyboard roles",
        "Accessible title and description via AlertDialogTitle / AlertDialogDescription",
        "Animated open/close with Tailwind animate-in/out utilities",
      ]}
      preview={
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
      previewCode={`import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@aetherstack/ui"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      cliInstall="npx aether-ui add alert-dialog"
      manualInstallCode={SOURCE}
      manualSteps={[{ title: "Install dependencies", code: "npm install @radix-ui/react-alert-dialog", filename: "terminal" }]}
      examples={[
        {
          title: "Custom action styles",
          description: "AlertDialogAction accepts className to override button styles.",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Remove member</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove team member?</AlertDialogTitle>
                  <AlertDialogDescription>Carol will lose access to all projects immediately.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep member</AlertDialogCancel>
                  <AlertDialogAction className="bg-amber-600 text-white hover:bg-amber-700">Remove</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialogAction className="bg-amber-600 text-white hover:bg-amber-700">
  Remove
</AlertDialogAction>`,
        },
      ]}
      props={[
        { name: "AlertDialog", type: "Root", description: "Root controller. No visible output — manages open state." },
        { name: "AlertDialogTrigger", type: "Trigger", description: "Button that opens the dialog. Use asChild to pass your own button." },
        { name: "AlertDialogContent", type: "Content", description: "The dialog panel. Renders into a Portal." },
        { name: "AlertDialogTitle", type: "Title", required: true, description: "Accessible dialog title announced by screen readers." },
        { name: "AlertDialogDescription", type: "Description", required: true, description: "Accessible description — required by ARIA alert dialog spec." },
        { name: "AlertDialogAction", type: "Action", description: "Confirm button. Closes the dialog on click. Default styling: primary button." },
        { name: "AlertDialogCancel", type: "Cancel", description: "Cancel button. Closes the dialog. Default styling: outline button." },
      ]}
      a11yNotes={[
        "Uses role=\"alertdialog\" — screen readers announce the dialog title and description immediately on open.",
        "Focus is trapped inside the dialog while open and restored to the trigger on close.",
        "Escape key closes the dialog via the Cancel action.",
        "AlertDialogTitle and AlertDialogDescription are required for accessibility — do not omit them.",
      ]}
    />
  )
}
