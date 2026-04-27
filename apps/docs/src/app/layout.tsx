import type { Metadata } from "next"
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
import { Providers } from "./providers"
import "./globals.css"

// ── Google font instances — each gets its own CSS variable ──────────────────
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" })
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

export const metadata: Metadata = {
  title: {
    default: "Aether UI",
    template: "%s — Aether UI",
  },
  description:
    "Premium open-code design system for SaaS dashboards and admin interfaces.",
  keywords: ["design system", "shadcn", "tailwind", "react", "saas", "dashboard"],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: fontScript }} />
      </head>
      <body className={`${fontClasses} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
