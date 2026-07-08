# Beast Wars TCG

Fan-made **Beast Wars: Transformers** trading card game — a **progressive web app (PWA)** you can clone and run on **Mac, Windows, and Linux**, and **install from the browser on iOS and Android**.

**Repo:** [github.com/dglogan42/Beastwars-TCG](https://github.com/dglogan42/Beastwars-TCG)  
**Web app (GitHub Pages):** [dglogan42.github.io/Beastwars-TCG/](https://dglogan42.github.io/Beastwars-TCG/)  
*(See [docs/github-pages.md](docs/github-pages.md) to enable hosting.)*

## Platforms

| Platform | How to use |
|----------|------------|
| **Windows / macOS / Linux** | Clone repo → `npm install` → `npm run dev` (or open the hosted web app) |
| **iPhone / iPad (iOS)** | Open the web app URL in **Safari** → Share → **Add to Home Screen** |
| **Android** | Open the web app URL in **Chrome** → menu → **Install app** / **Add to Home screen** |
| **Any modern browser** | Play online; PWA caches assets for offline after first visit |

No App Store / Play Store account required. Node.js is only needed for local development.

---

## Clone & run (desktop)

Requires **Node.js 18+** ([nodejs.org](https://nodejs.org/) or `fnm` / `nvm`).

### macOS / Linux

```bash
git clone https://github.com/dglogan42/Beastwars-TCG.git
cd Beastwars-TCG
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).  
To try the app from a phone on the same Wi‑Fi, use the **Network** URL shown in the terminal (`--host` is enabled).

### Windows (PowerShell or cmd)

```powershell
git clone https://github.com/dglogan42/Beastwars-TCG.git
cd Beastwars-TCG
npm install
npm run dev
```

Same as above — open `http://localhost:5173` in Edge, Chrome, or Firefox.

### Production build (any desktop OS)

```bash
npm run build      # local base path /
npm run preview    # serve dist/ on all interfaces
```

GitHub Pages build (used by CI):

```bash
npm run build:pages   # base path /Beastwars-TCG/
```

---

## Install as a web app (mobile & desktop)

1. Deploy or open the live site (GitHub Pages URL above, or your own host of `beastwars-tcg/dist`).
2. **iOS Safari:** Share → **Add to Home Screen** → Open the icon (standalone, full screen).
3. **Android Chrome:** ⋮ menu → **Install app** or **Add to Home screen**.
4. **Desktop Chrome / Edge:** install icon in the address bar, or menu → **Install Beast Wars TCG Live**.

After install, the app works offline for cached pages and assets (service worker).

---

## What’s in this project

| Path | Description |
|------|-------------|
| [`beastwars-tcg/`](beastwars-tcg/) | React + Vite **PWA** (collection, deck builder, battle vs AI) |
| [`index.html`](index.html) | Standalone **Beastdex** (open in any browser) |
| [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) | Auto-deploy web app to GitHub Pages |
| [`LICENSE`](LICENSE) | MIT License |

### App features

- **Home** — landing, game modes, install tips  
- **Collection** — 22 Beastdex fighters  
- **Deck Builder** — 6-card decks (`localStorage`)  
- **Battle** — duel Predacon AI  

### How to play

1. **Deck Builder** → pick 6 cards (or a Maximal / Predacon preset).  
2. **Battle** → Launch Beast Wars.  
3. Spend Energon, attack, retreat, end turn.  
4. KO the enemy roster to win.

### Beastdex (static)

Open root `index.html` in a browser — no build step.

---

## Stack

- React 19, Vite, React Router  
- **PWA** via `vite-plugin-pwa` (manifest + service worker)  
- Works with GitHub Pages (`base: /Beastwars-TCG/`)  

## License

[MIT License](LICENSE) — Copyright (c) 2026 David Logan

## Credits & disclaimer

Fan-made tribute only. **Transformers** / **Beast Wars** and **Pokémon** / **Pokémon TCG Live** are trademarks of their respective owners. Not affiliated with Hasbro, TakaraTomy, Nintendo, or The Pokémon Company.
