# Deploy to GitHub Pages

## Option A — GitHub Actions (recommended)

1. Ensure the file `.github/workflows/deploy-pages.yml` is on `main`
   (push it with a token that has the `workflow` scope, or add it in the GitHub UI).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds the PWA and publishes to:
   `https://dglogan42.github.io/Beastwars-TCG/`

## Option B — manual upload

```bash
cd beastwars-tcg
npm ci
npm run build:pages
```

Upload the contents of `beastwars-tcg/dist/` to any static host (GitHub Pages, Netlify, Cloudflare Pages, nginx, etc.).

For project Pages base path, the build already uses `/Beastwars-TCG/`.
