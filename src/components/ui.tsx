import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

/** Numbered section heading: "02 - Approach" label above a large title. */
export function SectionHeader({ index, label, title, intro }: { index: string; label: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8" data-reveal>
      <p className="label md:col-span-3">
        <span className="text-signal">{index}</span> <span aria-hidden="true">-</span> {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute text-pretty">{intro}</p>}
      </div>
    </header>
  );
}

/** Small mono tag used for technologies. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-[3px] border border-line px-2 py-1 font-mono text-[0.7rem] tracking-wide text-mute">{children}</li>
  );
}

/** External link with an arrow that nudges on hover. */
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 text-sm font-medium text-paper underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-signal ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Responsive WebP screenshot inside a minimal browser frame. */
export function Screenshot({ base, alt, url, priority = false, className = '' }: { base: string; alt: string; url: string; priority?: boolean; className?: string }) {
  const src = `${import.meta.env.BASE_URL}images/${base}`;
  return (
    <figure data-scroll data-scroll-zoom className={`overflow-hidden rounded-xl border border-line-2 bg-ink-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
        </span>
        <span className="truncate font-mono text-[0.68rem] text-faint">{url}</span>
      </div>
      <img
        src={`${src}-1280.webp`}
        srcSet={`${src}-720.webp 720w, ${src}-1280.webp 1280w`}
        sizes="(min-width: 1024px) 60vw, 100vw"
        width={1280}
        height={800}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  );
}
