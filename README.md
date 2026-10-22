# Caliper & Crayon

Astro site with Keystatic as the editor. Content lives in `src/content/projects/*.mdoc`; one file per project page.

## Run it

    npm install
    npm run dev

Site at http://127.0.0.1:4321, editor at http://127.0.0.1:4321/keystatic (local mode: saving writes to the files in this repo; commit and push as usual).

## Build

    SKIP_KEYSTATIC=1 npm run build

`SKIP_KEYSTATIC=1` leaves the editor routes out so the build is fully static (GitHub Pages, any static host). On Vercel, drop that flag, add `@astrojs/vercel`, and switch `keystatic.config.ts` storage to `github` to get the editor in the browser.

## Where things are

- `src/styles/style.css`: every token and component. Change design here.
- `src/pages/work/[slug].astro`: the project page template.
- `src/pages/work/index.astro`: the work grid, grouped by section.
- `keystatic.config.ts`: the editor form (fields, labels, help text).
- `src/content.config.ts`: the same fields as a schema for the build. Keep the two in sync.
- `public/img/projects/<slug>/`: images for each project. `public/docs/`: PDFs.
