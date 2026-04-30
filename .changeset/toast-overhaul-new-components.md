---
"@aetherstack/ui": minor
---

Add 7 new UI components and overhaul Toast

**New components:**
- `Alert` — semantic alert with default/success/warning/info/destructive variants
- `AlertDialog` — Radix UI-based modal for critical confirmations
- `Popover` — Radix UI floating overlay
- `Collapsible` — expandable/collapsible content section
- `Spinner` — animated loading indicator with size variants
- `Kbd` — keyboard key badge component
- `Drawer` — vaul-based bottom sheet drawer

**Toast overhaul:**
- Added `success`, `warning`, `info` variants (alongside existing `default` and `destructive`)
- Each variant now includes an automatic semantic icon (CheckCircle2, AlertTriangle, Info, XCircle)
- Added `<Toaster />` convenience component — drop it once in your root layout and call `toast()` anywhere
- Fixed `TOAST_REMOVE_DELAY` from 1,000,000ms to 1,000ms so toasts clean up properly
- Improved layout: `items-start gap-3` with icon column + content column
- Updated `ToastViewport` to consistently render at `bottom-0 right-0`
