"use client"

import { ThemeSwitcher, ThemeSwitcherToggle, ThemeSwitcherDropdown } from "@aetherstack/patterns"

export function ThemeSwitcherPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <ThemeSwitcherDropdown />
        <ThemeSwitcherToggle />
      </div>
      <p className="text-xs text-muted-foreground">
        Dropdown (left) · Icon toggle (right)
      </p>
    </div>
  )
}
