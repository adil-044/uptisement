# Uptisement

Premium Next.js (App Router) brand site for [uptisement.com](https://uptisement.com).

**Stack:** Next.js · TypeScript · Tailwind CSS v4 · GSAP (`@gsap/react`) · static export for GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`next build` writes `out/`, then `scripts/sync-pages.mjs` mirrors the export to the repository root so GitHub Pages can keep serving from `main` `/` (legacy branch deploy).

## Booking URL

Edit one constant: `app/lib/config.ts` → `BOOK_URL`.

## Deploy

**Current Pages setting:** Deploy from branch `main` / (legacy). The synced root files (`index.html`, `_next/`, …) are what Pages serves after merge.

**Preferred (optional):** Settings → Pages → Source → **GitHub Actions**. Then `.github/workflows/deploy.yml` builds `out/` and deploys via `actions/deploy-pages`. Until that switch is made, keep committing the synced root export (run `npm run build` before push).

Custom domain: `public/CNAME` → `uptisement.com`.
