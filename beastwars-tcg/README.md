# Beast Wars TCG Live (web app)

Progressive web app: **Mac · Windows · Linux · iOS · Android**.

## Local dev (any desktop)

```bash
# from repo root
npm install
npm run dev

# or from this folder
npm install
npm run dev
```

Vite listens on all interfaces (`--host`) so phones on the same Wi‑Fi can open the **Network** URL.

## Install as PWA

| Device | Steps |
|--------|--------|
| iOS | Safari → Share → **Add to Home Screen** |
| Android | Chrome → **Install app** |
| Desktop | Chrome/Edge install icon in the address bar |

Hosted build (GitHub Pages): `https://dglogan42.github.io/Beastwars-TCG/`

## Build

```bash
npm run build         # base /
npm run build:pages   # base /Beastwars-TCG/ (GitHub Pages)
npm run preview       # serve dist/
```

## Features

- **6 expansion libraries** — BW01, G1A, G1D, BM01, ARM01, ANI01 (100+ cards)  
- Collection filters by set & faction; deck presets per line  
- Battle vs AI · offline PWA · install on mobile/desktop  

## Expansions

| Code | Set | Roster |
|------|-----|--------|
| BW01 | Beast Wars: Spark of Earth | Maximals / Predacons |
| G1A | G1 Autobot Vanguard | Optimus, Bee, Jazz, Grimlock… |
| G1D | G1 Decepticon Empire | Megatron, Starscream, Soundwave… |
| BM01 | Beast Machines | Reformatted Maximals / Vehicons |
| ARM01 | Armada: Powerlinx Rising | Autobots, Decepticons, Mini-Cons |
| ANI01 | Animated: Detroit Defenders | Animated Autobots & Cons |

## Credits

Fan-made. Transformers / Pokémon trademarks belong to their owners.
