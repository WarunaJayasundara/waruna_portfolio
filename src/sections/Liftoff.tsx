import { ParticleLogo } from '../components/ParticleLogo';

const stack = [
  'React', 'TypeScript', 'Laravel', 'PHP', 'Python', 'FastAPI', 'MySQL', 'PostgreSQL', 'Tailwind CSS',
  'Next.js', 'Node.js', 'XGBoost', 'Electron', 'SQLite', 'Docker', 'Git', 'Vite', 'Figma',
];

// A dark stage that grows to full width as it scrolls in, while particles
// assemble into the WJ monogram. Followed by a slow marquee of the stack.
export function Liftoff() {
  return (
    <section aria-label="Introduction" className="py-10 sm:py-16">
      <div className="container-x">
        <div
          data-scroll
          className="relative overflow-hidden border border-line-2 bg-[radial-gradient(ellipse_at_50%_120%,#1c2410_0%,#0f1012_55%,#0c0d0f_100%)]"
          style={{
            transform: 'scale(calc(0.9 + var(--p, 1) * 0.1))',
            borderRadius: 'calc(40px - var(--p, 1) * 24px)',
          }}
        >
          <div className="h-[62vh] min-h-[360px] max-h-[640px]">
            <ParticleLogo />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 text-center sm:pb-10">
            <p className="label">Waruna Jayasundara · Software Engineer</p>
            <p className="max-w-xl text-lg leading-snug text-balance sm:text-2xl">
              Web systems, business websites and portfolios, <span className="text-signal">built to be relied on.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-label="Technologies I use">
        <ul className="marquee flex w-max gap-3">
          {[...stack, ...stack].map((s, i) => (
            <li
              key={i}
              aria-hidden={i >= stack.length}
              className="rounded-full border border-line-2 bg-ink-2 px-4 py-2 font-mono text-xs whitespace-nowrap text-mute"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
