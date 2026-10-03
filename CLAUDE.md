# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Personal site (`blog.michaelcolenso.com`) built with Astro 4, static output, deployed to GitHub Pages via GitHub Actions on push to `master`.

## Commands

```bash
npm run dev       # Dev server with hot reload (localhost:4321)
npm run build     # Static build → dist/
npm run preview   # Preview the dist/ build locally
```

## Architecture

**Astro site structure:**

- `astro.config.mjs` — Config: `site: 'https://blog.michaelcolenso.com'`, `output: 'static'`
- `src/layouts/BaseLayout.astro` — Root layout: `<head>` with OG tags/canonical URL, wraps `<Header>`, `<main><slot /></main>`, `<Footer>`
- `src/components/` — `Header.astro`, `Footer.astro`
- `src/pages/` — File-based routing: `index.astro`, `about.astro`, `blog/index.astro`, `blog/[slug].astro`, `projects/index.astro`, `projects/[slug].astro`
- `src/content/` — Astro content collections (typed via Zod schemas in `config.ts`)
- `src/styles/global.css` — All styles (single file, ~500 lines)
- `public/assets/` — Static images/assets served as-is

**Content collections (`src/content/config.ts`):**

- `blog` — Fields: `title` (string), `date` (date), `tagline` (optional string). Sorted date descending on listing page.
- `projects` — Fields: `title`, `tagline`, `link` (optional URL), `github` (optional URL), `image` (string path), `order` (optional number). Sorted by `order` ascending (unset defaults to 99).

**TypeScript:** Strict mode (`astro/tsconfigs/strict` + `strictNullChecks`).

**Deployment:** Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`) runs `npm ci && npm run build` → uploads `dist/` → deploys to GitHub Pages.

## Adding Content

- **New blog post:** Add `src/content/blog/YYYY-MM-DD-title.md` with front matter: `title`, `date`, `tagline` (optional)
- **New project:** Add `src/content/projects/name.md` with front matter: `title`, `tagline`, `image` (path under `/assets/`), `link` (optional), `github` (optional), `order` (optional, for sort order)
- **New static asset:** Drop in `public/assets/`
