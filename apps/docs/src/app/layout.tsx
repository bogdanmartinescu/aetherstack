import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Aether UI",
    template: "%s — Aether UI",
  },
  description:
    "Premium shadcn-compatible design system for SaaS dashboards and admin interfaces.",
  keywords: ["design system", "shadcn", "tailwind", "react", "saas", "dashboard"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>{children}</body>
    </html>
  )
}
