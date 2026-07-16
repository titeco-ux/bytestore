import * as React from 'react';
import { IcosahedronPlayground } from './playgrounds/IcosahedronPlayground';
import { DottedMeshPlayground } from './playgrounds/DottedMeshPlayground';
import { CodeBlock } from './components/CodeBlock';
import {
  Badge,
  Button,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  Carousel,
  Container,
  DottedMesh,
  Eyebrow,
  FormField,
  Heading,
  Highlight,
  Icon,
  Input,
  Label,
  ProjectCard,
  Section,
  SectionLabel,
  Separator,
  Text,
  Textarea,
  Timeline,
  TimelineStep,
} from '@bytenana/ui';

/* ==========================================================================
   Component registry — the single list that drives the sidebar + pages.
   Add a component = add an atom/molecule in packages/ui + an entry here.
   ========================================================================== */

/** Top-level collapsible groups in the sidebar. */
export type Drawer = 'Design System' | 'All Components';

export type Category =
  | 'Getting started'
  | 'Atoms'
  | 'Molecules'
  | 'Components'
  | 'Cards';

/** Drawers that list their items flat (no category sub-headers). */
export const FLAT_DRAWERS: Drawer[] = ['All Components'];

export interface Demo {
  title: string;
  description?: string;
  render: () => React.ReactNode;
  code: string;
  /** Framework-free (HTML/CSS/JS, byte_design_kit classes) equivalent. Shows a
      React / HTML CSS toggle in the Code panel when set. */
  codeHtml?: string;
  /** Preview canvas tone. Byte is dark-first, so default is dark. */
  tone?: 'dark' | 'light';
  /** Fill the preview panel edge-to-edge (no padding). */
  flush?: boolean;
}

export interface DocEntry {
  slug: string;
  name: string;
  category: Category;
  /** Which sidebar drawer this lives under. Defaults to 'Design System'. */
  drawer?: Drawer;
  status?: 'stable' | 'new' | 'wip';
  description: string;
  importLine?: string;
  demos: Demo[];
  /** Long-form documentation body (rendered instead of demos). */
  body?: () => React.ReactNode;
}

/* ========================================================== Getting started */

/* ------------------------------------------------------- doc prose helpers */

function DocH2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="mt-4 font-heading text-2xl font-bold text-on-light" {...props} />;
}
function DocP(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="max-w-2xl leading-relaxed text-on-light-muted" {...props} />;
}
function DocCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-on-light">
      {children}
    </code>
  );
}

