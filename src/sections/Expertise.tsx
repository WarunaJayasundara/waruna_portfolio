import { skillGroups } from '../data/skills';
import { SectionHeader } from '../components/ui';

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="container-x py-24 sm:py-32">
      <SectionHeader
        index="04"
        label="Technical expertise"
        title={<span id="expertise-title">Tools I have shipped with, <span className="text-mute">and where you can see them.</span></span>}
        intro="No percentage bars. Where a technology appears in a public project, the project is named next to it."
      />
      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <div key={g.title} data-reveal style={{ ['--reveal-delay' as string]: `${(gi % 3) * 90}ms` }}>
            <h3 className="flex items-baseline justify-between border-b border-line-2 pb-3">
              <span className="text-lg font-semibold tracking-tight">{g.title}</span>
              <span className="font-mono text-xs text-faint">{String(g.items.length).padStart(2, '0')}</span>
            </h3>
            <ul>
              {g.items.map((s) => (
                <li key={s.name} className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5">
                  <span className="transition-colors group-hover:text-signal">{s.name}</span>
                  {s.evidence && <span className="text-right font-mono text-[0.68rem] text-faint">{s.evidence}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
