"use client"

import { LoginBlock } from "@aetherstack/blocks"

export default function LoginPage() {
  return (
    <LoginBlock
      appName="Acme"
      tagline="Sign in to your workspace."
      panel={
        <div className="max-w-sm text-center">
          <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold">
            A
          </div>
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Welcome back to Acme
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            All your customers, deals, and revenue in one place.
          </p>
        </div>
      }
    />
  )
}
