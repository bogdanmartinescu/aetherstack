"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button, Card, CardContent, CardHeader, CardTitle, Label, Slider, Textarea } from "@aetherstack/ui"

interface AISettingsPanelProps {
  temperature?: number
  onTemperatureChange?: (v: number) => void
  maxTokens?: number
  onMaxTokensChange?: (v: number) => void
  systemPrompt?: string
  onSystemPromptChange?: (v: string) => void
  className?: string
}

function AISettingsPanel({
  temperature = 0.7,
  onTemperatureChange,
  maxTokens = 2048,
  onMaxTokensChange,
  systemPrompt = "",
  onSystemPromptChange,
  className,
}: AISettingsPanelProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Model settings</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>
            {open ? "Hide" : "Show"}
          </Button>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Temperature</Label>
              <span className="text-sm text-muted-foreground font-mono">{temperature.toFixed(2)}</span>
            </div>
            <Slider
              min={0}
              max={2}
              step={0.01}
              value={[temperature]}
              onValueChange={([v]) => v !== undefined && onTemperatureChange?.(v)}
            />
            <p className="text-xs text-muted-foreground">
              Lower = more deterministic · Higher = more creative
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Max tokens</Label>
              <span className="text-sm text-muted-foreground font-mono">{maxTokens}</span>
            </div>
            <Slider
              min={256}
              max={8192}
              step={256}
              value={[maxTokens]}
              onValueChange={([v]) => v !== undefined && onMaxTokensChange?.(v)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm">System prompt</Label>
            <Textarea
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange?.(e.target.value)}
              placeholder="You are a helpful assistant…"
              rows={4}
              className="resize-y"
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export { AISettingsPanel }
