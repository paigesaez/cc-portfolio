# Caliper & Crayon rebuild: handoff for SJ (and his Claude)

Written 2026-10-22. Everything here is the current state of the repo you're reading this in. If something below disagrees with the code, the code wins.

## What this is

A rebuild of calipercrayon.com (Webflow, no per-project pages) as a portfolio with one page per project, an explicit "My role" on each, and an in-browser editor so SJ can add and edit projects without touching code. The goal is being able to link a specific project from a creative-role application.

- Live site: https://portfolio.calipercrayon.com (Astro, hosted on Vercel, auto-deploys from `main`)
- Editor: https://portfolio.calipercrayon.com/keystatic (sign in with GitHub; any collaborator on the repo can edit)
- Repo that deploys: `paigesaez/cc-portfolio` on GitHub. A copy also exists at `stephenjameskranz/calipercrayon-portfolio`; the deploying one is Paige's for now because Vercel couldn't see SJ's. Moving the deploy to SJ's repo later is a config change (`keystatic.config.ts` storage repo, plus the Vercel project's git connection), not a rebuild.

## How to work on it

Edit content on the live site: open `/keystatic`, sign in, open a project, edit, Save. Each save is a commit to `main`; Vercel rebuilds in about a minute.

Edit locally: `npm install`, `npm run dev`. Site at http://127.0.0.1:4321, editor at http://127.0.0.1:4321/keystatic (local mode writes to the files in this repo; commit and push as usual).

Every build first runs `npm run check` (`scripts/check-content.mts`), which parses every project file with the same rules the editor uses. If a file would error in the editor, the build fails instead of shipping a broken editor. Run it yourself after hand-editing a `.mdoc` file.

Where things are (also in README.md):
- `src/content/projects/*.mdoc`: one file per project. Front matter is the form fields; body is the story in Markdoc.
- `keystatic.config.ts`: the editor form. `src/content.config.ts`: the same fields as a build schema. Change both together.
- `src/pages/work/[slug].astro`: project page template. `src/pages/work/index.astro`: the work grid, grouped by section.
- `src/styles/style.css`: all tokens and components.
- `public/img/projects/<slug>/`: images, in the folder layout Keystatic writes to (`hero/0/image.jpg`, `sheets/0/images/0/image.jpg`). Keep that layout or the first editor save will move files.
- `public/docs/`: PDFs.

Project fields: title, one-line summary, caliper/crayon, section (design, photography, video, software, fabrication, process, research), tags, year, place, My role, With, Format, links, hero images (1 or 2), sheets (image groups with captions), story body. The story can open with a "Lede" block (rendered larger).

## What's built

Six crayon-side project pages, all opening and saving cleanly in the editor:
Archie: Gold in the Fire (the template everything else follows), Albert Michelson's Harmonic Analyzer, Sum Some Sines, Pendulum wave effect, Turner's tetrahedron, Laser-cut chess pieces.

Plus: home page, work grid grouped by section, project page template, the design system in `style.css`, and the deploy + editor pipeline.

SJ also has a branch `stevie/bw-and-hide-todos` (black-and-white palette, hides the "to finish" boxes on the live site). Not merged as of this writing.

## What's next, in order

1. Photography (five series: portraits 2024, manhole covers 2012, silver nitrate crystals 2011, ASU architecture 2009, rutilated quartz 2009; 22 images already extracted). Needs a gallery layout variant of the project template first.
2. Video: EngineerGuy series (2013-15; 17M views on the beverage can video; 8 videos linked) and Autodesk Ember video series (~16 videos; pick 3-4 heroes). Needs a video-embed sheet type.
3. Caliper side, 7 pages: Origin materials validation procedures, Origin XY-scale calibration, Origin sample parts, Origin X-ray slice tool, Origin voxel texture tool, Origin Covid swab pivot, RadTech 2020 talk, Ember print-process research, Ember vertical-edge patent (US 10,780,641), UIUC thesis (multinozzle printheads), Lewis Lab scientific photography for 8 papers.
4. About page (current about copy, caliper/crayon explanation, team, culture folded in, performance as its own section, CV download), experience pages by employer under about, services rewritten short for consulting clients, contact with links.
5. Resume: rebuild and relayout of the PDF, with the same role vocabulary as the site.
6. Open design items: dark mode, finalize the accent (see SJ's branch), home hero rebuilt from a sharp caliper photo, vector logo.

Role vocabulary to use on every page: direction, writing, camera, editing, 2D illustration, 3D illustration/animation, photography, book/print design, software, fabrication, process design, research.

## What only SJ can supply

- Per project: what he owned alone vs. with others, tools used, any numbers (views, parts shipped, users of a procedure).
- Language/stack for the X-ray slice tool and voxel texture tool.
- Role and outcomes for the Covid swab pivot and the materials validation procedures; slides or video for RadTech 2020.
- Source for the Sum Some Sines and pendulum applets (were on stevecrayons.com, pre-2015) so they can be rehosted.
- The two old photography portfolio PDFs from stevecrayons.com.
- Photos of the physical objects (the printed Archie and Harmonic Analyzer books, the tetrahedron, the chess pieces). Pages are meant to be image-led with real objects, not thumbnails.
- Vector or large logo artwork; a high-res caliper photo for the home hero.
- LinkedIn and Instagram URLs for contact.
- Decisions: domain stays calipercrayon.com or moves to his name; which roles he's applying to first (sets featured projects and work-grid order); whether services/consulting stays.

## Design direction (summary of the styleguide)

Kept from the old site: Barlow family, black/white base, circular mark, lowercase titles, the title/place/year metadata block, publication citation block, footer sitemap split.

v2: a white sheet with one accent drawn on it. Paper #FAFAF7, ink #111, graphite #4A4A4A, accent #E4572E on links, crayon tag, hover, active nav only. 8px spacing base, 1200px page, 720px prose, work grid 3/2/1 columns with 4:3 cards, project page as a 3-col metadata column beside 8-col content, full-bleed hero. Images on white, captions on everything, 150ms hover and 250ms image scale and nothing else. SJ's branch moves the accent to match ink; that's the live conversation on this.

Site copy is first person, SJ's voice. The role label is "My role", not "What I did".

## Source material

The original scrape of calipercrayon.com (14 pages, 778 assets) and SJ's CV PDF, with the full IA proposal and styleguide audit, are on Paige's machine in `sj-portfolio/`. Ask her for the folder if a page needs an asset not yet in `public/`.
