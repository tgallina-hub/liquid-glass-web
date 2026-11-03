#!/usr/bin/env python3
"""Compile assets/tokens.json into CSS custom properties.
Usage: python3 scripts/build_tokens_css.py assets/tokens.json > assets/tokens.css
Layout: first theme on :root and [data-theme="<first>"], one [data-theme] block per further theme,
then spacing/radius/size/material/font variables, then one class per type style."""
import json, sys
t = json.load(open(sys.argv[1]))
themes = [x["id"] for x in t["color"]["themes"]]
first = themes[0]
def val(v, th):
    return v if isinstance(v, str) else v.get(th, v.get(first))
out = [f"/* {t.get('name','Design system')} — generated from tokens.json */"]
for th in themes:
    sel = f':root, [data-theme="{th}"]' if th == first else f'[data-theme="{th}"]'
    lines = [f"  --{x['name']}: {val(x['value'], th)};" for x in t["color"]["tokens"]]
    lines += [f"  --{x['name']}: {val(x['value'], th)};" for x in t.get("shadow", {}).get("tokens", [])]
    out.append(sel + " {\n" + "\n".join(lines) + "\n}")
root = []
for fam, body in t.items():
    if fam in ("name", "version", "color", "type", "shadow") or not isinstance(body, dict) or "tokens" not in body:
        continue
    root += [f"  --{x['name']}: {x['value']};" for x in body["tokens"]]
root += [f"  --font-{k}: {v};" for k, v in t["type"]["families"].items()]
out.append(":root {\n" + "\n".join(root) + "\n}")
for g in t["type"]["groups"]:
    for s in g["styles"]:
        fam = s.get("family", g["family"])
        out.append(f".{s['name']} {{ font-family: var(--font-{fam}); font-size: {s['fontSize']}; line-height: {s['lineHeight']}; font-weight: {s['fontWeight']}; }}")
print("\n".join(out))
