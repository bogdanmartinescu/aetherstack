"use client"

import { Tag, TagGroup } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { TAG_SOURCE } from "@/lib/registry-source"

const previewItems = [
  { id: "bug", label: "Bug" },
  { id: "docs", label: "Docs" },
  { id: "ui", label: "UI" },
] as const

export default function TagPage() {
  return (
    <ComponentPage
      name="Tag"
      description="Selectable chips and removable labels with roving keyboard focus."
      features={["Removable Tag", "Single or multiple selection", "Arrow-key roving focus"]}
      preview={
        <div className="flex flex-col gap-3">
          <TagGroup label="Labels" items={previewItems} />
          <Tag label="Beta" onRemove={() => undefined} />
        </div>
      }
      previewCode={`import { Tag, TagGroup } from "@/components/ui/tag"\n\n<TagGroup label="Labels" items={[{ id: "bug", label: "Bug" }, { id: "docs", label: "Docs" }, { id: "ui", label: "UI" }]} />\n<Tag label="Beta" onRemove={() => {}} />`}
      cliInstall="npx aether-ui add tag"
      manualInstallCode={TAG_SOURCE}
      examples={[]}
      props={[
        {
          name: "label",
          type: "string",
          default: "—",
          description: "Visible text on Tag, or the group's spoken name.",
        },
        {
          name: "items",
          type: "readonly TagItem[]",
          default: "—",
          description: "TagGroup entries with id and label.",
        },
        {
          name: "selection",
          type: '"single" | "multiple"',
          default: "—",
          description: "When set, clicks update value through onValueChange.",
        },
        {
          name: "value",
          type: "readonly string[]",
          default: "—",
          description: "Selected item ids for TagGroup.",
        },
        {
          name: "onValueChange",
          type: "(value: string[]) => void",
          default: "—",
          description: "Called when selection changes in single or multiple mode.",
        },
        {
          name: "onRemove",
          type: "() => void",
          default: "—",
          description: "When provided on Tag, shows a remove button.",
        },
      ]}
      a11yNotes={[
        "TagGroup uses role=group with aria-label and aria-pressed on each chip.",
        "Roving tabindex keeps one chip in tab order; arrows move focus without stealing it on mount.",
      ]}
    />
  )
}
