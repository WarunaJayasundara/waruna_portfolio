import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from './lib/router';
import App from './App';
import { startMotion } from './lib/motion';
import 'lenis/dist/lenis.css';
import './index.css';

// Opt in to scroll reveals only when JS runs (content stays visible otherwise).
document.documentElement.classList.add('js-motion');
startMotion();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
);
