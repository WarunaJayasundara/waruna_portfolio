import { useEffect, useState } from 'react';
import { whatsappLink } from '../data/profile';
import { WhatsappIcon } from './icons';

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
      className={`fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] transition-all duration-500 hover:scale-105 sm:right-6 sm:bottom-6 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <WhatsappIcon className="size-7" />
      <span className="sr-only">Chat on WhatsApp (opens WhatsApp)</span>
    </a>
  );
}
