const bytePreset = require('@bytenana/tokens/tailwind-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [bytePreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // Scan the UI package source so its component classes are generated.
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
