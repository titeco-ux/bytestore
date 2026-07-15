import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Workspace packages are consumed as source (no build step) via aliases so
// Vite transpiles them and Tailwind can scan their classes.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@bytenana/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
