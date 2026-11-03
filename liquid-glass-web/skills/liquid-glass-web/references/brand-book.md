A web design system that applies the Liquid Glass material model to browser interfaces: content sits on an opaque layer, and a thin, translucent functional layer of navigation and controls floats above it. It follows the principles of Apple's "Adopting Liquid Glass" guidance, adapted to CSS. It is an independent adaptation for the web, not Apple's own kit, and it ships no Apple fonts, symbols or assets.

## Principles

1. **Two layers, never mixed.** Content (`canvas`, `surface`) is opaque and holds everything people read. Glass (`glass-fill`) holds only what people use to navigate and act: bars, tab bar, toolbar groups, menus, popovers, medium sheets.
2. **Glass is scarce.** Apply it to the few most important functional elements. Never put glass on glass, and never put glass on content rows, cards or page sections.
3. **Content runs underneath.** Bars float; there is no bar background. Content scrolls under the glass and the scroll edge effect (`Toolbar` `edge`) softens it so labels stay legible.
4. **Color comes from content.** The glass layer is colorless. One accent (`accent`) marks the primary action and the selected state, once or twice per view.
5. **Shapes are capsules and concentric curves.** Controls are capsules (`radius-full`). Nested shapes share a center: an inner radius equals the outer radius minus the inset between them.
6. **Respect the person's settings.** Reduced transparency, increased contrast and reduced motion each turn the effect down, automatically (see Accessibility).

## Voice and copy

- Sentence case for buttons, menu items and labels: "Request access", "Extend 1 hour". Title Case only for list section headers ("Recent Sessions"), never all caps.
- Verbs first on actions. Name the object when it is ambiguous: "Revoke access", not "Revoke".
- Speak to the person as "you"; the product does not say "I" or "we" in controls.
- Short and specific; no exclamation marks, no emoji in the interface.
- A status is a word plus a glyph ("Approved", "Expires soon", "Denied"), never a color alone.

## Color

- Page: `canvas`. Content blocks: `surface`. Wells inside a surface (search at rest, segmented track): `surface-sunken`.
- Text on canvas and surface: `ink`, secondary `ink-secondary`.
- Text on regular glass: `ink`, secondary `ink-glass-muted`, accent `accent-glass`, destructive `critical-glass`. These four hold 4.5:1 over the worst case the glass can sit on (pure black content in light, pure white in dark). `ink-secondary`, `accent-text` and `critical` do not, so never use them on glass.
- Clear glass (`glass-fill-clear`) only over photos, video or maps, with `glass-dim` laid over bright media, and only symbols or bold labels 19px+ in `on-glass-clear`.
- Primary action fill: `accent` with `on-accent`. In the dark theme `on-accent` is dark, because the lighter accent fails white text.
- Status: `positive`, `warning`, `critical` as text and glyphs on canvas and surface, always with a word.
- Hairlines: `separator`. Boundaries of unlabeled controls: `control-stroke`. Toggle: `track-off` / `accent` with `knob`.
- Modal backdrop: `scrim`, only under a large sheet or an alert.

Three themes: `light`, `dark`, and `contrast`, which stands for the Reduce Transparency and Increase Contrast settings combined: glass resolves to opaque white, every glass and surface edge becomes a 2px `ink` border, and text holds at least 7:1.

## Material

Glass is a recipe of three tokens and two shadows, applied by the `lg-glass` class (or `LG.Glass`):

```css
background: var(--glass-fill);
backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
box-shadow: var(--glass-edge), var(--glass-lift);
```

- `glass-edge` is the specular rim (top highlight, hairline rim, bottom shade). `glass-lift` separates floating glass from content. Inline, non-floating glass (inside a dimmed media area) can drop the lift with `flat`.
- Clear glass swaps in `glass-fill-clear`, `glass-blur-clear` and `glass-saturation-clear`.
- Group related glass items in one `GlassGroup` so they share one surface instead of each carrying its own.
- Glass costs rendering time. Keep it to bars, menus and sheets, and avoid animating `backdrop-filter`.

## Typography

- The system font stack (`sans` for text, `display` for 20px+): San Francisco on Apple devices, Segoe UI Variable on Windows, the platform face elsewhere. No web font is loaded; this is deliberate, so the interface matches the device.
- `large-title` once per screen, above content; it collapses into the bar's `headline` title on scroll.
- Body copy and row titles in `body`. Supporting copy in `callout` or `subheadline`. Button and menu labels in `label`.
- List section headers in `section-header`, Title Case. Footers and captions in `footnote`. Tab labels in `caption`.
- Identifiers, hostnames and keys in `code`.

## Layout and shape

- Spacing steps: `space-1` through `space-10`. Page gutters `space-4` on narrow screens, `space-8` on wide ones. Sections `space-6` apart.
- Every tappable thing has a hit area of at least `target-min`. Default control heights: `control-md` with a pointer, `control-lg` for touch; `control-xl` for one bottom action.
- Radii: capsules (`radius-full`) for all controls; `radius-lg` for list sections, cards and menus; `radius-xl` for sheets; `radius-md` for fields and small cards.
- Concentric rule: a child inset by `p` inside a container of radius `R` gets `R − p` (menus: items at `radius-lg − space-2`; sheets: blocks at `radius-xl − space-5`). Floor at `radius-xs`.
- Lists are roomy: rows at least 52px, separators inset `space-4` from the leading edge.
- Navigation: a floating `TabBar` at the bottom of narrow layouts; from 900px the same items become a `surface` sidebar. Search sits at the trailing end of the tab bar, as its own circle.

## Motion

- Controls respond on press with a short spring: buttons scale up slightly, the toggle knob lifts into glass, a menu grows out of the button that opened it.
- Durations and curves live in `components/bundle.css` (`--lg-dur` 280ms, `--lg-ease`, `--lg-ease-spring`); tokens have no motion family.
- Under `prefers-reduced-motion` every transition collapses to an instant change.

## Iconography

- `LG.Icon` is a small original stroke set (24px grid, 1.75 stroke, round caps, `currentColor`). It is a placeholder: replace it with the product's own symbols when they exist. Apple's SF Symbols are licensed for Apple platforms only and are not used here.
- Prefer a symbol over a word for common toolbar actions; do not mix symbol and text items within one group.
- Every standalone icon has an accessible label.

## Accessibility

- `prefers-reduced-transparency: reduce` and missing `backdrop-filter` support turn glass into `surface`. `prefers-contrast: more` also adds a 2px `ink` border. The `contrast` theme expresses the same at token level for products that offer an in-app setting.
- Keyboard focus: a 3px solid `focus-ring` outline at 2px offset. It holds 3:1 on canvas, surface and worst-case glass in every theme.
- Glass controls are identified by their label or symbol, not their edge, in the light and dark themes; the `contrast` theme gives them a border.
- Test every screen with the three themes and with reduced motion on.
