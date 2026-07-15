import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   DottedMesh — the signature dot-grid background, drawn on canvas so the dots
   ripple like a wave. Each dot is offset by a travelling sine field, so the
   grid undulates rather than sliding as one block. Wrap content and the mesh
   sits behind it.

   variant   dots-light (light dots on dark, default) | dots-dark (on off-white)
   speed     slow | normal | fast
   gap       dot pitch in px (default 30)
   animated  run the wave (default true)
   ignoreReducedMotion  keep animating even if the OS asks to reduce motion
                        (used by the docs playground so the motion is visible)
   ========================================================================== */

const DOT = {
  'dots-light': { rgb: '252, 252, 252', alpha: 0.22 },
  'dots-dark': { rgb: '15, 17, 18', alpha: 0.16 },
} as const;

const SPEED = { slow: 0.5, normal: 1, fast: 2 } as const;

export interface DottedMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof DOT;
  speed?: keyof typeof SPEED;
  gap?: number;
  animated?: boolean;
  ignoreReducedMotion?: boolean;
  color?: string; // optional rgb override, e.g. "242, 183, 5"
  children?: React.ReactNode;
}

export const DottedMesh = React.forwardRef<HTMLDivElement, DottedMeshProps>(
  (
    {
      variant = 'dots-light',
      speed = 'normal',
      gap = 30,
      animated = true,
      ignoreReducedMotion = false,
      color,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const wrapRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const cfg = React.useRef({ variant, speed, gap, color });
    cfg.current = { variant, speed, gap, color };

    const setRefs = (el: HTMLDivElement | null) => {
      wrapRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    React.useEffect(() => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const run = animated && (ignoreReducedMotion || !reduce);

      let w = 0, h = 0, pxr = 1;
      function resize() {
        pxr = Math.min(window.devicePixelRatio || 1, 2);
        const r = wrap!.getBoundingClientRect();
        w = r.width;
        h = r.height;
        if (!w || !h) return;
        canvas!.width = Math.round(w * pxr);
        canvas!.height = Math.round(h * pxr);
        ctx!.setTransform(pxr, 0, 0, pxr, 0, 0);
      }

      function draw(t: number) {
        if (!w || !h) return;
        const c = cfg.current;
        const dot = DOT[c.variant];
        const g = c.gap;
        const amp = g * 0.34;
        const tt = (t * 0.001) * SPEED[c.speed];
        ctx!.clearRect(0, 0, w, h);
        ctx!.fillStyle = `rgba(${c.color ?? dot.rgb}, ${dot.alpha})`;
        for (let x = -g; x <= w + g; x += g) {
          const dy = Math.sin(tt + x * 0.028) * amp; // wave travelling in x
          for (let y = -g; y <= h + g; y += g) {
            const dx = Math.sin(tt * 0.8 + y * 0.028) * amp * 0.5;
            ctx!.beginPath();
            ctx!.arc(x + dx, y + dy, 1.5, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      resize();
      const onResize = () => {
        resize();
        if (!run) draw(0);
      };
      window.addEventListener('resize', onResize);
      const ro = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
      ro?.observe(wrap);

      let raf = 0;
      if (run) {
        const loop = (t: number) => {
          draw(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } else {
        draw(0);
      }

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        ro?.disconnect();
      };
    }, [animated, ignoreReducedMotion]);

    return (
      <div ref={setRefs} className={cn('relative overflow-hidden', className)} {...props}>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        {children != null && <div className="relative z-[1]">{children}</div>}
      </div>
    );
  },
);
DottedMesh.displayName = 'DottedMesh';
