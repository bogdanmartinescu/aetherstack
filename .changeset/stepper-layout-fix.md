---
"@aetherstack/patterns": patch
---

Fix horizontal Stepper layout alignment

Rewrite horizontal step rendering to use split half-connectors so step
circles stay centred and connector lines form a continuous visual path
between steps. Fixes misalignment between circles and labels in
horizontal orientation.
