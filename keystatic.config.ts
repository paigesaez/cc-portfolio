import { config, fields, collection } from '@keystatic/core';

// Content model for a project page. Every field here is a form field in the editor at /keystatic.
export default config({
  // Local mode on your machine (npm run dev): edits write straight to the files in this repo.
  // GitHub mode on the live site: edits are committed to the repo through a GitHub App.
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : { kind: 'github', repo: { owner: 'paigesaez', name: 'cc-portfolio' } },
  ui: { brand: { name: 'Caliper & Crayon' } },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'One-line summary', description: 'Shown beside the title and on the work grid.', multiline: true }),
        side: fields.select({
          label: 'Caliper or crayon',
          options: [{ label: 'Crayon (creative)', value: 'crayon' }, { label: 'Caliper (technical)', value: 'caliper' }],
          defaultValue: 'crayon',
        }),
        section: fields.select({
          label: 'Section',
          description: 'Which heading this project sits under on the work page.',
          options: [
            { label: 'Design', value: 'design' },
            { label: 'Photography', value: 'photography' },
            { label: 'Video', value: 'video' },
            { label: 'Software', value: 'software' },
            { label: 'Fabrication', value: 'fabrication' },
            { label: 'Process & procedures', value: 'process' },
            { label: 'Research', value: 'research' },
          ],
          defaultValue: 'design',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
        year: fields.text({ label: 'Year', description: 'e.g. 2019 or 2013–2015' }),
        place: fields.text({ label: 'Place' }),
        role: fields.text({ label: 'My role', description: 'What you did, in a sentence. Shown first in the details column.', multiline: true }),
        collaborators: fields.text({ label: 'With', description: 'Author, client, lab, collaborators. Optional.' }),
        format: fields.text({ label: 'Format', description: 'Trim size, page count, runtime, stack. Optional.', multiline: true }),
        links: fields.array(
          fields.object({ label: fields.text({ label: 'Label' }), url: fields.url({ label: 'URL' }) }),
          { label: 'Links', itemLabel: (p) => p.fields.label.value }
        ),
        hero: fields.array(
          fields.object({
            image: fields.image({ label: 'Image', directory: 'public/img/projects', publicPath: '/img/projects/' }),
            alt: fields.text({ label: 'Alt text' }),
          }),
          { label: 'Hero images', description: 'One or two. Two show side by side.', itemLabel: (p) => p.fields.alt.value || 'image' }
        ),
        sheets: fields.array(
          fields.object({
            images: fields.array(
              fields.object({
                image: fields.image({ label: 'Image', directory: 'public/img/projects', publicPath: '/img/projects/' }),
                alt: fields.text({ label: 'Alt text' }),
              }),
              { label: 'Images', description: 'One shows full width, two show side by side.', itemLabel: (p) => p.fields.alt.value || 'image' }
            ),
            label: fields.text({ label: 'Label', description: 'Short, e.g. "Contents · Foreword"' }),
            caption: fields.text({ label: 'Caption', multiline: true }),
          }),
          { label: 'Image sheets', description: 'Large images shown after the text, in order.', itemLabel: (p) => p.fields.label.value || 'sheet' }
        ),
        docs: fields.array(
          fields.object({
            kind: fields.text({ label: 'Kind', description: 'Three letters on the icon: PDF, BUY, WEB' }),
            title: fields.text({ label: 'Title' }),
            detail: fields.text({ label: 'Detail', description: 'e.g. "Full text · 180 pages · 8 MB"' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Documents', itemLabel: (p) => p.fields.title.value }
        ),
        todo: fields.array(fields.text({ label: 'Item' }), { label: 'To finish this page', description: 'Shown in a dashed box while the list is not empty. Clear it when the page is done.', itemLabel: (p) => p.value }),
        featured: fields.checkbox({ label: 'Feature on home', defaultValue: false }),
        order: fields.integer({ label: 'Sort order', description: 'Lower comes first within a section.', defaultValue: 100 }),
        body: fields.markdoc({ label: 'Story', description: 'First person. Keep it short; the images do the work.' }),
      },
    }),
  },
});
