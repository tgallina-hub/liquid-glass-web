# Button

A capsule action. Four variants map to the platform styles: `glass` (default), `prominent` (accent-tinted, the primary action), `clear` (over media) and `plain` (text only, inside content).

**Consumer provides:** `children` (label, sentence case, verb first) and/or `icon` (an Icon name), `variant`, `size` (`"sm"` `control-sm`, `"md"` `control-md`, `"lg"` `control-lg`, `"xl"` `control-xl`), `destructive`, `disabled`, `onClick`. An icon-only button needs `aria-label`.

- One `prominent` button per view, for the thing the screen is for. Everything else is `glass`.
- Use `xl` only for a single action at the bottom of a sheet or onboarding step.
- In toolbars prefer a standard symbol over a word for common actions, and never mix symbol and text items inside one GlassGroup.
- `destructive` turns the label `critical-glass` (glass) or the fill `critical` (prominent). Confirm before destroying anything not undoable.
- Press feedback is a short spring scale, removed under reduced motion. The hit area is never below `target-min`, even at `sm`.
