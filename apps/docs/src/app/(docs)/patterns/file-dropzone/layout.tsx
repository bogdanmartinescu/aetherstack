import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { itemBreadcrumbs, itemMetadata } from "@/lib/seo"

export const metadata = itemMetadata("registry:pattern", "file-dropzone")

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={itemBreadcrumbs("registry:pattern", "file-dropzone")} />
      {children}
    </>
  )
}
