# Menu

A glass list of actions that grows out of the control that opened it (transform origin at the button), instead of appearing from nowhere.

**Consumer provides:** `items` (`[{id, label, icon?, destructive?}]` or `"-"` for a separator), `onSelect`, `label`, `origin` (CSS transform-origin pointing at the trigger, e.g. `"top right"`). The consumer positions it next to the trigger and handles open, close and focus return.

- Order: most frequent first; destructive last, after a separator, in `critical-glass`.
- Items nest concentric inside the menu: item radius = `radius-lg` minus the `space-2` inset.
- The top actions of a row's menu match that row's swipe actions.
- Symbols trail the label and are the same family as the toolbar's.
