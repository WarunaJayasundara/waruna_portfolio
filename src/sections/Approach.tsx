import { SectionHeader } from '../components/ui';

// Engineering principles, each tied to something that actually happened in a project.
const principles = [
  {
    title: 'Measure before claiming',
    body: 'HelaIQ’s first placement test used simple percentage bands. I replaced it with an adaptive test and checked it with 500 simulated students before trusting the results.',
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
    body: 'Some extra data I expected to improve HelaIQ’s prediction model made it slightly worse, so I kept the simpler model and wrote the result down honestly.',
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
        <p className="label mt-10 sm:hidden">Swipe to see all six →</p>
        {/* Phones: a swipeable row of cards. Larger screens: a ruled grid. */}
        <ol className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-0 sm:overflow-visible sm:border-t sm:border-l sm:border-line sm:px-0 sm:pb-0 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="group relative w-[82%] shrink-0 snap-start rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3/60 sm:w-auto sm:rounded-none sm:border-0 sm:border-r sm:border-b sm:bg-transparent sm:p-8"
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
