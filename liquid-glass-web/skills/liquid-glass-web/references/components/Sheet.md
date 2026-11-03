# Sheet

A modal panel from the bottom edge. At the `medium` detent it is inset glass with content peeking around it and no scrim; at `large` it turns opaque `surface`, meets the edges, and a `scrim` covers the page.

**Consumer provides:** `title`, `children`, `detent` (`"medium"` default, `"large"`), `onClose` (adds the close button), `action` (a trailing Button, e.g. Done), `open`, `contained` (position inside the nearest positioned parent instead of the viewport). The consumer traps focus and handles Escape.

- Radius `radius-xl`; content blocks inside take `radius-xl` minus the `space-5` padding (concentric).
- Keep critical content away from the corners.
- One primary action, top trailing (Done) or an `xl` prominent Button at the bottom, not both.
- An action sheet (choices about a specific element) is a Menu anchored to that element, not a Sheet.
