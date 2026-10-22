import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const img = z.object({ image: z.string(), alt: z.string().default(''), link: z.string().nullable().optional() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    side: z.enum(['crayon', 'caliper']).default('crayon'),
    section: z.enum(['design', 'photography', 'video', 'software', 'fabrication', 'process', 'research']).default('design'),
    tags: z.array(z.string()).default([]),
    year: z.string().default(''),
    place: z.string().default(''),
    role: z.string().default(''),
    collaborators: z.string().default(''),
    format: z.string().default(''),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    hero: z.array(img).default([]),
    sheets: z.array(z.object({ images: z.array(img).default([]), label: z.string().default(''), caption: z.string().default('') })).default([]),
    docs: z.array(z.object({ kind: z.string().default('PDF'), title: z.string(), detail: z.string().default(''), url: z.string() })).default([]),
    todo: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { projects };
