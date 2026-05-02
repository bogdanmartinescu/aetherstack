import type { Metadata } from "next"
import { ErrorPage } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Error Page",
  description: "A full-page 404/500 error state with code, headline, description, and back link.",
}

export default function ErrorPageDoc() {
  return (
    <BlockPage
      name="Error Page"
      category="Errors"
      description="A full-page error state for 404, 500, or any custom error code. Ships with sensible default headlines and descriptions that can be overridden. Includes a back-home button and an optional illustration slot."
      cliInstall="npx aether-ui add error-page"
      previewScale={0.75}
      previewHeight="420px"
      importCode={`import { ErrorPage } from "@aetherstack/blocks"`}
      usageCode={`import { ErrorPage } from "@aetherstack/blocks"

// 404
export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      backHref="/"
      backLabel="Go back home"
    />
  )
}

// 500
export function ServerError() {
  return (
    <ErrorPage
      code="500"
      backHref="/"
    />
  )
}`}
      preview={
        <div className="flex gap-4">
          <div className="flex-1 overflow-hidden rounded-lg border border-border">
            <ErrorPage
              code="404"
              backHref="#"
              backLabel="Go back home"
            />
          </div>
        </div>
      }
      props={[
        { name: "code", type: "string", default: "'404'", description: "Error code displayed in large type. Supports '404', '500', or any string." },
        { name: "headline", type: "string", description: "Custom headline. Defaults to a preset for 404/500." },
        { name: "description", type: "string", description: "Custom description. Defaults to a preset for 404/500." },
        { name: "backHref", type: "string", default: "'/'", description: "URL for the back link button." },
        { name: "backLabel", type: "string", default: "'Go back home'", description: "Label for the back link button." },
        { name: "illustration", type: "ReactNode", description: "Optional illustration rendered above the error code." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "The headline renders as an <h1>.",
        "The back button uses a plain <a> wrapped in Button asChild.",
      ]}
    />
  )
}
