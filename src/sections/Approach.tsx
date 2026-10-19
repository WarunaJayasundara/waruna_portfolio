import { SectionHeader } from '../components/ui';

// Engineering principles, each tied to something that actually happened in a project.
const principles = [
  {
    title: 'Measure before claiming',
    body: 'HelaIQ’s first placement test used fixed percentage bands. They had no statistical basis, so I replaced them with a calibrated Rasch model and validated it by simulation before trusting it.',
    where: 'HelaIQ · adaptive testing',
  },
  {
    title: 'Make the wrong state impossible',
    body: 'Rather than checking stock and then selling, the POS decrements with one conditional UPDATE. Two tills cannot sell the last unit, and a repeated checkout returns the original sale.',
    where: 'YASH POS · inventory',
  },
  {
    title: 'Design the failure path first',
    body: 'Offline sales are PENDING until the server confirms them, and become CONFLICT if stock ran out elsewhere. External AI services always have a working local fallback.',
    where: 'YASH POS · HelaIQ',
  },
  {
    title: 'Let the interface tell the truth',
    body: 'Every SMS and push attempt is logged with its real outcome. Rule-based recommendations are labelled as rules, not passed off as machine learning.',
    where: 'Nottary-Service · HelaIQ',
  },
  {
    title: 'Test against the real thing',
    body: 'Running against a real MySQL server caught four placeholder bugs that syntax checks never would. In HelaIQ, 131 generated questions were re-solved independently with zero mismatches.',
    where: 'Nottary-Service · HelaIQ',
  },
  {
    title: 'Report the negative result',
    body: 'Response-time features I expected to help made the readiness model slightly worse. The live model stayed as it was, and the ablation study is part of the write-up.',
    where: 'HelaIQ · ML evaluation',
  },
];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative border-y border-line bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Approach"
          title={<span id="approach-title">How I work, <span className="text-mute">shown through decisions I have already made.</span></span>}
        />
        <ol className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="group relative border-r border-b border-line p-6 transition-colors duration-500 hover:bg-ink-3/60 sm:p-8"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${(i % 3) * 90}ms` }}
            >
              <span className="font-mono text-xs text-faint transition-colors group-hover:text-signal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-mute text-pretty">{p.body}</p>
              <p className="label mt-6">{p.where}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
