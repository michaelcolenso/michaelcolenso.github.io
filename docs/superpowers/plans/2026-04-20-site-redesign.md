# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign and update the Astro personal site so it presents Michael Colenso as a construction-first operator with serious software and AI capability.

**Architecture:** Keep the static Astro 4 app and current public routes. Add one small data module for shared navigation, social links, project grouping, and selected work metadata; keep pages server-rendered at build time from Astro content collections. Add a Node verification script that inspects the built `dist/` output for the redesign's required routes, copy, and image references.

**Tech Stack:** Astro 4, TypeScript strict mode, Astro content collections, CSS in `src/styles/global.css`, Node 20 for build verification, GitHub Pages static deployment.

---

## File Structure

- Create `scripts/verify-site.mjs`: build-output assertions for required routes, redesigned copy, selected projects, grouped archive headings, contact copy, and missing local image references.
- Modify `package.json`: add `verify:site` script only.
- Create `src/data/site.ts`: shared constants for navigation, social links, homepage selected work slugs, project group definitions, operating proof, and contact copy.
- Modify `src/layouts/BaseLayout.astro`: updated default metadata, optional body class support, theme color update, no route changes.
- Modify `src/components/Header.astro`: use shared navigation/social data and revised labels.
- Modify `src/components/Footer.astro`: restrained contact footer plus copyright.
- Replace `src/styles/global.css`: Field Notes visual system, responsive layout, page sections, project archive, prose, detail pages, and mobile behavior.
- Replace `src/pages/index.astro`: construction-first homepage with hero, proof range, narrative arc, selected work, and restrained contact.
- Replace `src/pages/about.astro`: operator profile, operating range, tightened experience timeline, education, contact.
- Replace `src/pages/projects/index.astro`: grouped project archive.
- Modify `src/pages/projects/[slug].astro`: editorial detail page with image, links, and back navigation.
- Modify `src/pages/blog/index.astro`: rename to Writing and improve listing.
- Modify `src/pages/blog/[slug].astro`: improve article header, description fallback, and navigation.
- Modify selected files in `src/content/projects/*.md`: tighten project copy without changing factual claims.
- Modify `src/content/blog/2026-02-23-i-bought-my-domain-to-post-my-resume.md`: add a tagline only; do not rewrite the essay.
- Modify `.gitignore`: add `.superpowers/`.
- Remove verified legacy files and folders not used by Astro or deployment: `_layouts/`, `_includes/`, `_posts/`, `_projects/`, `_scss/`, `about/`, `articles/`, `assets/`, `blog/`, `bower_components/`, `projects/`, `_config.yml`, `gulpfile.js`, and root `index.html`.

## Task 1: Add Build-Output Verification

**Files:**
- Create: `scripts/verify-site.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-site.mjs` with:

```js
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const requiredFiles = [
  'index.html',
  'about/index.html',
  'projects/index.html',
  'projects/regsignal/index.html',
  'projects/refract/index.html',
  'projects/praised/index.html',
  'blog/index.html',
  'blog/2026-02-23-i-bought-my-domain-to-post-my-resume/index.html',
];

const requiredText = new Map([
  ['index.html', [
    'Complex work deserves better tools.',
    'Construction operator',
    'software builder',
    'AI pragmatist',
    'RegSignal',
    'Refract',
    'Praised',
    'For construction, software, or AI work',
  ]],
  ['about/index.html', [
    'Construction operator',
    'Operating range',
    'Experience',
    'Education',
  ]],
  ['projects/index.html', [
    'Construction, Data, And Regulation',
    'AI And Automation',
    'Product Builds',
  ]],
  ['blog/index.html', [
    'Writing',
    'construction, software, work that lasts',
  ]],
]);

const failures = [];

for (const file of requiredFiles) {
  const path = join(dist, file);
  if (!existsSync(path)) {
    failures.push(`Missing built route: ${file}`);
  }
}

for (const [file, snippets] of requiredText.entries()) {
  const path = join(dist, file);
  if (!existsSync(path)) {
    continue;
  }
  const html = readFileSync(path, 'utf8');
  for (const snippet of snippets) {
    if (!html.includes(snippet)) {
      failures.push(`Missing text in ${file}: ${snippet}`);
    }
  }
}

const pagesWithImages = requiredFiles.filter((file) => existsSync(join(dist, file)));
for (const file of pagesWithImages) {
  const html = readFileSync(join(dist, file), 'utf8');
  const imageRefs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  for (const src of imageRefs) {
    if (!src.startsWith('/assets/')) {
      continue;
    }
    const assetPath = join(root, 'public', src);
    if (!existsSync(assetPath)) {
      failures.push(`Missing image asset referenced by ${file}: ${src}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Site verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Site verification passed for ${requiredFiles.length} routes.`);
```

