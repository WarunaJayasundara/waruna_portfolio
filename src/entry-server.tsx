import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { RouterProvider } from './lib/router';
import App from './App';
import { profile } from './data/profile';
import { projects } from './data/projects';

// Build-time renderer used by scripts/prerender.mjs. It renders a route to an
// HTML string so search engines and recruiter tools can read every page
// without running JavaScript.

export type RouteMeta = { path: string; title: string; description: string };

const HOME_TITLE = `${profile.name} - Software Engineer`;

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: HOME_TITLE,
    description:
      'Waruna Jayasundara is a software engineer from Sri Lanka building full-stack web systems: an adaptive learning platform (HelaIQ), a point-of-sale system and a deed-registry tracker. Available for roles and freelance projects.',
  },
  ...projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      path: `/work/${p.slug}`,
      title: `${p.name} - case study · ${profile.name}`,
      description: p.summary,
    })),
];

export const notFound: RouteMeta = { path: '/404', title: `Page not found · ${profile.name}`, description: 'This page does not exist.' };

/** Render one route to HTML, waiting for lazy-loaded parts (case studies) to resolve. */
export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, done) {
        html += chunk.toString();
        done();
      },
    });
    sink.on('finish', () => resolve(html));
    const stream = renderToPipeableStream(
      <StrictMode>
        <RouterProvider initialPath={path}>
          <App />
        </RouterProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onError: reject,
      },
    );
  });
}
