'use client';

import dynamic from 'next/dynamic';

// `ssr: false` keeps mermaid (plus cytoscape/katex, ~3 MB) out of the server
// bundle — it is only ever rendered in the browser.
const MermaidRenderer = dynamic(
  () => import('./mermaid-renderer').then((mod) => mod.MermaidRenderer),
  { ssr: false },
);

export function Mermaid({ chart }: { chart: string }) {
  return <MermaidRenderer chart={chart} />;
}