- [ ] **Step 2: Add the npm script**

In `package.json`, keep existing scripts and add:

```json
"verify:site": "node scripts/verify-site.mjs"
```

The final scripts block should be:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "verify:site": "node scripts/verify-site.mjs"
}
```

- [ ] **Step 3: Run verification and confirm RED**

Run:

```bash
npm run build && npm run verify:site
```

Expected: `npm run build` passes, then `npm run verify:site` fails with messages including missing homepage text such as `Complex work deserves better tools.` This confirms the verification catches the unimplemented redesign.

- [ ] **Step 4: Commit the verification harness**

```bash
git add package.json scripts/verify-site.mjs
git commit -m "test: add static site verification"
```

## Task 2: Add Shared Site Data

**Files:**
- Create: `src/data/site.ts`

- [ ] **Step 1: Create shared constants**

Create `src/data/site.ts` with:

```ts
export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Work' },
  { href: '/blog', label: 'Writing' },
] as const;

export const socialLinks = [
  { href: 'https://github.com/michaelcolenso', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/michaelcolenso', label: 'LinkedIn' },
] as const;

export const contactCopy = {
  heading: 'For construction, software, or AI work, reach me on LinkedIn.',
  body: 'I am most useful where field judgment, operating risk, and information systems need to line up.',
  href: 'https://www.linkedin.com/in/michaelcolenso',
  label: 'Connect on LinkedIn',
} as const;

export const operatingProof = [
  {
    label: 'Construction',
    detail: 'Twenty years delivering complex multifamily, hospitality, luxury residential, healthcare, and renovation work.',
  },
  {
    label: 'Software',
    detail: 'Four years writing production software professionally, plus current full-stack products and data tools.',
  },
  {
    label: 'AI',
    detail: 'Practical AI workflows for critique, extraction, ranking, and regulatory signal detection.',
  },
] as const;

export const selectedProjectSlugs = ['regsignal', 'refract', 'praised'] as const;

export const selectedProjectNotes: Record<string, string> = {
  regsignal: 'Construction-domain intelligence for tracking how regulation turns into local cost and schedule risk.',
  refract: 'A multi-model AI pipeline that critiques, edits, documents, and publishes image work from a GitHub workflow.',
  praised: 'A full-stack SaaS build with collection forms, review workflow, embeddable widgets, auth, billing, and tests.',
};

export const projectGroups = [
  {
    title: 'Construction, Data, And Regulation',
    description: 'Maps, signals, and public-data tools tied to places, policy, property, and enforcement.',
    slugs: ['regsignal', 'guns', 'seattlejoy', 'tax-parcel-map'],
  },
  {
    title: 'AI And Automation',
    description: 'Systems that use models, scripts, and pipelines to reduce repetitive judgment work.',
    slugs: ['refract', 'cull-the-herd', 'golfcoach', 'maptoposter'],
  },
  {
    title: 'Product Builds',
    description: 'Full product surfaces with accounts, workflows, embeds, billing, and deployment concerns.',
    slugs: ['praised'],
  },
] as const;
```

- [ ] **Step 2: Run TypeScript/Astro build check**

Run:

```bash
npm run build
```

Expected: build passes. This file is not imported yet, so the output should remain visually unchanged.

- [ ] **Step 3: Commit shared data**

```bash
git add src/data/site.ts
git commit -m "feat: add shared site metadata"
```

## Task 3: Update Layout, Header, And Footer

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Update base layout**

Replace `src/layouts/BaseLayout.astro` with:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  bodyClass?: string;
}

const {
  title,
  description = 'Michael Colenso is a construction operator, software builder, and AI pragmatist.',
  bodyClass = '',
} = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#334c3f" />
    <link rel="canonical" href={canonicalURL} />
    <title>{title}</title>
  </head>
  <body class={bodyClass}>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Update header**

Replace `src/components/Header.astro` with:

```astro
---
import { navLinks, socialLinks } from '../data/site';

const currentPath = Astro.url.pathname;
---
<header class="site-header">
  <div class="site-header__inner">
    <a class="site-mark" href="/" aria-label="Michael Colenso home">
      <span>Michael Colenso</span>
    </a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        {navLinks.map(({ href, label }) => (
          <li>
            <a
              href={href}
              aria-current={currentPath === href || currentPath.startsWith(`${href}/`) ? 'page' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <ul class="site-social" aria-label="Social links">
      {socialLinks.map(({ href, label }) => (
        <li>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</header>
```

- [ ] **Step 3: Update footer**

Replace `src/components/Footer.astro` with:

```astro
---
import { contactCopy } from '../data/site';

const year = new Date().getFullYear();
---
<footer class="site-footer">
  <div class="site-footer__inner">
    <div>
      <p class="site-footer__heading">{contactCopy.heading}</p>
      <p class="site-footer__body">{contactCopy.body}</p>
    </div>
    <div class="site-footer__meta">
      <a href={contactCopy.href} target="_blank" rel="noopener noreferrer">{contactCopy.label}</a>
      <span>Michael Colenso &copy; {year}</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build passes. The site will look partially unstyled until Task 4 replaces the CSS.

- [ ] **Step 5: Commit layout shell**

```bash
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: update site shell"
```

## Task 4: Replace Global Styles With Field Notes System

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global CSS**

Replace `src/styles/global.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,700&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg: #f4f0e7;
  --paper: #fbfaf6;
  --ink: #1f2420;
  --muted: #5f665f;
  --faint: #8c928a;
  --line: #c9c2b5;
  --line-strong: #2e342f;
  --accent: #334c3f;
  --accent-2: #a33a2f;
  --font-display: 'Newsreader', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-meta: 'IBM Plex Mono', 'Courier New', monospace;
  --max: 1180px;
  --content: 760px;
  --header-h: 72px;
}

*, *::before, *::after { box-sizing: border-box; }

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
}

img { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-underline-offset: 0.18em; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: var(--header-h);
  background: rgba(244, 240, 231, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.site-header__inner,
.page-shell,
.site-footer__inner {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
}

.site-header__inner {
  min-height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 28px;
}

.site-mark {
  font-family: var(--font-meta);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
}

.site-nav { margin-left: auto; }
.site-nav ul,
.site-social,
.hero-links,
.project-link-list,
.experience-list,
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav ul,
.site-social {
  display: flex;
  align-items: center;
  gap: 18px;
}

.site-nav a,
.site-social a {
  font-family: var(--font-meta);
  font-size: 0.74rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
}

.site-nav a:hover,
.site-nav a[aria-current='page'],
.site-social a:hover {
  color: var(--ink);
}

.page-shell {
  padding: 72px 0 96px;
}

.page-shell--home {
  padding-top: 0;
}

.eyebrow,
.section-kicker,
.project-type,
.post-list-date,
.experience-dates {
  font-family: var(--font-meta);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.hero {
  min-height: calc(100svh - var(--header-h));
  display: grid;
  align-items: center;
  padding: 56px 0;
  border-bottom: 1px solid var(--line-strong);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  gap: 54px;
  align-items: end;
}

.hero-title,
.page-title,
.section-title,
.project-title,
.article-title {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0;
  line-height: 0.98;
}

.hero-title {
  max-width: 820px;
  margin: 18px 0 24px;
  font-size: clamp(3.2rem, 8vw, 7.8rem);
}

.hero-copy,
.page-intro,
.section-lede {
  max-width: 720px;
  color: var(--muted);
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  line-height: 1.7;
}

.proof-panel {
  border-left: 1px solid var(--line);
  padding-left: 24px;
}

.proof-panel dl {
  display: grid;
  gap: 22px;
  margin: 0;
}

.proof-panel dt {
  font-family: var(--font-meta);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.proof-panel dd {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.section {
  padding: 56px 0;
  border-bottom: 1px solid var(--line);
}

.section-grid {
  display: grid;
  grid-template-columns: minmax(180px, 0.42fr) minmax(0, 1fr);
  gap: 48px;
}

.section-title,
.page-title,
.article-title {
  margin: 0;
  font-size: clamp(2.3rem, 6vw, 5.4rem);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.7rem);
}

.section-body p:first-child { margin-top: 0; }

.text-link,
.button-link {
  font-family: var(--font-meta);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.button-link {
  display: inline-flex;
  width: fit-content;
  padding: 0.72rem 0.9rem;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  text-decoration: none;
}

.button-link:hover {
  background: var(--ink);
  color: var(--paper);
}

.selected-work,
.project-groups,
.experience-list,
.post-list {
  display: grid;
  gap: 22px;
}

.work-item,
.project-row,
.experience-item,
.post-list-item {
  display: grid;
  grid-template-columns: minmax(160px, 0.36fr) minmax(0, 1fr);
  gap: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.work-item h3,
.project-row h2,
.experience-company,
.post-list-item h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.6vw, 2rem);
  line-height: 1.05;
}

.work-item p,
.project-row p,
.experience-description,
.post-list-item p {
  margin: 8px 0 0;
  color: var(--muted);
}

.project-image {
  aspect-ratio: 16 / 10;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--line);
}

.project-link-list,
.hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.project-link-list a,
.hero-links a {
  color: var(--accent);
}

.page-header {
  padding-bottom: 44px;
  border-bottom: 1px solid var(--line-strong);
}

.page-intro {
  margin: 24px 0 0;
}

.content-narrow,
.prose {
  max-width: var(--content);
}

.prose {
  color: var(--ink);
  font-size: 1.02rem;
}

.prose h1,
.prose h2,
.prose h3 {
  font-family: var(--font-display);
  line-height: 1.05;
}

.prose h2 { margin-top: 2.4em; font-size: 2rem; }
.prose h3 { margin-top: 2em; font-size: 1.45rem; }
.prose p { margin: 0 0 1.25em; }
.prose a { color: var(--accent); }
.prose ul, .prose ol { padding-left: 1.3rem; }
.prose li { margin-bottom: 0.45rem; }
.prose blockquote {
  margin: 2rem 0;
  padding-left: 1.2rem;
  border-left: 3px solid var(--accent);
  color: var(--muted);
}

.site-footer {
  border-top: 1px solid var(--line-strong);
  padding: 42px 0;
}

.site-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: end;
}

.site-footer__heading {
  margin: 0;
  max-width: 620px;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  line-height: 1.05;
}

.site-footer__body {
  max-width: 560px;
  margin: 12px 0 0;
  color: var(--muted);
}

.site-footer__meta {
  display: grid;
  gap: 10px;
  justify-items: end;
  font-family: var(--font-meta);
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (max-width: 760px) {
  .site-header__inner {
    min-height: auto;
    padding: 18px 0;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .site-nav { margin-left: 0; }
  .site-social { display: none; }

  .page-shell {
    width: min(100% - 28px, var(--max));
    padding: 44px 0 68px;
  }

  .page-shell--home { padding-top: 0; }

  .hero {
    min-height: auto;
    padding: 44px 0;
  }

  .hero-grid,
  .section-grid,
  .work-item,
  .project-row,
  .experience-item,
  .post-list-item,
  .site-footer__inner {
    grid-template-columns: 1fr;
  }

  .proof-panel {
    border-left: 0;
    border-top: 1px solid var(--line);
    padding-left: 0;
    padding-top: 22px;
  }

  .section { padding: 42px 0; }
  .site-footer__meta { justify-items: start; }
}
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build passes. Visual output will be incomplete until page tasks land.

- [ ] **Step 3: Commit visual system**

```bash
git add src/styles/global.css
git commit -m "feat: add field notes visual system"
```

## Task 5: Build The Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace homepage**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { contactCopy, operatingProof, selectedProjectNotes, selectedProjectSlugs } from '../data/site';

const projects = await getCollection('projects');
const selectedProjects = selectedProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));
---
<BaseLayout
  title="Michael Colenso — Construction, Software, AI"
  description="Michael Colenso is a construction operator, software builder, and AI pragmatist."
  bodyClass="home"
>
  <div class="page-shell page-shell--home">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <p class="eyebrow">Construction operator / software builder / AI pragmatist</p>
          <h1 class="hero-title">Complex work deserves better tools.</h1>
          <p class="hero-copy">
            Twenty years delivering construction projects. Four years writing software professionally.
            Now applying both to the parts of construction where judgment, risk, and information collide.
          </p>
        </div>

        <aside class="proof-panel" aria-label="Operating proof">
          <dl>
            {operatingProof.map((item) => (
              <div>
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">The arc</p>
          <h2 class="section-title">Built work. Built software. Back to work that lasts.</h2>
        </div>
        <div class="section-body content-narrow">
          <p>
            The recession created the space to learn software. The work stuck because systems,
            constraints, and execution were familiar territory. Construction pulled me back because
            built work remains visible after the launch window closes.
          </p>
          <p>
            The useful edge now is not treating AI as theater. It is applying software and model
            workflows to construction problems where timing, risk, documentation, and local judgment matter.
          </p>
          <a class="text-link" href="/about">Read the background</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">Selected work</p>
          <h2 class="section-title">Proof in systems, not slogans.</h2>
        </div>
        <div class="selected-work">
          {selectedProjects.map((project) => (
            <article class="work-item">
              <div>
                <p class="project-type">{project.data.title}</p>
              </div>
              <div>
                <h3><a href={`/projects/${project.slug}`}>{project.data.title}</a></h3>
                <p>{selectedProjectNotes[project.slug]}</p>
              </div>
            </article>
          ))}
          <a class="button-link" href="/projects">View the full archive</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">Contact</p>
          <h2 class="section-title">{contactCopy.heading}</h2>
        </div>
        <div class="section-body content-narrow">
          <p>{contactCopy.body}</p>
          <a class="button-link" href={contactCopy.href} target="_blank" rel="noopener noreferrer">
            {contactCopy.label}
          </a>
        </div>
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Run verification and confirm homepage is closer but suite still RED**

Run:

```bash
npm run build && npm run verify:site
```

Expected: build passes. Verification still fails because about, project archive, and blog required copy are not implemented yet.

- [ ] **Step 3: Commit homepage**

```bash
git add src/pages/index.astro
git commit -m "feat: redesign homepage"
```

## Task 6: Rewrite About Page

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace about page**

Replace the template content in `src/pages/about.astro` while keeping the existing `experience` array and tightening descriptions in place. Use this page body after the frontmatter:

```astro
<BaseLayout
  title="About — Michael Colenso"
  description="Construction operator with software and AI range."
>
  <div class="page-shell">
    <header class="page-header">
      <p class="eyebrow">About</p>
      <h1 class="page-title">Construction operator with software range.</h1>
      <p class="page-intro">
        I have spent two decades delivering complex construction work and four years writing software professionally.
        That combination is most useful where project risk, field coordination, owner expectations, and information systems meet.
      </p>
    </header>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">Operating range</p>
          <h2 class="section-title">Useful where the work crosses boundaries.</h2>
        </div>
        <div class="selected-work">
          <article class="work-item">
            <div><p class="project-type">Delivery</p></div>
            <div><h3>Complex construction execution</h3><p>Multifamily, hospitality, luxury residential, healthcare, education, retail, and renovation work across owner, field, subcontractor, and design-team interfaces.</p></div>
          </article>
          <article class="work-item">
            <div><p class="project-type">Systems</p></div>
            <div><h3>Software fluency</h3><p>Production web development experience plus current full-stack products, data tools, and automation projects.</p></div>
          </article>
          <article class="work-item">
            <div><p class="project-type">Judgment</p></div>
            <div><h3>Practical AI application</h3><p>Model workflows are useful when they improve signal, reduce repetitive review, and respect the consequences of real-world decisions.</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">Experience</p>
          <h2 class="section-title">Built work across cycles, sectors, and teams.</h2>
        </div>
        <ul class="experience-list">
          {experience.map(({ company, href, role, dates, location, description }) => (
            <li class="experience-item">
              <div>
                <p class="experience-dates">{dates}{location ? ` · ${location}` : ''}</p>
              </div>
              <div>
                <h3 class="experience-company">
                  <a href={href} target="_blank" rel="noopener noreferrer">{company}</a>
                </h3>
                <p class="project-type">{role}</p>
                <p class="experience-description">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="section-kicker">Education</p>
          <h2 class="section-title">Construction foundation.</h2>
        </div>
        <div class="content-narrow">
          <p>B.S. Construction Management — Northern Michigan University, 2004</p>
        </div>
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Tighten experience descriptions**

Within the existing `experience` array, use these exact `description` values:

```ts
// STS Construction
description: 'Led delivery of a 58-unit, 8-story podium-style multifamily project and maintained zero safety incidents across project phases.',

// Toth Construction
description: 'Managed high-end residential projects with subcontractors, vendors, clients, design professionals, and specialty artisans.',

// Osborne Construction
description: 'Prepared monthly cost reports, cash-flow projections, owner change orders, and subcontract modifications across active project scopes.',

// Discovery Land Company
description: 'Oversaw luxury home construction in a private Bahamas development, including remote-island procurement and logistics constraints.',

// SODO Builders
description: 'Supervised high-rise hospitality and office construction work and implemented value-engineered scope changes that reduced costs by 12%.',

// Cloudmunch / Adonit / Team Coco
description: 'Worked across startup and agency software teams after self-teaching web development and advancing into senior engineering responsibilities.',

// Graham Construction
description: 'Managed more than $50M in contracted scope across education, retail, hospitality, and seismic retrofit projects.',

// Skender Construction
description: 'Developed scopes of work, negotiated subcontracts, and tracked milestones for a senior care facility project.',

// West Builders
description: 'Managed procurement, change analysis, document control, cost tracking, and progress reporting on complex construction projects.',
```

- [ ] **Step 3: Run verification**

Run:

```bash
npm run build && npm run verify:site
```

Expected: verification still fails only for project archive and blog required copy.

- [ ] **Step 4: Commit about page**

```bash
git add src/pages/about.astro
git commit -m "feat: redesign about page"
```

## Task 7: Redesign Project Archive And Detail Pages

**Files:**
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Replace projects index**

Replace `src/pages/projects/index.astro` with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { projectGroups } from '../../data/site';

const projects = await getCollection('projects');
const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
---
<BaseLayout
  title="Work — Michael Colenso"
  description="Projects by Michael Colenso across construction data, AI automation, maps, and product builds."
>
  <div class="page-shell">
    <header class="page-header">
      <p class="eyebrow">Work</p>
      <h1 class="page-title">Tools, maps, products, and experiments.</h1>
      <p class="page-intro">
        A working archive of software projects, with the construction and AI-adjacent work pulled into clearer focus.
      </p>
    </header>

    <div class="project-groups">
      {projectGroups.map((group) => (
        <section class="section" aria-labelledby={`${group.title}-heading`}>
          <div class="section-grid">
            <div>
              <p class="section-kicker">Archive</p>
              <h2 id={`${group.title}-heading`} class="section-title">{group.title}</h2>
              <p class="section-lede">{group.description}</p>
            </div>
            <div class="selected-work">
              {group.slugs.map((slug) => {
                const project = projectBySlug.get(slug);
                if (!project) return null;
                return (
                  <article class="project-row">
                    <div>
                      <img class="project-image" src={project.data.image} alt="" loading="lazy" />
                    </div>
                    <div>
                      <h2><a href={`/projects/${project.slug}`}>{project.data.title}</a></h2>
                      <p>{project.data.tagline}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Replace project detail page**

Replace `src/pages/projects/[slug].astro` with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();
---
<BaseLayout title={`${project.data.title} — Michael Colenso`} description={project.data.tagline}>
  <div class="page-shell">
    <header class="page-header">
      <p class="eyebrow"><a href="/projects">Work</a></p>
      <h1 class="page-title">{project.data.title}</h1>
      <p class="page-intro">{project.data.tagline}</p>

      <ul class="project-link-list">
        {project.data.link && (
          <li>
            <a href={project.data.link} target="_blank" rel="noopener noreferrer">Live project</a>
          </li>
        )}
        {project.data.github && (
          <li>
            <a href={project.data.github} target="_blank" rel="noopener noreferrer">Source code</a>
          </li>
        )}
        <li><a href="/projects">All work</a></li>
      </ul>
    </header>

    <section class="section">
      <img class="project-image" src={project.data.image} alt="" />
    </section>

    <section class="section">
      <div class="prose">
        <Content />
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Run verification**

Run:

```bash
npm run build && npm run verify:site
```

Expected: verification still fails for blog required copy.

- [ ] **Step 4: Commit project pages**

```bash
git add src/pages/projects/index.astro 'src/pages/projects/[slug].astro'
git commit -m "feat: redesign project archive"
```

## Task 8: Redesign Writing Pages

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/content/blog/2026-02-23-i-bought-my-domain-to-post-my-resume.md`

- [ ] **Step 1: Add blog tagline**

In `src/content/blog/2026-02-23-i-bought-my-domain-to-post-my-resume.md`, update frontmatter to:

```md
---
title: "I bought my domain to post my resume. It cost me four years."
date: 2026-02-23
tagline: "A recession, a website, a software detour, and the pull of work that lasts."
---
```

Leave the body unchanged.

- [ ] **Step 2: Replace blog index**

Replace `src/pages/blog/index.astro` with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
---
<BaseLayout title="Writing — Michael Colenso" description="Writing by Michael Colenso on construction, software, work that lasts, and learning systems the hard way.">
  <div class="page-shell">
    <header class="page-header">
      <p class="eyebrow">Writing</p>
      <h1 class="page-title">Notes on construction, software, work that lasts, and learning systems the hard way.</h1>
    </header>

    <section class="section">
      <ul class="post-list">
        {posts.map((post) => (
          <li class="post-list-item">
            <div>
              <span class="post-list-date">
                {post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div>
              <h2><a href={`/blog/${post.slug}`}>{post.data.title}</a></h2>
              {post.data.tagline && <p>{post.data.tagline}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Replace blog detail**

Replace `src/pages/blog/[slug].astro` with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

const formattedDate = post.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---
<BaseLayout title={`${post.data.title} — Michael Colenso`} description={post.data.tagline ?? 'Writing by Michael Colenso.'}>
  <article class="page-shell">
    <header class="page-header">
      <p class="eyebrow"><a href="/blog">Writing</a> / {formattedDate}</p>
      <h1 class="article-title">{post.data.title}</h1>
      {post.data.tagline && <p class="page-intro">{post.data.tagline}</p>}
    </header>

    <section class="section">
      <div class="prose">
        <Content />
      </div>
    </section>
  </article>
</BaseLayout>
```

- [ ] **Step 4: Run verification and confirm GREEN**

Run:

```bash
npm run build && npm run verify:site
```

Expected: both commands pass. Verification prints `Site verification passed for 8 routes.`

- [ ] **Step 5: Commit writing pages**

```bash
git add src/pages/blog/index.astro 'src/pages/blog/[slug].astro' src/content/blog/2026-02-23-i-bought-my-domain-to-post-my-resume.md
git commit -m "feat: redesign writing pages"
```

## Task 9: Tighten Project Content

**Files:**
- Modify: `src/content/projects/regsignal.md`
- Modify: `src/content/projects/refract.md`
- Modify: `src/content/projects/praised.md`
- Modify: `src/content/projects/cull-the-herd.md`
- Modify: `src/content/projects/golfcoach.md`
- Modify: `src/content/projects/maptoposter.md`
- Modify: `src/content/projects/guns.md`
- Modify: `src/content/projects/seattlejoy.md`
- Modify: `src/content/projects/tax-parcel-map.md`

- [ ] **Step 1: Tighten selected project taglines**

Use these frontmatter tagline values:

```md
# regsignal.md
tagline: "Regulatory intelligence for tracking how construction rules move from federal publication to local enforcement."

# refract.md
tagline: "An AI workflow that critiques, edits, documents, and publishes image work from a GitHub pipeline."

# praised.md
tagline: "A full-stack testimonial SaaS with collection forms, approval workflow, embeds, billing, and tests."
```

- [ ] **Step 2: Tighten remaining project taglines**

Use these frontmatter tagline values:

```md
# cull-the-herd.md
tagline: "A CLI that ranks photo sets with local quality checks and AI vision critique."

# golfcoach.md
tagline: "AI-assisted golf swing analysis with video upload, biomechanical feedback, and coaching prompts."

# maptoposter.md
tagline: "A map-poster generator that turns OpenStreetMap data into print-ready city artwork."

# guns.md
tagline: "A county-level map of US law enforcement equipment obtained through the DOD 1033 Program."

# seattlejoy.md
tagline: "A King County home-sales map focused on million-dollar residential transactions."

# tax-parcel-map.md
tagline: "An interactive property records and tax parcel map for Traverse City, Michigan."
```

- [ ] **Step 3: Tighten project body copy**

Make these exact body-copy replacements:

In `src/content/projects/golfcoach.md`, replace:

```md
## The Tiger Woods version of golf coaching software
```

with:

```md
## AI-assisted golf coaching
```

In `src/content/projects/guns.md`, replace:

```md
### It takes a muckraker
```

with:

```md
### Public data into public context
```

In `src/content/projects/tax-parcel-map.md`, replace:

```md
A moderately exciting local property records and tax parcel map for Traverse City, Michigan.
```

with:

```md
An interactive local property records and tax parcel map for Traverse City, Michigan.
```

In `src/content/projects/cull-the-herd.md`, replace:

```md
Point it at a folder of photos. Get back a ranked list of your best work.
```

with:

```md
Point it at a folder of photos and get back a ranked view of the strongest images.
```

In `src/content/projects/regsignal.md`, replace:

```md
Existing policy-tracking tools completely miss this propagation timeline.
```

with:

```md
Most policy-tracking tools do not model that propagation timeline.
```

In `src/content/projects/refract.md`, replace:

```md
Push a photo to GitHub. That's it. Refract takes it from there.
```

with:

```md
Push a photo to GitHub. Refract handles the review, edit, documentation, and publish steps.
```

- [ ] **Step 4: Run verification**

Run:

```bash
npm run build && npm run verify:site
```

Expected: both commands pass.

- [ ] **Step 5: Commit project content**

```bash
git add src/content/projects/*.md
git commit -m "content: tighten project archive copy"
```

## Task 10: Cleanup Legacy Files And Ignore Brainstorm Artifacts

**Files:**
- Modify: `.gitignore`
- Delete after verification: `_layouts/`, `_includes/`, `_posts/`, `_projects/`, `_scss/`, `about/`, `articles/`, `assets/`, `blog/`, `bower_components/`, `projects/`, `_config.yml`, `gulpfile.js`, `index.html`

- [ ] **Step 1: Confirm legacy paths are not referenced by Astro source or deployment**

Run:

```bash
rg -n "_layouts|_includes|_posts|_projects|_scss|bower_components|gulpfile|_config|assets/" src public astro.config.mjs package.json .github CNAME
```

Expected: references to `/assets/` are allowed because Astro uses `public/assets/`. There should be no required references to root `assets/`, old Jekyll folders, `bower_components`, `gulpfile.js`, or `_config.yml`.

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Append this line to `.gitignore`:

```gitignore
.superpowers/
```

- [ ] **Step 3: Remove verified legacy paths**

Run:

```bash
rm -rf _layouts _includes _posts _projects _scss about articles assets blog bower_components projects _config.yml gulpfile.js index.html
```

- [ ] **Step 4: Run build and verification**

Run:

```bash
npm run build && npm run verify:site
```

Expected: both commands pass. If either command fails due a removed path, restore only the needed path from git and update this cleanup task before committing.

- [ ] **Step 5: Review cleanup diff**

Run:

```bash
git status --short
git diff --stat
```

Expected: deleted legacy paths appear. Unrelated pre-existing dirty files such as `package-lock.json`, `.claude/`, `.playwright-mcp/`, `AGENTS.md`, and `regsignal-preview.png` remain unstaged unless explicitly needed.

- [ ] **Step 6: Commit cleanup**

```bash
git add .gitignore _layouts _includes _posts _projects _scss about articles assets blog bower_components projects _config.yml gulpfile.js index.html
git commit -m "chore: remove legacy jekyll site files"
```

## Task 11: Browser Verification And Polish Pass

**Files:**
- Modify only files already touched in Tasks 3-10 if verification reveals layout or copy issues.

- [ ] **Step 1: Start or reuse dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Astro serves the site at `http://127.0.0.1:4321/`. If the port is already in use by the current session, reuse the running server.

- [ ] **Step 2: Verify pages in browser**

Use browser automation or manual browser checks for:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/about
http://127.0.0.1:4321/projects
http://127.0.0.1:4321/projects/regsignal
http://127.0.0.1:4321/blog
http://127.0.0.1:4321/blog/2026-02-23-i-bought-my-domain-to-post-my-resume
```

Check desktop around `1440x1000` and mobile around `390x844`.

Expected:

- No horizontal scrolling.
- Header navigation is usable.
- Homepage hero text fits.
- Project images render.
- Project groups are readable.
- Footer contact is present but restrained.
- No browser console errors.

- [ ] **Step 3: Run final command verification**

Run:

```bash
npm run build && npm run verify:site
```

Expected: both commands pass.

- [ ] **Step 4: Commit polish changes if any**

If browser verification required fixes, commit them:

```bash
git add src package.json scripts .gitignore
git commit -m "fix: polish redesigned site"
```

If no changes were needed, skip this commit.

## Task 12: Final Diff Review

**Files:**
- Review all changed files.

- [ ] **Step 1: Confirm final status**

Run:

```bash
git status --short
```

Expected: only unrelated pre-existing dirty files remain unstaged, or the worktree is clean aside from local-only files the user owns.

- [ ] **Step 2: Review recent commits**

Run:

```bash
git log --oneline -8
```

Expected: recent commits show the design spec plus implementation commits in task order.

- [ ] **Step 3: Summarize outcome**

Prepare a concise final summary with:

- Changed public pages.
- Verification commands and pass/fail result.
- Cleanup performed.
- Any unrelated dirty files left untouched.
