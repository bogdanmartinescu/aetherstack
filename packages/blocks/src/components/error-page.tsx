import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button } from "@aetherstack/ui"

export interface ErrorPageProps {
  code?: "404" | "500" | string
  headline?: string
  description?: string
  backHref?: string
  backLabel?: string
  illustration?: React.ReactNode
  className?: string
}

const DEFAULTS: Record<string, { headline: string; description: string }> = {
  "404": {
    headline: "Page not found",
    description:
      "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.",
  },
  "500": {
    headline: "Server error",
    description:
      "Something went wrong on our end. Please try again later or contact support if the problem persists.",
  },
}

export function ErrorPage({
  code = "404",
  headline,
  description,
  backHref = "/",
  backLabel = "Go back home",
  illustration,
  className,
}: ErrorPageProps) {
  const defaults = DEFAULTS[code] ?? {
    headline: "An error occurred",
    description: "Something unexpected happened. Please try again.",
  }

  return (
    <div
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center",
        className,
      )}
    >
      {illustration && <div className="mb-8">{illustration}</div>}

      <p className="text-8xl font-extrabold tracking-tighter text-muted-foreground/30 sm:text-[10rem]">
        {code}
      </p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {headline ?? defaults.headline}
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
        {description ?? defaults.description}
      </p>

      {backHref && (
        <div className="mt-8">
          <Button asChild>
            <a href={backHref}>{backLabel}</a>
          </Button>
        </div>
      )}
    </div>
  )
}
