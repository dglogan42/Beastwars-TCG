# Beast Wars TCG

Fan-made **Beast Wars: Transformers** trading card game and Beastdex, inspired by the Pokémon.com Pokédex and Pokémon TCG Live page layouts.

**Live repo:** [github.com/dglogan42/Beastwars-TCG](https://github.com/dglogan42/Beastwars-TCG)

## What’s in this project

| Path | Description |
|------|-------------|
| [`beastwars-tcg/`](beastwars-tcg/) | React + Vite TCG app (collection, deck builder, battle vs AI) |
| [`index.html`](index.html) | Standalone **Beastdex** (Beast Wars cast as Pokédex entries) |
| [`LICENSE`](LICENSE) | MIT License |
| `Beast Wars_ Transformers (cartoon) - Transformers Wiki.pdf` | Character / series reference |

Extracted TCG Live design tokens and gallery assets live under `beastwars-tcg/src/data/` and `beastwars-tcg/public/tcgl/`.

## Quick start (React TCG)

```bash
cd beastwars-tcg
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → beastwars-tcg/dist/
npm run preview  # preview production build
```

### App features

- **Home** — TCG Live–style landing (About, Game Modes, Battle Pass, Collection, System Requirements)
- **Collection** — 22 Beastdex fighters with search & faction filters
- **Deck Builder** — 6-card decks (saved in `localStorage`)
- **Battle** — Duel Predacon AI (Energon, active + bench, abilities)

### How to play

1. Open **Deck Builder** and pick 6 unique cards (or use a Maximal / Predacon preset).
2. Go to **Battle** → **Launch Beast Wars**.
3. Each turn: gain Energon, draw, deploy fighters, attack once, then **End turn**.
4. KO the enemy roster to win.

## Beastdex (static)

Open `index.html` in a browser for the offline Pokédex-style catalog of Maximals and Predacons.

## Stack

- React 19, Vite, React Router
- Pure CSS (design tokens extracted from Pokémon TCG Live)
- No backend required

## License

This project is licensed under the [MIT License](LICENSE).

## Credits & disclaimer

Fan-made tribute only.

**Transformers** and **Beast Wars** are trademarks of Hasbro, TakaraTomy, and related rights holders.  
**Pokémon**, **Pokédex**, and **Pokémon TCG Live** are trademarks of Nintendo, Creatures, GAME FREAK, and/or The Pokémon Company.

This project is **not** affiliated with, endorsed by, or sponsored by Hasbro, TakaraTomy, Nintendo, The Pokémon Company, or any related entity.
