/**
 * Manual-install source for docs pages, read from the built registry items in
 * apps/registry-public/public/r so the code shown can never drift from what
 * `aether-ui add` installs. Rebuild the registry after changing a component.
 */
import animatedNumber from "../../../registry-public/public/r/animated-number.json"
import button from "../../../registry-public/public/r/button.json"
import floatingDock from "../../../registry-public/public/r/floating-dock.json"
import heatmap from "../../../registry-public/public/r/heatmap.json"
import statusDot from "../../../registry-public/public/r/status-dot.json"
import passwordField from "../../../registry-public/public/r/password-field.json"
import passwordStrength from "../../../registry-public/public/r/password-strength.json"
import priorityBars from "../../../registry-public/public/r/priority-bars.json"
import segmentedControl from "../../../registry-public/public/r/segmented-control.json"
import socialButton from "../../../registry-public/public/r/social-button.json"
import tag from "../../../registry-public/public/r/tag.json"
import timeSlots from "../../../registry-public/public/r/time-slots.json"
import timelineScrubber from "../../../registry-public/public/r/timeline-scrubber.json"
import uptimeBar from "../../../registry-public/public/r/uptime-bar.json"

interface RegistryItemJson {
  files: { content: string }[]
}

function toManualSource(item: RegistryItemJson): string {
  return item.files
    .map((file) => file.content)
    .join("\n")
    .replaceAll('"@aetherstack/utils"', '"@/lib/utils"')
}

export const ANIMATED_NUMBER_SOURCE = toManualSource(animatedNumber)

export const BUTTON_SOURCE = toManualSource(button)

export const FLOATING_DOCK_SOURCE = toManualSource(floatingDock)

export const HEATMAP_SOURCE = toManualSource(heatmap)

export const STATUS_DOT_SOURCE = toManualSource(statusDot)

export const TAG_SOURCE = toManualSource(tag)

export const TIME_SLOTS_SOURCE = toManualSource(timeSlots)

export const TIMELINE_SCRUBBER_SOURCE = toManualSource(timelineScrubber)

export const PASSWORD_FIELD_SOURCE = toManualSource(passwordField)

export const PASSWORD_STRENGTH_SOURCE = toManualSource(passwordStrength)

export const PRIORITY_BARS_SOURCE = toManualSource(priorityBars)

export const SEGMENTED_CONTROL_SOURCE = toManualSource(segmentedControl)

export const SOCIAL_BUTTON_SOURCE = toManualSource(socialButton)

export const UPTIME_BAR_SOURCE = toManualSource(uptimeBar)
