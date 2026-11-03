# Agent notes

This repository is a single Agent Skill: `skills/liquid-glass-web/`.

- To build or restyle web UI in this style, follow `skills/liquid-glass-web/SKILL.md`.
- `assets/tokens.json` is the source of truth. After editing it, run `scripts/contrast_check.py` (it must pass) and regenerate `assets/tokens.css` with `scripts/build_tokens_css.py`. Never hand-edit `tokens.css`.
- Keep `assets/liquid-glass.css` free of hard-coded colors; use token variables.
- Check UI changes against `assets/example.html` in the `light`, `dark` and `contrast` themes.
