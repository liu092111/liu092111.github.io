import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Two deliberately separate tracks.
   `notes`  — technical: reliability, statistics, NPI, AI workflows. Audience: engineers.
   `career` — interviews, coffee chats, career paths. Audience: students and job seekers.
   Keeping them apart stops each from diluting the other. */

const shared = {
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  /** Drafts are excluded from listings; use while writing. */
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  /** 'en' | 'zh' — career posts are often better in Chinese. */
  lang: z.enum(['en', 'zh']).default('en'),
};

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object(shared),
});

const career = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/career' }),
  schema: z.object(shared),
});

export const collections = { notes, career };
