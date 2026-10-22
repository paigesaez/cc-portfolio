import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
export default defineMarkdocConfig({
  tags: {
    lede: { render: component('./src/components/Lede.astro') },
  },
  nodes: {
    heading: { render: component('./src/components/Heading.astro'), attributes: { level: { type: Number } } },
  },
});
