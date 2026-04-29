"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Input,
  Textarea,
  Label,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@aetherstack/ui"

export interface AccountSettingsData {
  name: string
  email: string
  bio?: string
  avatarUrl?: string
}

export interface AccountSettingsProps {
  defaultValues?: AccountSettingsData
  onSave?: (data: AccountSettingsData) => void | Promise<void>
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function AccountSettings({
  defaultValues,
  onSave,
  className,
}: AccountSettingsProps) {
  const [name, setName] = React.useState(defaultValues?.name ?? "")
  const [email, setEmail] = React.useState(defaultValues?.email ?? "")
  const [bio, setBio] = React.useState(defaultValues?.bio ?? "")
  const [avatarUrl] = React.useState(defaultValues?.avatarUrl ?? "")
  const [isSaving, setIsSaving] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!onSave) return
    setIsSaving(true)
    try {
      await onSave({ name, email, bio, avatarUrl })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
    >
      <h2 className="mb-6 text-base font-semibold text-foreground">
        Account settings
      </h2>

      {/* Avatar section */}
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-lg">
            {getInitials(name) || "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled
            title="Avatar upload not available in this demo"
          >
            Change avatar
          </Button>
          <p className="mt-1.5 text-xs text-muted-foreground">
            JPG, PNG or GIF. Max 2 MB.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="account-name">Display name</Label>
          <Input
            id="account-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="account-email">Email address</Label>
          <Input
            id="account-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <Label htmlFor="account-bio">
            Bio{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Textarea
            id="account-bio"
            placeholder="Tell us a little about yourself…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
