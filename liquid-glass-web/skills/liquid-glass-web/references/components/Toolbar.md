# Toolbar

The top bar as floating glass groups over content, with a scroll edge effect that softens content as it passes under. No bar-wide background.

**Consumer provides:** `title` (or none), `leading` and `trailing` nodes (usually GlassGroups or Buttons), `label`, `edge` (`"top"` default, `"bottom"`, or `false`). Place it at the top of a scrolling container with `position: sticky` or absolutely.

- Do not paint a custom background behind the bar: it fights the material and the edge effect.
- Leading: back or close. Trailing: at most two groups. Overflow goes into a `more` Menu.
- Every symbol item has an accessible label.
- Use `Toolbar.Spacer` for fixed gaps between groups.
