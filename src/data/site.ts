export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Work' },
  { href: '/photography', label: 'Photography' },
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

export const selectedProjectSlugs = ['building-seattle', 'blender-models', 'recalled-rides'] as const;

export const selectedProjectNotes: Record<string, string> = {
  'building-seattle': 'A live Seattle SDCI permit database with search, REST/OpenAPI, and a public MCP endpoint.',
  'blender-models': 'Spec-driven Blender VDC for occupied restoration work, with provenance checks and review renders.',
  'recalled-rides': 'Cloudflare vehicle-recall search with LLM enrichment and a public read-only MCP server.',
};

export const projectGroups = [
  {
    title: 'Construction, Data, And Regulation',
    description: 'Maps, signals, and public-data tools tied to places, policy, property, and enforcement.',
    slugs: ['building-seattle', 'regsignal', 'guns', 'seattlejoy', 'tax-parcel-map'],
  },
  {
    title: 'AI And Automation',
    description: 'Systems that use models, scripts, and pipelines to reduce repetitive judgment work.',
    slugs: ['blender-models', 'refract', 'cull-the-herd', 'golfcoach', 'maptoposter'],
  },
  {
    title: 'Product Builds',
    description: 'Full product surfaces with accounts, workflows, embeds, billing, and deployment concerns.',
    slugs: ['recalled-rides', 'praised'],
  },
] as const;
