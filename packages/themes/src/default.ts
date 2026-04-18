import { semanticColors, baseRadius } from "@aetherstack/tokens"

/**
 * Default Aether UI theme.
 *
 * A theme is a flat map of CSS variable name → HSL value string.
 * Use `generateCssVariables()` to turn a theme into a `:root { ... }` block.
 */
export const defaultTheme = {
  light: {
    ...semanticColors.light,
    "--radius": baseRadius,
  },
  dark: {
    ...semanticColors.dark,
    "--radius": baseRadius,
  },
} as const

export type Theme = {
  light: Record<string, string>
  dark: Record<string, string>
}

/**
 * Converts a theme object to a CSS string with `:root` and `.dark` selectors.
 * Useful for injecting themes server-side or generating static CSS.
 */
export function generateCssVariables(theme: Theme): string {
  const lightVars = Object.entries(theme.light)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")

  const darkVars = Object.entries(theme.dark)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")

  return `:root {\n${lightVars}\n}\n\n.dark {\n${darkVars}\n}`
}
