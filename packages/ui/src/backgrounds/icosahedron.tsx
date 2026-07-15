import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Icosahedron — the hero's pulsating wireframe icosahedron (12 vertices,
   30 edges). Rendered as a fixed 3/4-view SVG projection that gently pulses
   (and can slowly spin). Configurable:
     size       — overall diameter in px
     opacity    — 0–1
     thickness  — edge stroke width in px (non-scaling)
     lineStyle  — 'solid' | 'dashed' | 'dotted'
     vertices   — show vertex dots
     pulse      — breathing scale (the signature hero motion)
     spin       — slow rotation on top of the pulse
   ========================================================================== */

const PHI = (1 + Math.sqrt(5)) / 2;

// 12 icosahedron vertices (cyclic permutations of (0, ±1, ±φ)). Edge length = 2.
const RAW: number[][] = [
  [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
  [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
];

// Edges = vertex pairs whose squared distance ≈ 4 (the edge length).
const EDGES: Array<[number, number]> = [];
for (let i = 0; i < RAW.length; i++) {
  for (let j = i + 1; j < RAW.length; j++) {
    const dx = RAW[i][0] - RAW[j][0];
    const dy = RAW[i][1] - RAW[j][1];
    const dz = RAW[i][2] - RAW[j][2];
    if (Math.abs(dx * dx + dy * dy + dz * dz - 4) < 0.1) EDGES.push([i, j]);
  }
}

// Fixed 3/4 view: rotate around Y then X, orthographic-project to 2D.
const AY = 0.6;
const AX = -0.5;
const SCALE = 46;
const C = 100; // viewBox centre (0..200)

const V2D: Array<[number, number]> = RAW.map(([x, y, z]) => {
  const x1 = x * Math.cos(AY) + z * Math.sin(AY);
  const z1 = -x * Math.sin(AY) + z * Math.cos(AY);
  const y2 = y * Math.cos(AX) - z1 * Math.sin(AX);
  return [C + x1 * SCALE, C - y2 * SCALE];
});

export interface IcosahedronProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  opacity?: number;
  thickness?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  vertices?: boolean;
  pulse?: boolean;
  spin?: boolean;
  color?: string;
}

export const Icosahedron = React.forwardRef<HTMLDivElement, IcosahedronProps>(
  (
    {
      size = 320,
      opacity = 1,
      thickness = 1.5,
      lineStyle = 'solid',
      vertices = true,
      pulse = true,
      spin = false,
      color = '#F2B705',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const dashArray =
      lineStyle === 'dashed' ? '8 6' : lineStyle === 'dotted' ? `0.01 ${Math.max(thickness * 3, 6)}` : undefined;
    const lineCap = lineStyle === 'dotted' ? 'round' : 'butt';

    const spinStyle: React.CSSProperties = {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animationDuration: '48s',
      animationTimingFunction: 'linear',
    };
    const pulseStyle: React.CSSProperties = {
      transformBox: 'fill-box',
      transformOrigin: 'center',
    };

    return (
      <div
        ref={ref}
        className={cn('pointer-events-none', className)}
        style={{ width: size, height: size, opacity, ...style }}
        aria-hidden="true"
        {...props}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
          <g className={spin ? 'motion-safe:animate-spin' : undefined} style={spin ? spinStyle : undefined}>
            <g className={pulse ? 'motion-safe:animate-pulse-scale' : undefined} style={pulseStyle}>
              {EDGES.map(([a, b], i) => (
                <line
                  key={i}
                  x1={V2D[a][0]}
                  y1={V2D[a][1]}
                  x2={V2D[b][0]}
                  y2={V2D[b][1]}
                  stroke={color}
                  strokeWidth={thickness}
                  strokeDasharray={dashArray}
                  strokeLinecap={lineCap}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {vertices &&
                V2D.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={color} stroke="none" />)}
            </g>
          </g>
        </svg>
      </div>
    );
  },
);
Icosahedron.displayName = 'Icosahedron';
