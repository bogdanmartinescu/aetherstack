"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button, Input, Checkbox, Label } from "@aetherstack/ui"
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@aetherstack/patterns"

export interface LoginBlockProps {
  /** App / product name */
  appName?: string
  /** Tagline shown below the app name */
  tagline?: string
  /** Called when the form is submitted with email and password */
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void
  /** URL for the sign-up page */
  signUpHref?: string
  /** URL for the forgot-password flow */
  forgotPasswordHref?: string
  /** If provided, shows a split-panel layout with this content on the left */
  panel?: React.ReactNode
  className?: string
}

export function LoginBlock({
  appName = "Aether UI",
  tagline = "Welcome back — sign in to continue.",
  onSubmit,
  signUpHref = "/signup",
  forgotPasswordHref = "/forgot-password",
  panel,
  className,
}: LoginBlockProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(false)
  const [emailError, setEmailError] = React.useState<string | undefined>()
  const [passwordError, setPasswordError] = React.useState<string | undefined>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let valid = true
    if (!email) { setEmailError("Email is required"); valid = false }
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailError("Enter a valid email address"); valid = false }
    else setEmailError(undefined)

    if (!password) { setPasswordError("Password is required"); valid = false }
    else if (password.length < 8) { setPasswordError("Password must be at least 8 characters"); valid = false }
    else setPasswordError(undefined)

    if (valid) onSubmit?.({ email, password, remember })
  }

  const formCard = (
    <div className="w-full max-w-sm">
      {/* Logo / app name */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
          {appName.charAt(0)}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField name="email" {...(emailError ? { error: emailError } : {})}>
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

        <FormField name="password" {...(passwordError ? { error: passwordError } : {})}>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            <a
              href={forgotPasswordHref}
              className="text-xs text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <FormControl>
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(v) => setRemember(Boolean(v))}
          />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href={signUpHref} className="text-primary underline-offset-4 hover:underline font-medium">
          Sign up
        </a>
      </p>
    </div>
  )

  if (panel) {
    return (
      <div className={cn("flex min-h-screen bg-background", className)}>
        {/* Left panel */}
        <div className="hidden w-1/2 items-center justify-center bg-muted/30 p-12 lg:flex">
          {panel}
        </div>
        {/* Right: form */}
        <div className="flex flex-1 items-center justify-center p-8">
          {formCard}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-muted/20 p-6", className)}>
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        {formCard}
      </div>
    </div>
  )
}
