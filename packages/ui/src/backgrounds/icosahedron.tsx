import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Icosahedron — the hero's tumbling wireframe icosahedron (canvas).
   Faithful port of the site's `data-globe data-shape="ico"` renderer:
   12 vertices / 20 faces spun on a yaw + fixed tilt, orthographically
   projected. Silhouette edges draw thick + solid with a glow; interior edges
   dashed; hidden edges faint-dashed; front faces tint at 10%. The container
   can also "breathe" (pulse). Center content (e.g. a logo) via children.

   Configurable: size, opacity, thickness (silhouette edge px), radius,
   speed, faceFill, vertices (dots), dashedHidden, pulse, animated, color.
   ========================================================================== */

const PHI = (1 + Math.sqrt(5)) / 2;
const NRM = Math.hypot(1, PHI, 0);

// 12 icosahedron vertices, normalised to the unit sphere.
const V: number[][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map((v) => [v[0] / NRM, v[1] / NRM, v[2] / NRM]);

// 20 CCW faces.
const F: number[][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

// Unique edges, each tagged with its two adjacent face indices.
interface Edge {
  a: number;
  b: number;
  faces: number[];
}
const E: Edge[] = (() => {
  const map = new Map<string, Edge>();
  F.forEach((f, fi) => {
    for (let i = 0; i < 3; i++) {
      const a = f[i];
      const b = f[(i + 1) % 3];
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (!map.has(key)) map.set(key, { a: Math.min(a, b), b: Math.max(a, b), faces: [] });
      map.get(key)!.faces.push(fi);
    }
  });
  return Array.from(map.values());
})();

const TILT = 0.4; // fixed pitch so the 3D form reads
const STATIC_YAW = 0.6; // pleasing angle when not animating

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const int = parseInt(full, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

export interface IcosahedronProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  opacity?: number;
  /** Silhouette edge width in px (interior/hidden edges scale from this). */
  thickness?: number;
  /** Sphere radius as a fraction of the canvas (0.2–0.5). */
  radius?: number;
  /** Yaw speed in radians per millisecond. */
  speed?: number;
  /** Tint front faces at 10%. */
  faceFill?: boolean;
  /** Draw dots on the 12 vertices. */
  vertices?: boolean;
  /** Dash the interior + hidden edges (faithful). Off = all solid. */
  dashedHidden?: boolean;
  /** Breathing scale on the container. */
  pulse?: boolean;
  /** Rotate (gated on prefers-reduced-motion). */
  animated?: boolean;
  color?: string;
  /** Centered content, e.g. a logo. */
  children?: React.ReactNode;
}

export const Icosahedron = React.forwardRef<HTMLDivElement, IcosahedronProps>((props, ref) => {
  const {
    size = 360,
    opacity = 1,
    thickness = 2.6,
    radius = 0.4,
    speed = 0.00018,
    faceFill = true,
    vertices = false,
    dashedHidden = true,
    pulse = true,
    animated = true,
    color = '#F2B705',
    className,
    style,
    children,
    ...rest
  } = props;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const drawRef = React.useRef<(t: number) => void>(() => {});

  // Live params (read each frame) so slider tweaks don't restart the loop.
  const cfg = React.useRef({ thickness, radius, speed, faceFill, vertices, dashedHidden, color });
  cfg.current = { thickness, radius, speed, faceFill, vertices, dashedHidden, color };

  const setRefs = (el: HTMLDivElement | null) => {
    wrapRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, cx = 0, cy = 0, pxr = 1;
    const rot: number[][] = [];

    function resize() {
      pxr = Math.min(window.devicePixelRatio || 1, 2);
      const r = wrap!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      if (!w || !h) return;
      canvas!.width = Math.round(w * pxr);
      canvas!.height = Math.round(h * pxr);
      ctx!.setTransform(pxr, 0, 0, pxr, 0, 0);
      cx = w / 2;
      cy = h / 2;
    }

    function draw(t: number) {
      if (!w || !h) return;
      const c = cfg.current;
      const bond = hexToRgb(c.color);
      const R = Math.min(w, h) * c.radius;
      const ay = animated && !reduce ? t * c.speed : STATIC_YAW;
      const cYaw = Math.cos(ay), sYaw = Math.sin(ay);
      const cT = Math.cos(TILT), sT = Math.sin(TILT);

      for (let i = 0; i < V.length; i++) {
        const v = V[i];
        const x1 = v[0] * cYaw + v[2] * sYaw;
        const z1 = -v[0] * sYaw + v[2] * cYaw;
        const y1 = v[1] * cT - z1 * sT;
        const z2 = v[1] * sT + z1 * cT;
        rot[i] = [x1, y1, z2];
      }
      const P = rot.map((v) => [cx + v[0] * R, cy - v[1] * R, v[2]]);
      const nz = F.map((f) => {
        const A = rot[f[0]], B = rot[f[1]], C = rot[f[2]];
        return (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
      });
      const front = nz.map((z) => z > 0);

      ctx!.clearRect(0, 0, w, h);

      // Front faces at 10%.
      if (c.faceFill) {
        ctx!.setLineDash([]);
        F.forEach((f, fi) => {
          if (!front[fi]) return;
          ctx!.beginPath();
          ctx!.moveTo(P[f[0]][0], P[f[0]][1]);
          ctx!.lineTo(P[f[1]][0], P[f[1]][1]);
          ctx!.lineTo(P[f[2]][0], P[f[2]][1]);
          ctx!.closePath();
          ctx!.fillStyle = `rgba(${bond}, 0.10)`;
          ctx!.fill();
        });
      }

      // Edges: silhouette solid+glow, interior/hidden (optionally) dashed.
      ctx!.lineJoin = 'round';
      ctx!.lineCap = 'round';
      const th = c.thickness;
      E.forEach((e) => {
        const fc = e.faces.reduce((n, fi) => n + (front[fi] ? 1 : 0), 0);
        const a = P[e.a], b = P[e.b];
        if (fc === 1) {
          ctx!.setLineDash([]);
          ctx!.lineWidth = th;
          ctx!.strokeStyle = `rgba(${bond}, 1)`;
          ctx!.shadowColor = `rgba(${bond}, 0.9)`;
          ctx!.shadowBlur = 8;
        } else if (fc === 2) {
          ctx!.setLineDash(c.dashedHidden ? [6, 5] : []);
          ctx!.lineWidth = th * 0.54;
          ctx!.strokeStyle = `rgba(${bond}, 0.7)`;
          ctx!.shadowBlur = 0;
        } else {
          ctx!.setLineDash(c.dashedHidden ? [4, 6] : []);
          ctx!.lineWidth = th * 0.46;
          ctx!.strokeStyle = `rgba(${bond}, 0.32)`;
          ctx!.shadowBlur = 0;
        }
        ctx!.beginPath();
        ctx!.moveTo(a[0], a[1]);
        ctx!.lineTo(b[0], b[1]);
        ctx!.stroke();
      });
      ctx!.shadowBlur = 0;
      ctx!.setLineDash([]);

      // Vertex dots (depth-faded).
      if (c.vertices) {
        for (let i = 0; i < P.length; i++) {
          const depth = (rot[i][2] + 1) / 2; // 0 (back) → 1 (front)
          ctx!.beginPath();
          ctx!.arc(P[i][0], P[i][1], 2 + depth * 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${bond}, ${(0.3 + 0.7 * depth).toFixed(3)})`;
          ctx!.fill();
        }
      }
    }

    drawRef.current = draw;
    resize();

    const onResize = () => {
      resize();
      if (!animated || reduce) draw(0);
    };
    window.addEventListener('resize', onResize);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
    ro?.observe(wrap);

    let raf = 0;
    if (animated && !reduce) {
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
  }, [animated]);

  // Redraw a single frame when params change while not animating.
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animated || reduce) drawRef.current(0);
  });

  return (
    <div
      ref={setRefs}
      className={cn(
        'pointer-events-none relative',
        pulse && animated && 'motion-safe:animate-pulse-scale',
        className,
      )}
      style={{ width: size, height: size, opacity, transformOrigin: 'center', ...style }}
      aria-hidden="true"
      {...rest}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      )}
    </div>
  );
});
Icosahedron.displayName = 'Icosahedron';
