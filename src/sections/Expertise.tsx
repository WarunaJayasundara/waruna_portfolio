import { skillGroups } from '../data/skills';
import { SectionHeader } from '../components/ui';

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="container-x py-24 sm:py-32">
      <SectionHeader
        index="04"
        label="Technical expertise"
        title={<span id="expertise-title">Tools I have shipped with, <span className="text-mute">and where you can see them.</span></span>}
        intro="No percentage bars, just the tools I have used in real projects. On a larger screen, each one shows where it was used."
      />
      <div className="mt-12 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <div key={g.title} data-reveal style={{ ['--reveal-delay' as string]: `${(gi % 3) * 90}ms` }}>
            <h3 className="flex items-baseline justify-between border-b border-line-2 pb-3">
              <span className="text-lg font-semibold tracking-tight">{g.title}</span>
              <span className="font-mono text-xs text-faint">{String(g.items.length).padStart(2, '0')}</span>
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:block">
              {g.items.map((s) => (
                <li key={s.name} className="group rounded-full border border-line-2 px-3 py-1.5 text-sm sm:flex sm:items-baseline sm:justify-between sm:gap-4 sm:rounded-none sm:border-0 sm:border-b sm:border-line sm:px-0 sm:py-2.5 sm:text-base">
                  <span className="transition-colors group-hover:text-signal">{s.name}</span>
                  {s.evidence && <span className="hidden text-right font-mono text-[0.68rem] text-faint sm:inline">{s.evidence}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
