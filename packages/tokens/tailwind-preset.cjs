/* ==========================================================================
   ByteNana tokens -> Tailwind preset.
   Drop into any Tailwind config's `presets: [...]` and the whole Byte
   palette/type/spacing/motion becomes available as utilities
   (bg-primary, text-muted, rounded-lg, ease-byte, shadow-primary, ...).
   ========================================================================== */
const t = require('./tokens.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: t.colors,
      fontFamily: t.fontFamily,
      fontSize: t.fontSize,
      spacing: t.spacing,
      borderRadius: t.borderRadius,
      boxShadow: t.boxShadow,
      transitionTimingFunction: t.transitionTimingFunction,
      transitionDuration: t.transitionDuration,
      keyframes: t.keyframes,
      animation: t.animation,
      maxWidth: {
        container: t.containers.max,
        'container-narrow': t.containers.narrow,
      },
    },
  },
};
