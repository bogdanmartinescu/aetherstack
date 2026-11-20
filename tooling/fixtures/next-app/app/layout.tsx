import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  title: "Aether fixture — Next",
  description: "Clean consumer install fixture for @aetherstack/ui",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
