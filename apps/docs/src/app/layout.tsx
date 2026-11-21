import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import {
  Inter,
  Plus_Jakarta_Sans,
  DM_Sans,
  Manrope,
  Outfit,
  Figtree,
  JetBrains_Mono,
} from "next/font/google"
import { OG_IMAGE_ALT, OG_IMAGE_URL, SITE_NAME, SITE_URL } from "@/lib/seo"
import { Providers } from "./providers"
import { Toaster } from "@aetherstack/ui"
import "./globals.css"

// ── Google font instances — each gets its own CSS variable ──────────────────
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// Only Inter and the mono face are preloaded on every page. The other families are
// opt-in through the font switcher, so they load on demand instead of on first paint.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  preload: false,
})
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", preload: false })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", preload: false })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", preload: false })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", preload: false })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const fontClasses = [
  inter.variable,
  plusJakartaSans.variable,
  dmSans.variable,
  manrope.variable,
  outfit.variable,
  figtree.variable,
  jetbrainsMono.variable,
].join(" ")

// Inline script: read persisted font from localStorage before first paint
// to avoid flash of unstyled content.
const fontScript = `(function(){try{var f=localStorage.getItem('aether-font')||'inter';document.documentElement.setAttribute('data-font',f);}catch(e){}})()`

const DEFAULT_TITLE = "Aether UI — React components for SaaS and AI products"
const DEFAULT_DESCRIPTION =
  "Aether UI is an open-code design system for React and Tailwind: accessible primitives, patterns, blocks and AI chat components that you install as source you own."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s — ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontClasses}>
      <head>
        {/* Runs synchronously before first paint to avoid font flash */}
        <script dangerouslySetInnerHTML={{ __html: fontScript }} />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
