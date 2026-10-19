import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { MARK_J, MARK_W } from './Logo';

// Particles that assemble into the WJ monogram as the section scrolls into
// view, and scatter from the cursor. The progress value comes from the
// nearest [data-scroll] ancestor (see lib/motion.ts).

type Dot = { tx: number; ty: number; sx: number; sy: number; x: number; y: number; vx: number; vy: number; lime: boolean; delay: number };

function samplePoints(size: number, step: number) {
  const off = document.createElement('canvas');
  off.width = off.height = size;
  const c = off.getContext('2d', { willReadFrequently: true })!;
  const s = size / 64;
  const pts: { x: number; y: number; lime: boolean }[] = [];
  for (const [path, lime] of [[MARK_W, false], [MARK_J, true]] as const) {
    c.clearRect(0, 0, size, size);
    c.setTransform(s, 0, 0, s, 0, 0);
    c.lineWidth = 5;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = '#fff';
    c.stroke(new Path2D(path));
    c.setTransform(1, 0, 0, 1, 0, 0);
    const data = c.getImageData(0, 0, size, size).data;
    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        if (data[(y * size + x) * 4 + 3] > 128) pts.push({ x: x / size, y: y / size, lime });
      }
    }
  }
  return pts;
}

export function ParticleLogo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const host = canvas.closest<HTMLElement>('[data-scroll]');
    const reduce = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = false;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const markSize = Math.min(w * 0.5, h * 0.7);
      const ox = (w - markSize) / 2;
      const oy = (h - markSize) / 2 - h * 0.1;
      const step = w < 640 ? 5 : 4;
      dots = samplePoints(320, step).map((p) => {
        const sx = Math.random() * w;
        const sy = h + Math.random() * h * 0.8; // rise up from below
        return { tx: ox + p.x * markSize, ty: oy + p.y * markSize, sx, sy, x: sx, y: sy, vx: 0, vy: 0, lime: p.lime, delay: Math.random() * 0.35 };
      });
    };

    const progress = () => (reduce ? 1 : Math.min(1, Number(host?.dataset.p ?? 1) * 1.25));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const p = progress();
      for (const d of dots) {
        const local = Math.min(1, Math.max(0, (p - d.delay) / (1 - d.delay)));
        const e = 1 - (1 - local) ** 3;
        let tx = d.sx + (d.tx - d.sx) * e;
        let ty = d.sy + (d.ty - d.sy) * e + Math.sin(time * 0.002 + d.sx) * (1 - e) * 6;
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const f = (1 - dist / 90) ** 2 * 40;
          tx += (dx / (dist || 1)) * f;
          ty += (dy / (dist || 1)) * f;
        }
        d.vx = (d.vx + (tx - d.x) * 0.09) * 0.78;
        d.vy = (d.vy + (ty - d.y) * 0.09) * 0.78;
        d.x += d.vx;
        d.y += d.vy;
        ctx.fillStyle = d.lime ? `rgba(200,240,74,${0.35 + e * 0.65})` : `rgba(239,235,227,${0.25 + e * 0.75})`;
        ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
      }
    };

    const loop = (time: number) => {
      draw(time);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    // Sampling the logo shape is deferred until the section is about to be seen.
    let built = false;
    const ensureBuilt = () => {
      if (built) return;
      built = true;
      build();
      if (reduce) {
        for (const d of dots) { d.x = d.tx; d.y = d.ty; }
        draw(0);
      }
    };
    const ro = new ResizeObserver(() => {
      if (!built) return;
      build();
      if (reduce) { for (const d of dots) { d.x = d.tx; d.y = d.ty; } draw(0); }
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) ensureBuilt();
      if (visible && !reduce) start();
    }, { rootMargin: '200px 0px' });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full" />;
}