const gettingStarted: DocEntry = {
  slug: 'getting-started',
  name: 'Getting Started',
  category: 'Getting started',
  description:
    'How to use the ByteNana design system in a React app — install the packages, wire up the Tailwind preset and fonts, then compose components.',
  demos: [],
  body: () => (
    <>
      <DocH2>1. Install</DocH2>
      <DocP>
        Bytestore is an npm-workspaces monorepo. Apps consume two packages:{' '}
        <DocCode>@bytenana/tokens</DocCode> (design tokens — the single source of truth) and{' '}
        <DocCode>@bytenana/ui</DocCode> (the React components). From the repo root:
      </DocP>
      <CodeBlock language="bash" code={`npm install\nnpm run dev   # docs site on http://localhost:5173`} />

      <DocH2>2. Add the Tailwind preset</DocH2>
      <DocP>
        The whole palette, type scale, spacing, radii and motion are exposed as a Tailwind preset,
        so utilities like <DocCode>bg-primary</DocCode>, <DocCode>text-muted</DocCode>,{' '}
        <DocCode>rounded-lg</DocCode> and <DocCode>ease-byte</DocCode> resolve to Byte values.
      </DocP>
      <CodeBlock
        language="javascript"
        code={`// tailwind.config.cjs
const bytePreset = require('@bytenana/tokens/tailwind-preset');

module.exports = {
  presets: [bytePreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@bytenana/ui/src/**/*.{ts,tsx}',
  ],
};`}
      />

      <DocH2>3. Load the fonts + icons</DocH2>
      <DocP>
        Headings use IBM Plex Sans, body uses Inter. The <DocCode>Icon</DocCode> component renders
        Iconify's web component, so load its script once.
      </DocP>
      <CodeBlock
        language="html"
        code={`<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet" />
<script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>`}
      />

      <DocH2>4. Use a component</DocH2>
      <DocP>Import from the barrel and compose. Everything is dark-first.</DocP>
      <CodeBlock
        code={`import { Section, Container, Eyebrow, Heading, Text, Button } from '@bytenana/ui';

export function Hero() {
  return (
    <Section tone="dark">
      <Container className="text-center">
        <Eyebrow>ByteNana</Eyebrow>
        <Heading level={1}>Ship with a senior team</Heading>
        <Text variant="muted" size="lg">Senior US calibre. Half the cost.</Text>
        <Button>Book a call</Button>
      </Container>
    </Section>
  );
}`}
      />

      <DocH2>5. The section rhythm</DocH2>
      <DocP>
        Alternate <DocCode>Section</DocCode> tones: a dark base, off-white bands, and exactly one
        yellow <DocCode>brand</DocCode> interrupt per page.
      </DocP>
      <CodeBlock
        code={`<Section tone="dark">…</Section>
<Section tone="light">…</Section>
<Section tone="brand">…</Section>   {/* one per page */}`}
      />

      <DocH2>6. Backgrounds</DocH2>
      <DocP>Wrap content in a background motif — the drifting mesh or the tumbling icosahedron.</DocP>
      <CodeBlock
        code={`import { DottedMesh, Icosahedron } from '@bytenana/ui';

<DottedMesh className="bg-bg p-24">
  <YourSection />
</DottedMesh>`}
      />

      <DocH2>7. Add your own component</DocH2>
      <DocP>
        Three steps: create the atom/molecule in <DocCode>packages/ui/src</DocCode>, export it from{' '}
        <DocCode>src/index.ts</DocCode>, then add an entry to{' '}
        <DocCode>apps/docs/src/registry.tsx</DocCode> so it appears in this sidebar with a live
        preview and code.
      </DocP>

      <DocH2>Design principles</DocH2>
      <DocP>
        Dark-first (<DocCode>#0F1112</DocCode>). One brand yellow (<DocCode>#F2B705</DocCode>) used
        surgically — never as body text on dark. 8-pt spacing grid. 8px radius on controls, 16px on
        cards. The signature spring ease is <DocCode>cubic-bezier(0.22, 1, 0.36, 1)</DocCode>. Every
        animation respects <DocCode>prefers-reduced-motion</DocCode>. To re-skin the whole system,
        edit <DocCode>@bytenana/tokens</DocCode> only.
      </DocP>
    </>
  ),
};

const cssJs: DocEntry = {
  slug: 'css-js',
  name: 'CSS & JS',
  category: 'Getting started',
  description:
    'Prefer plain HTML/CSS/JS? Every component has a framework-free equivalent — the byte_design_kit classes, no build step. The Code tab on each component page has a React / HTML CSS toggle showing both.',
  demos: [],
  body: () => (
    <>
      <DocP>
        The React library and the framework-free kit are two faces of the <strong>same design
        system</strong> — they share the exact same tokens, so a <DocCode>.btn-primary</DocCode>{' '}
        and a <DocCode>&lt;Button&gt;</DocCode> look identical. Use whichever fits the project:
        React for apps, plain HTML/CSS/JS for static sites and drop-ins.
      </DocP>

      <DocH2>1. Include the stylesheets + scripts</DocH2>
      <DocP>
        No build step. Load the tokens, base and components CSS in order, then Iconify and the
        interactions script. (Add <DocCode>work.css</DocCode> for case-study components like
        ProjectCard and Timeline.)
      </DocP>
      <CodeBlock
        language="html"
        code={`<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/work.css">   <!-- case-study components -->

<script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>
<script src="js/animations.js"></script>       <!-- carousels, globe, forms, nav -->`}
      />

      <DocH2>2. Use the documented classes</DocH2>
      <DocP>
        Each component page has a <strong>React / HTML CSS</strong> toggle in its Code tab — flip
        it to copy the framework-free markup. A quick map:
      </DocP>
      <CodeBlock
        language="html"
        code={`Button      → <a class="btn btn-primary">…</a>
Typography  → <h1>…</h1> · <p class="eyebrow"> · <em> (yellow highlight)
Card        → <div class="card card--invert">…</div>
Form        → <div class="form-group"><label><input></div>
Section     → <section class="section--light | section--brand">
Dotted mesh → <section class="section-mesh">
Icosahedron → <div class="cta-hub" data-globe data-shape="ico">
ProjectCard → <a class="work-feature">   Timeline → <ol class="arch-flow">
Carousel    → <div class="steps-carousel steps-carousel--slide">`}
      />

      <DocH2>3. Re-skin the same way</DocH2>
      <DocP>
        Edit <DocCode>tokens.css</DocCode> (the CSS-variable mirror of{' '}
        <DocCode>@bytenana/tokens</DocCode>) — colours, fonts, spacing all cascade. Keep the two
        token files in sync so React and CSS/JS never drift.
      </DocP>

      <DocP>
        The full framework-free kit (with <DocCode>starter.html</DocCode> and{' '}
        <DocCode>case-study.html</DocCode> templates) ships in the{' '}
        <DocCode>byte_design_kit</DocCode> skill — see the Skill page.
      </DocP>
    </>
  ),
};

const skillPage: DocEntry = {
  slug: 'skill',
  name: 'Skill',
  category: 'Getting started',
  description:
    'The byte_design_kit skill packages this whole system for AI agents (Claude Code). Ask for "the Byte look" and it scaffolds or drops the system in — as the framework-free kit or, for React, as Bytestore.',
  demos: [],
  body: () => (
    <>
      <DocH2>What it is</DocH2>
      <DocP>
        <DocCode>byte_design_kit</DocCode> is a Claude Code skill: a portable, dark-first,
        yellow-accented design system extracted from the ByteNana site. It ships the tokens,
        components and signature animations, and teaches the agent how to build with them.
      </DocP>

      <DocH2>When it triggers</DocH2>
      <DocP>
        Mentions of “ByteNana design”, “the Byte look”, “byte design kit”, reusing the landing-page
        style, or building a site that should match nearshore.bytenana.tech.
      </DocP>

      <DocH2>Modes</DocH2>
      <DocP>
        <strong>Build</strong> — scaffold a new site/landing page from the system.{' '}
        <strong>Apply</strong> — drop the system into an existing project.{' '}
        <strong>React (§5)</strong> — for React/Next apps, use the <strong>Bytestore</strong>{' '}
        component library (this repo) instead of hand-porting HTML — same tokens, same look.
      </DocP>

      <DocH2>Where it lives</DocH2>
      <DocP>
        Skill source: <DocCode>github.com/ByteNana/The-Byte-EngiNana</DocCode> (branch{' '}
        <DocCode>byte_design_kit</DocCode>) — <DocCode>SKILL.md</DocCode> (agent instructions),{' '}
        <DocCode>reference.md</DocCode> (full catalog, incl. §12 the React library), and{' '}
        <DocCode>assets/</DocCode> (the ready-to-use css/js). The React library is this repo,{' '}
        <DocCode>github.com/titeco-ux/bytestore</DocCode>.
      </DocP>

      <DocH2>Hard rules it enforces</DocH2>
      <DocP>
        Edit tokens to re-skin (never hard-code). Dark base, off-white bands, exactly one yellow
        interrupt per page. Yellow is never body text on dark. Every animation respects
        prefers-reduced-motion. Keep the React tokens and the kit's <DocCode>tokens.css</DocCode>{' '}
        in sync.
      </DocP>
    </>
  ),
};

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
        'Dark base, a single yellow accent used surgically, generous type. Every component below is built from the same tokens.',
      tone: 'dark',
      render: () => (
        <div className="flex max-w-xl flex-col gap-4 text-left">
          <Eyebrow>ByteNana design system</Eyebrow>
          <Heading level={2}>
            Senior US calibre. <Highlight>Half the cost.</Highlight>
          </Heading>
          <Text variant="muted" size="lg">
            One accent, layered dark surfaces, and a spring-like ease. Re-skin the whole
            system by editing tokens only.
          </Text>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge>Yellow accent</Badge>
            <Badge variant="secondary">Dark-first</Badge>
            <Badge variant="outline">8-pt grid</Badge>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button>Book a call</Button>
            <Button variant="secondary">See how we work</Button>
          </div>
        </div>
      ),
      code: `import { Eyebrow, Heading, Text, Highlight, Badge, Button } from '@bytenana/ui';

<Eyebrow>ByteNana design system</Eyebrow>
<Heading level={2}>
  Senior US calibre. <Highlight>Half the cost.</Highlight>
</Heading>
<Text variant="muted" size="lg">One accent, layered dark surfaces, a spring-like ease.</Text>
<Badge>Yellow accent</Badge>
<Button>Book a call</Button>
<Button variant="secondary">See how we work</Button>`,
    },
  ],
};

