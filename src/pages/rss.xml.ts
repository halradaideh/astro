import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { CollectionEntry } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post: CollectionEntry<'blog'>) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
