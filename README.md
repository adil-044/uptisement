# Uptisement

Premium Next.js (App Router) brand site for [uptisement.com](https://uptisement.com).

**Stack:** Next.js · TypeScript · Tailwind CSS v4 · Motion · static export for GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`next build` writes the static site to `out/` (including everything under `public/`: CNAME, sitemap, robots, demos, ig-dm, etc.).

## Booking URL

Edit one constant: `app/lib/config.ts` → `BOOK_URL`.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes **only** `out/` via `actions/deploy-pages`.

**Required once (repo owner):** Settings → Pages → Build and deployment → Source → **GitHub Actions**.

Until that switch is made, Pages still serves the branch `main` root (legacy synced export). After the switch, source files (`README.md`, `package.json`, `app/`, …) are no longer published.

Custom domain: `public/CNAME` → `uptisement.com` (copied into `out/` on build).
