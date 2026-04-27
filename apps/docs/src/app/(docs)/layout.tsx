import { DocsShell } from "@/components/docs-sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
