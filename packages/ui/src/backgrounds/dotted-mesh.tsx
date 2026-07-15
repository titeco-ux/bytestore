import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   DottedMesh — the signature drifting dot-grid, an exact port of the site's
   hero `.section-mesh`: TWO offset radial-gradient dot grids that drift
   together on the `mesh-wave` loop (0 → 14,-10 → 0,-22 → -14,-10 → 0 / 14s
   ease-in-out). The whole field sways as one — the same movement as the
   bytenana.tech hero.

   variant   dots-light (light dots on dark, default) | dots-dark (on off-white)
   speed     slow (22s) | normal (14s, the hero default) | fast (7s)
   gap       dot pitch in px (default 28, the hero value)
   animated  run the drift (default true)
   ignoreReducedMotion  keep drifting even if the OS asks to reduce motion
                        (used by the docs playground so the motion is visible)
   ========================================================================== */

const DOT_COLOR = {
  'dots-light': 'rgba(252, 252, 252, 0.10)',
  'dots-dark': 'rgba(15, 17, 18, 0.08)',
} as const;

const SPEED_DURATION: Record<'slow' | 'normal' | 'fast', string | undefined> = {
  slow: '22s',
  normal: undefined, // the class already carries the hero's 14s
  fast: '7s',
};

export interface DottedMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof DOT_COLOR;
  speed?: 'slow' | 'normal' | 'fast';
  gap?: number;
  animated?: boolean;
  ignoreReducedMotion?: boolean;
  /** Optional dot colour override (any CSS colour). */
  color?: string;
  children?: React.ReactNode;
}

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = React.useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

export const DottedMesh = React.forwardRef<HTMLDivElement, DottedMeshProps>(
  (
    {
      variant = 'dots-light',
      speed = 'normal',
      gap = 28,
      animated = true,
      ignoreReducedMotion = false,
      color,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const reduce = usePrefersReducedMotion();
    const run = animated && (ignoreReducedMotion || !reduce);
    const dot = color ?? DOT_COLOR[variant];
    const half = gap / 2;
    const duration = SPEED_DURATION[speed];

    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-20 will-change-transform',
            run && 'animate-mesh-wave',
          )}
          style={{
            backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1.5px), radial-gradient(circle, ${dot} 1px, transparent 1.5px)`,
            backgroundSize: `${gap}px ${gap}px, ${gap}px ${gap}px`,
            backgroundPosition: `0 0, ${half}px ${half}px`,
            ...(run && duration ? { animationDuration: duration } : null),
          }}
        />
        {children != null && <div className="relative z-[1]">{children}</div>}
      </div>
    );
  },
);
DottedMesh.displayName = 'DottedMesh';
