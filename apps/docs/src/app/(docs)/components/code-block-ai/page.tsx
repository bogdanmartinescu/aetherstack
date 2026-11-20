import { redirect } from "next/navigation"

/** Legacy slug — registry item is `code-block`. */
export default function CodeBlockAiRedirectPage() {
  redirect("/components/code-block")
}
