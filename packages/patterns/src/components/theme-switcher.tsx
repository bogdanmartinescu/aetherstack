"use client"

import * as React from "react"
import { Moon, Monitor, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

const THEMES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const

type ThemeValue = (typeof THEMES)[number]["value"]

function useMountedTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return { theme: theme as ThemeValue | undefined, setTheme, mounted }
}

export function ThemeSwitcherToggle({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useMountedTheme()

  if (!mounted) return null

  const cycle = () => {
    const order: ThemeValue[] = ["light", "dark", "system"]
    const current = order.indexOf(theme ?? "system")
    const next = order[(current + 1) % order.length] ?? "system"
    setTheme(next)
  }

  const entry = THEMES.find((t) => t.value === (theme ?? "system")) ?? THEMES[2]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycle}
      aria-label={`Current theme: ${entry.label}. Click to cycle theme`}
      className={className}
    >
      <entry.Icon className="h-4 w-4" aria-hidden="true" />
    </Button>
  )
}

export function ThemeSwitcherDropdown({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useMountedTheme()

  if (!mounted) return null

  const current = THEMES.find((t) => t.value === (theme ?? "system")) ?? THEMES[2]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Current theme: ${current.label}. Open theme menu`}
          className={className}
        >
          <current.Icon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map(({ value, label, Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn("gap-2", theme === value && "font-medium")}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ThemeSwitcher({ className }: { className?: string }) {
  return <ThemeSwitcherDropdown {...(className !== undefined ? { className } : {})} />
}
