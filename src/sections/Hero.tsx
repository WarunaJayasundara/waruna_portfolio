import { ArrowDown, Download } from 'lucide-react';
import { Link, href } from '../lib/router';
import { profile, whatsappLink } from '../data/profile';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../components/icons';
import { ParticleField } from '../components/ParticleField';

const spec = [
  { k: 'Focus', v: 'Full-stack web systems' },
  { k: 'Education', v: 'BICT (Hons), Software Systems, Kelaniya' },
  { k: 'Recently', v: 'Software Engineering Intern, Beaver Creation' },
  { k: 'In production', v: 'Point of sale · Deed registry' },
];

export function Hero() {
  const img = `${import.meta.env.BASE_URL}images/portrait`;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        <ParticleField />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(200_240_74/0.10),transparent)]" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="hero-line flex flex-wrap items-center gap-x-4 gap-y-2 label" style={{ ['--d' as string]: '0ms' }}>
              <span className="inline-flex items-center gap-2 text-paper">
                <span className="status-dot size-1.5 rounded-full bg-signal" aria-hidden="true" />
                {profile.availability}
              </span>
              <span aria-hidden="true" className="hidden h-px w-8 bg-line-2 sm:block" />
              <span>{profile.location}</span>
            </p>

            <h1 id="hero-title" className="mt-8 text-[clamp(3.1rem,12vw,7rem)] lg:text-[7.4vw] xl:text-[min(8.6vw,8.6rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
              <span className="mask-line"><span className="hero-rise" style={{ ['--d' as string]: '80ms' }}>Waruna</span></span>
              <span className="mask-line"><span className="hero-rise text-mute" style={{ ['--d' as string]: '170ms' }}>Jayasundara</span></span>
            </h1>

            <p className="hero-line mt-8 max-w-[38rem] text-[clamp(1.25rem,2.3vw,1.7rem)] leading-snug tracking-[-0.015em] text-pretty" style={{ ['--d' as string]: '260ms' }}>
              Software engineer building systems that hold up under{' '}
              <em className="font-serif text-[1.12em] font-normal text-signal italic">real use</em>: an adaptive
              testing engine, a shop’s point of sale, a legal records tracker.
            </p>

            <p className="hero-line mt-5 max-w-[36rem] leading-relaxed text-mute" style={{ ['--d' as string]: '340ms' }}>
              I work across React, TypeScript, Laravel and Python, and I care most about the parts users never see:
              data that stays correct under concurrency, offline paths that stay honest, and numbers that can be checked.
            </p>

            <div className="hero-line mt-10 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '420ms' }}>
              <Link
                to="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 font-medium text-ink transition-[filter] hover:brightness-110"
              >
                Explore selected work
                <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
              <a
                href={href(`/${profile.resume}`)}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 font-medium transition-colors hover:border-paper"
              >
                <Download aria-hidden="true" className="size-4" /> Résumé <span className="font-mono text-xs text-faint">PDF</span>
              </a>
              <div className="flex gap-2">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex size-12 items-center justify-center rounded-full border border-line-2 text-mute transition-colors hover:border-[#25d366] hover:text-[#25d366]">
                  <WhatsappIcon className="size-5" />
                  <span className="sr-only">Chat on WhatsApp (opens WhatsApp)</span>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex size-12 items-center justify-center rounded-full border border-line-2 text-mute transition-colors hover:border-paper hover:text-paper">
                  <GithubIcon className="size-5" />
                  <span className="sr-only">GitHub profile (opens in a new tab)</span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex size-12 items-center justify-center rounded-full border border-line-2 text-mute transition-colors hover:border-paper hover:text-paper">
                  <LinkedinIcon className="size-5" />
                  <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Portrait, framed like a plate in a technical drawing */}
          <div className="hero-line lg:col-span-5 xl:col-span-4" style={{ ['--d' as string]: '200ms' }}>
            <figure className="mx-auto max-w-[22rem] lg:mt-6 lg:max-w-none">
              <div className="cropmarks">
                <picture>
                  <source type="image/webp" srcSet={`${img}-480.webp 480w, ${img}-800.webp 800w`} sizes="(min-width: 1024px) 30vw, 22rem" />
                  <img
                    src={`${img}-800.webp`}
                    width={800}
                    height={1000}
                    alt="Portrait of Waruna Jayasundara in a dark suit, smiling, in front of a wall of green climbing plants."
                    {...{ fetchpriority: 'high' }}
                    decoding="async"
                    className="block aspect-[4/5] w-full rounded-[3px] object-cover"
                  />
                </picture>
              </div>
              <figcaption className="mt-5 flex items-center justify-between font-mono text-[0.68rem] tracking-wider text-faint uppercase">
                <span>Fig. 01 - W. Jayasundara</span>
                <span>6.95° N · 79.92° E</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Spec strip: the short version for a recruiter skimming */}
        <dl className="hero-line mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" style={{ ['--d' as string]: '520ms' }}>
          {spec.map((s, i) => (
            <div key={s.k} className={`border-b border-line py-5 sm:pr-6 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-6' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-6 lg:pl-6' : ''}`}>
              <dt className="label">{s.k}</dt>
              <dd className="mt-2 text-[0.95rem] leading-snug">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
