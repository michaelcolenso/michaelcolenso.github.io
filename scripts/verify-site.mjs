import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const requiredFiles = [
  'index.html',
  'about/index.html',
  'projects/index.html',
  'projects/cull-the-herd/index.html',
  'projects/golfcoach/index.html',
  'projects/guns/index.html',
  'projects/maptoposter/index.html',
  'projects/praised/index.html',
  'projects/refract/index.html',
  'projects/regsignal/index.html',
  'projects/seattlejoy/index.html',
  'projects/tax-parcel-map/index.html',
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

const knownRouteHrefs = new Set(
  requiredFiles.map((file) => {
    if (file === 'index.html') {
      return '/';
    }

    return `/${file.replace(/\/index\.html$/, '')}`.replace(/\/$/, '');
  })
);

function localAssetFromUrl(value) {
  if (!value) {
    return null;
  }

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('//')
  ) {
    return null;
  }

  if (
    value.startsWith('#') ||
    value.startsWith('data:') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  ) {
    return null;
  }

  if (!value.startsWith('/')) {
    return null;
  }

  const pathname = value.replace(/[?#].*$/, '');
  if (pathname.startsWith('/_astro/')) {
    return null;
  }
  if (pathname === '/') {
    return null;
  }

  return pathname;
}

function isKnownRouteHref(pathname) {
  return (
    knownRouteHrefs.has(pathname) ||
    knownRouteHrefs.has(pathname.replace(/\/$/, '')) ||
    knownRouteHrefs.has(`${pathname}/`)
  );
}

function collectLocalAssetRefs(html) {
  const refs = new Set();
  const attrPattern = /\b(src|href|srcset)\s*=\s*(["'])(.*?)\2/gi;

  for (const match of html.matchAll(attrPattern)) {
    const attribute = match[1];
    const value = match[3];

    if (attribute === 'href') {
      const ref = localAssetFromUrl(value);
      if (!ref || isKnownRouteHref(ref)) {
        continue;
      }
      refs.add(ref);
      continue;
    }

    if (attribute === 'srcset') {
      for (const candidate of value.split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        const ref = localAssetFromUrl(url);
        if (ref) {
          refs.add(ref);
        }
      }
      continue;
    }

    const ref = localAssetFromUrl(value);
    if (ref) {
      refs.add(ref);
    }
  }

  return [...refs];
}

const failures = [];

if (!existsSync(dist)) {
  failures.push('Missing dist/ output. Run `npm run build` first.');
}

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

const pagesWithHtml = requiredFiles.filter((file) => existsSync(join(dist, file)));
for (const file of pagesWithHtml) {
  const html = readFileSync(join(dist, file), 'utf8');
  const assetRefs = collectLocalAssetRefs(html);
  for (const src of assetRefs) {
    const assetPath = join(root, 'public', src);
    if (!existsSync(assetPath)) {
      failures.push(`Missing public asset referenced by ${file}: ${src}`);
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
