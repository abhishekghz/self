# Abhishek Gautam — Portfolio

A fast, single-page portfolio built with **React + Vite**. Theme: a Neuro-AI-Defence
palette (deep navy, neural cyan, defence amber) with an interactive neural-network
background, scroll reveals, a certificate lightbox gallery and a CV download.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Edit content

All text, links and image lists live in **`src/data.js`** — names, dates, papers,
certificates, contact details. Images are in **`public/img/`**. Replace
`public/Abhishek-Gautam-CV.pdf` to update the downloadable CV.

## Deploy on GitHub Pages (free)

1. Create a repo and push this folder.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`) builds and
   publishes automatically. Your site goes live at
   `https://<username>.github.io/<repo>/`.

`vite.config.js` uses `base: './'`, so it works at a repo subpath or a custom domain
without changes.
