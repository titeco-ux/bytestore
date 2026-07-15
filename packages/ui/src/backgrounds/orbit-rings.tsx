import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   OrbitRings — the hero's rotating concentric-ring / molecular-orbit shape.
   Decorative SVG: N concentric rings (with an optional orbiting dot each) that
   slowly counter-rotate. Everything the shape exposes is configurable:
     size       — overall diameter in px
     opacity    — 0–1
     thickness  — stroke width in px (screen px, non-scaling)
     lineStyle  — 'solid' | 'dashed' | 'dotted'
     rings      — number of concentric rings (1–4)
     dots       — orbiting node dots on each ring
     animated   — rotate (gated on prefers-reduced-motion)
   ========================================================================== */

const VIEW = 200;
const CENTER = VIEW / 2;
const OUTER_R = 92;
const RING_STEP = 22;

export interface OrbitRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  opacity?: number;
  thickness?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  rings?: number;
  dots?: boolean;
  animated?: boolean;
  /** Stroke/dot colour (any CSS colour). Defaults to the brand yellow. */
  color?: string;
}

export const OrbitRings = React.forwardRef<HTMLDivElement, OrbitRingsProps>(
  (
    {
      size = 320,
      opacity = 1,
      thickness = 1.5,
      lineStyle = 'solid',
      rings = 3,
      dots = true,
      animated = true,
      color = '#F2B705',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const ringCount = Math.max(1, Math.min(rings, 4));
    const radii = Array.from({ length: ringCount }, (_, i) => OUTER_R - i * RING_STEP);

    const dashArray =
      lineStyle === 'dashed' ? '9 7' : lineStyle === 'dotted' ? `0.01 ${Math.max(thickness * 3, 6)}` : undefined;
    const lineCap = lineStyle === 'dotted' ? 'round' : 'butt';

    return (
      <div
        ref={ref}
        className={cn('pointer-events-none', className)}
        style={{ width: size, height: size, opacity, ...style }}
        aria-hidden="true"
        {...props}
      >
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} width="100%" height="100%" fill="none">
          {radii.map((r, i) => (
            <g
              key={i}
              className={animated ? 'motion-safe:animate-spin' : undefined}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animationDuration: `${42 - i * 8}s`,
                animationTimingFunction: 'linear',
                animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
              }}
            >
              <circle
                cx={CENTER}
                cy={CENTER}
                r={r}
                stroke={color}
                strokeWidth={thickness}
                strokeDasharray={dashArray}
                strokeLinecap={lineCap}
                vectorEffect="non-scaling-stroke"
              />
              {dots && <circle cx={CENTER} cy={CENTER - r} r={4} fill={color} stroke="none" />}
            </g>
          ))}
          <circle cx={CENTER} cy={CENTER} r={3.5} fill={color} stroke="none" />
        </svg>
      </div>
    );
  },
);
OrbitRings.displayName = 'OrbitRings';