/* ===================================================================== Atoms */

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
      codeHtml: `<!-- headings are styled by base.css — just use the tags -->
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>`,
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
        'Eyebrow is the yellow uppercase kicker; SectionLabel the dim index; Highlight the inline yellow emphasis.',
      render: () => (
        <div className="flex flex-col gap-2 text-left">
          <SectionLabel>01 — Process</SectionLabel>
          <Eyebrow>How it works</Eyebrow>
          <Heading level={3}>
            Ship with a <Highlight>senior team</Highlight> in days.
          </Heading>
        </div>
      ),
      code: `<SectionLabel>01 — Process</SectionLabel>
<Eyebrow>How it works</Eyebrow>
<Heading level={3}>
  Ship with a <Highlight>senior team</Highlight> in days.
</Heading>`,
      codeHtml: `<p class="section-label">01 — Process</p>
<p class="eyebrow">How it works</p>
<h3>Ship with a <em>senior team</em> in days.</h3>
<!-- <em> is repurposed as the inline yellow highlight -->`,
    },
  ],
};

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
      codeHtml: `<!-- The kit has no badge class; this is the minimal CSS+HTML -->
<style>
  .badge { display:inline-flex; align-items:center; border-radius:var(--radius-sm);
    padding:.25rem .625rem; font-size:var(--text-xs); font-weight:500; line-height:1; }
  .badge--default   { background:var(--color-primary); color:var(--color-bg); }
  .badge--secondary { background:var(--color-surface-2); color:var(--color-text); }
  .badge--outline   { border:1px solid var(--color-border); color:var(--color-text); }
</style>
<span class="badge badge--default">Default</span>
<span class="badge badge--secondary">Secondary</span>
<span class="badge badge--outline">Outline</span>`,
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
  ],
};

