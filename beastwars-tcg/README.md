# Beast Wars TCG Live

A React trading card game reimagining **Beast Wars: Transformers** as a digital TCG, with UI/metadata inspired by Pokémon TCG Live.

## Metadata & assets

| Path | Role |
|------|------|
| `src/data/tcglMetadata.json` | Extracted page meta, design tokens, expansions, system requirements |
| `src/data/tcgl.js` | App-facing API + Beast Wars section copy |
| `public/tcgl/` | Featured gallery / hero art used on the landing page |

## Features

- **TCGL-style landing** — About, Game Modes, Battle Pass, Collection, Get Started, System Requirements
- **22-card Beastdex** — Maximals / Predacons with abilities
- **Deck builder** — 6-card decks (localStorage)
- **Battle vs AI** — Energon, active + bench, attack / retreat / specials

## Quick start

```bash
cd beastwars-tcg
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Credits

Fan-made tribute. Pokémon TCG Live, Pokémon, and Transformers are trademarks of their respective owners. Not affiliated with The Pokémon Company, Nintendo, Hasbro, or TakaraTomy.
