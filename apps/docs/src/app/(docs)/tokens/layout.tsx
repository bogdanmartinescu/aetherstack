import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Design tokens",
  description:
    "Aether UI design token reference: colors, typography, spacing, radius, shadows and motion, exposed as CSS variables you can theme per project.",
  path: "/tokens/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
