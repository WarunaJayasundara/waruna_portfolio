import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider } from './lib/router';
import App from './App';
import 'lenis/dist/lenis.css';
import './index.css';

// Opt in to scroll reveals only when JS runs (content stays visible otherwise).
document.documentElement.classList.add('js-motion');

const app = (
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
);

// Pages are pre-rendered to HTML at build time (scripts/prerender.mjs), so React
// attaches to the existing markup. The dev server serves an empty root instead.
const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
