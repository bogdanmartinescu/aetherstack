"use client"

import * as React from "react"
import { ConfirmDialog } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

export function ConfirmDialogPreview() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  function handleConfirm() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
      setConfirmed(true)
    }, 1200)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="destructive" onClick={() => { setOpen(true); setConfirmed(false) }}>
        Delete account
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete account"
        description="This action is permanent and cannot be undone. All your data will be removed immediately."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleConfirm}
        isLoading={loading}
      />
      {confirmed && (
        <p className="text-xs text-muted-foreground">Action confirmed.</p>
      )}
    </div>
  )
}
