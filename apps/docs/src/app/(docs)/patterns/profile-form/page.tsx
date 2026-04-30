import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ProfileFormPreview } from "./preview"

export const metadata: Metadata = {
  title: "Profile Settings Form",
  description: "Multi-section profile settings form with Select and Switch fields, character counter, and dirty-state detection.",
}

const IMPORT_CODE = `import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Button, Input, Label, Textarea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Switch, Separator,
} from "@aetherstack/ui"`

const USAGE_CODE = `const schema = z.object({
  displayName: z.string().min(2),
  username: z.string().min(3).regex(/^[a-z0-9_-]+$/),
  bio: z.string().max(160).optional(),
  website: z.string().url().or(z.literal("")).optional(),
  timezone: z.string().min(1),
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
})

export function ProfileForm() {
  const { register, handleSubmit, watch, control, formState } =
    useForm({ resolver: zodResolver(schema), defaultValues: { ... } })

  const bio = watch("bio", "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Text inputs use register() */}
      <Input id="displayName" {...register("displayName")} />

      {/* Character counter */}
      <span>{bio.length}/160</span>
      <Textarea id="bio" {...register("bio")} />

      {/* Radix Select needs Controller */}
      <Controller
        name="timezone"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="America/New_York">Eastern Time</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {/* Switch also needs Controller */}
      <Controller
        name="emailNotifications"
        control={control}
        render={({ field }) => (
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        )}
      />

      {/* isDirty prevents saving unchanged data */}
      <Button type="submit" disabled={formState.isSubmitting || !formState.isDirty}>
        Save changes
      </Button>
    </form>
  )
}`

export default function ProfileFormPage() {
  return (
    <PatternPage
      name="Profile Settings Form"
      description="Multi-section settings form covering text inputs, a character-counted textarea, a Radix Select, and Toggle Switches for notification preferences. Demonstrates using react-hook-form's Controller API for Radix UI components that don't expose native DOM inputs, plus isDirty detection to disable the save button when nothing has changed."
      preview={<ProfileFormPreview />}
      importCode={IMPORT_CODE}
      usageCode={USAGE_CODE}
      props={[
        {
          name: "Controller",
          type: "react-hook-form",
          description: "Required for Radix UI components (Select, Switch, RadioGroup, Checkbox) that manage state internally rather than through a native DOM input. Controller bridges the gap by providing field.value and field.onChange.",
        },
        {
          name: "defaultValues",
          type: "Partial<FormValues>",
          description: "Pre-fills the form on first render. react-hook-form uses these to calculate isDirty — fields are considered dirty only when their current value differs from the default.",
        },
        {
          name: "isDirty",
          type: "boolean",
          description: "True when any field has changed from its default value. Used to disable the Save and Discard buttons, preventing unnecessary API calls.",
        },
        {
          name: "watch",
          type: "UseFormWatch",
          description: "Subscribes to the bio field to render the live character count (current/max) without re-running validation on every keystroke.",
        },
        {
          name: "website validation",
          type: "z.string().url().or(z.literal(\"\"))",
          description: "Using .or(z.literal('')) makes the field optional: an empty string bypasses URL validation, but any non-empty value must be a valid URL.",
        },
      ]}
      a11yNotes={[
        "All form controls have explicit <Label> associations via htmlFor/id.",
        "The bio character counter is visible text — not hidden, so screen readers announce it in reading order.",
        "Sections are marked with <h3> headings for navigation hierarchy.",
        "Radix Select and Switch forward aria-invalid through the Controller render prop.",
        "The Discard and Save buttons are both disabled when the form is pristine, reducing accidental interactions.",
      ]}
      cliInstall="pnpm add react-hook-form zod @hookform/resolvers"
    />
  )
}
