# Personal Site Redesign Design

## Goal

Redesign and update `blog.michaelcolenso.com` so it positions Michael Colenso as a construction-first operator with serious software and AI capability. The site should build general credibility for construction executives and owners without reading like a sales page or making a hard pitch.

The primary reader is a construction executive or owner. Secondary readers include construction-tech or AI companies, potential clients with messy construction technology problems, and peers who are interested in the writing or projects.

## Direction

Use the "Field Notes" visual direction: editorial, grounded, calm, and professional. The site should feel like a construction leader with unusually deep technical range.

The copy should be direct and professional. Personality should come mostly through the narrative arc, project choices, typography, and structure rather than casual language.

The homepage should be construction-first. Software and AI should appear as leverage earned through experience, not as the main headline.

## Narrative

The site's core arc is:

1. A recession created the space to learn software.
2. Software became a serious professional skill.
3. Construction pulled Michael back because built work lasts.
4. The current edge is applying construction judgment, software fluency, and practical AI to problems where risk, information, and coordination collide.

This arc should be visible on the homepage, developed on the about page, and reinforced by the selected projects.

## Information Architecture

Keep the current public routes:

- `/`
- `/about`
- `/projects`
- `/projects/[slug]`
- `/blog`
- `/blog/[slug]`

Keep the existing Astro content collection model unless implementation discovers a strong reason to extend it. Project grouping can be computed in page code from existing slugs or from a small local metadata map. Avoid introducing a CMS, database, or client-side framework.

## Homepage

The homepage becomes a professional narrative page rather than a generic portfolio.

Required sections:

1. **Hero**
   - Positioning: construction operator, software builder, AI pragmatist.
   - Lead message: complex work deserves better tools.
   - Support copy: twenty years delivering construction projects, four years writing software professionally, now applying both to construction's information, risk, and coordination problems.

2. **Proof / Operating Range**
   - Show construction credibility first: project delivery, sector range, field coordination, risk, stakeholders, schedule, budget, and change.
   - Mention software and AI as practical leverage: full-stack products, AI pipelines, data tools, and automation.

3. **Narrative Arc**
   - Briefly explain recession to software to construction to practical AI/software leverage.
   - Keep this concise and professional, not memoir-like.

4. **Selected Work**
   - Feature exactly three projects:
     - `RegSignal`
     - `Refract`
     - `Praised`
   - Each item should explain why it proves the hybrid positioning.

5. **Contact**
   - Clear but restrained.
   - Example intent: "For construction, software, or AI work, reach me on LinkedIn."

## About Page

The about page is the detailed credibility page.

Required sections:

1. Short operator profile.
2. "How I work" or "Operating range" section with three to four concise points.
3. Experience timeline.
4. Education.
5. Clear but restrained contact block.

Rewrite the introduction so it is not generic resume language. Experience entries should be tightened to specific operating evidence. Keep factual claims grounded in existing content unless the user provides new facts.

## Projects

The project system has two levels: selected proof and full archive.

Homepage selected work:

- `RegSignal`: construction-domain insight plus regulatory and data systems.
- `Refract`: AI workflow orchestration and multi-model critique/editing pipeline.
- `Praised`: full-stack product execution, auth, billing, embed, and tests.

`/projects` should become a grouped archive:

- **Construction, Data, And Regulation**
  - `RegSignal`
  - `Warfighter to Crimefighter`
  - `SeattleJoy`
  - `TC Plat Map`

- **AI And Automation**
  - `Refract`
  - `Cull the Herd`
  - `GolfCoach`
  - `Map to Poster`

- **Product Builds**
  - `Praised`

Project detail pages should keep the content collection model and links. Tighten copy where needed. The visual treatment should move away from hover-dependent cards toward editorial rows or tiles with clear tags, summaries, images, and links.

## Writing

The blog should stay quiet and editorial. It should not become a content marketing surface.

Use "Writing" rather than "Words" for the listing title. Frame it as notes on construction, software, work that lasts, and learning systems the hard way.

Blog listing pages should show title, date, optional tagline, and whitespace. Blog detail pages should improve typography and navigation without heavy decoration.

## Visual System

Use a restrained editorial system:

- Warm off-white or paper-like background, but avoid beige-heavy monotony.
- High-contrast text.
- One restrained accent color.
- Serif for editorial display moments; readable sans or mono for metadata and utility text.
- Strong spacing, dividers, and alignment instead of many cards.
- Images should do real work and should not be repeated unless they represent the same project.
- Buttons and links should be understated.

Respect frontend constraints:

- No hero card.
- No generic SaaS card grid as the first impression.
- No dominant purple/blue gradient, beige-only, dark blue/slate, brown/orange, or espresso palette.
- Cards only where the card is a real repeated item; avoid cards inside cards.
- Border radius must stay at or below 8px.
- Text must fit at mobile and desktop sizes.
- Do not scale font size with viewport width directly; use `clamp()` where responsive type is needed.

## Cleanup

Include a safe cleanup pass after confirming Astro and deployment references.

Likely removable legacy files and folders:

- `_layouts/`
- `_includes/`
- `_posts/`
- `_projects/`
- `_scss/`
- root-level legacy `index.html`
- root-level legacy `about/`, `blog/`, `projects/`, `articles/`
- root-level legacy `assets/`
- `bower_components/`
- `gulpfile.js`
- `_config.yml`

Do not delete anything until implementation verifies it is not used by the Astro app or GitHub Pages deployment.

Add `.superpowers/` to `.gitignore` so visual brainstorming artifacts are not committed.

Preserve unrelated dirty changes, including existing local files or modified files not created by this redesign, unless the user explicitly approves changing them.

## Testing And Verification

Implementation should verify:

- `npm run build` succeeds.
- Homepage, about, project listing, project detail, blog listing, and blog detail render correctly.
- Main navigation works.
- Project images load.
- Layout works at desktop and mobile viewport sizes.
- No obvious console errors during browser verification.
- Git diff contains only intended redesign, content, cleanup, and ignore changes.

Because this is mostly static UI and content, automated tests may be limited to build verification unless a test framework is added during planning. Browser-based visual verification is required.

## Out Of Scope

- Changing deployment provider.
- Adding a CMS or backend.
- Upgrading Astro major versions.
- Adding analytics.
- Adding a contact form.
- Creating a hard sales funnel.
- Rewriting the blog post into marketing content.
