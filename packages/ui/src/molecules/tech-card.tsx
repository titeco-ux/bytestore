import * as React from 'react';
import { cn } from '../lib/cn';
import { Icon } from '../atoms/icon';

/* ==========================================================================
   TechCard — the site's tech-stack carousel slide. A dark surface card with a
   category title + description + tag chips on one side, and a floating
   "molecular hub" on the other: the category icon at the left, the tool icons
   fanned out to the right, gently drifting, joined by canvas bond lines.
   Ported from the kit's .steps-carousel--stack slide + [data-tech-hub].
   ========================================================================== */

const BOND = '242, 183, 5'; // brand yellow, rgb
const BAND = 190;

function TechHub({ icon, nodes }: { icon: string; nodes: string[] }) {
  const hubRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const centerRef = React.useRef<HTMLSpanElement>(null);
  const nodeRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const nodesKey = nodes.join(',');

  React.useEffect(() => {
    const hub = hubRef.current;
    const canvas = canvasRef.current;
    if (!hub || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = nodes.length;

    let w = 0, h = 0, cy = 0, pxr = 1;
    let base: Array<{ x: number; y: number }> = [];
    let EDG: number[][] = [];

    function layout() {
      base = [];
      const padX = Math.min(w * 0.12, 56);
      const left = padX;
      const right = w - padX;
      const amp = (Math.min(h, BAND) / 2) * 0.78;
      base.push({ x: left, y: cy }); // category icon, far left
      const gapStart = left + 78;
      const span = Math.max(0, right - gapStart);
      for (let i = 0; i < N; i++) {
        const t = N === 1 ? 0.5 : i / (N - 1);
        const x = N === 1 ? (gapStart + right) / 2 : gapStart + t * span;
        const y = cy + (i % 2 === 0 ? -1 : 1) * amp;
        base.push({ x, y });
      }
      EDG = [[0, 1]];
      for (let i = 1; i < N; i++) EDG.push([i, i + 1]);
      if (N >= 3) EDG.push([0, 2]);
    }

    function resize() {
      pxr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hub!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      canvas!.width = Math.round(w * pxr);
      canvas!.height = Math.round(h * pxr);
      ctx!.setTransform(pxr, 0, 0, pxr, 0, 0);
      cy = h / 2;
      layout();
    }

    const pos: number[][] = [];
    function frame(t: number) {
      if (w && h && base.length) {
        for (let i = 0; i < base.length; i++) {
          const ph = i * 1.7;
          pos[i] = [
            base[i].x + Math.sin(t * 0.0009 + ph) * 5,
            base[i].y + Math.cos(t * 0.0011 + ph) * 6,
          ];
        }
        if (centerRef.current) {
          centerRef.current.style.left = `${pos[0][0]}px`;
          centerRef.current.style.top = `${pos[0][1]}px`;
        }
        for (let i = 0; i < N; i++) {
          const el = nodeRefs.current[i];
          if (el && pos[i + 1]) {
            el.style.left = `${pos[i + 1][0]}px`;
            el.style.top = `${pos[i + 1][1]}px`;
          }
        }
        ctx!.clearRect(0, 0, w, h);
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = 'round';
        ctx!.setLineDash([]);
        ctx!.strokeStyle = `rgba(${BOND}, 0.5)`;
        EDG.forEach(([ai, bi]) => {
          const a = pos[ai];
          const b = pos[bi];
          if (!a || !b) return;
          ctx!.beginPath();
          ctx!.moveTo(a[0], a[1]);
          ctx!.lineTo(b[0], b[1]);
          ctx!.stroke();
        });
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    resize();
    const onResize = () => {
      resize();
      if (reduce) frame(0);
    };
    window.addEventListener('resize', onResize);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
    ro?.observe(hub);
    if (reduce) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon, nodesKey]);

  const dot =
    'absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[10px] border bg-bg leading-none';

  return (
    <div ref={hubRef} className="relative min-h-[240px] w-full md:min-h-[300px]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <span
        ref={centerRef}
        className={cn(dot, 'z-10 h-[56px] w-[56px] rounded-full border-primary/60 bg-primary/10 text-[30px] text-primary')}
      >
        <Icon icon={icon} />
      </span>
      {nodes.map((n, i) => (
        <span
          key={`${n}-${i}`}
          ref={(el) => (nodeRefs.current[i] = el)}
          className={cn(dot, 'h-[38px] w-[38px] border-primary/45 text-[19px] text-primary')}
        >
          <Icon icon={n} />
        </span>
      ))}
    </div>
  );
}

export interface TechCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category icon (Iconify) shown in the title and at the hub centre. */
  icon: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Pill chips (tech names). */
  tags?: string[];
  /** Iconify names for the tool nodes fanned across the hub. */
  nodes: string[];
}

export const TechCard = React.forwardRef<HTMLDivElement, TechCardProps>(
  ({ icon, title, description, tags = [], nodes, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center gap-6 rounded-lg border border-border bg-surface p-8 text-center md:flex-row md:gap-10 md:text-left',
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-4 md:w-auto md:max-w-[320px] md:flex-none md:items-start">
        <h3 className="inline-flex items-center gap-3 font-heading text-xl font-bold text-foreground">
          <Icon icon={icon} className="text-2xl text-primary" />
          {title}
        </h3>
        {description && (
          <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{description}</p>
        )}
        {tags.length > 0 && (
          <ul className="flex list-none flex-wrap justify-center gap-2 p-0 md:justify-start">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-heading text-sm font-semibold text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full md:flex-1">
        <TechHub icon={icon} nodes={nodes} />
      </div>
    </div>
  ),
);
TechCard.displayName = 'TechCard';
