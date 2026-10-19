import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react';
import { profile, whatsappLink } from '../data/profile';
import { href } from '../lib/router';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../components/icons';
import { ParticleField } from '../components/ParticleField';

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* Clipboard unavailable: the link itself still works. */
        }
      }}
      className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-2 text-mute transition-colors hover:border-paper hover:text-paper"
    >
      {copied ? <Check aria-hidden="true" className="size-4 text-signal" /> : <Copy aria-hidden="true" className="size-4" />}
      <span className="sr-only">{copied ? `${label} copied` : `Copy ${label}`}</span>
    </button>
  );
}

function DetailCard({ icon, label, value, href: url, external, copy, className = '' }: { icon: ReactNode; label: string; value: string; href: string; external?: boolean; copy?: string; className?: string }) {
  return (
    <li className={`${className} group relative flex min-w-0 items-center gap-4 rounded-2xl border border-line bg-ink-2/80 p-5 backdrop-blur transition-colors hover:border-line-2`}>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink-3 text-paper transition-colors group-hover:text-signal">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="label block">{label}</span>
        <a
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="mt-1 block text-[1.02rem] font-medium [overflow-wrap:anywhere] after:absolute after:inset-0 after:content-['']"
        >
          {value}
        </a>
      </span>
      {copy ? <CopyButton value={copy} label={label.toLowerCase()} /> : <ArrowUpRight aria-hidden="true" className="size-4 text-faint transition-colors group-hover:text-signal" />}
    </li>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_40%,black,transparent)]">
        <ParticleField />
      </div>
      <div className="container-x relative">
        <p className="label" data-reveal><span className="text-signal">07</span> - Contact</p>
        <h2 id="contact-title" className="mt-8 max-w-5xl text-[clamp(2.6rem,7.5vw,6.2rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance" data-reveal>
          Let’s build something <em className="font-serif font-normal text-signal italic">great</em> together.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute" data-reveal>
          Hiring for a software role, or need a website or system for your business? Message me on WhatsApp for the
          quickest reply, or use any of the details below.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12" data-reveal>
          {/* Primary action: WhatsApp */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl bg-signal p-7 text-ink sm:p-9 lg:col-span-5"
          >
            <span aria-hidden="true" className="absolute -right-10 -bottom-10 size-48 rounded-full bg-white/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <span className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink/10 px-3 py-1.5 font-mono text-[0.7rem] tracking-widest uppercase">
                <span className="size-1.5 rounded-full bg-ink" /> Fastest reply
              </span>
              <ArrowUpRight aria-hidden="true" className="size-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="relative mt-16 block">
              <WhatsappIcon className="size-10" />
              <span className="mt-4 block text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Chat on WhatsApp</span>
              <span className="mt-2 block font-mono text-sm opacity-75">{profile.phone}</span>
            </span>
            <span className="sr-only">(opens WhatsApp)</span>
          </a>

          {/* All contact details, clearly listed */}
          <ul className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            <DetailCard className="sm:col-span-2" icon={<Mail aria-hidden="true" className="size-5" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} copy={profile.email} />
            <DetailCard icon={<Phone aria-hidden="true" className="size-5" />} label="Phone" value={profile.phone} href={profile.phoneHref} copy={profile.phone} />
            <DetailCard icon={<LinkedinIcon className="size-5" />} label="LinkedIn" value="Waruna Jayasundara" href={profile.linkedin} external />
            <DetailCard icon={<GithubIcon className="size-5" />} label="GitHub" value={`@${profile.githubHandle}`} href={profile.github} external />
            <DetailCard icon={<MapPin aria-hidden="true" className="size-5" />} label="Based in" value={profile.location} href="https://maps.google.com/?q=Kelaniya,Sri+Lanka" external />
            <li className="group relative flex items-center gap-4 rounded-2xl border border-signal/40 bg-signal-dim p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-signal text-ink">
                <Download aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label block">Résumé</span>
                <a href={href(`/${profile.resume}`)} download className="mt-1 block font-medium after:absolute after:inset-0 after:content-['']">
                  Download CV (PDF)
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
