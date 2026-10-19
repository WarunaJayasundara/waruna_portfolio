import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, type Block, type Project } from '../data/projects';
import { Link } from '../lib/router';
import { observeSections, useReveal } from '../lib/useReveal';
import { ExternalLink, Screenshot, Tag } from '../components/ui';

export default function CaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy!;
  const ids = study.sections.map((s) => s.id);
  const [active, setActive] = useState(ids[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => observeSections(ids, setActive), [project.slug]);
  useReveal(project.slug);

  useEffect(() => {
    document.title = `${project.name} - case study · Waruna Jayasundara`;
    return () => {
      document.title = 'Waruna Jayasundara - Software Engineer';
    };
  }, [project]);

  const withStudies = projects.filter((p) => p.caseStudy);
  const next = withStudies[(withStudies.indexOf(project) + 1) % withStudies.length];

  return (
    <article className="pt-28 sm:pt-32" aria-labelledby="cs-title">
      <header className="container-x">
        <Link to="/#work" className="group label inline-flex items-center gap-2 hover:text-paper">
          <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> All work
        </Link>
        <p className="label mt-10 flex flex-wrap gap-x-3">
          <span className="text-signal">Case study {project.index}</span>
          <span aria-hidden="true">·</span>
          <span>{project.context}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </p>
        <h1 id="cs-title" className="mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.88] font-semibold tracking-[-0.055em]">{project.name}</h1>
        <p className="mt-5 max-w-3xl font-serif text-[clamp(1.5rem,3vw,2.3rem)] leading-tight text-mute italic">{project.tagline}</p>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-12">
          <p className="text-lg leading-relaxed text-pretty lg:col-span-7">{study.intro}</p>
          <dl className="space-y-5 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="label">Stack</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">{project.stack.map((s) => <Tag key={s}>{s}</Tag>)}</ul>
              </dd>
            </div>
            <div>
              <dt className="label">Verify it</dt>
              <dd className="mt-3 flex flex-col items-start gap-2">
                {project.links.filter((l) => l.kind !== 'case').map((l) => (
                  <ExternalLink key={l.href} href={l.href}>{l.label}</ExternalLink>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {project.image && (
        <div className="container-x mt-16">
          <Screenshot base={project.image.base} alt={project.image.alt} url={project.image.browserUrl} priority />
        </div>
      )}

      {project.facts.length > 0 && (
        <dl className="container-x mt-12 grid grid-cols-2 lg:grid-cols-4">
          {project.facts.map((f) => (
            <div key={f.label} className="border-t border-line py-5 pr-4">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-mono text-2xl tracking-tight sm:text-3xl">{f.value}</span>
                <span className="mt-1 block text-sm text-faint">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="container-x mt-20 grid gap-12 pb-24 lg:grid-cols-12">
        <nav aria-label="Case study sections" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 space-y-1 border-l border-line">
            {study.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${active === s.id ? 'border-signal text-paper' : 'border-transparent text-faint hover:text-paper'}`}
                >
                  <span className="mr-2 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-20 lg:col-span-8 lg:col-start-5">
          {study.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} data-reveal>
              <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</p>
              <h2 id={`${s.id}-h`} className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{s.heading}</h2>
              <div className="mt-6 space-y-6">
                {s.blocks.map((b, bi) => <BlockView key={bi} block={b} />)}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Link to={`/work/${next.slug}`} className="group block border-t border-line transition-colors hover:bg-ink-2/60">
        <div className="container-x flex items-center justify-between gap-6 py-14">
          <div>
            <p className="label">Next case study</p>
            <p className="mt-3 text-[clamp(2rem,5vw,4rem)] leading-none font-semibold tracking-[-0.045em]">{next.name}</p>
          </div>
          <ArrowRight aria-hidden="true" className="size-8 shrink-0 text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-signal" />
        </div>
      </Link>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-lg leading-relaxed text-mute text-pretty">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-mute">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <figure className="overflow-hidden rounded-md border border-line bg-ink-2">
          {block.caption && <figcaption className="border-b border-line px-4 py-2.5 font-mono text-xs text-faint">{block.caption}</figcaption>}
          <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-paper/90 sm:p-5" tabIndex={0}>
            <code>{block.code}</code>
          </pre>
        </figure>
      );
    case 'table':
      return (
        <figure>
          {block.caption && <figcaption className="label mb-3">{block.caption}</figcaption>}
          <div className="overflow-x-auto rounded-md border border-line" tabIndex={0}>
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-2">
                <tr>{block.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.join('|')} className="border-t border-line">
                    {r.map((c, ci) => <td key={ci} className={`px-4 py-3 align-top ${ci === 0 ? 'text-paper' : 'text-mute'}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    case 'callout':
      return (
        <aside className="rounded-md border border-signal/30 bg-signal-dim p-5">
          <p className="font-medium text-signal">{block.title}</p>
          <p className="mt-2 leading-relaxed text-paper/85">{block.text}</p>
        </aside>
      );
  }
}
