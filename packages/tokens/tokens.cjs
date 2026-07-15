/* ==========================================================================
   ByteNana Design System — DESIGN TOKENS
   The single source of truth. Ported from the design-kit tokens.css.
   Consumed by the Tailwind preset (web) and, later, by React Native.
   ========================================================================== */

/** Brand color + layered dark surfaces + text/borders (dark-first). */
const colors = {
  // Brand yellow — CTAs, accents, highlights. Never body text on dark.
  primary: '#F2B705',
  'primary-dark': '#D4A004', // primary button hover
  'primary-light': '#F5C84A', // light tint, sparing
  'primary-glow': 'rgba(242, 183, 5, 0.15)', // focus-ring / glow fill

  // Backgrounds, layered darkest -> lightest: bg -> surface -> surface-2 -> surface-3
  bg: '#0F1112',
  surface: '#161A1C',
  'surface-2': '#1E2325',
  'surface-3': '#252A2D',
  light: '#FCFCFC', // off-white inverted-section background

  // Text (on dark)
  foreground: '#FCFCFC',
  muted: 'rgba(252, 252, 252, 0.55)', // body copy
  dim: 'rgba(252, 252, 252, 0.35)', // placeholders, legal, labels

  // Borders (on dark)
  border: 'rgba(252, 252, 252, 0.08)',
  'border-hover': 'rgba(242, 183, 5, 0.35)',

  // On-light equivalents (for .section--light contexts)
  'on-light': '#0F1112',
  'on-light-muted': 'rgba(15, 17, 18, 0.65)',
  'on-light-dim': 'rgba(15, 17, 18, 0.35)',
  'on-light-border': 'rgba(15, 17, 18, 0.10)',
};

const fontFamily = {
  heading: ['IBM Plex Sans', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
};

/** rem-based type scale. */
const fontSize = {
  xs: '0.75rem', // 12 — eyebrows, labels, legal
  sm: '0.875rem', // 14 — card body, nav, footer
  base: '1rem', // 16 — default body, inputs
  lg: '1.125rem', // 18 — section intros, subheads
  xl: '1.25rem', // 20 — h3, card/step titles
  '2xl': '1.5rem', // 24 — case h3
  '3xl': '1.875rem', // 30 — h2 mobile
  '4xl': '2.25rem', // 36 — h1 mobile, stat numbers
  '5xl': '3rem', // 48 — h1 tablet
  '6xl': '3.75rem', // 60 — h1 desktop
};

/** 8-pt spacing grid (extends Tailwind's default). */
const spacing = {
  section: '6rem', // 96 — default section padding
  navbar: '4.5rem', // 72 — navbar height
};

const borderRadius = {
  sm: '4px', // small tags
  DEFAULT: '8px', // buttons, inputs
  lg: '16px', // cards, navbar, modals
  xl: '24px',
};

const boxShadow = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.4)',
  md: '0 4px 16px rgba(0, 0, 0, 0.5)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.6)',
  primary: '0 4px 24px rgba(242, 183, 5, 0.25)', // yellow button glow
};

/** Signature spring-out ease + durations. */
const transitionTimingFunction = {
  byte: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

const transitionDuration = {
  fast: '200ms',
  base: '250ms',
  slow: '600ms',
};

const containers = {
  max: '1200px',
  narrow: '760px',
};

module.exports = {
  colors,
  fontFamily,
  fontSize,
  spacing,
  borderRadius,
  boxShadow,
  transitionTimingFunction,
  transitionDuration,
  containers,
};
