import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects, archive, type Project } from '../data/projects';
import { Link } from '../lib/router';
import { ExternalLink, Screenshot, SectionHeader, Tag } from '../components/ui';
import { PlayableGame } from '../components/PlayableGame';

export function Work() {
  const [flagship, ...rest] = projects;
  const split = rest.filter((p) => p.caseStudy);
  const compact = rest.filter((p) => !p.caseStudy && !p.play);
  const games = rest.filter((p) => p.play);

  return (
    <section id="work" aria-labelledby="work-title" className="container-x py-24 sm:py-32">
      <SectionHeader
        index="01"
        label="Selected work"
        title={<span id="work-title">Three systems, built end to end, <span className="text-mute">each with something hard underneath.</span></span>}
        intro="Two are in production for real clients; one is my final-year research platform. Each links to its source code, and to the live system where there is one."
      />

      <div className="mt-16 space-y-28 sm:mt-20 sm:space-y-36">
        <Flagship project={flagship} />
        {split.map((p, i) => (
          <Split key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-28 grid gap-6 sm:mt-36 lg:grid-cols-2">
        {compact.map((p) => (
          <Compact key={p.slug} project={p} />
        ))}
      </div>

      {games.map((p) => (
        <PlayableGame key={p.slug} project={p} />
      ))}

      <Archive />
    </section>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-signal">{project.index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-line-2" />
      <span>{project.context}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
    </p>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.links.map((l) =>
        l.kind === 'case' ? (
          <Link
            key={l.href}
            to={l.href}
            aria-label={`Read the case study: ${project.name}`}
            className="group inline-flex items-center gap-2 rounded-full border border-signal/60 px-4 py-2.5 text-sm font-medium text-signal transition-colors hover:bg-signal hover:text-ink"
          >
            Read the case study
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <ExternalLink key={l.href} href={l.href}>{l.label}</ExternalLink>
        ),
      )}
    </div>
  );
}

function Facts({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-line ${wide ? 'sm:grid-cols-4' : ''}`}>
      {project.facts.map((f, i) => (
        <div key={f.label} className={`border-b border-line py-4 pr-3 ${i % 2 === 1 ? 'border-l pl-4' : ''} ${wide ? 'sm:border-b-0' : ''} ${wide && i > 0 ? 'sm:border-l sm:pl-4' : ''}`}>
          <dt className="sr-only">{f.label}</dt>
          <dd>
            <span className="block font-mono text-xl tracking-tight text-paper sm:text-2xl">{f.value}</span>
            <span className="mt-1 block text-xs text-faint">{f.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* The flagship gets a full-width editorial spread. */
function Flagship({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
        <div className="lg:col-span-7">
          <ProjectMeta project={project} />
          <h3 id={`${project.slug}-title`} className="mt-5 text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {project.name}
          </h3>
          <p className="mt-4 font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-tight text-mute italic">{project.tagline}</p>
        </div>
        <p className="leading-relaxed text-mute text-pretty lg:col-span-5">{project.summary}</p>
      </div>

      {project.image && (
        <div className="relative mt-12" data-reveal>
          <Screenshot base={project.image.base} alt={project.image.alt} url={project.image.browserUrl} className="lg:mr-[18%]" />
          <figure className="mt-6 overflow-hidden rounded-md border border-line-2 bg-ink-2 lg:absolute lg:right-0 lg:-bottom-16 lg:mt-0 lg:w-[38%] lg:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]">
            <img
              src={`${import.meta.env.BASE_URL}images/helaiq-features.webp`}
              width={940}
              height={600}
              loading="lazy"
              decoding="async"
              alt="HelaIQ feature cards: 5-level adaptive IQ engine, built for exam day, progress tracking, games, explained answers, Sinhala and English."
              className="block w-full"
            />
            <figcaption className="border-t border-line px-3 py-2 font-mono text-[0.68rem] text-faint">Fig. - feature overview, landing page</figcaption>
          </figure>
        </div>
      )}

      {project.howItWorks && (
        <div className="mt-16 lg:mt-28" data-reveal>
          <h4 className="label">How it works</h4>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {project.howItWorks.map((s, i) => (
              <li key={s.title} className="relative bg-ink-2 p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-signal/40 font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-4 text-lg font-semibold tracking-tight">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-10 space-y-8" data-reveal>
        {project.facts.length > 0 && <Facts project={project} wide />}
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </ul>
        <Links project={project} />
      </div>
    </article>
  );
}

/* Production systems: screenshot on one side, story on the other. */
function Split({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {project.image && (
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`} data-reveal>
          <div className="lg:sticky lg:top-24">
            <Screenshot base={project.image.base} alt={project.image.alt} url={project.image.browserUrl} />
          </div>
        </div>
      )}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`} data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        <ProjectMeta project={project} />
        <h3 id={`${project.slug}-title`} className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
          {project.name}
        </h3>
        <p className="mt-3 font-serif text-xl text-mute italic">{project.tagline}</p>

        <div className="mt-8 space-y-6">
          <div>
            <h4 className="label">The problem</h4>
            <p className="mt-2 leading-relaxed text-pretty">{project.problem}</p>
          </div>
          <div>
            <h4 className="label">Decisions that mattered</h4>
            <ol className="mt-3 space-y-4">
              {project.decisions.map((d) => (
                <li key={d.title} className="border-l border-line-2 pl-4">
                  <p className="font-medium">{d.title}</p>
                  <p className="mt-1 hidden text-sm leading-relaxed text-mute sm:block">{d.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <Facts project={project} />
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.stack.slice(0, 8).map((s) => <Tag key={s}>{s}</Tag>)}
          </ul>
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

/* Smaller projects: a pair of panels. */
function Compact({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="flex flex-col rounded-md border border-line bg-ink-2/60 p-6 sm:p-8" data-reveal>
      <ProjectMeta project={project} />
      <h3 id={`${project.slug}-title`} className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{project.name}</h3>
      <p className="mt-2 font-serif text-lg text-mute italic">{project.tagline}</p>
      {project.image ? (
        <Screenshot base={project.image.base} alt={project.image.alt} url={project.image.browserUrl} className="mt-6" />
      ) : (
        <p className="mt-6 border-l-2 border-signal pl-4 leading-relaxed text-mute">{project.whyInteresting}</p>
      )}
      <p className="mt-6 leading-relaxed text-mute text-pretty">{project.summary}</p>
      <ul className="mt-5 space-y-2 text-sm text-mute">
        {project.built.map((b) => (
          <li key={b} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-line-2" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </ul>
        <Links project={project} />
      </div>
    </article>
  );
}

function Archive() {
  return (
    <div className="mt-24" data-reveal>
      <h3 className="label">Earlier & coursework projects</h3>
      <ul className="mt-4 border-t border-line">
        {archive.map((a) => {
          const row = (
            <>
              <span className="font-medium sm:col-span-4">{a.name}</span>
              <span className="text-sm text-mute sm:col-span-5">{a.note}</span>
              <span className="font-mono text-xs text-faint sm:col-span-2">{a.stack}</span>
              <span className="hidden justify-end sm:col-span-1 sm:flex">
                {a.href && <ArrowUpRight aria-hidden="true" className="size-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />}
              </span>
            </>
          );
          const cls = 'grid gap-1 border-b border-line py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4';
          return (
            <li key={a.name}>
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className={`group ${cls} transition-colors hover:bg-ink-2/60`}>
                  {row}
                  <span className="sr-only">(source on GitHub, opens in a new tab)</span>
                </a>
              ) : (
                <div className={cls}>{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
