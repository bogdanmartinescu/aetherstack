import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Charts",
  description:
    "Chart examples for Aether UI built with Recharts: line, bar and area charts with token-driven colors, plus usage notes and the chart primitive.",
  path: "/charts/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
