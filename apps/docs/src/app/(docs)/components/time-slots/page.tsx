"use client"

import { TimeSlots } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { TIME_SLOTS_SOURCE } from "@/lib/registry-source"

const previewSlots = [
  { id: "a", label: "09:00" },
  { id: "b", label: "09:30", disabled: true },
] as const

export default function TimeSlotsPage() {
  return (
    <ComponentPage
      name="Time Slots"
      description="Pick one bookable time and confirm it."
      features={[
        "Radio group for single time selection",
        "Shows the booking time zone",
        "Confirm action once a slot is selected",
        "Controlled and uncontrolled selection",
      ]}
      preview={<TimeSlots timeZoneLabel="Europe/Bucharest" slots={previewSlots} />}
      previewCode={`import { TimeSlots } from "@/components/ui/time-slots"

const slots = [
  { id: "a", label: "09:00" },
  { id: "b", label: "09:30", disabled: true },
]

export function TimeSlotsDemo() {
  return (
    <TimeSlots
      timeZoneLabel="Europe/Bucharest"
      slots={slots}
      onConfirm={(id) => console.log(id)}
    />
  )
}`}
      cliInstall="npx @aetherstack/cli add time-slots"
      manualInstallCode={TIME_SLOTS_SOURCE}
      manualSteps={[
        {
          title: "Add the radio-group registry dependency",
          code: "npx @aetherstack/cli add radio-group",
          filename: "terminal",
        },
        {
          title: "Add the button registry dependency",
          code: "npx @aetherstack/cli add button",
          filename: "terminal",
        },
      ]}
      examples={[]}
      props={[
        {
          name: "timeZoneLabel",
          type: "string",
          default: "—",
          description: "Time zone label shown above the slot list.",
        },
        {
          name: "slots",
          type: "readonly TimeSlot[]",
          default: "—",
          description: "Bookable slots with id, label, and optional disabled flag.",
        },
        {
          name: "value",
          type: "string",
          default: "—",
          description: "Selected slot id (controlled).",
        },
        {
          name: "onValueChange",
          type: "(id: string) => void",
          default: "—",
          description: "Called when the user picks a different slot.",
        },
        {
          name: "onConfirm",
          type: "(id: string) => void",
          default: "—",
          description: "Called when the user clicks Confirm with a selected slot.",
        },
        {
          name: "confirmLabel",
          type: "string",
          default: '"Confirm"',
          description: "Label for the confirm button.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Extra classes on the root element.",
        },
      ]}
      a11yNotes={[
        'The radio group uses aria-label="Times".',
        "Each radio's accessible name comes from the slot label.",
        "The confirm button stays disabled until a slot is selected.",
      ]}
    />
  )
}
