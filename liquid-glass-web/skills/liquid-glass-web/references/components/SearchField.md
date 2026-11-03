# SearchField

A capsule search input. On glass it floats with the bars; inside content it sits on `surface-sunken`.

**Consumer provides:** `value`/`onChange` or `defaultValue`, `placeholder` (names what is searched: "Search vaults"), `placement` (`"glass"` default, `"surface"`), any input props.

- On narrow layouts search lives at the bottom, beside the tab bar, and moves up with the keyboard.
- Placeholder in `ink-glass-muted` on glass, `ink-secondary` on surface; typed text in `ink`.
- Show results as the person types; do not require a submit button.
