import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// The hero background: a field of short dashes that float gently upward
// ("lift-off") and scatter away from the cursor, picking up the accent colour
// as they move. Pauses when off-screen or when the tab is hidden; draws a single
// still frame for reduced-motion visitors.

type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; phase: number; len: number; heat: number };

const LIME = [200, 240, 74];
const ICE = [120, 200, 255];
const PAPER = [239, 235, 227];
const BUCKETS = 6;

// Pre-computed stroke colours, [tint][heat bucket]. Particles are batched per
// colour, so a frame costs a dozen stroke() calls rather than one per particle.
const PALETTE = [LIME, ICE].map((tint) =>
  Array.from({ length: BUCKETS }, (_, b) => {
    const heat = b / (BUCKETS - 1);
    const c = PAPER.map((v, i) => Math.round(v + (tint[i] - v) * heat));
    return `rgba(${c[0]},${c[1]},${c[2]},${(0.16 + heat * 0.7).toFixed(2)})`;
  }),
);

export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = prefersReducedMotion();
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5);
    let w = 0, h = 0, raf = 0, visible = true, t = 0, last = 0, ready = false;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const frameGap = coarse ? 33 : 0; // about 30 fps on phones and tablets

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Jittered grid so the field looks scattered but evenly covered.
      const gap = coarse ? 48 : w < 640 ? 40 : 30;
      particles = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const hx = x + (Math.random() - 0.5) * gap * 0.9;
          const hy = y + (Math.random() - 0.5) * gap * 0.9;
          particles.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2, len: 1.5 + Math.random() * 3, heat: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const paths = PALETTE.map((row) => row.map(() => new Path2D()));
      const R = Math.min(170, Math.max(110, w * 0.12));
      for (const p of particles) {
        // Slow upward drift with a little sway, wrapping at the top.
        p.hy -= reduce ? 0 : 0.12;
        if (p.hy < -10) { p.hy += h + 20; p.y += h + 20; }
        let tx = p.hx + Math.sin(t * 0.0012 + p.phase) * 3;
        let ty = p.hy + Math.cos(t * 0.001 + p.phase) * 2;

        // Push away from the cursor.
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const f = (1 - d / R) ** 2;
            tx += (dx / (d || 1)) * f * 60;
            ty += (dy / (d || 1)) * f * 60;
            p.heat = Math.min(1, p.heat + f * 0.25);
          }
        }
        p.heat *= 0.96;

        // Spring toward the target.
        p.vx = (p.vx + (tx - p.x) * 0.06) * 0.82;
        p.vy = (p.vy + (ty - p.y) * 0.06) * 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.hypot(p.vx, p.vy);
        const angle = speed > 0.05 ? Math.atan2(p.vy, p.vx) : -Math.PI / 2 + Math.sin(p.phase) * 0.6;
        const half = (p.len + Math.min(speed * 2.2, 9)) / 2;
        const cx = Math.cos(angle) * half, cy = Math.sin(angle) * half;
        const path = paths[p.hx / w < 0.5 ? 0 : 1][Math.round(p.heat * (BUCKETS - 1))];
        path.moveTo(p.x - cx, p.y - cy);
        path.lineTo(p.x + cx, p.y + cy);
      }
      ctx.lineWidth = 1.4;
      paths.forEach((row, k) =>
        row.forEach((path, b) => {
          ctx.strokeStyle = PALETTE[k][b];
          ctx.stroke(path);
        }),
      );
    };

    const loop = (now: number) => {
      if (now - last >= frameGap) {
        last = now;
        t = now;
        draw();
      }
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf && !reduce && ready) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y > -50 && mouse.y < r.height + 50;
    };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };

    // Build and animate only once the browser is idle after first render,
    // so the particles never compete with the initial paint.
    const boot = () => { ready = true; build(); draw(); start(); };
    const hasIdle = 'requestIdleCallback' in window;
    const bootTimer = hasIdle ? window.requestIdleCallback(boot, { timeout: 1500 }) : window.setTimeout(boot, 600);

    const ro = new ResizeObserver(() => { if (ready) { build(); draw(); } });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      if (hasIdle) window.cancelIdleCallback(bootTimer);
      else clearTimeout(bootTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />;
}
