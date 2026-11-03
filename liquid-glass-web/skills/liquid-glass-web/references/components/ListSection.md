# ListSection

A grouped list section: an opaque `surface` block at `radius-lg` with roomy rows, a Title Case header and an optional footer. Content, so never glass.

**Consumer provides:** `header` (Title Case, not all caps), `rows` (`[{title, subtitle?, detail?, icon?, accessory?, onClick?}]`), `footer`. A row with `onClick` becomes a button with a chevron.

- Rows are at least 52px; separators inset from the leading edge by `space-4`.
- Sections sit `space-6` apart on `canvas`.
- `detail` is a short value in `ink-secondary`; long text goes in `subtitle`.
- Put toggles in `accessory`, and the Toggle carries the row's label via `aria-label`.
