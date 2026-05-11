import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'lace-bra',
      'everyday-bra',
      'sports-bra',
      'shapewear',
      'panty',
      'sleepwear',
      'other',
    ]),
    images: z.array(z.string()).min(1),
    fabric: z.string(),
    moq: z.string(),
    sampleLeadTime: z.string(),
    features: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    coverImage: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Lingerie OEM Studio'),
    featured: z.boolean().default(false),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    clientName: z.string(),
    clientRegion: z.string(),
    category: z.string(),
    challenge: z.string(),
    solution: z.string(),
    result: z.string(),
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { products, blog, cases, pages };
