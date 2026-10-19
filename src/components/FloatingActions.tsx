import { useEffect, useRef, useState } from 'react';
import { whatsappLink } from '../data/profile';
import { WhatsappIcon } from './icons';
import { prefersReducedMotion } from '../lib/motion';

/** WhatsApp button that appears once the visitor scrolls past the hero. */
export function FloatingWhatsapp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Visible after the hero, hidden again once the contact section (which has its own WhatsApp card) is on screen.
    const onScroll = () => {
      const contact = document.getElementById('contact')?.getBoundingClientRect().top ?? Infinity;
      setShow(window.scrollY > window.innerHeight * 0.7 && contact > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25d366] py-3 pr-5 pl-4 font-medium text-[#062b14] shadow-[0_12px_40px_-8px_rgb(37_211_102/0.55)] transition-all duration-500 sm:right-6 sm:bottom-6 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <WhatsappIcon className="size-5" />
      <span className="text-sm">Chat on WhatsApp</span>
      <span className="sr-only">(opens WhatsApp)</span>
    </a>
  );
}

/** A soft ring that trails the pointer on desktop and grows over links. */
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const el = ring.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = (e.target as Element | null)?.closest('a, button');
      el.dataset.hot = hot ? '1' : '';
      el.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const leave = () => { el.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden="true" className="cursor-ring pointer-events-none fixed top-0 left-0 z-[70] opacity-0 transition-opacity duration-300">
      <span />
    </div>
  );
}
