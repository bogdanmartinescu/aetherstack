"use client"

import { useState } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
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
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "@aetherstack/ui"
import { toast } from "@aetherstack/ui"
import { PlusIcon, XIcon } from "lucide-react"

// ── Shared helper ─────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-destructive">{message}</p>
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-muted-foreground">{children}</p>
}

// ── 1. Bug Report demo ────────────────────────────────────────────────────────

const bugSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(60, "Bug title must be at most 60 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(300, "Description must be at most 300 characters."),
})
type BugValues = z.infer<typeof bugSchema>

export function BugReportDemo() {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } =
    useForm<BugValues>({ resolver: zodResolver(bugSchema), defaultValues: { title: "", description: "" } })

  const desc = watch("description", "")

  function onSubmit(data: BugValues) {
    toast({
      variant: "success",
      title: "Report submitted",
      description: (
        <pre className="mt-1 max-w-[300px] overflow-x-auto rounded bg-black/10 p-2 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) as React.ReactNode,
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>Help us improve by reporting bugs you encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="bug-report-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="bug-title">Bug Title</Label>
            <Input
              id="bug-title"
              placeholder="Login button not working on mobile"
              autoComplete="off"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            <FieldError message={errors.title?.message} />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="bug-desc">Description</Label>
              <span className="text-xs text-muted-foreground tabular-nums">{desc.length}/300</span>
            </div>
            <Textarea
              id="bug-desc"
              rows={4}
              placeholder="Steps to reproduce, expected vs actual behavior…"
              className="resize-none"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            <FieldHint>Include steps to reproduce, expected behavior, and what actually happened.</FieldHint>
            <FieldError message={errors.description?.message} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
          Reset
        </Button>
        <Button type="submit" form="bug-report-form" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// ── 2. Input demo ─────────────────────────────────────────────────────────────

const inputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores."),
})
type InputValues = z.infer<typeof inputSchema>

export function InputDemo() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<InputValues>({ resolver: zodResolver(inputSchema) })

  function onSubmit(data: InputValues) {
    toast({ variant: "success", title: "Saved", description: `Username set to @${data.username}` })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your profile information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="input-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1.5">
          <Label htmlFor="inp-username">Username</Label>
          <Input
            id="inp-username"
            placeholder="johndoe"
            aria-invalid={!!errors.username}
            {...register("username")}
          />
          <FieldHint>
            This is your public display name. Must be 3–20 characters. Letters, numbers, and underscores only.
          </FieldHint>
          <FieldError message={errors.username?.message} />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="input-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 3. Textarea demo ──────────────────────────────────────────────────────────

const textareaSchema = z.object({
  about: z.string().min(10, "Must be at least 10 characters.").max(300, "Max 300 characters."),
})
type TextareaValues = z.infer<typeof textareaSchema>

export function TextareaDemo() {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } =
    useForm<TextareaValues>({ resolver: zodResolver(textareaSchema), defaultValues: { about: "" } })

  const about = watch("about", "")

  function onSubmit() {
    toast({ variant: "success", title: "Saved", description: "Your bio has been updated." })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Personalization</CardTitle>
        <CardDescription>Customize your experience by telling us more about yourself.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="textarea-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="ta-about">More about you</Label>
            <span className="text-xs text-muted-foreground tabular-nums">{about.length}/300</span>
          </div>
          <Textarea
            id="ta-about"
            rows={4}
            placeholder="I'm a software engineer…"
            className="resize-none"
            aria-invalid={!!errors.about}
            {...register("about")}
          />
          <FieldHint>Tell us more about yourself. This will help us personalise your experience.</FieldHint>
          <FieldError message={errors.about?.message} />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="textarea-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 4. Select demo ────────────────────────────────────────────────────────────

const selectSchema = z.object({
  language: z.string().min(1, "Please select a language."),
})
type SelectValues = z.infer<typeof selectSchema>

export function SelectDemo() {
  const { handleSubmit, reset, control, formState: { isSubmitting } } =
    useForm<SelectValues>({ resolver: zodResolver(selectSchema), defaultValues: { language: "" } })

  function onSubmit(data: SelectValues) {
    toast({ variant: "success", title: "Saved", description: `Language set to ${data.language}` })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>Select your preferred spoken language.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="select-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1.5">
          <Label htmlFor="sel-lang">Spoken Language</Label>
          <Controller
            name="language"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="sel-lang" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
                <FieldHint>For best results, select the language you speak.</FieldHint>
                <FieldError message={fieldState.error?.message} />
              </>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="select-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 5. Checkbox demo ──────────────────────────────────────────────────────────

const NOTIFICATION_ITEMS = [
  { id: "comments", label: "New comments on your posts" },
  { id: "mentions", label: "Mentions and replies" },
  { id: "updates", label: "Product updates and announcements" },
  { id: "security", label: "Security alerts" },
]

const checkboxSchema = z.object({
  notifications: z.array(z.string()).min(1, "Select at least one notification type."),
})
type CheckboxValues = z.infer<typeof checkboxSchema>

export function CheckboxDemo() {
  const { handleSubmit, reset, control, formState: { isSubmitting } } =
    useForm<CheckboxValues>({
      resolver: zodResolver(checkboxSchema),
      defaultValues: { notifications: ["security"] },
    })

  function onSubmit(data: CheckboxValues) {
    toast({ variant: "success", title: "Preferences saved", description: `${data.notifications.length} notification type(s) enabled.` })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="checkbox-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="notifications"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-3">
                <p className="text-sm font-medium">Email notifications</p>
                {NOTIFICATION_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`notif-${item.id}`}
                      aria-invalid={fieldState.invalid}
                      checked={field.value.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...field.value, item.id]
                          : field.value.filter((v) => v !== item.id)
                        field.onChange(next)
                      }}
                    />
                    <Label htmlFor={`notif-${item.id}`} className="font-normal">
                      {item.label}
                    </Label>
                  </div>
                ))}
                <FieldError message={fieldState.error?.message} />
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="checkbox-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 6. RadioGroup demo ────────────────────────────────────────────────────────

const PLANS = [
  { id: "starter", title: "Starter", description: "For individuals and small teams." },
  { id: "pro", title: "Pro", description: "For businesses with higher demands." },
  { id: "enterprise", title: "Enterprise", description: "Unlimited scale for large organisations." },
]

const radioSchema = z.object({
  plan: z.string().min(1, "Please select a plan."),
})
type RadioValues = z.infer<typeof radioSchema>

export function RadioGroupDemo() {
  const { handleSubmit, reset, control, formState: { isSubmitting } } =
    useForm<RadioValues>({ resolver: zodResolver(radioSchema), defaultValues: { plan: "" } })

  function onSubmit(data: RadioValues) {
    toast({ variant: "success", title: "Plan selected", description: `Switched to ${data.plan} plan.` })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>See pricing and features for each plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="radio-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="plan"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <Label>Plan</Label>
                <p className="text-xs text-muted-foreground">You can upgrade or downgrade at any time.</p>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="mt-2 space-y-2"
                >
                  {PLANS.map((plan) => (
                    <label
                      key={plan.id}
                      htmlFor={`plan-${plan.id}`}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                    >
                      <RadioGroupItem
                        value={plan.id}
                        id={`plan-${plan.id}`}
                        aria-invalid={fieldState.invalid}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium">{plan.title}</p>
                        <p className="text-xs text-muted-foreground">{plan.description}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
                <FieldError message={fieldState.error?.message} />
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="radio-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 7. Switch demo ────────────────────────────────────────────────────────────

const switchSchema = z.object({
  twoFactor: z.boolean(),
  sessionAlerts: z.boolean(),
})
type SwitchValues = z.infer<typeof switchSchema>

export function SwitchDemo() {
  const { handleSubmit, reset, control, formState: { isSubmitting } } =
    useForm<SwitchValues>({
      resolver: zodResolver(switchSchema),
      defaultValues: { twoFactor: false, sessionAlerts: true },
    })

  function onSubmit() {
    toast({ variant: "success", title: "Security settings saved." })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="switch-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Controller
            name="twoFactor"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="sw-2fa" className="leading-none">Multi-factor authentication</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Require a second factor when signing in.
                  </p>
                </div>
                <Switch id="sw-2fa" checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
          <Separator />
          <Controller
            name="sessionAlerts"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="sw-session" className="leading-none">Session alerts</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Get notified when a new session starts from an unrecognised device.
                  </p>
                </div>
                <Switch id="sw-session" checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="switch-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}

// ── 8. Array fields demo ──────────────────────────────────────────────────────

const emailArraySchema = z.object({
  emails: z
    .array(z.object({ address: z.string().email("Enter a valid email address.") }))
    .min(1, "Add at least one email.")
    .max(5, "You can add up to 5 emails."),
})
type EmailArrayValues = z.infer<typeof emailArraySchema>

export function ArrayFieldsDemo() {
  const { handleSubmit, reset, control, formState: { isSubmitting } } =
    useForm<EmailArrayValues>({
      resolver: zodResolver(emailArraySchema),
      defaultValues: { emails: [{ address: "" }] },
    })

  const { fields, append, remove } = useFieldArray({ control, name: "emails" })

  function onSubmit(data: EmailArrayValues) {
    toast({
      variant: "success",
      title: "Emails saved",
      description: `${data.emails.length} email address(es) saved.`,
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Contact Emails</CardTitle>
        <CardDescription>Manage your contact email addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="array-demo-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <div>
            <p className="text-sm font-medium">Email Addresses</p>
            <p className="text-xs text-muted-foreground">Add up to 5 addresses where we can reach you.</p>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`emails.${index}.address`}
                control={control}
                render={({ field: f, fieldState }) => (
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <Input
                        {...f}
                        id={`email-${index}`}
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                        aria-label={`Email address ${index + 1}`}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                          aria-label={`Remove email ${index + 1}`}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => append({ address: "" })}
            disabled={fields.length >= 5}
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Add Email Address
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="array-demo-form" disabled={isSubmitting}>Save</Button>
      </CardFooter>
    </Card>
  )
}
