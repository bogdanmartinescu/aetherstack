import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ContactFormPreview } from "./preview"

export const metadata: Metadata = {
  title: "Contact Form",
  description: "Contact and feedback form with success state, Select subject, and textarea character counter.",
}

const IMPORT_CODE = `import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Button, Input, Label, Textarea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@aetherstack/ui"`

const USAGE_CODE = `const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20).max(1000),
})

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, control, watch, reset, formState } =
    useForm({ resolver: zodResolver(schema) })

  const message = watch("message", "")

  if (sent) {
    return (
      <SuccessState onReset={() => { setSent(false); reset() }} />
    )
  }

  return (
    <form onSubmit={handleSubmit(async () => { await submit(); setSent(true) })} noValidate>
      <Input id="name" {...register("name")} />
      <Input id="email" type="email" {...register("email")} />

      {/* Select requires Controller */}
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue placeholder="What is this about?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General inquiry</SelectItem>
              <SelectItem value="support">Technical support</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <span>{message.length}/1000</span>
      <Textarea id="message" rows={5} {...register("message")} />

      <Button type="submit" disabled={formState.isSubmitting}>Send message</Button>
    </form>
  )
}`

export default function ContactFormPage() {
  return (
    <PatternPage
      name="Contact Form"
      description="General-purpose contact form with name, email, a subject Select, and a character-counted message textarea. Transitions to a full success state after submission — allowing the user to send another message without a page reload."
      preview={<ContactFormPreview />}
      importCode={IMPORT_CODE}
      usageCode={USAGE_CODE}
      props={[
        {
          name: "sent (local state)",
          type: "boolean",
          description: "Switches the form to a success view after submission. Paired with reset() so clicking 'Send another' restores the blank form.",
        },
        {
          name: "reset",
          type: "UseFormReset<FormValues>",
          description: "Resets all field values and validation state back to defaults. Called together with setSent(false) when the user wants to send another message.",
        },
        {
          name: "subject (Controller)",
          type: "ZodString (min 1)",
          description: "The Radix Select needs Controller because it doesn't expose a native input. z.string().min(1) treats an empty string as invalid — triggering the 'Please select a subject' error.",
        },
        {
          name: "message (min 20, max 1000)",
          type: "ZodString",
          description: "Minimum length encourages meaningful messages. Maximum length prevents abuse. The live character counter uses watch() to reflect the current count without re-validating.",
        },
      ]}
      a11yNotes={[
        "All inputs have explicit <Label> associations via htmlFor/id pairs.",
        "The success state uses a semantic heading (<h3>) and descriptive body text — clearly communicates the outcome to screen readers.",
        "The 'Send another message' button is the only interactive element in the success state, keeping the focus path simple.",
        "aria-invalid is applied to inputs and the Select trigger when they have validation errors.",
        "The character counter is plain visible text so assistive technology reads it in document order.",
      ]}
      cliInstall="pnpm add react-hook-form zod @hookform/resolvers"
    />
  )
}
