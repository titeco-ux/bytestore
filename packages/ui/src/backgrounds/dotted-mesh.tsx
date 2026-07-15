import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   DottedMesh — the signature drifting dot-grid background.
   Wrap content and it renders an animated dotted layer behind it. Two offset
   radial-gradient grids drift on the mesh-wave keyframe (gated on
   prefers-reduced-motion). Ported from the kit's .section-mesh.

   variant:
     dots-light = light dots (for dark surfaces) — default
     dots-dark  = dark dots (for off-white surfaces)
   ========================================================================== */

const DOT_COLOR = {
  'dots-light': 'rgba(252, 252, 252, 0.10)',
  'dots-dark': 'rgba(15, 17, 18, 0.08)',
} as const;

export interface DottedMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dot colour: light dots on dark (default) or dark dots on light. */
  variant?: keyof typeof DOT_COLOR;
  /** Disable the drift animation (static grid). */
  animated?: boolean;
  children?: React.ReactNode;
}

export const DottedMesh = React.forwardRef<HTMLDivElement, DottedMeshProps>(
  ({ variant = 'dots-light', animated = true, className, children, ...props }, ref) => {
    const color = DOT_COLOR[variant];
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-20 will-change-transform',
            animated && 'animate-mesh-wave motion-reduce:animate-none',
          )}
          style={{
            backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1.5px), radial-gradient(circle, ${color} 1px, transparent 1.5px)`,
            backgroundSize: '28px 28px, 28px 28px',
            backgroundPosition: '0 0, 14px 14px',
          }}
        />
        {children != null && <div className="relative z-[1]">{children}</div>}
      </div>
    );
  },
);
DottedMesh.displayName = 'DottedMesh';
