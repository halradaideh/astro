// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: env.SITE_URL,
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
      'import.meta.env.GISCUS_REPO': JSON.stringify(env.GISCUS_REPO),
      'import.meta.env.GISCUS_REPO_ID': JSON.stringify(env.GISCUS_REPO_ID),
      'import.meta.env.GISCUS_CATEGORY': JSON.stringify(env.GISCUS_CATEGORY),
      'import.meta.env.GISCUS_CATEGORY_ID': JSON.stringify(env.GISCUS_CATEGORY_ID),
    },
  },
});
