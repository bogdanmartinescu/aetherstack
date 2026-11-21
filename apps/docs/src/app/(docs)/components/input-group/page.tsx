import type { Metadata } from "next"
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { getRegistrySource } from "@/lib/registry-source"
import { DollarSign, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Input Group",
  description: "An Input with left and/or right addon slots for icons, labels, or buttons.",
}

const MANUAL_SOURCE = getRegistrySource("input-group")

export default function InputGroupPage() {
  return (
    <ComponentPage
      name="Input Group"
      description="An Input with left and/or right addon slots for icons, labels, or buttons. Addons share border treatment with the input so they visually merge into a single field."
      features={[
        "Left and right addon positions",
        "Works with any Input props",
        "Addons share border treatment with the input",
        "Supports text, icon, or button addons",
      ]}
      preview={
        <div className="flex w-full max-w-sm flex-col gap-3">
          <InputGroup>
            <InputGroupAddon position="left">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="0.00" className="rounded-l-none" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon position="left">
              <Search className="h-4 w-4" />
            </InputGroupAddon>
            <Input placeholder="Search…" className="rounded-l-none" />
          </InputGroup>
        </div>
      }
      previewCode={`import { InputGroup, InputGroupAddon, InputGroupText } from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon position="left">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="0.00" className="rounded-l-none" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon position="left">
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <Input placeholder="Search…" className="rounded-l-none" />
      </InputGroup>
    </div>
  )
}`}
      cliInstall={`npx @aetherstack/cli add input-group`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "Left text addon",
          description: "Add a text prefix like a currency symbol.",
          preview: (
            <InputGroup className="max-w-xs">
              <InputGroupAddon position="left">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="0.00" className="rounded-l-none" />
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupAddon position="left">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <Input placeholder="0.00" className="rounded-l-none" />
</InputGroup>`,
        },
        {
          title: "Right addon",
          description: "Place the addon on the right side.",
          preview: (
            <InputGroup className="max-w-xs">
              <Input placeholder="Enter amount" className="rounded-r-none" />
              <InputGroupAddon position="right">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <Input placeholder="Enter amount" className="rounded-r-none" />
  <InputGroupAddon position="right">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
        },
        {
          title: "Both sides",
          description: "Combine left and right addons on the same input.",
          preview: (
            <InputGroup className="max-w-xs">
              <InputGroupAddon position="left">
                <DollarSign className="h-4 w-4" />
              </InputGroupAddon>
              <Input placeholder="0.00" className="rounded-none" />
              <InputGroupAddon position="right">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupAddon position="left">
    <DollarSign className="h-4 w-4" />
  </InputGroupAddon>
  <Input placeholder="0.00" className="rounded-none" />
  <InputGroupAddon position="right">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "InputGroup",
          props: [
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the flex wrapper.",
            },
            {
              name: "...props",
              type: "React.HTMLAttributes<HTMLDivElement>",
              description: "All standard HTML div attributes.",
            },
          ],
        },
        {
          title: "InputGroupAddon",
          props: [
            {
              name: "position",
              type: '"left" | "right"',
              default: '"left"',
              description: "Which side of the input the addon attaches to.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the addon wrapper.",
            },
          ],
        },
        {
          title: "InputGroupText",
          props: [
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the inner text span.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "InputGroup is a layout container only — it has no implicit ARIA semantics.",
        "The inner Input still receives focus normally; addons are presentational.",
        "If the addon communicates meaningful context (e.g. currency), add aria-describedby on the Input pointing to a visually-hidden description.",
      ]}
    />
  )
}
