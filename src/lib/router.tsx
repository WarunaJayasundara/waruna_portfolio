import { scrollToTarget } from './motion';
import { createContext, forwardRef, useCallback, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

// A deliberately tiny History-API router: the site has two kinds of page
// (home and /work/:slug) and does not need a routing library.
// All paths are relative to Vite's BASE_URL so GitHub Pages sub-paths work.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const toAppPath = (pathname: string) => {
  const p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return p === '' ? '/' : p;
};

export const href = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);

function scrollToHash(hash: string | undefined, topIfMissing = true, immediate = false) {
  const el = hash ? document.getElementById(hash) : null;
  if (el) scrollToTarget(el, immediate);
  else if (topIfMissing) scrollToTarget(0, true);
}

type RouterValue = { path: string; navigate: (to: string) => void };
const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname));

  // Honour a hash in the initial URL once the page has rendered (e.g. /#contact).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    // Wait for layout (fonts, images with fixed sizes) before jumping there.
    if (hash) setTimeout(() => scrollToHash(hash, false, true), 120);
  }, []);

  useEffect(() => {
    const onPop = () => setPath(toAppPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const [pathname, hash] = to.split('#');
    const target = pathname || '/';
    if (target !== toAppPath(window.location.pathname)) {
      window.history.pushState({}, '', href(target) + (hash ? `#${hash}` : ''));
      setPath(target);
    } else if (hash) {
      window.history.pushState({}, '', href(target) + `#${hash}`);
    }
    // Wait for the new page to render before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(hash)));
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Internal link. Falls back to a normal anchor for modified clicks. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, onClick, ...rest }, ref) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a ref={ref} href={href(to)} onClick={handle} {...rest} />;
});
