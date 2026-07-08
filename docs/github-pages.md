# Deploy to GitHub Pages

## Option A — GitHub Actions (recommended)

1. Copy the workflow into place (GitHub blocks OAuth tokens without `workflow` scope from creating this path automatically):

   ```bash
   mkdir -p .github/workflows
   cp docs/deploy-pages.yml .github/workflows/deploy-pages.yml
   git add .github/workflows/deploy-pages.yml
   git commit -m "Add GitHub Pages deploy workflow"
   git push
   ```

   Or create the file in the GitHub web UI from [`docs/deploy-pages.yml`](deploy-pages.yml).

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
