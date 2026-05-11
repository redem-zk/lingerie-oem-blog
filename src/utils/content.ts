import { getCollection } from 'astro:content';

export async function getLocalizedCollection(
  collection: 'products' | 'blog' | 'cases' | 'pages',
  locale: string,
) {
  const entries = await getCollection(collection, (entry) => {
    return entry.id.startsWith(`${locale}/`);
  });
  return entries;
}

export async function getFeaturedProducts(locale: string) {
  const products = await getLocalizedCollection('products', locale);
  return products
    .filter((p) => p.data.featured)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedCases(locale: string) {
  const cases = await getLocalizedCollection('cases', locale);
  return cases
    .filter((c) => c.data.featured)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getLatestBlogPosts(locale: string, limit = 3) {
  const posts = await getLocalizedCollection('blog', locale);
  return posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, limit);
}
