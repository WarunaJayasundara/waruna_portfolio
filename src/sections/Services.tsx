import { ArrowUpRight, LayoutDashboard, Megaphone, UserRound } from 'lucide-react';
import { SectionHeader } from '../components/ui';
import { WhatsappIcon } from '../components/icons';
import { whatsappLink } from '../data/profile';

// What clients can hire me to build. Each offer points to real work above as proof.
const services = [
  {
    Icon: LayoutDashboard,
    title: 'Business web systems',
    body: 'Point-of-sale, inventory, booking, records and management systems with secure logins, roles, admin dashboards and reports.',
    proof: 'Like YASH MOBILE POS and Nottary-Service',
    points: ['Staff accounts and permissions', 'Reports, invoices and exports', 'Works on phone and desktop'],
    message: 'Hi Waruna, I need a web system for my business. Can we talk?',
  },
  {
    Icon: Megaphone,
    title: 'Business & advertising websites',
    body: 'Fast, modern websites and landing pages that present your business, promote your products and bring customers to call or message you.',
    proof: 'Like the Beaver Creation website',
    points: ['Mobile-first, quick to load', 'WhatsApp, call and map buttons', 'Search-engine friendly setup'],
    message: 'Hi Waruna, I would like a website to advertise my business. Can we talk?',
  },
  {
    Icon: UserRound,
    title: 'Portfolio websites',
    body: 'Personal portfolio sites for professionals and students that show your work clearly and make it easy for employers and clients to contact you.',
    proof: 'Like this website',
    points: ['Your own design and logo', 'CV download and contact links', 'Hosting and domain setup'],
    message: 'Hi Waruna, I would like a portfolio website. Can we talk?',
  },
];

const steps = [
  { n: '01', title: 'Talk', body: 'We discuss what you need on WhatsApp or a call.' },
  { n: '02', title: 'Design', body: 'You see the layout and approve it before I build.' },
  { n: '03', title: 'Build', body: 'I develop and test it, with regular previews.' },
  { n: '04', title: 'Launch', body: 'I put it online and help you after launch.' },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative border-t border-line py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgb(200_240_74/0.08),transparent)]" />
      <div className="container-x relative">
        <SectionHeader
          index="02"
          label="Services"
          title={<span id="services-title">Need a website or system? <span className="text-mute">I can build it for you.</span></span>}
          intro="Alongside full-time roles, I take on freelance projects for businesses and individuals in Sri Lanka and abroad."
        />

        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {services.map(({ Icon, title, body, proof, points, message }, i) => (
            <li
              key={title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2/70 p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-signal/40"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-signal/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line-2 bg-ink text-signal">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="label mt-6">{proof}</p>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-between gap-2 rounded-xl border border-line-2 px-4 py-3 text-sm font-medium transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink"
                style={{ marginTop: '1.75rem' }}
              >
                <span className="inline-flex items-center gap-2"><WhatsappIcon className="size-4" /> Ask about this</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens WhatsApp)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16" data-reveal>
          <h3 className="label">How a project works</h3>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="bg-ink p-6">
                <span className="font-mono text-xs text-signal">{s.n}</span>
                <p className="mt-3 text-lg font-semibold tracking-tight">{s.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
