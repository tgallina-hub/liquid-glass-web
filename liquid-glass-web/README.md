# Liquid Glass Web

A web design system that adapts the Liquid Glass material model to browsers, packaged as an **Agent Skill**. The same folder works in Claude, OpenAI Codex and ChatGPT, and in any other tool that reads the open `SKILL.md` format.

> Independent adaptation of the public guidance in Apple's "Adopting Liquid Glass". Not affiliated with Apple. Ships no Apple fonts, symbols or assets.

## What's inside

```
skills/liquid-glass-web/
  SKILL.md                    instructions the agent follows
  references/                 brand book, HTML API, one guideline file per component
  assets/                     tokens.json, tokens.css, liquid-glass.css, React bundle, example.html
  scripts/                    contrast_check.py, build_tokens_css.py (Python 3, stdlib only)
```

To see it, open `skills/liquid-glass-web/assets/example.html` in a browser.

## Install

### Claude (claude.ai, desktop, Cowork)
1. Zip the `skills/liquid-glass-web` folder, so the zip contains `liquid-glass-web/SKILL.md`.
2. In Claude's settings, open the Skills section (under Capabilities), choose to upload a skill, and pick the zip.

### Claude Code
```bash
mkdir -p ~/.claude/skills && cp -R skills/liquid-glass-web ~/.claude/skills/
```

### OpenAI Codex (CLI / IDE)
For all your projects:
```bash
mkdir -p ~/.agents/skills && cp -R skills/liquid-glass-web ~/.agents/skills/
```
For one repository only, copy it to `<repo>/.agents/skills/liquid-glass-web`. Codex picks it up automatically; restart Codex if it doesn't. Invoke it with `$liquid-glass-web` or let Codex choose it from the description.

### ChatGPT
Skills must be enabled for your account or workspace (in Business/Enterprise, by a workspace owner). Upload the zipped folder as a skill and invoke it with `@liquid-glass-web`. If skills aren't available to you, create a Project or custom GPT, paste `SKILL.md` into its instructions, and attach the files from `references/` and `assets/` as knowledge.

## Using it
- "Build a settings screen in the Liquid Glass Web style."
- "Restyle this React page with Liquid Glass Web."
- "Rebrand Liquid Glass Web with accent #0f766e and make sure contrast passes."

## Changing the tokens
```bash
cd skills/liquid-glass-web
python3 scripts/contrast_check.py assets/tokens.json      # must print RESULT: PASS
python3 scripts/build_tokens_css.py assets/tokens.json > assets/tokens.css
```
