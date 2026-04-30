"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Separator,
} from "@aetherstack/ui"
import { toast } from "@aetherstack/ui"
import { Controller } from "react-hook-form"

const schema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, numbers, hyphens, and underscores"),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
  website: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  timezone: z.string().min(1, "Select a timezone"),
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
})

type FormValues = z.infer<typeof schema>

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
]

export function ProfileFormPreview() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: "Jane Smith",
      username: "janesmith",
      bio: "Product designer and occasional developer.",
      website: "https://janesmith.dev",
      timezone: "America/New_York",
      emailNotifications: true,
      marketingEmails: false,
    },
  })

  const bio = watch("bio", "")

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700))
    toast({ variant: "success", title: "Profile saved", description: "Your changes have been applied." })
  }

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>

        {/* Profile info */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Public profile</h3>
            <p className="text-xs text-muted-foreground mt-0.5">This information is visible to everyone.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pf-display">Display name</Label>
              <Input
                id="pf-display"
                placeholder="Your name"
                aria-invalid={!!errors.displayName}
                {...register("displayName")}
              />
              {errors.displayName && (
                <p className="text-xs text-destructive">{errors.displayName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pf-username">Username</Label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-border bg-muted px-3 text-xs text-muted-foreground">
                  @
                </span>
                <Input
                  id="pf-username"
                  className="rounded-l-none"
                  placeholder="username"
                  aria-invalid={!!errors.username}
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="pf-bio">Bio</Label>
              <span className="text-xs text-muted-foreground">{(bio ?? "").length}/160</span>
            </div>
            <Textarea
              id="pf-bio"
              rows={3}
              placeholder="Tell us a little about yourself…"
              aria-invalid={!!errors.bio}
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pf-website">Website</Label>
            <Input
              id="pf-website"
              type="url"
              placeholder="https://yoursite.com"
              aria-invalid={!!errors.website}
              {...register("website")}
            />
            {errors.website && (
              <p className="text-xs text-destructive">{errors.website.message}</p>
            )}
          </div>
        </section>

        <Separator />

        {/* Preferences */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Preferences</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Manage your account settings.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pf-tz">Timezone</Label>
            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="pf-tz" aria-invalid={!!errors.timezone}>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.timezone && (
              <p className="text-xs text-destructive">{errors.timezone.message}</p>
            )}
          </div>
        </section>

        <Separator />

        {/* Notifications */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Email notifications</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Choose which emails you want to receive.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="pf-email-notif" className="leading-none">
                  Activity notifications
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Receive emails about comments, mentions, and replies.
                </p>
              </div>
              <Controller
                name="emailNotifications"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="pf-email-notif"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="pf-marketing" className="leading-none">
                  Marketing emails
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  News, tips, and product announcements.
                </p>
              </div>
              <Controller
                name="marketingEmails"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="pf-marketing"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={!isDirty}>
            Discard
          </Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
