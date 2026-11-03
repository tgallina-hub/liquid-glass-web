# Glass

The Liquid Glass material on any element: a blurred, saturated, translucent layer with a specular rim that floats above content. Use it only for the functional layer (navigation, controls, transient surfaces), never for content itself.

**Consumer provides:** `children`, `variant` (`"regular"` default, or `"clear"`), `shape` (`"rounded"` → `radius-lg`, `"capsule"` → `radius-full`, `"circle"`), optional `as` (element tag) and any DOM props. The parent must have content behind it; glass over a flat `canvas` reads as a plain card.

- **Regular** (`glass-fill`, `glass-blur`, `glass-saturation`): the default for bars, groups, menus and medium sheets. Text on it is `ink`, secondary text `ink-glass-muted`, accent text `accent-glass`.
- **Clear** (`glass-fill-clear`): only over rich media (photos, video, maps). Lay `glass-dim` over bright media first, and put only symbols and bold labels in `on-glass-clear` on it.
- Do not stack glass on glass. A control inside a glass bar is a transparent item of that bar (see GlassGroup), not a second pane of glass.
- Do not use glass for list rows, cards of content or page sections: those are `surface`.
- With `prefers-reduced-transparency` or `prefers-contrast: more`, or when `backdrop-filter` is unsupported, the class falls back to `surface` automatically. The `contrast` theme does the same through tokens.
