import { useRef, useState } from 'react';
import { Gamepad2, Maximize2, Play, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { ExternalLink, Tag } from './ui';

// A project that visitors can play inside the page. The screenshot is shown
// first; the live game is only loaded (as an iframe) after they press Play,
// so it costs nothing for people who just scroll past.
export function PlayableGame({ project }: { project: Project }) {
  const play = project.play!;
  const img = project.image!;
  const [playing, setPlaying] = useState(false);
  const frameWrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const src = `${import.meta.env.BASE_URL}images/${img.base}`;

  const start = () => {
    // On phones the embedded stage would be tiny, so open the game full screen instead.
    if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768) {
      window.open(play.url, '_blank', 'noopener');
      return;
    }
    setPlaying(true);
    // Give the iframe keyboard focus so Space / arrow keys go to the game.
    setTimeout(() => frame.current?.focus(), 400);
  };

  const fullscreen = () => {
    const el = frameWrap.current;
    if (el?.requestFullscreen) el.requestFullscreen().then(() => frame.current?.focus()).catch(() => window.open(play.url, '_blank', 'noopener'));
    else window.open(play.url, '_blank', 'noopener');
  };

  return (
    <article aria-labelledby={`${project.slug}-title`} className="mt-28 sm:mt-36" data-reveal>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-signal">{project.index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-2" />
            <span>{project.context}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </p>
          <h3 id={`${project.slug}-title`} className="mt-4 flex items-center gap-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            {project.name}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal-dim px-3 py-1 font-mono text-[0.68rem] font-normal tracking-widest text-signal uppercase">
              <Gamepad2 aria-hidden="true" className="size-3.5" /> Playable
            </span>
          </h3>
          <p className="mt-3 font-serif text-xl text-mute italic">{project.tagline}</p>
        </div>
        <p className="leading-relaxed text-mute text-pretty lg:col-span-5">{project.summary}</p>
      </div>

      {/* The game stage */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line-2 bg-ink-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
          <span className="flex items-center gap-3" aria-hidden="true">
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-line-2" />
              <span className="size-2 rounded-full bg-line-2" />
              <span className="size-2 rounded-full bg-line-2" />
            </span>
            <span className="truncate font-mono text-[0.68rem] text-faint">{img.browserUrl}</span>
          </span>
          {playing && (
            <span className="flex items-center gap-1">
              <button type="button" onClick={fullscreen} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-mute transition-colors hover:bg-ink-3 hover:text-paper">
                <Maximize2 aria-hidden="true" className="size-3.5" /> Full screen
              </button>
              <button type="button" onClick={() => setPlaying(false)} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-mute transition-colors hover:bg-ink-3 hover:text-paper">
                <X aria-hidden="true" className="size-3.5" /> Close game
              </button>
            </span>
          )}
        </div>

        <div ref={frameWrap} className="relative bg-black" style={{ aspectRatio: play.aspect }}>
          {playing ? (
            <iframe
              ref={frame}
              src={play.url}
              title={`${project.name} - playable game`}
              allow="autoplay; fullscreen"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button type="button" onClick={start} className="group absolute inset-0 block h-full w-full cursor-pointer">
              <img
                src={`${src}-1280.webp`}
                srcSet={`${src}-720.webp 720w, ${src}-1280.webp 1280w`}
                sizes="(min-width: 1312px) 1216px, 100vw"
                width={1280}
                height={576}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:brightness-75"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-signal text-ink shadow-[0_0_0_10px_rgb(200_240_74/0.15)] transition-transform duration-500 group-hover:scale-110 sm:size-20">
                  <Play aria-hidden="true" className="ml-1 size-7 fill-current sm:size-8" />
                </span>
                <span className="rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">Play it here</span>
              </span>
              <span className="sr-only">Load and play {project.name} inside this page</span>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-faint">
        Controls: <kbd className="font-mono text-mute">Space</kbd> or <kbd className="font-mono text-mute">↑</kbd> to jump (twice to double jump),{' '}
        <kbd className="font-mono text-mute">↓</kbd> to slide, <kbd className="font-mono text-mute">P</kbd> to pause. On a phone, use the on-screen buttons, or open it full screen and turn the phone sideways.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h4 className="label">Why it was interesting</h4>
          <p className="mt-3 leading-relaxed text-pretty">{project.whyInteresting}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {project.links.map((l) => <ExternalLink key={l.href} href={l.href}>{l.label}</ExternalLink>)}
          </div>
        </div>
        <div className="lg:col-span-7">
          <h4 className="label">What I built</h4>
          <ul className="mt-3 space-y-3">
            {project.built.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed text-mute">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <figure className="mt-8 overflow-hidden rounded-xl border border-line">
            <img
              src={`${import.meta.env.BASE_URL}images/dogrun-start-720.webp`}
              width={720}
              height={324}
              loading="lazy"
              decoding="async"
              alt="Dog Run start screen listing the controls: jump, slide, move, pause, mute and restart."
              className="block w-full"
            />
            <figcaption className="border-t border-line px-3 py-2 font-mono text-[0.68rem] text-faint">Fig. - start screen with controls</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}
