import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tagline: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    image: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, projects };
