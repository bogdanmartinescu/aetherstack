"use client"

import * as React from "react"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface VoiceInputProps {
  onTranscript?: (text: string) => void
  disabled?: boolean
  className?: string
}

type SpeechRecognitionConstructor = new () => {
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((event: { results: SpeechRecognitionResultList }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null
  const win = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null
}

function VoiceInput({ onTranscript, disabled = false, className }: VoiceInputProps) {
  const [isRecording, setIsRecording] = React.useState(false)
  const recognitionRef = React.useRef<InstanceType<SpeechRecognitionConstructor> | null>(null)

  function startRecording() {
    const SpeechRecognitionCtor = getSpeechRecognition()

    if (!SpeechRecognitionCtor) {
      onTranscript?.("[Voice input not supported in this browser]")
      return
    }

    const recognition = new SpeechRecognitionCtor()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? ""
      onTranscript?.(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }

  function toggle() {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        onClick={toggle}
        disabled={disabled}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-40",
          isRecording
            ? "border-destructive bg-destructive text-destructive-foreground animate-pulse"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {isRecording ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>
      {isRecording && (
        <span className="text-xs text-muted-foreground animate-pulse">Recording…</span>
      )}
    </div>
  )
}

export { VoiceInput }
