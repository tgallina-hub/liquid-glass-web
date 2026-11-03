# HTML/CSS API (framework-agnostic)

Every component is plain markup plus classes from `assets/liquid-glass.css`. Load `assets/tokens.css` first, then `assets/liquid-glass.css`. Set the theme with `data-theme="light" | "dark" | "contrast"` on `<html>` (light is the default). The React bundle (`assets/liquid-glass.react.js`, global `window.LG`) renders exactly this markup; use it only in React projects.

Glass needs content behind it. Put bars, groups and sheets in `position: absolute | fixed | sticky` over a scrolling content area.

## Material

```html
<div class="lg-glass lg-shape-rounded">…</div>          <!-- regular glass, radius-lg -->
<div class="lg-glass lg-shape-capsule">…</div>          <!-- capsule -->
<div class="lg-dim"><div class="lg-glass lg-glass--clear lg-shape-circle">…</div></div>  <!-- clear glass over media -->
```

## Button

```html
<button class="lg-btn lg-focusable lg-btn--prominent">Approve</button>
<button class="lg-btn lg-focusable lg-btn--glass lg-glass">Details</button>
<button class="lg-btn lg-focusable lg-btn--glass lg-glass lg-btn--destructive">Revoke</button>
<button class="lg-btn lg-focusable lg-btn--glass lg-glass lg-btn--icon" aria-label="Add"><svg class="lg-icon">…</svg></button>
<button class="lg-btn lg-focusable lg-btn--plain">Show all</button>
<!-- sizes: add lg-btn--sm | lg-btn--lg | lg-btn--xl -->
```

## Glass group and toolbar

```html
<div class="lg-edge lg-edge--top" aria-hidden="true"></div>
<div class="lg-toolbar" role="toolbar" aria-label="Access requests">
  <button class="lg-btn lg-focusable lg-btn--glass lg-glass lg-btn--icon lg-btn--lg" aria-label="Back">…</button>
  <div class="lg-toolbar__title">Access requests</div>
  <div class="lg-group lg-glass" role="group" aria-label="Actions">
    <button class="lg-btn lg-focusable lg-btn--glass lg-btn--icon" aria-label="Filter">…</button>
    <button class="lg-btn lg-focusable lg-btn--glass lg-btn--icon" aria-label="Share">…</button>
  </div>
  <span class="lg-toolbar__fixed" aria-hidden="true"></span>
  <button class="lg-btn lg-focusable lg-btn--prominent lg-btn--icon lg-btn--lg" aria-label="New request">…</button>
</div>
```

Separators inside a group: `<span class="lg-group-sep" aria-hidden="true"></span>`.

## Tab bar

```html
<nav class="lg-tabbar-wrap" aria-label="Tabs">
  <div class="lg-tabbar lg-glass" role="tablist">            <!-- add lg-tabbar--min to minimize -->
    <button class="lg-tab lg-focusable" role="tab" aria-selected="true"><svg class="lg-icon">…</svg><span>Home</span></button>
    <button class="lg-tab lg-focusable" role="tab" aria-selected="false"><svg class="lg-icon">…</svg><span>Alerts</span></button>
  </div>
  <button class="lg-tab-search lg-glass lg-focusable" aria-label="Search"><svg class="lg-icon">…</svg></button>
</nav>
```

## Toggle

```html
<div class="lg-toggle">
  <span id="t1">Require approval</span>
  <button class="lg-toggle__track lg-focusable" role="switch" aria-checked="true" aria-labelledby="t1"><span class="lg-toggle__knob"></span></button>
</div>
```

Flip `aria-checked` in your own click handler.

## Search field

```html
<label class="lg-search lg-glass"><svg class="lg-icon">…</svg><input type="search" placeholder="Search vaults" aria-label="Search vaults"></label>
<label class="lg-search lg-search--surface">…</label>   <!-- inside content -->
```

## Menu

```html
<div class="lg-menu lg-glass" role="menu" style="--lg-origin: top right">
  <button class="lg-menu__item" role="menuitem">Approve <svg class="lg-icon">…</svg></button>
  <div class="lg-menu__sep" role="separator"></div>
  <button class="lg-menu__item lg-menu__item--destructive" role="menuitem">Revoke access</button>
</div>
```

## Sheet

```html
<div class="lg-sheet-layer">                       <!-- add lg-sheet-layer--large for the large detent -->
  <div class="lg-sheet lg-glass" role="dialog" aria-labelledby="s1">   <!-- large: lg-sheet--large, no lg-glass -->
    <div class="lg-sheet__grabber" aria-hidden="true"></div>
    <div class="lg-sheet__head">
      <button class="lg-btn lg-focusable lg-btn--glass lg-glass lg-btn--icon" aria-label="Close">…</button>
      <h2 id="s1" class="lg-sheet__title">Request access</h2>
      <button class="lg-btn lg-focusable lg-btn--prominent">Send</button>
    </div>
    <div class="lg-sheet__body">…</div>
  </div>
</div>
```

## List section

```html
<section class="lg-section">
  <h3 class="lg-section__header">Recent Sessions</h3>
  <div class="lg-section__body">
    <button class="lg-row lg-row--button lg-focusable">
      <span class="lg-row__lead"><svg class="lg-icon">…</svg></span>
      <span class="lg-row__main"><span class="lg-row__title">vault-prod-01</span><span class="lg-row__sub">Approved by Ana · 2 h</span></span>
      <svg class="lg-icon lg-row__chev">…</svg>
    </button>
    <div class="lg-row"><span class="lg-row__main"><span class="lg-row__title">Policy review</span></span><span class="lg-row__detail">Due Fri</span></div>
  </div>
  <p class="lg-section__footer">Sessions are recorded for 90 days.</p>
</section>
```

## Status

```html
<span class="lg-status lg-status--positive"><svg class="lg-icon">…</svg>Approved</span>
```

## Typography classes

`large-title`, `title-1`, `title-2`, `title-3`, `headline`, `body`, `callout`, `subheadline`, `label`, `footnote`, `section-header`, `caption`, `code` (from `tokens.css`).
