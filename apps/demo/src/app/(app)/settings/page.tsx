"use client"

import * as React from "react"
import { Button, Input, Switch, Textarea } from "@aetherstack/ui"
import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  SettingsSection,
} from "@aetherstack/patterns"

export default function SettingsPage() {
  const [name, setName] = React.useState("Acme, Inc.")
  const [email, setEmail] = React.useState("billing@acme.com")
  const [bio, setBio] = React.useState(
    "We help teams ship great software with confidence.",
  )
  const [emailNotif, setEmailNotif] = React.useState(true)
  const [productNotif, setProductNotif] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [error, setError] = React.useState<string | undefined>()

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) {
      setError("Please enter a valid email.")
      return
    }
    setError(undefined)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1500)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <SettingsSection
        title="Workspace details"
        description="Public information about your team."
        footer={
          <>
            {saved && (
              <span className="mr-auto text-xs text-emerald-600">Changes saved.</span>
            )}
            <Button variant="outline" type="reset">
              Reset
            </Button>
            <Button type="submit">Save changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField name="name">
            <FormLabel>Workspace name</FormLabel>
            <FormControl>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormDescription>
              Shown in the sidebar and on shared resources.
            </FormDescription>
          </FormField>

          <FormField name="email" {...(error ? { error } : {})}>
            <FormLabel>Billing email</FormLabel>
            <FormControl>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          <FormField name="bio">
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
            <FormDescription>Up to 160 characters.</FormDescription>
          </FormField>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choose what you want to hear about."
      >
        <div className="space-y-3">
          <ToggleRow
            label="Account email notifications"
            description="Security events, billing changes, and password resets."
            checked={emailNotif}
            onChange={setEmailNotif}
          />
          <ToggleRow
            label="Product updates"
            description="Monthly digest of new features and improvements."
            checked={productNotif}
            onChange={setProductNotif}
          />
        </div>
      </SettingsSection>
    </form>
  )
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-border px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
