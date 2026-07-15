# Bytestore

The **ByteNana design system** as a React component library, plus a live documentation site.

Dark-first, yellow-accented, built on the [ByteNana design kit](https://nearshore.bytenana.tech)
tokens. Web-first (shadcn model: Radix + Tailwind + CVA); React Native is a planned later layer
that reuses the same tokens.

## Structure

```
packages/
  tokens/   Design tokens — the single source of truth (colors, type, spacing, radius, motion).
            Exposed as a JS object, a Tailwind preset, and a CSS-variables file.
  ui/       Web component library. Atomic design: atoms → molecules → organisms.
apps/
  docs/     Light-themed documentation site (Vite + React). Left nav, live previews, source code.
```

## Develop

```bash
npm install        # from repo root (npm workspaces)
npm run dev        # start the docs site on http://localhost:5173
```

## Design language

- **Mode:** dark-first (`#0F1112`), single brand yellow `#F2B705` used surgically.
- **Fonts:** IBM Plex Sans (headings) · Inter (body).
- **Grid:** 8-pt spacing, 8px radius on controls / 16px on cards.
- **Signature ease:** `cubic-bezier(0.22, 1, 0.36, 1)`.

To re-skin, edit `packages/tokens` only — everything cascades.

## Roadmap

- [x] Tokens package + Tailwind preset
- [x] Atoms: Typography, Badge
- [ ] Atoms: Button, Input, Card
- [ ] Molecules, organisms
- [ ] `npx bytestore add <component>` copy-paste CLI (once the atom set stabilizes)
- [ ] `packages/ui-native` (React Native, same tokens)
