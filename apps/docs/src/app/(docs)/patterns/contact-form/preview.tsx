"use client"

import { useForm, Controller } from "react-hook-form"
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
} from "@aetherstack/ui"
import { toast } from "@aetherstack/ui"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
})

type FormValues = z.infer<typeof schema>

const SUBJECTS = [
  { value: "general", label: "General inquiry" },
  { value: "support", label: "Technical support" },
  { value: "billing", label: "Billing question" },
  { value: "feedback", label: "Product feedback" },
  { value: "partnership", label: "Partnership opportunity" },
]

export function ContactFormPreview() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const message = watch("message", "")

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    toast({
      variant: "success",
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })
  }

  if (sent) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
          <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Message received!</h3>
          <p className="text-sm text-muted-foreground">
            Thanks for reaching out. We'll get back to you within 24 hours.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSent(false)
            reset()
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
        <p className="text-sm text-muted-foreground">
          We respond to all inquiries within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="cf-name">Name</Label>
            <Input
              id="cf-name"
              placeholder="Jane Smith"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cf-email">Email</Label>
            <Input
              id="cf-email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cf-subject">Subject</Label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="cf-subject" aria-invalid={!!errors.subject}>
                  <SelectValue placeholder="What is this about?" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && (
            <p className="text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="cf-message">Message</Label>
            <span className="text-xs text-muted-foreground">
              {(message ?? "").length}/1000
            </span>
          </div>
          <Textarea
            id="cf-message"
            rows={5}
            placeholder="Tell us how we can help…"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </form>
    </div>
  )
}
