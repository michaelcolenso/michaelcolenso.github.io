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
