// The WJ monogram. The J's hook sweeps under the W so the two letters read
// as one mark. Path data is shared with the particle logo (ParticleLogo.tsx).
export const MARK_W = 'M9 18 L16.5 40 L24 24 L31.5 40 L39 18';
export const MARK_J = 'M49 18 V39 a8.5 8.5 0 0 1 -8.5 8.5 H33';

export function LogoMark({ className = 'size-9', framed = true }: { className?: string; framed?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {framed && (
        <>
          <rect width="64" height="64" rx="14" fill="var(--color-ink-2)" />
          <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="var(--color-line-2)" />
        </>
      )}
      <path d={MARK_W} fill="none" stroke="var(--color-paper)" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
      <path
        d={MARK_J}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transition-transform duration-500 group-hover:translate-x-[1.5px]"
      />
    </svg>
  );
}

/** Mark + name + role, used in the navigation and footer. */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className={`flex-col leading-none ${compact ? 'hidden sm:flex' : 'flex'}`}>
        <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">Waruna Jayasundara</span>
        <span className="mt-1 font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">Software Engineer</span>
      </span>
    </span>
  );
}
