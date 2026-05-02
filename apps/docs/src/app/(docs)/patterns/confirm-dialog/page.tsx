"use client"

import { PatternPage } from "@/components/pattern-page"
import { ConfirmDialogPreview } from "./preview"

export default function ConfirmDialogPage() {
  return (
    <PatternPage
      name="Confirm Dialog"
      description="A reusable confirmation dialog for destructive or irreversible actions. Accepts a variant prop to apply destructive styling to the confirm button and supports an async loading state while the action runs."
      cliInstall="npx aether-ui add confirm-dialog"
      importCode={`import { ConfirmDialog } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { ConfirmDialog } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

export function DeleteButton() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function handleConfirm() {
    setLoading(true)
    await deleteAccount()
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete account"
        description="This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleConfirm}
        isLoading={loading}
      />
    </>
  )
}`}
      preview={<ConfirmDialogPreview />}
      props={[
        { name: "open", type: "boolean", required: true, description: "Controls dialog visibility." },
        { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Callback to sync the open state." },
        { name: "title", type: "string", required: true, description: "Dialog heading." },
        { name: "description", type: "string", required: true, description: "Body copy explaining the action." },
        { name: "confirmLabel", type: "string", default: '"Confirm"', description: "Label for the confirm button." },
        { name: "cancelLabel", type: "string", default: '"Cancel"', description: "Label for the cancel button." },
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Confirm button variant." },
        { name: "onConfirm", type: "() => void | Promise<void>", required: true, description: "Handler called when the user confirms." },
        { name: "isLoading", type: "boolean", default: "false", description: "Shows a spinner on the confirm button while the async action runs." },
      ]}
      a11yNotes={[
        "Built on the AlertDialog primitive — uses role=\"alertdialog\" so screen readers announce it immediately.",
        "Focus is trapped inside the dialog while it is open.",
        "Escape closes the dialog without confirming the action.",
        "The confirm button receives focus first to prevent accidental dismissal.",
      ]}
    />
  )
}
