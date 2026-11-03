---
name: liquid-glass-web
description: Build or restyle web interfaces (HTML/CSS, React, any framework) in the Liquid Glass style using the Liquid Glass Web design system, with tokens, components and contrast rules, and rebrand it with a new accent color. Use when asked for a glass, translucent or Liquid Glass look on the web, or to apply this design system. Do not use for native Apple apps (use SwiftUI/UIKit/AppKit's built-in glass APIs instead) or for print or slide design.
---

# Liquid Glass Web

A web design system that adapts the Liquid Glass material model to browsers. Content sits on an opaque layer, and a thin, translucent functional layer of navigation and controls floats above it. It is an independent adaptation of the public guidance in Apple's "Adopting Liquid Glass". It ships no Apple fonts, symbols or assets.

## What is in this skill

| Path | Use |
|---|---|
| `assets/tokens.json` | Source of truth: colors (themes `light`, `dark`, `contrast`), type, spacing, radius, size, material, shadow. |
| `assets/tokens.css` | Compiled CSS custom properties and type classes. Regenerate with `scripts/build_tokens_css.py` after changing tokens. |
| `assets/liquid-glass.css` | Component styles (`lg-*` classes). Framework-agnostic. |
| `assets/liquid-glass.react.js` | Optional React 18 bundle exposing `window.LG` (classic script; needs `window.React` and `window.ReactDOM`). |
| `assets/liquid-glass.d.ts` | Component props, as documentation. |
| `assets/example.html` | A complete screen in plain HTML. Copy its structure. |
| `references/brand-book.md` | Principles, voice, color, material, type, layout, motion, iconography, accessibility. **Read before designing.** |
| `references/html-api.md` | Markup for every component without React. |
| `references/components/<Name>.md` | Guidelines per component: what the consumer provides, do's and don'ts. |
| `scripts/contrast_check.py` | WCAG check of every token pair in every theme, including worst-case glass. Exit 1 on failure. |
| `scripts/build_tokens_css.py` | Compiles `tokens.json` into `tokens.css`. |

## Workflow

### A. Build or restyle a UI

1. Read `references/brand-book.md`, then the component files you need from `references/components/`.
2. Copy `assets/tokens.css` and `assets/liquid-glass.css` into the project and load them in that order. In React projects, the bundle or a port of the markup in `references/html-api.md` both work. In other frameworks, port the markup.
3. Lay out two layers:
   - **Content:** opaque, on `canvas` and `surface`. Everything people read goes here.
   - **Glass:** only navigation and controls, floating over scrolling content (toolbar, tab bar, groups, menus, medium sheets).
4. Use tokens by name (`var(--accent)`). Never hard-code a color, radius or spacing value that a token covers.
5. Run the checklist below before you finish.

### B. Rebrand (new accent or neutrals)

1. Change values in `assets/tokens.json` only. Keep token names, because the CSS depends on them.
2. Each changed accent needs its companions in every theme: `accent`, `on-accent`, `accent-text`, `accent-glass`, `focus-ring`. If the dark-theme accent is light, `on-accent` must be dark.
3. Run `python3 scripts/contrast_check.py assets/tokens.json`. Adjust values until it prints `RESULT: PASS`. Do not weaken the thresholds.
4. Run `python3 scripts/build_tokens_css.py assets/tokens.json > assets/tokens.css`.
5. Keep the glass tokens (`glass-fill`, `glass-edge`, `glass-lift`, `glass-blur`) unless asked. The glass layer stays colorless.

## Non-negotiable rules

- Glass only on the functional layer. Never on list rows, content cards or page sections, and never glass on glass.
- Text on regular glass uses only `ink`, `ink-glass-muted`, `accent-glass` or `critical-glass`. Never use `ink-secondary`, `accent-text` or `critical` on glass: they fail over dark or bright content.
- Clear glass (`lg-glass--clear`) only over photos, video or maps, with `lg-dim` beneath. Only symbols and bold labels 19px+ go on it.
- One `prominent` button per view. Every control is a capsule (`radius-full`). Nested radii are concentric: inner = outer − inset.
- Hit areas are at least `target-min` (44px). Every icon-only control has an `aria-label`.
- A status always pairs a glyph and a word; color alone never carries meaning.
- Respect `prefers-reduced-transparency`, `prefers-contrast` and `prefers-reduced-motion`. The CSS handles them; do not override.
- Do not use Apple's SF Symbols, Apple fonts or logos. The type stack uses the device's system font; the icon set in the React bundle is an original placeholder.

## Checklist before delivering

- [ ] No custom background behind bars; content scrolls under them, with the `lg-edge` scroll edge effect where bars overlap content.
- [ ] Glass count is small (bars, groups, menus, sheet). Nothing else is glass.
- [ ] Screens checked in `data-theme="light"`, `"dark"` and `"contrast"`.
- [ ] If tokens changed: `contrast_check.py` prints PASS, and `tokens.css` is regenerated.
- [ ] Keyboard: every control is reachable and shows the `focus-ring` outline.
- [ ] Copy: sentence case on actions, Title Case only on list section headers, verb first, no emoji.
