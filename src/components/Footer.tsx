import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../lib/motion';
import { profile, whatsappLink } from '../data/profile';
import { LogoMark } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <LogoMark className="size-10" />
          <div>
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-sm text-faint">Software engineer. Web systems, business websites and portfolios.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-faint">
          <span>© {new Date().getFullYear()}</span>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-paper">WhatsApp</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="inline-flex items-center gap-1.5 hover:text-paper"
          >
            Top <ArrowUp aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
