import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// The Keystatic editor routes (/keystatic, /api/keystatic) run only in dev, or in production on a host
// with server routes (Vercel). A plain static build (GitHub Pages) sets SKIP_KEYSTATIC=1 and gets the site only.
const editor = process.env.SKIP_KEYSTATIC ? [] : [keystatic()];

export default defineConfig({
  site: 'https://www.calipercrayon.com',
  output: 'static',
  integrations: [react(), markdoc(), ...editor],
});
