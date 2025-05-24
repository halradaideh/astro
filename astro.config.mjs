// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.radaideh.info',
  integrations: [
    mdx(),
    sitemap(),
    react({
      include: ['**/react/*', '**/components/**/*.{jsx,tsx}'],
      experimentalReactChildren: true,
    }),
  ],
  vite: {
    define: {
      'import.meta.env.GISCUS_REPO': JSON.stringify(process.env.GISCUS_REPO),
      'import.meta.env.GISCUS_REPO_ID': JSON.stringify(process.env.GISCUS_REPO_ID),
      'import.meta.env.GISCUS_CATEGORY': JSON.stringify(process.env.GISCUS_CATEGORY || 'General'),
      'import.meta.env.GISCUS_CATEGORY_ID': JSON.stringify(process.env.GISCUS_CATEGORY_ID),
    },
  },
});
