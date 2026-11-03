#!/usr/bin/env python3
"""WCAG contrast check for tokens.json, every theme, including worst-case glass composites.
Usage: python3 scripts/contrast_check.py assets/tokens.json   (exit code 1 if any pair fails)"""
import json,re,sys
t=json.load(open(sys.argv[1]))
C={x['name']:x['value'] for x in t['color']['tokens']}
def parse(v):
    if v.startswith('#'):
        v=v[1:]; return tuple(int(v[i:i+2],16) for i in (0,2,4))+(1.0,)
    n=[float(x) for x in re.findall(r'[\d.]+',v)]; return (n[0],n[1],n[2],n[3] if len(n)>3 else 1.0)
def over(top,bot):
    a=top[3]; return tuple(top[i]*a+bot[i]*(1-a) for i in range(3))+(1.0,)
def L(c):
    def ch(x):
        x/=255; return x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4
    return 0.2126*ch(c[0])+0.7152*ch(c[1])+0.0722*ch(c[2])
def cr(a,b):
    la,lb=L(a),L(b); return (max(la,lb)+.05)/(min(la,lb)+.05)
FAILS=[]
BLACK=(0,0,0,1);WHITE=(255,255,255,1)
def g(name,th): return parse(C[name][th])
pairs=[('ink','canvas',4.5),('ink','surface',4.5),('ink','surface-sunken',4.5),('ink-secondary','canvas',4.5),('ink-secondary','surface',4.5),('ink-secondary','surface-sunken',4.5),
('on-accent','accent',4.5),('accent-text','canvas',4.5),('accent-text','surface',4.5),('positive','canvas',4.5),('positive','surface',4.5),('warning','canvas',4.5),('warning','surface',4.5),('critical','canvas',4.5),('critical','surface',4.5),
('focus-ring','canvas',3),('focus-ring','surface',3),('control-stroke','surface',3),('control-stroke','canvas',3),('track-off','surface',3),('knob','track-off',3),('accent','surface',3),('knob','accent',3)]
for th in ['light','dark','contrast']:
    print('==',th)
    for a,b,mn in pairs:
        r=cr(g(a,th),g(b,th)); FAILS.append(r<mn) or print(f"{'OK ' if r>=mn else 'FAIL'} {a} on {b}: {r:.2f} (min {mn})")
    # glass worst cases
    gf=g('glass-fill',th)
    for bg,nm in [(BLACK,'black'),(WHITE,'white')]:
        comp=over(gf,bg)
        for tx,mn in [('ink',4.5),('ink-glass-muted',4.5),('accent-glass',4.5),('critical-glass',4.5),('focus-ring',3)]:
            r=cr(g(tx,th),comp); FAILS.append(r<mn) or print(f"{'OK ' if r>=mn else 'FAIL'} {tx} on glass/{nm}: {r:.2f}")
    # clear glass worst: white media + dim + clear fill
    comp=over(g('glass-fill-clear',th),over(g('glass-dim',th),WHITE))
    r=cr(g('on-glass-clear',th),comp); FAILS.append(r<3) or print(f"{'OK ' if r>=3 else 'FAIL'} on-glass-clear on clear/white media: {r:.2f} (min 3)")

import sys as _s
print('\nRESULT:', 'FAIL' if any(FAILS) else 'PASS')
_s.exit(1 if any(FAILS) else 0)
