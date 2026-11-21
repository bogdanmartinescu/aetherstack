import type { Metadata } from "next"
import { Inter } from "next/font/google"
import registry from "../../../../registry/public/registry.json"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

const REGISTRY_URL = "https://registry.aether-ui.dev"
const itemCount = (registry as { items: unknown[] }).items.length
const TITLE = "Aether UI Registry — open-code React components"
const DESCRIPTION = `The public Aether UI registry: ${itemCount} open-code React components, patterns and blocks. Install any of them with npx @aetherstack/cli add.`

export const metadata: Metadata = {
  metadataBase: new URL(REGISTRY_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${REGISTRY_URL}/` },
  openGraph: {
    type: "website",
    siteName: "Aether UI",
    title: TITLE,
    description: DESCRIPTION,
    url: `${REGISTRY_URL}/`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
