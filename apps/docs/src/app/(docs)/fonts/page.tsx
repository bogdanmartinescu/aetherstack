import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { FontDemo } from "./font-demo"

export const metadata: Metadata = {
  title: "Fonts",
  description: "Six curated Google Fonts for clean, professional UI development. Switch globally with one click.",
}

export default function FontsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Fonts</h1>
        <p className="text-lg text-muted-foreground">
          Aether UI ships six curated Google Fonts optimised for professional UI development.
          The font picker in the top nav applies your choice globally — all components update instantly.
          Your selection is persisted in <code className="rounded bg-muted px-1 font-mono text-xs">localStorage</code>.
        </p>
      </div>

      {/* Live demo */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Live preview</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Use the <strong className="text-foreground">font picker</strong> in the top navigation bar to switch fonts.
          The preview below reflects your current selection.
        </p>
        <FontDemo />
      </section>

      {/* Font catalog */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Font catalog</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Each font is pre-loaded via Next.js <code className="rounded bg-muted px-1 font-mono text-xs">next/font/google</code> — 
          zero layout shift, self-hosted by Vercel&apos;s CDN, no external requests at runtime.
        </p>

        <div className="space-y-4">
          {[
            {
              id: "inter",
              label: "Inter",
              author: "Rasmus Andersson",
              style: "--font-inter",
              note: "The standard for UI. Optimised for screen readability at small sizes. Widely used in dashboards, SaaS, and design tools.",
            },
            {
              id: "plus-jakarta-sans",
              label: "Plus Jakarta Sans",
              author: "Tokotype",
              style: "--font-plus-jakarta-sans",
              note: "A modern geometric sans with a touch of warmth. Excellent for marketing and product UI alike.",
            },
            {
              id: "dm-sans",
              label: "DM Sans",
              author: "Colophon Foundry",
              style: "--font-dm-sans",
              note: "Clean and purposefully restrained. Designed for use at small text sizes with optical sizing support.",
            },
            {
              id: "manrope",
              label: "Manrope",
              author: "Mikhail Sharanda",
              style: "--font-manrope",
              note: "Geometric humanist sans with open letterforms. Legible and modern — great for data-dense interfaces.",
            },
            {
              id: "outfit",
              label: "Outfit",
              author: "Rodrigo Fuenzalida",
              style: "--font-outfit",
              note: "Clean geometric construction with friendly proportions. A modern alternative to Inter with slightly more character.",
            },
            {
              id: "figtree",
              label: "Figtree",
              author: "Erik Kennedy",
              style: "--font-figtree",
              note: "A geometric sans with a subtle warmth. Beautifully balanced between technical and approachable.",
            },
          ].map((font) => (
            <div
              key={font.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              {/* Font specimen */}
              <div
                className="border-b border-border bg-muted/20 px-5 py-5"
                style={{ fontFamily: `var(${font.style})` }}
              >
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <span className="text-2xl font-semibold text-foreground">{font.label}</span>
                  <span className="text-sm text-muted-foreground">{font.author}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The quick brown fox jumps over the lazy dog — 0123456789
                </p>
                <p className="mt-2 text-xs text-muted-foreground tracking-wide">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz
                </p>
              </div>

              {/* Meta */}
              <div className="px-5 py-3">
                <p className="text-xs text-muted-foreground">{font.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">How it works</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          All six fonts are loaded at startup via Next.js font optimisation — each assigned a unique CSS variable.
          Selecting a font sets a <code className="rounded bg-muted px-1 font-mono text-xs">data-font</code> attribute 
          on <code className="rounded bg-muted px-1 font-mono text-xs">&lt;html&gt;</code>, and CSS rules 
          point <code className="rounded bg-muted px-1 font-mono text-xs">--font-sans</code> to the right variable.
          Since all Tailwind utility classes use <code className="rounded bg-muted px-1 font-mono text-xs">var(--font-sans)</code>, 
          every component updates immediately.
        </p>
        <CodeBlock
          code={`/* globals.css */
:root,
[data-font="inter"]             { --font-sans: var(--font-inter); }
[data-font="plus-jakarta-sans"] { --font-sans: var(--font-plus-jakarta-sans); }
[data-font="dm-sans"]           { --font-sans: var(--font-dm-sans); }
[data-font="manrope"]           { --font-sans: var(--font-manrope); }
[data-font="outfit"]            { --font-sans: var(--font-outfit); }
[data-font="figtree"]           { --font-sans: var(--font-figtree); }`}
          filename="globals.css"
        />
        <div className="mt-4">
          <CodeBlock
            code={`// Font is persisted in localStorage and restored on page load
// via an inline <script> before the first paint (no FOUC).

// To change the font programmatically:
document.documentElement.setAttribute('data-font', 'manrope')
localStorage.setItem('aether-font', 'manrope')`}
            filename="font-switching.ts"
          />
        </div>
      </section>

      {/* Framework integration */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Framework setup</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          After running <code className="rounded bg-muted px-1 font-mono text-xs">aether-ui init</code>,
          the CLI writes the font configuration to your project. Here&apos;s what it sets up for Next.js:
        </p>
        <CodeBlock
          code={`// app/layout.tsx
import {
  Inter,
  Plus_Jakarta_Sans,
  DM_Sans,
  Manrope,
  Outfit,
  Figtree,
  JetBrains_Mono,
} from "next/font/google"

// Each font loaded with its own CSS variable
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${inter.variable} \${plusJakartaSans.variable} \${dmSans.variable} \${manrope.variable} \${outfit.variable} \${figtree.variable} \${jetbrainsMono.variable} font-sans\`}>
        {children}
      </body>
    </html>
  )
}`}
          filename="app/layout.tsx"
        />

        <div className="mt-4">
          <p className="mb-3 text-sm text-muted-foreground">For Vite + React, use <code className="rounded bg-muted px-1 font-mono text-xs">@fontsource</code> packages instead:</p>
          <CodeBlock
            code={`# Pick your font
npm install @fontsource-variable/inter
npm install @fontsource-variable/plus-jakarta-sans

# main.tsx
import "@fontsource-variable/inter"

/* globals.css */
:root { --font-sans: "Inter Variable", sans-serif; }`}
            filename="terminal"
          />
        </div>
      </section>

      {/* aether.config.json */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Configuration</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Your chosen font is saved in <code className="rounded bg-muted px-1 font-mono text-xs">aether.config.json</code>. 
          The CLI uses this when adding new components to ensure the correct import is generated.
        </p>
        <CodeBlock
          code={`{
  "$schema": "https://aether-ui.dev/schema.json",
  "font": {
    "sans": "plus-jakarta-sans",
    "mono": "jetbrains-mono"
  },
  "tailwind": {
    "cssVariables": true
  }
}`}
          filename="aether.config.json"
        />
      </section>
    </div>
  )
}
