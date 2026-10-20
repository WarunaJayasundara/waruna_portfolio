// Pre-renders every route to static HTML after the client build, so the
// content is readable without JavaScript (search engines, recruiter tools,
// link previews). React then hydrates the markup in the browser.
//
//   dist/index.html              home
//   dist/work/<slug>/index.html  each case study
//   dist/404.html                not-found page (served by Vercel, Netlify and GitHub Pages)
import { build } from 'vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = resolve('dist');
const SSR_OUT = resolve('dist-ssr');

await build({
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: SSR_OUT, emptyOutDir: true },
});

const { render, routes, notFound } = await import(pathToFileURL(join(SSR_OUT, 'entry-server.js')).href);
const template = await readFile(join(DIST, 'index.html'), 'utf8');
const site = (template.match(/<link rel="canonical" href="([^"]*)\/"/) || [])[1] ?? '';

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(html, meta, { canonical = true } = {}) {
  const url = `${site}${meta.path === '/' ? '/' : meta.path}`;
  let out = template
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(meta.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escape(meta.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escape(meta.title)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  out = canonical
    ? out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    : out.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '');
  return out;
}

for (const meta of routes) {
  const file = meta.path === '/' ? join(DIST, 'index.html') : join(DIST, meta.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(await render(meta.path), meta));
  console.log('pre-rendered', meta.path);
}

await writeFile(join(DIST, '404.html'), page(await render(notFound.path), notFound, { canonical: false }));
console.log('pre-rendered 404.html');

await rm(SSR_OUT, { recursive: true, force: true });