const button: DocEntry = {
  slug: 'button',
  name: 'Button',
  category: 'Atoms',
  status: 'stable',
  description:
    'primary is the yellow fill with a glow on hover; secondary is a bordered ghost that turns yellow on hover. Sizes sm / md, an optional full width, and `asChild` to render as a link.',
  importLine: "import { Button } from '@bytenana/ui';",
  demos: [
    {
      title: 'Variants',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button>Book a call</Button>
          <Button variant="secondary">See how we work</Button>
        </div>
      ),
      code: `<Button>Book a call</Button>
<Button variant="secondary">See how we work</Button>`,
      codeHtml: `<!-- byte_design_kit classes (tokens.css + base.css + components.css) -->
<a class="btn btn-primary" href="#book">Book a call</a>
<a class="btn btn-secondary" href="#work">See how we work</a>

<!-- sizes: add .btn-sm · full width: add .btn-full -->`,
    },
    {
      title: 'Sizes & full width',
      render: () => (
        <div className="flex w-full max-w-sm flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
          </div>
          <Button full>Full width</Button>
        </div>
      ),
      code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button full>Full width</Button>`,
    },
    {
      title: 'As a link (asChild)',
      description: 'Render the button styles on any element — here an anchor.',
      render: () => (
        <Button asChild variant="secondary">
          <a href="#/button">Anchor button →</a>
        </Button>
      ),
      code: `<Button asChild variant="secondary">
  <a href="/contact">Anchor button →</a>
</Button>`,
    },
  ],
};

const icon: DocEntry = {
  slug: 'icon',
  name: 'Icon',
  category: 'Atoms',
  status: 'stable',
  description:
    'A thin wrapper over Iconify (<iconify-icon>). Color and size are inherited from className (e.g. text-primary, text-2xl). Load the iconify-icon script once (see the docs <head>).',
  importLine: "import { Icon } from '@bytenana/ui';",
  demos: [
    {
      title: 'Colour & size by className',
      render: () => (
        <div className="flex items-center gap-6 text-primary">
          <Icon icon="mdi:rocket-launch-outline" className="text-xl" />
          <Icon icon="mdi:brain" className="text-3xl" />
          <Icon icon="mdi:shield-check-outline" className="text-4xl" />
          <Icon icon="mdi:cash-multiple" className="text-4xl text-foreground" />
        </div>
      ),
      code: `<Icon icon="mdi:rocket-launch-outline" className="text-xl text-primary" />
<Icon icon="mdi:brain" className="text-3xl text-primary" />
<Icon icon="mdi:shield-check-outline" className="text-4xl text-primary" />
<Icon icon="mdi:cash-multiple" className="text-4xl text-foreground" />`,
      codeHtml: `<!-- load once: https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js -->
<iconify-icon icon="mdi:rocket-launch-outline"
  style="color:var(--color-primary);font-size:1.25rem"></iconify-icon>
<iconify-icon icon="mdi:brain"
  style="color:var(--color-primary);font-size:1.875rem"></iconify-icon>`,
    },
    {
      title: 'Brand logos',
      render: () => (
        <div className="flex items-center gap-6 text-4xl text-foreground">
          <Icon icon="simple-icons:react" label="React" />
          <Icon icon="simple-icons:typescript" label="TypeScript" />
          <Icon icon="simple-icons:tailwindcss" label="Tailwind CSS" />
          <Icon icon="simple-icons:openai" label="OpenAI" />
        </div>
      ),
      code: `<Icon icon="simple-icons:react" label="React" />
<Icon icon="simple-icons:typescript" label="TypeScript" />
<Icon icon="simple-icons:tailwindcss" label="Tailwind CSS" />`,
    },
  ],
};

const input: DocEntry = {
  slug: 'input',
  name: 'Input',
  category: 'Atoms',
  status: 'stable',
  description:
    'A surface-2 text field with the yellow focus ring. Set aria-invalid for the red error border. Textarea is its multiline sibling.',
  importLine: "import { Input, Textarea } from '@bytenana/ui';",
  demos: [
    {
      title: 'Input & Textarea',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input placeholder="Jane Doe" />
          <Input type="email" placeholder="jane@company.com" />
          <Textarea placeholder="Tell us about your project…" />
        </div>
      ),
      code: `<Input placeholder="Jane Doe" />
<Input type="email" placeholder="jane@company.com" />
<Textarea placeholder="Tell us about your project…" />`,
      codeHtml: `<div class="form-group">
  <input type="text" placeholder="Jane Doe" />
</div>
<div class="form-group">
  <input type="email" placeholder="jane@company.com" />
</div>
<div class="form-group">
  <textarea placeholder="Tell us about your project…"></textarea>
</div>`,
    },
    {
      title: 'States',
      description: 'Default, invalid (aria-invalid), disabled.',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input placeholder="Default" />
          <Input aria-invalid defaultValue="not-an-email" />
          <Input disabled placeholder="Disabled" />
        </div>
      ),
      code: `<Input placeholder="Default" />
<Input aria-invalid defaultValue="not-an-email" />
<Input disabled placeholder="Disabled" />`,
    },
  ],
};

const label: DocEntry = {
  slug: 'label',
  name: 'Label',
  category: 'Atoms',
  status: 'stable',
  description: 'A form control label. Pair with Input via htmlFor, or compose with FormField.',
  importLine: "import { Label, Input } from '@bytenana/ui';",
  demos: [
    {
      title: 'Label + Input',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="jane@company.com" />
        </div>
      ),
      code: `<Label htmlFor="email">Work email</Label>
<Input id="email" type="email" placeholder="jane@company.com" />`,
      codeHtml: `<div class="form-group">
  <label for="email">Work email</label>
  <input id="email" type="email" placeholder="jane@company.com" />
</div>`,
    },
  ],
};

const separator: DocEntry = {
  slug: 'separator',
  name: 'Separator',
  category: 'Atoms',
  status: 'stable',
  description: 'A hairline divider, horizontal (default) or vertical.',
  importLine: "import { Separator } from '@bytenana/ui';",
  demos: [
    {
      title: 'Horizontal & vertical',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Text variant="muted">Above</Text>
          <Separator />
          <Text variant="muted">Below</Text>
          <div className="flex h-8 items-center gap-4">
            <Text variant="muted" size="sm">
              Docs
            </Text>
            <Separator orientation="vertical" />
            <Text variant="muted" size="sm">
              API
            </Text>
            <Separator orientation="vertical" />
            <Text variant="muted" size="sm">
              Blog
            </Text>
          </div>
        </div>
      ),
      code: `<Separator />
<Separator orientation="vertical" />`,
      codeHtml: `<div style="height:1px;background:var(--color-border)"></div>
<!-- vertical -->
<div style="width:1px;align-self:stretch;background:var(--color-border)"></div>`,
    },
  ],
};

const container: DocEntry = {
  slug: 'container',
  name: 'Container',
  category: 'Atoms',
  status: 'stable',
  description:
    'Centered max-width wrapper (1200px, or 760px with `narrow`) plus the standard side padding. The layout backbone for sections.',
  importLine: "import { Container } from '@bytenana/ui';",
  demos: [
    {
      title: 'Default & narrow',
      render: () => (
        <div className="flex w-full flex-col gap-3">
          <Container className="rounded border border-border bg-surface py-3 text-center">
            <Text variant="muted" size="sm">
              Container · max 1200px
            </Text>
          </Container>
          <Container narrow className="rounded border border-border bg-surface py-3 text-center">
            <Text variant="muted" size="sm">
              Container narrow · max 760px
            </Text>
          </Container>
        </div>
      ),
      code: `<Container>…</Container>
<Container narrow>…</Container>`,
      codeHtml: `<div class="container">…</div>
<!-- narrow reading width: wrap in a max-width:760px style -->`,
    },
  ],
};

const section: DocEntry = {
  slug: 'section',
  name: 'Section',
  category: 'Atoms',
  status: 'stable',
  description:
    'The dark ↔ light ↔ brand rhythm as a component. Use tone="light" for off-white bands and exactly one tone="brand" yellow interrupt per page.',
  importLine: "import { Section, Container } from '@bytenana/ui';",
  demos: [
    {
      title: 'Tones',
      description: 'dark (base) · light (off-white) · brand (yellow interrupt).',
      tone: 'light',
      render: () => (
        <div className="w-full overflow-hidden rounded-lg border border-on-light-border">
          <Section tone="dark" padding="sm" className="px-6">
            <Text>Dark — the page base.</Text>
          </Section>
          <Section tone="light" padding="sm" className="px-6">
            <Text as="span" className="text-on-light">
              Light — off-white band.
            </Text>
          </Section>
          <Section tone="brand" padding="sm" className="px-6">
            <span className="font-body font-semibold text-bg">Brand — yellow interrupt.</span>
          </Section>
        </div>
      ),
      code: `<Section tone="dark">…</Section>
<Section tone="light">…</Section>
<Section tone="brand">…</Section>`,
      codeHtml: `<section>…</section>                    <!-- dark base -->
<section class="section--light">…</section>   <!-- off-white band -->
<section class="section--brand">…</section>   <!-- one yellow interrupt -->`,
    },
  ],
};

/* ================================================================= Molecules */

const card: DocEntry = {
  slug: 'card',
  name: 'Card',
  category: 'Molecules',
  status: 'new',
  description:
    'A surface composed of CardIcon + CardTitle + CardDescription (+ CardContent / CardFooter). Variants: default, invert (the signature invert-on-hover), and lift. Hover the invert card to see it flip to solid yellow.',
  importLine:
    "import { Card, CardIcon, CardTitle, CardDescription, CardFooter, Icon } from '@bytenana/ui';",
  demos: [
    {
      title: 'Default & invert (hover me)',
      description: 'The invert card flips to solid yellow with dark content and lifts.',
      render: () => (
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardIcon>
              <Icon icon="mdi:account-group-outline" />
            </CardIcon>
            <CardTitle>In your stack</CardTitle>
            <CardDescription>
              Engineers who slot into your tools and ship from week one.
            </CardDescription>
          </Card>
          <Card variant="invert">
            <CardIcon>
              <Icon icon="mdi:rocket-launch-outline" />
            </CardIcon>
            <CardTitle>Ship faster</CardTitle>
            <CardDescription>
              Senior, architect-reviewed delivery. Hover to see the invert.
            </CardDescription>
          </Card>
        </div>
      ),
      code: `<Card>
  <CardIcon><Icon icon="mdi:account-group-outline" /></CardIcon>
  <CardTitle>In your stack</CardTitle>
  <CardDescription>Engineers who slot into your tools.</CardDescription>
</Card>

<Card variant="invert">
  <CardIcon><Icon icon="mdi:rocket-launch-outline" /></CardIcon>
  <CardTitle>Ship faster</CardTitle>
  <CardDescription>Senior, architect-reviewed delivery.</CardDescription>
</Card>`,
      codeHtml: `<div class="card">
  <span class="card-icon"><iconify-icon icon="mdi:account-group-outline"></iconify-icon></span>
  <h3>In your stack</h3>
  <p>Engineers who slot into your tools and ship from week one.</p>
</div>

<!-- signature invert-on-hover: add .card--invert -->
<div class="card card--invert">
  <span class="card-icon"><iconify-icon icon="mdi:rocket-launch-outline"></iconify-icon></span>
  <h3>Ship faster</h3>
  <p>Senior, architect-reviewed delivery.</p>
</div>`,
    },
  ],
};

const formField: DocEntry = {
  slug: 'form-field',
  name: 'FormField',
  category: 'Molecules',
  status: 'new',
  description:
    'Composes a Label + control + hint/error into one block. Wrap an Input or Textarea; pass hint for quiet helper text or error to turn the message red.',
  importLine: "import { FormField, Input, Textarea, Button } from '@bytenana/ui';",
  demos: [
    {
      title: 'A small form',
      render: () => (
        <form className="flex w-full max-w-sm flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <FormField label="Name" htmlFor="ff-name" required>
            <Input id="ff-name" placeholder="Jane Doe" />
          </FormField>
          <FormField
            label="Work email"
            htmlFor="ff-email"
            hint="We'll only use this to reply."
          >
            <Input id="ff-email" type="email" placeholder="jane@company.com" />
          </FormField>
          <FormField label="Project" htmlFor="ff-project">
            <Textarea id="ff-project" placeholder="Tell us about your project…" />
          </FormField>
          <Button full>Book a discovery call</Button>
        </form>
      ),
      code: `<FormField label="Name" htmlFor="name" required>
  <Input id="name" placeholder="Jane Doe" />
</FormField>

<FormField label="Work email" htmlFor="email" hint="We'll only use this to reply.">
  <Input id="email" type="email" placeholder="jane@company.com" />
</FormField>

<Button full>Book a discovery call</Button>`,
      codeHtml: `<form class="contact-form">
  <div class="form-group">
    <label for="name">Name *</label>
    <input id="name" type="text" placeholder="Jane Doe" />
  </div>
  <div class="form-group">
    <label for="email">Work email</label>
    <input id="email" type="email" placeholder="jane@company.com" />
    <p class="form-microcopy">We'll only use this to reply.</p>
  </div>
  <button class="btn btn-primary btn-full" type="submit">Book a discovery call</button>
</form>`,
    },
    {
      title: 'Error state',
      description: 'Pass error + aria-invalid on the control for the red border and message.',
      render: () => (
        <FormField
          label="Work email"
          htmlFor="ff-err"
          error="Please enter a valid work email."
          className="w-full max-w-sm"
        >
          <Input id="ff-err" type="email" aria-invalid defaultValue="jane@" />
        </FormField>
      ),
      code: `<FormField label="Work email" htmlFor="email" error="Please enter a valid work email.">
  <Input id="email" type="email" aria-invalid defaultValue="jane@" />
</FormField>`,
    },
  ],
};

const projectCard: DocEntry = {
  slug: 'project-card',
  name: 'ProjectCard',
  category: 'Molecules',
  status: 'new',
  description:
    'A full-bleed project thumbnail that reveals info on hover. Category + title stay visible; the blurb and link slide up and fade in on hover (and on keyboard focus when it is a link). The image zooms slightly and the gradient darkens. This is the our-work grid card.',
  importLine: "import { ProjectCard } from '@bytenana/ui';",
  demos: [
    {
      title: 'Hover to reveal (grid)',
      description:
        'Two cards in a grid. Hover (or tab to) a card to slide the description + link up.',
      render: () => (
        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <ProjectCard
            href="#/project-card"
            icon="mdi:excavator"
            category="IIoT · Industrial Mining"
            title="Multotec"
            blurb="A predictive-maintenance platform turning raw sensor data into plant-floor decisions."
            className="min-h-[320px] bg-gradient-to-br from-surface-3 to-bg"
          />
          <ProjectCard
            href="#/project-card"
            icon="mdi:message-processing-outline"
            category="HealthTech · Conversational AI"
            title="ByteWhats"
            blurb="A WhatsApp-native assistant that triages patient questions with an LLM pipeline."
            className="min-h-[320px] bg-gradient-to-br from-surface-3 to-bg"
          />
        </div>
      ),
      code: `<ProjectCard
  href="/work/multotec"
  image="/img/multotec.jpg"
  category="IIoT · Industrial Mining"
  title="Multotec"
  blurb="A predictive-maintenance platform turning raw sensor data into decisions."
/>`,
      codeHtml: `<!-- kit class: .work-feature (needs work.css) -->
<a class="work-feature" href="/work/multotec">
  <img class="work-feature__img" src="/img/multotec.jpg" alt="Multotec" />
  <div class="work-feature__overlay">
    <p class="case-industry">IIoT · Industrial Mining</p>
    <h3>Multotec</h3>
    <div class="work-feature__reveal">
      <p class="work-blurb">A predictive-maintenance platform turning raw sensor data into decisions.</p>
      <span class="work-link">Read case study →</span>
    </div>
  </div>
</a>`,
    },
    {
      title: 'Featured (full width)',
      description: 'The same card, full-bleed — the homepage featured slot.',
      flush: true,
      render: () => (
        <ProjectCard
          href="#/project-card"
          icon="mdi:family-tree"
          category="Social · Genealogy"
          title="GenoStories"
          blurb="Turning family trees into shareable, narrated stories — built for scale on a graph backend."
          linkLabel="Read the case study →"
          className="h-[440px] w-full rounded-none bg-gradient-to-br from-surface-3 via-surface-2 to-bg"
        />
      ),
      code: `<ProjectCard
  href="/work/genostories"
  image="/img/genostories.jpg"
  category="Social · Genealogy"
  title="GenoStories"
  blurb="Turning family trees into shareable, narrated stories."
  linkLabel="Read the case study →"
/>`,
    },
  ],
};

const timeline: DocEntry = {
  slug: 'timeline',
  name: 'Timeline',
  category: 'Molecules',
  status: 'new',
  description:
    'A phase / process flow of circular nodes joined by a yellow gradient bond. Each node lifts and glows on hover. Horizontal on desktop, stacks vertically on mobile. This is the Stabilization → Deployment → Growth roadmap on the case-study pages.',
  importLine: "import { Timeline, TimelineStep } from '@bytenana/ui';",
  demos: [
    {
      title: 'Numbered phases (hover a node)',
      render: () => (
        <Timeline className="w-full max-w-3xl">
          <TimelineStep
            number={1}
            title="Stabilization"
            description="Harden the Flutter client and Laravel API — crash paths, secure vaults."
          />
          <TimelineStep
            number={2}
            title="Deployment"
            description="Ship to the App Store and Play Store; roll out to the first cohort."
          />
          <TimelineStep
            number={3}
            title="Growth"
            description="Ancestry.com API, payments, and an AI chatbot in Phase 2."
          />
        </Timeline>
      ),
      code: `<Timeline>
  <TimelineStep number={1} title="Stabilization"
    description="Harden the Flutter client and Laravel API." />
  <TimelineStep number={2} title="Deployment"
    description="Ship to the App Store and Play Store." />
  <TimelineStep number={3} title="Growth"
    description="Ancestry.com API, payments, and an AI chatbot." />
</Timeline>`,
      codeHtml: `<!-- kit class: .arch-flow (needs work.css) -->
<ol class="arch-flow">
  <li class="arch-step">
    <span class="arch-step__n">1</span>
    <div><h4>Stabilization</h4><p>Harden the Flutter client and Laravel API.</p></div>
  </li>
  <li class="arch-step">
    <span class="arch-step__n">2</span>
    <div><h4>Deployment</h4><p>Ship to the App Store and Play Store.</p></div>
  </li>
  <li class="arch-step">
    <span class="arch-step__n">3</span>
    <div><h4>Growth</h4><p>Ancestry.com API, payments, an AI chatbot.</p></div>
  </li>
</ol>`,
    },
    {
      title: 'Icon nodes',
      description: 'Pass `icon` instead of `number` for an architecture flow.',
      render: () => (
        <Timeline className="w-full max-w-3xl">
          <TimelineStep icon="mdi:cellphone" title="Client" description="Flutter — iOS & Android." />
          <TimelineStep icon="mdi:server-network" title="Engine" description="Laravel API & vaults." />
          <TimelineStep icon="mdi:database-outline" title="Data" description="Graph backend at scale." />
          <TimelineStep icon="mdi:robot-happy-outline" title="AI" description="Chatbot & automation." />
        </Timeline>
      ),
      code: `<Timeline>
  <TimelineStep icon="mdi:cellphone" title="Client" description="Flutter — iOS & Android." />
  <TimelineStep icon="mdi:server-network" title="Engine" description="Laravel API & vaults." />
  <TimelineStep icon="mdi:database-outline" title="Data" description="Graph backend at scale." />
</Timeline>`,
    },
  ],
};

const CAROUSEL_SLIDES = [
  {
    icon: 'mdi:account-group-outline',
    title: 'In your stack',
    description: 'Engineers who slot into your tools and ship from week one.',
  },
  {
    icon: 'mdi:rocket-launch-outline',
    title: 'Ship faster',
    description: 'Senior, architect-reviewed delivery — MVP to enterprise.',
  },
  {
    icon: 'mdi:clock-outline',
    title: 'Full US overlap',
    description: 'Real-time collaboration across US working hours.',
  },
];

const carousel: DocEntry = {
  slug: 'carousel',
  name: 'Carousel',
  category: 'Molecules',
  status: 'new',
  description:
    'One slide at a time with dot navigation, prev/next arrows, auto-advance (pauses on hover/focus), swipe and keyboard arrows. Each child is a slide — here, plain Card molecules. Auto-advance and the slide transition respect reduced-motion.',
  importLine: "import { Carousel, Card, CardIcon, CardTitle, CardDescription, Icon } from '@bytenana/ui';",
  demos: [
    {
      title: 'A card carousel',
      description: 'It auto-advances; hover to pause, or use the arrows / dots / swipe.',
      render: () => (
        <Carousel className="w-full max-w-lg" aria-label="Highlights">
          {CAROUSEL_SLIDES.map((s) => (
            <div key={s.title} className="px-1 pb-2">
              <Card>
                <CardIcon>
                  <Icon icon={s.icon} />
                </CardIcon>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </Card>
            </div>
          ))}
        </Carousel>
      ),
      code: `<Carousel aria-label="Highlights">
  <Card>
    <CardIcon><Icon icon="mdi:account-group-outline" /></CardIcon>
    <CardTitle>In your stack</CardTitle>
    <CardDescription>Engineers who slot into your tools.</CardDescription>
  </Card>
  {/* …more slides */}
</Carousel>`,
      codeHtml: `<!-- kit: .steps-carousel--slide, driven by animations.js (module D) -->
<div class="steps steps-carousel steps-carousel--slide" id="hl-carousel">
  <div class="steps-viewport"><div class="steps-track">
    <div class="step is-active">
      <span class="card-icon"><iconify-icon icon="mdi:account-group-outline"></iconify-icon></span>
      <h3>In your stack</h3><p>Engineers who slot into your tools.</p>
    </div>
    <!-- …more .step slides -->
  </div></div>
  <div class="steps-nav"><div class="steps-dots" role="tablist">
    <button class="steps-dot is-active" data-step="0"></button>
  </div></div>
</div>`,
    },
  ],
};

/* =============================================================== Backgrounds */

const dottedMesh: DocEntry = {
  slug: 'dotted-mesh',
  name: 'Dotted Mesh',
  category: 'Components',
  drawer: 'Design System',
  status: 'new',
  description:
    'The signature drifting dot-grid. Wrap any content and DottedMesh renders an animated dotted layer behind it. Two offset radial-gradient grids drift on the mesh-wave keyframe, gated on prefers-reduced-motion.',
  importLine: "import { DottedMesh } from '@bytenana/ui';",
  demos: [
    {
      title: 'Playground',
      description:
        'Tweak the mesh live. Default speed is fast so the drift is clearly visible; the brand default (normal) is a subtle 14s. Motion pauses if your OS has Reduce Motion on.',
      flush: true,
      render: () => <DottedMeshPlayground />,
      code: `<DottedMesh variant="dots-light" speed="fast" gap={28} animated>
  {/* your content sits above the drifting grid */}
</DottedMesh>`,
      codeHtml: `<!-- kit class: .section-mesh (mesh-wave keyframe lives in components.css) -->
<section class="section-mesh">
  <div class="container">
    <!-- your content -->
  </div>
</section>`,
    },
  ],
};

const icosahedron: DocEntry = {
  slug: 'icosahedron',
  name: 'Icosahedron',
  category: 'Components',
  drawer: 'Design System',
  status: 'new',
  description:
    "The hero's tumbling wireframe polyhedron (canvas): vertices / faces spun on a yaw + tilt, silhouette edges solid with a glow, interior edges dashed, front faces tinted. Switch the face count (4 tetra / 8 octa / 20 icosa / 80 geodesic), and nest anything as children — text or a flat SVG icon — pinned at the centre (the hero puts the logo there). Controls cover size, opacity, edge thickness, radius, spin speed, and what's inside.",
  importLine: "import { Icosahedron } from '@bytenana/ui';",
  demos: [
    {
      title: 'Playground',
      description:
        'Tweak the shape live — including what sits inside the polyhedron. The panel mirrors the exact props.',
      flush: true,
      render: () => <IcosahedronPlayground />,
      code: `<Icosahedron size={340} thickness={2.6} radius={0.4} pulse animated>
  {/* anything sits pinned at the centre */}
  <img src="/logo.svg" alt="ByteNana" />
</Icosahedron>`,
      codeHtml: `<!-- kit: canvas globe, data-shape="ico", driven by animations.js -->
<div class="cta-hub" data-globe data-shape="ico" data-radius="0.40">
  <canvas class="cta-hub__links" aria-hidden="true"></canvas>
  <div class="hero-hub__logo"><img src="/logo.svg" alt="ByteNana" /></div>
</div>`,
    },
  ],
};

/* ============================================================ All Components */

const cards: DocEntry = {
  slug: 'cards',
  name: 'Cards',
  category: 'Cards',
  drawer: 'All Components',
  status: 'wip',
  description:
    'A scratch space for new / experimental card components. Empty for now — we drop random components here as we build them.',
  demos: [],
  body: () => (
    <div className="flex min-h-[440px] items-center justify-center rounded-lg border border-on-light-border bg-bg">
      <p className="font-body text-sm text-dim">Cards will appear here.</p>
    </div>
  ),
};

/* ------------------------------------------------------------------ Assembly */

export const registry: DocEntry[] = [
  // Design System
  overview,
  gettingStarted,
  cssJs,
  skillPage,
  typography,
  badge,
  button,
  icon,
  input,
  label,
  separator,
  container,
  section,
  card,
  formField,
  projectCard,
  timeline,
  carousel,
  // Components (backgrounds), nested in Design System
  icosahedron,
  dottedMesh,
  // All Components (scratch)
  cards,
];

/** Sidebar drawer order. */
export const drawerOrder: Drawer[] = ['Design System', 'All Components'];

/** Category order within a drawer. */
export const categoryOrder: Category[] = [
  'Getting started',
  'Atoms',
  'Molecules',
  'Components',
  'Cards',
];

/** A missing drawer means the entry belongs to the Design System. */
export function drawerOf(entry: DocEntry): Drawer {
  return entry.drawer ?? 'Design System';
}

export function findEntry(slug: string): DocEntry | undefined {
  return registry.find((e) => e.slug === slug);
}
