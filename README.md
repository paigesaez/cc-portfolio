# Caliper & Crayon

Astro site with Keystatic as the editor. Content lives in `src/content/projects/*.mdoc`; one file per project page.

## Run it

    npm install
    npm run dev

Site at http://127.0.0.1:4321, editor at http://127.0.0.1:4321/keystatic (local mode: saving writes to the files in this repo; commit and push as usual).

## Editing on the live site

The site deploys from `main` to Vercel. The editor lives at `/keystatic` on the live site and commits to this repo through a GitHub App. One-time setup: open `/keystatic` on the deployed site, follow its setup screen to create the GitHub App, add the environment variables it gives you in Vercel, redeploy. After that anyone with write access to the repo can sign in with GitHub and edit.

## Build

    npm run build

On a host without server functions (GitHub Pages), `SKIP_KEYSTATIC=1 npm run build` leaves the editor out and produces a plain static site.

## Where things are

- `src/styles/style.css`: every token and component. Change design here.
- `src/pages/work/[slug].astro`: the project page template.
- `src/pages/work/index.astro`: the work grid, grouped by section.
- `keystatic.config.ts`: the editor form (fields, labels, help text).
- `src/content.config.ts`: the same fields as a schema for the build. Keep the two in sync.
- `public/img/projects/<slug>/`: images for each project. `public/docs/`: PDFs.
