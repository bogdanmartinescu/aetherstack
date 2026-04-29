"use client"

import { LoginBlock } from "@aetherstack/blocks"

export default function LoginPage() {
  return (
    <LoginBlock
      appName="Acme"
      tagline="Sign in to your workspace."
      panel={
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            A
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Welcome back to Acme
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            All your customers, deals, and revenue in one place.
          </p>
        </div>
      }
    />
  )
}
