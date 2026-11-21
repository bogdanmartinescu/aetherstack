import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Fonts",
  description:
    "Six curated Google Fonts for Aether UI interfaces: Inter, Plus Jakarta Sans, DM Sans, Manrope, Outfit and Figtree, switchable globally with one setting.",
  path: "/fonts/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
