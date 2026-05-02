import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ThemeSwitcherPreview } from "./preview"

export const metadata: Metadata = {
  title: "Theme Switcher",
  description: "A light/dark/system theme toggle with dropdown and icon-only variants.",
}

export default function ThemeSwitcherPage() {
  return (
    <PatternPage
      name="Theme Switcher"
      description="A light/dark/system theme toggle. Comes in two variants: a dropdown listing all three options and a compact icon-only toggle. Requires next-themes ThemeProvider in the root layout."
      cliInstall="npx aether-ui add theme-switcher"
      importCode={`import { ThemeSwitcher, ThemeSwitcherToggle, ThemeSwitcherDropdown } from "@aetherstack/patterns"`}
      usageCode={`// In layout.tsx — wrap the app with ThemeProvider
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// In your navigation bar
import { ThemeSwitcherDropdown, ThemeSwitcherToggle } from "@aetherstack/patterns"

export function Navbar() {
  return (
    <nav>
      {/* compact icon-only toggle */}
      <ThemeSwitcherToggle />

      {/* or a dropdown with light / dark / system options */}
      <ThemeSwitcherDropdown />
    </nav>
  )
}`}
      preview={<ThemeSwitcherPreview />}
      props={[
        { name: "—", type: "—", description: "ThemeSwitcherDropdown and ThemeSwitcherToggle take no required props. They read and write the active theme via next-themes internally." },
        { name: "className", type: "string", description: "Additional classes on the trigger button (both variants)." },
      ]}
      a11yNotes={[
        "Each button carries an aria-label describing the action (\"Toggle theme\" or the active theme name).",
        "The dropdown uses role=\"menu\" with radio-style aria-checked items for each theme option.",
        "Active theme is communicated via aria-checked=\"true\" on the selected menu item.",
        "Icons are aria-hidden; labels are the sole source of accessible name.",
      ]}
    />
  )
}
