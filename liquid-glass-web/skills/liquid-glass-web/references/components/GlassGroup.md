# GlassGroup

One capsule of glass shared by related actions, the web counterpart of grouping toolbar items. Items inside are transparent; the group carries the material once.

**Consumer provides:** `children` (Buttons, all icon-only or all text, never mixed), `label` (accessible name for the group), optional `separators`, `variant`.

- Group by meaning (edit actions together, navigation together) and keep the same grouping on every screen size.
- Two groups sit `space-2` apart; use `Toolbar.Spacer` for a fixed gap, never an empty button.
- To hide an action, remove the whole item, not just its icon.
