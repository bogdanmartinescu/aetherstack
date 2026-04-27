/**
 * Aether UI color tokens.
 *
 * Raw HSL values (without the `hsl()` wrapper) so they can be used directly
 * as CSS variable values. The Tailwind config consumes these via
 * `hsl(var(--token-name))`.
 *
 * Scale: 50–950, following Radix / Tailwind conventions.
 */

export const palette = {
  neutral: {
    0: "0 0% 100%",
    50: "0 0% 98%",
    100: "0 0% 96%",
    200: "0 0% 90%",
    300: "0 0% 83%",
    400: "0 0% 64%",
    500: "0 0% 45%",
    600: "0 0% 32%",
    700: "0 0% 25%",
    800: "0 0% 15%",
    900: "0 0% 9%",
    950: "0 0% 4%",
  },
  violet: {
    50: "262 100% 97%",
    100: "264 100% 95%",
    200: "262 96% 90%",
    300: "263 93% 83%",
    400: "265 89% 74%",
    500: "267 84% 65%",
    600: "269 74% 57%",
    700: "270 67% 47%",
    800: "271 61% 39%",
    900: "272 57% 32%",
    950: "274 66% 19%",
  },
  blue: {
    50: "214 100% 97%",
    100: "214 95% 93%",
    200: "213 97% 87%",
    300: "212 96% 78%",
    400: "213 94% 68%",
    500: "217 91% 60%",
    600: "221 83% 53%",
    700: "224 76% 48%",
    800: "226 71% 40%",
    900: "224 64% 33%",
    950: "226 57% 21%",
  },
  green: {
    50: "138 76% 97%",
    100: "141 84% 93%",
    200: "141 79% 85%",
    300: "142 77% 73%",
    400: "142 69% 58%",
    500: "142 71% 45%",
    600: "142 76% 36%",
    700: "142 72% 29%",
    800: "143 64% 24%",
    900: "144 61% 20%",
    950: "145 80% 10%",
  },
  red: {
    50: "0 86% 97%",
    100: "0 93% 94%",
    200: "0 96% 89%",
    300: "0 94% 82%",
    400: "0 91% 71%",
    500: "0 84% 60%",
    600: "0 72% 51%",
    700: "0 74% 42%",
    800: "0 70% 35%",
    900: "0 63% 31%",
    950: "0 75% 15%",
  },
  amber: {
    50: "48 100% 96%",
    100: "48 96% 89%",
    200: "48 97% 77%",
    300: "46 97% 65%",
    400: "43 96% 56%",
    500: "38 92% 50%",
    600: "32 95% 44%",
    700: "26 90% 37%",
    800: "23 83% 31%",
    900: "22 78% 26%",
    950: "21 92% 14%",
  },
} as const

/**
 * Semantic CSS variable names mapped to their Aether UI HSL values.
 *
 * Light mode uses violet-tinted foreground/secondary text to give the
 * interface a subtle branded warmth. Dark mode uses a deep violet
 * background ("274 66% 4%") rather than pure black — this is
 * intentional Aether UI brand identity and is not a raw palette value.
 *
 * These are injected as `:root` / `.dark` variables by globals.css.
 * The Tailwind config consumes them via `hsl(var(--token-name))`.
 */
export const semanticColors = {
  light: {
    "--background": palette.neutral[0],
    "--foreground": palette.violet[950],
    "--card": palette.neutral[0],
    "--card-foreground": palette.violet[950],
    "--popover": palette.neutral[0],
    "--popover-foreground": palette.violet[950],
    "--primary": palette.violet[600],
    "--primary-foreground": palette.neutral[0],
    "--secondary": palette.neutral[100],
    "--secondary-foreground": palette.violet[900],
    "--muted": palette.neutral[100],
    "--muted-foreground": palette.neutral[500],
    "--accent": palette.neutral[100],
    "--accent-foreground": palette.violet[900],
    "--destructive": palette.red[600],
    "--destructive-foreground": palette.neutral[0],
    "--border": palette.neutral[200],
    "--input": palette.neutral[200],
    "--ring": palette.violet[600],
    "--sidebar-background": palette.neutral[50],
    "--sidebar-foreground": palette.neutral[700],
    "--sidebar-primary": palette.violet[600],
    "--sidebar-primary-foreground": palette.neutral[0],
    "--sidebar-accent": palette.neutral[100],
    "--sidebar-accent-foreground": palette.violet[900],
    "--sidebar-border": palette.neutral[200],
    "--sidebar-ring": palette.violet[600],
  },
  dark: {
    // Deep violet background — not a raw palette step, intentional brand value
    "--background": "274 66% 4%",
    "--foreground": palette.neutral[50],
    // Violet-tinted dark surface for cards and popovers
    "--card": "272 57% 9%",
    "--card-foreground": palette.neutral[50],
    "--popover": "272 57% 9%",
    "--popover-foreground": palette.neutral[50],
    "--primary": palette.violet[500],
    "--primary-foreground": "274 66% 4%",
    "--secondary": palette.neutral[800],
    "--secondary-foreground": palette.neutral[50],
    "--muted": palette.neutral[800],
    "--muted-foreground": palette.neutral[400],
    "--accent": palette.neutral[800],
    "--accent-foreground": palette.neutral[50],
    "--destructive": palette.red[500],
    "--destructive-foreground": "274 66% 4%",
    "--border": palette.neutral[800],
    "--input": palette.neutral[800],
    "--ring": palette.violet[500],
    "--sidebar-background": "272 57% 9%",
    "--sidebar-foreground": palette.neutral[300],
    "--sidebar-primary": palette.violet[500],
    "--sidebar-primary-foreground": "274 66% 4%",
    "--sidebar-accent": palette.neutral[800],
    "--sidebar-accent-foreground": palette.neutral[50],
    "--sidebar-border": palette.neutral[800],
    "--sidebar-ring": palette.violet[500],
  },
} as const

export type ColorPalette = typeof palette
export type SemanticColors = typeof semanticColors
