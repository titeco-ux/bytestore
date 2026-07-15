import * as React from 'react';
import {
  Badge,
  Heading,
  Text,
  Eyebrow,
  SectionLabel,
  Highlight,
} from '@bytenana/ui';

/* ==========================================================================
   Component registry — the single list that drives the sidebar + pages.
   Add a component = add an entry here (and its atom in packages/ui).
   ========================================================================== */

export type Category = 'Getting started' | 'Atoms' | 'Molecules';

export interface Demo {
  title: string;
  description?: string;
  /** Live element rendered in the preview canvas. */
  render: () => React.ReactNode;
  /** Source shown in the Code tab. */
  code: string;
  /** Preview canvas tone. Byte is dark-first, so default is dark. */
  tone?: 'dark' | 'light';
}

export interface DocEntry {
  slug: string;
  name: string;
  category: Category;
  status?: 'stable' | 'new' | 'wip';
  description: string;
  /** Import line shown near the top of the page. */
  importLine?: string;
  demos: Demo[];
}

/* ----------------------------------------------------------------- Overview */

const overview: DocEntry = {
  slug: 'overview',
  name: 'Overview',
  category: 'Getting started',
  description:
    'The ByteNana design system as a React component library. Dark-first, one brand yellow, IBM Plex Sans + Inter, built on shared design tokens. Copy-paste friendly, shadcn model.',
  demos: [
    {
      title: 'The look',
      description:
        'Dark base, a single yellow accent used surgically, and generous type. Every component below is built from the same tokens.',
      tone: 'dark',
      render: () => (
        <div className="flex max-w-xl flex-col gap-4 text-left">
          <Eyebrow>ByteNana design system</Eyebrow>
          <Heading level={2}>
            Senior US calibre. <Highlight>Half the cost.</Highlight>
          </Heading>
          <Text variant="muted" size="lg">
            One accent, layered dark surfaces, and a spring-like ease. Re-skin the
            whole system by editing tokens only.
          </Text>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge>Yellow accent</Badge>
            <Badge variant="secondary">Dark-first</Badge>
            <Badge variant="outline">8-pt grid</Badge>
          </div>
        </div>
      ),
      code: `import { Eyebrow, Heading, Text, Highlight, Badge } from '@bytenana/ui';

<Eyebrow>ByteNana design system</Eyebrow>
<Heading level={2}>
  Senior US calibre. <Highlight>Half the cost.</Highlight>
</Heading>
<Text variant="muted" size="lg">
  One accent, layered dark surfaces, and a spring-like ease.
</Text>
<Badge>Yellow accent</Badge>
<Badge variant="secondary">Dark-first</Badge>
<Badge variant="outline">8-pt grid</Badge>`,
    },
  ],
};

/* ---------------------------------------------------------------- Typography */

const typography: DocEntry = {
  slug: 'typography',
  name: 'Typography',
  category: 'Atoms',
  status: 'stable',
  description:
    'Heading, Text, Eyebrow, SectionLabel and the inline Highlight. Headings use IBM Plex Sans and scale up responsively; body copy uses Inter. <em> is repurposed as a non-italic yellow highlight.',
  importLine:
    "import { Heading, Text, Eyebrow, SectionLabel, Highlight } from '@bytenana/ui';",
  demos: [
    {
      title: 'Headings',
      description: 'Levels 1–4. Level 1 is 800 weight and scales 36 → 48 → 60.',
      render: () => (
        <div className="flex flex-col gap-4 text-left">
          <Heading level={1}>Heading level 1</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={3}>Heading level 3</Heading>
          <Heading level={4}>Heading level 4</Heading>
        </div>
      ),
      code: `<Heading level={1}>Heading level 1</Heading>
<Heading level={2}>Heading level 2</Heading>
<Heading level={3}>Heading level 3</Heading>
<Heading level={4}>Heading level 4</Heading>`,
    },
    {
      title: 'Text',
      description: 'Body copy. Variants default / muted / dim, sizes sm / base / lg.',
      render: () => (
        <div className="flex max-w-lg flex-col gap-3 text-left">
          <Text>Default body text in Inter, sized base.</Text>
          <Text variant="muted">Muted body copy — the workhorse for paragraphs.</Text>
          <Text variant="dim" size="sm">
            Dim, small — legal, captions, and quiet labels.
          </Text>
          <Text size="lg">Large lead paragraph for section intros.</Text>
        </div>
      ),
      code: `<Text>Default body text in Inter, sized base.</Text>
<Text variant="muted">Muted body copy — the workhorse for paragraphs.</Text>
<Text variant="dim" size="sm">Dim, small — legal, captions, quiet labels.</Text>
<Text size="lg">Large lead paragraph for section intros.</Text>`,
    },
    {
      title: 'Eyebrow, SectionLabel & Highlight',
      description:
        'Eyebrow is the yellow uppercase kicker; SectionLabel is the dim index; Highlight is the inline yellow emphasis.',
      render: () => (
        <div className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-2">
            <SectionLabel>01 — Process</SectionLabel>
            <Eyebrow>How it works</Eyebrow>
            <Heading level={3}>
              Ship with a <Highlight>senior team</Highlight> in days.
            </Heading>
          </div>
        </div>
      ),
      code: `<SectionLabel>01 — Process</SectionLabel>
<Eyebrow>How it works</Eyebrow>
<Heading level={3}>
  Ship with a <Highlight>senior team</Highlight> in days.
</Heading>`,
    },
  ],
};

/* --------------------------------------------------------------------- Badge */

const badge: DocEntry = {
  slug: 'badge',
  name: 'Badge',
  category: 'Atoms',
  status: 'stable',
  description:
    'A small tag / status chip. The default variant is the signature yellow fill with dark text; secondary, outline and muted cover quieter contexts.',
  importLine: "import { Badge } from '@bytenana/ui';",
  demos: [
    {
      title: 'Variants',
      description: 'default (yellow accent) · secondary · outline · muted.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      ),
      code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="muted">Muted</Badge>`,
    },
    {
      title: 'Sizes',
      description: 'sm · md (default) · lg.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      ),
      code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
    },
    {
      title: 'In context',
      description: 'Badges labelling a feature row.',
      render: () => (
        <div className="flex flex-col items-start gap-3 text-left">
          <div className="flex items-center gap-3">
            <Text weight="semibold">RAG pipeline</Text>
            <Badge>New</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Text weight="semibold">Legacy connector</Text>
            <Badge variant="muted">Deprecated</Badge>
          </div>
        </div>
      ),
      code: `<Text weight="semibold">RAG pipeline</Text>
<Badge>New</Badge>

<Text weight="semibold">Legacy connector</Text>
<Badge variant="muted">Deprecated</Badge>`,
    },
  ],
};

export const registry: DocEntry[] = [overview, typography, badge];

export const categoryOrder: Category[] = ['Getting started', 'Atoms', 'Molecules'];

export function findEntry(slug: string): DocEntry | undefined {
  return registry.find((e) => e.slug === slug);
}
