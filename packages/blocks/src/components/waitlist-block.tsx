"use client"

import * as React from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Input } from "@aetherstack/ui"

export interface WaitlistBlockProps {
  headline?: string
  subheading?: string
  placeholder?: string
  ctaLabel?: string
  onSubmit?: (email: string) => Promise<void>
  successMessage?: string
  className?: string
}

export function WaitlistBlock({
  headline = "Join the waitlist",
  subheading,
  placeholder = "Enter your email address",
  ctaLabel = "Get early access",
  onSubmit,
  successMessage = "You're on the list! We'll be in touch soon.",
  className,
}: WaitlistBlockProps) {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      await onSubmit?.(email)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="mx-auto max-w-md text-center">
        {headline && (
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {headline}
          </h2>
        )}
        {subheading && (
          <p className="mt-3 text-sm text-muted-foreground">{subheading}</p>
        )}

        {success ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium text-foreground">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              aria-label="Email address"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !email} className="shrink-0">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              {ctaLabel}
            </Button>
          </form>
        )}

        {error && (
          <p className="mt-3 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}
