import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// The site is static. The Keystatic editor (/keystatic) and its API (/api/keystatic) are the only
// server routes; the Vercel adapter runs them as functions. SKIP_KEYSTATIC=1 builds a plain static
// site with no editor, for GitHub Pages or any host without functions.
const editor = process.env.SKIP_KEYSTATIC ? [] : [keystatic()];

export default defineConfig({
  site: 'https://portfolio.calipercrayon.com',
  output: 'static',
  // The work grid now lives on the home page; old /work links land there.
  redirects: { '/work': '/' },
  adapter: process.env.SKIP_KEYSTATIC ? undefined : vercel(),
  integrations: [react(), markdoc(), ...editor],
});
