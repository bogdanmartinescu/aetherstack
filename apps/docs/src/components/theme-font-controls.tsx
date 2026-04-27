"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { cn } from "@aetherstack/utils"

// ── Font definitions ─────────────────────────────────────────────────────────

export const FONTS = [
  { id: "inter",              label: "Inter",              css: "var(--font-inter)" },
  { id: "plus-jakarta-sans",  label: "Plus Jakarta Sans",  css: "var(--font-plus-jakarta-sans)" },
  { id: "dm-sans",            label: "DM Sans",            css: "var(--font-dm-sans)" },
  { id: "manrope",            label: "Manrope",            css: "var(--font-manrope)" },
  { id: "outfit",             label: "Outfit",             css: "var(--font-outfit)" },
  { id: "figtree",            label: "Figtree",            css: "var(--font-figtree)" },
] as const

export type FontId = (typeof FONTS)[number]["id"]

// ── Theme icons ──────────────────────────────────────────────────────────────

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

// ── Theme toggle ─────────────────────────────────────────────────────────────

const THEME_OPTIONS = [
  { id: "light",  label: "Light",  Icon: SunIcon },
  { id: "dark",   label: "Dark",   Icon: MoonIcon },
  { id: "system", label: "System", Icon: MonitorIcon },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="flex items-center rounded-md border border-border bg-muted/40 p-0.5">
        {THEME_OPTIONS.map((o) => (
          <div key={o.id} className="h-7 w-7 rounded" />
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="group"
      aria-label="Color theme"
    >
      {THEME_OPTIONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          aria-label={label}
          title={label}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded transition-colors",
            theme === id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon />
        </button>
      ))}
    </div>
  )
}

// ── Font picker ──────────────────────────────────────────────────────────────

export function FontPicker() {
  const [activeFont, setActiveFont] = useState<FontId>("inter")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Sync from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aether-font") as FontId | null
      if (stored && FONTS.some((f) => f.id === stored)) {
        setActiveFont(stored)
      }
    } catch (_) {
      // localStorage unavailable (SSR or private browsing)
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  function selectFont(id: FontId) {
    setActiveFont(id)
    document.documentElement.setAttribute("data-font", id)
    try { localStorage.setItem("aether-font", id) } catch (_) { /* unavailable */ }
    setOpen(false)
  }

  const current = FONTS.find((f) => f.id === activeFont) ?? FONTS[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select font"
        style={{ fontFamily: current.css }}
      >
        <span>{current.label}</span>
        <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[180px] overflow-hidden rounded-lg border border-border bg-popover shadow-md"
          role="listbox"
          aria-label="Font options"
        >
          <div className="p-1">
            {FONTS.map((font) => (
              <button
                key={font.id}
                role="option"
                aria-selected={font.id === activeFont}
                onClick={() => selectFont(font.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  font.id === activeFont
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-popover-foreground hover:bg-muted",
                )}
                style={{ fontFamily: font.css }}
              >
                <span>{font.label}</span>
                {font.id === activeFont && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-border px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Applies globally to all components
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
