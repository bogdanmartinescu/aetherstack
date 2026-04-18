/**
 * Border radius tokens.
 *
 * The base `--radius` CSS variable is set per-theme (default: 0.5rem).
 * Derived values use `calc()` relative to --radius so the whole system scales
 * proportionally when a theme changes the base value.
 */
export const radius = {
  none: "0px",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  DEFAULT: "var(--radius)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  "3xl": "calc(var(--radius) + 16px)",
  full: "9999px",
} as const

/** Default base radius value (can be overridden per theme). */
export const baseRadius = "0.5rem"

export type Radius = typeof radius
