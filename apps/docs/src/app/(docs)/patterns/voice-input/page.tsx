"use client"

import { PatternPage } from "@/components/pattern-page"
import { VoiceInputPreview } from "./preview"

export default function VoiceInputPage() {
  return (
    <PatternPage
      name="Voice Input"
      description="A microphone button that captures speech using the browser's Web Speech API and returns a transcript string via the onTranscript callback. The button pulses with a destructive style while recording. Falls back gracefully in browsers that do not support the API."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add voice-input"
      importCode={`import { VoiceInput } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { VoiceInput } from "@aetherstack/patterns"

export function MyVoiceInput() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex items-center gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type or speak…"
        className="flex-1 rounded-md border px-3 py-2 text-sm"
      />
      <VoiceInput
        onTranscript={(text) => setValue((prev) => prev + text)}
      />
    </div>
  )
}`}
      preview={<VoiceInputPreview />}
      props={[
        { name: "onTranscript", type: "(text: string) => void", description: "Called with the final transcript string when speech recognition completes." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the microphone button." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the wrapper element." },
      ]}
      a11yNotes={[
        'The microphone button has a dynamic aria-label: "Start recording" when idle, "Stop recording" when active.',
        "The recording state is communicated visually via pulsing animation and the MicOff icon change.",
        "Users who cannot use voice input can dismiss or ignore the component without any side effects.",
        "The component requires microphone permission — browsers will prompt for it on first use.",
      ]}
    />
  )
}
