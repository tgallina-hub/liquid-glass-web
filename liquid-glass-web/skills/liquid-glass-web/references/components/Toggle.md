# Toggle

A binary switch. While pressed, its knob lifts into clear glass and grows, so the track shows through it.

**Consumer provides:** `children` (the label, in sentence case), `checked` + `onChange` (or `defaultChecked`), `disabled`. Without a visible label pass `aria-label`.

- Use for settings that apply immediately. If a Save step follows, use a checkbox instead.
- Track: `track-off` / `accent`; knob: `knob`. Both hold 3:1 in every theme.
- The label is the hit target too.
