"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button, Input } from "@aetherstack/ui"
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@aetherstack/patterns"

export interface SignupBlockProps {
  /** App / product name */
  appName?: string
  tagline?: string
  /** Called on valid submission */
  onSubmit?: (values: { name: string; email: string; password: string }) => void
  /** URL for the sign-in page */
  signInHref?: string
  /** URL for terms of service */
  termsHref?: string
  /** URL for privacy policy */
  privacyHref?: string
  className?: string
}

export function SignupBlock({
  appName = "Aether UI",
  tagline = "Create your account to get started.",
  onSubmit,
  signInHref = "/login",
  termsHref = "/terms",
  privacyHref = "/privacy",
  className,
}: SignupBlockProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Full name is required"
    if (!email) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address"
    if (!password) errs.password = "Password is required"
    else if (password.length < 8) errs.password = "Password must be at least 8 characters"
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) onSubmit?.({ name, email, password })
  }

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-muted/20 p-6", className)}>
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        {/* Logo / heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            {appName.charAt(0)}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField name="name" {...(errors.name ? { error: errors.name } : {})}>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Alex Johnson"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          <FormField name="email" {...(errors.email ? { error: errors.email } : {})}>
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          <FormField name="password" {...(errors.password ? { error: errors.password } : {})}>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <a href={termsHref} className="text-primary underline-offset-4 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href={privacyHref} className="text-primary underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href={signInHref} className="text-primary underline-offset-4 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
