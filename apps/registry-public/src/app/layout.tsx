import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Aether UI Registry",
  description: "Public component registry for Aether UI — install components with shadcn CLI.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
