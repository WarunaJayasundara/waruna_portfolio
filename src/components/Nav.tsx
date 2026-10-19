import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Link, useRouter, href } from '../lib/router';
import { observeSections } from '../lib/useReveal';
import { profile, whatsappLink } from '../data/profile';
import { WhatsappIcon } from './icons';
import { LogoLockup } from './Logo';

const items = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);

  // Scroll state + reading-progress bar (written straight to the DOM to avoid re-renders).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  useEffect(() => {
    if (path !== '/') return setActive('');
    // "approach" is tracked (but not listed) so Work un-highlights once it is passed.
    return observeSections([...items.map((i) => i.id), 'approach'], setActive);
  }, [path]);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstMenuLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      menuButton.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-signal px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${open ? 'border-b border-line bg-ink' : scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'}`}>
        <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
            <LogoLockup compact />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded px-3 py-2 text-sm transition-colors hover:text-paper ${active === item.id ? 'text-paper' : 'text-mute'}`}
                >
                  {item.label}
                  <span className={`absolute inset-x-3 -bottom-px h-px origin-left bg-signal transition-transform duration-500 ${active === item.id ? 'scale-x-100' : 'scale-x-0'}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={href(`/${profile.resume}`)}
              download
              className="hidden items-center gap-2 rounded-full border border-line-2 px-3.5 py-2 text-sm font-medium transition-colors hover:border-signal hover:text-signal sm:inline-flex"
            >
              <Download aria-hidden="true" className="size-4" /> Résumé
            </a>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded border border-line-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </nav>
        <div ref={progress} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal/70" />

        {open && (
          <div id="mobile-menu" className="container-x h-[calc(100dvh-4rem)] overflow-y-auto pb-10 lg:hidden">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item, i) => (
                <li key={item.id}>
                  <Link
                    ref={i === 0 ? firstMenuLink : undefined}
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={href(`/${profile.resume}`)} download className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 font-medium text-ink">
                <Download aria-hidden="true" className="size-4" /> Download CV (PDF)
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 font-medium text-[#062b14]">
                <WhatsappIcon className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
