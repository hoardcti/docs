import { docs } from 'collections/server';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { createElement } from 'react';
import { CircleQuestionMark, Rocket } from 'lucide-react';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

// Import icons individually instead of using `lucideIconsPlugin`, which pulls
// the entire lucide registry (~1600 icons) into the server bundle.
const icons = { CircleQuestionMark, Rocket };

function iconsPlugin(): LoaderPlugin {
  function replaceIcon<N extends { icon?: unknown }>(node: N): N {
    if (typeof node.icon === 'string') {
      const Icon = icons[node.icon as keyof typeof icons];
      if (Icon) {
        node.icon = createElement(Icon);
      } else {
        console.warn(`[icons] Unknown icon: ${node.icon}. Add it to the icon map in lib/source.ts.`);
        node.icon = undefined;
      }
    }
    return node;
  }

  return {
    name: 'fumadocs:icon',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  } as LoaderPlugin;
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [iconsPlugin()],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

export type Page = (typeof source)['$inferPage'];
export type Meta = (typeof source)['$inferMeta'];
