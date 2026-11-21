import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Icons",
  description:
    "Aether UI uses Lucide React as its default icon library and adds a small set of custom Aether icons. See usage, sizing and tree-shaking guidance.",
  path: "/icons/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
