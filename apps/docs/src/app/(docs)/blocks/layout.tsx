import type { ReactNode } from "react"
import { REGISTRY_STATS } from "@/lib/registry-stats"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blocks",
  description: `${REGISTRY_STATS.blocks} full-section React layouts built on Aether UI patterns: dashboards, settings, billing, marketing and AI workspaces.`,
  path: "/blocks/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
