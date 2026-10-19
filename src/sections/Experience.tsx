import { roles, leadership, certifications } from '../data/experience';
import { ExternalLink, SectionHeader } from '../components/ui';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="06" label="Experience" title={<span id="experience-title">Work, leadership <span className="text-mute">and credentials.</span></span>} />

        <ol className="mt-16">
          {roles.map((r, i) => (
            <li key={r.title + r.org} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8" data-reveal>
              <p className="font-mono text-sm text-faint md:col-span-3">{r.period}</p>
              <div className="md:col-span-9">
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                  {r.title} <span className="text-mute">- {r.org}</span>
                </h3>
                <ul className={`mt-4 space-y-2 ${i === 0 ? '' : 'text-mute'}`}>
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                      <span className={i === 0 ? 'text-mute' : ''}>{p}</span>
                    </li>
                  ))}
                </ul>
                {r.link && <ExternalLink href={r.link.href} className="mt-5">{r.link.label}</ExternalLink>}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <h3 className="label">Leadership & activities</h3>
            <ul className="mt-4 border-t border-line">
              {leadership.map((l) => (
                <li key={l.title + l.period} className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-3.5">
                  <span>
                    <span className="font-medium">{l.title}</span>
                    <span className="block text-sm text-mute sm:inline sm:before:content-['_·_']">{l.org}</span>
                  </span>
                  <span className="font-mono text-xs text-faint">{l.period}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <h3 className="label">Certifications</h3>
            <ul className="mt-4 border-t border-line">
              {certifications.map((c) => (
                <li key={c.name} className="border-b border-line py-3.5">
                  <span className="font-medium">{c.name}</span>
                  <span className="block text-sm text-mute">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
