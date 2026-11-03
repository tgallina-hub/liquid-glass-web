# TabBar

Top-level navigation as a floating glass capsule at the bottom of narrow layouts, with search as a separate circle at its trailing end. It can minimize to the selected tab while the person scrolls down.

**Consumer provides:** `items` (`[{id, label, icon}]`, 3–5), `value` + `onChange` (or `defaultValue`), `onSearch` (adds the search tab), `minimized`, `label`.

- Selected tab: symbol and label in `accent-glass`; others in `ink`. Labels are one short noun in `caption`.
- Minimize on scroll down, restore on scroll up; never hide the tab bar entirely.
- At 900px and wider, turn the same items into a sidebar (a `surface` column), not a wider tab bar.
- Search is a role, not a tab with a magnifier icon: it always sits at the trailing end.
