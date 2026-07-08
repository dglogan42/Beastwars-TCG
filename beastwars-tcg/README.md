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

- Collection, Deck Builder, Battle vs AI  
- Offline cache via service worker  
- Install prompt + iOS home-screen instructions  

## Credits

Fan-made. Transformers / Pokémon trademarks belong to their owners.
