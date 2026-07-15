import * as React from 'react';
import {
  Badge,
  Button,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardFooter,
  Container,
  Eyebrow,
  FormField,
  Heading,
  Highlight,
  Icon,
  Input,
  Label,
  Section,
  SectionLabel,
  Separator,
  Text,
  Textarea,
} from '@bytenana/ui';

/* ==========================================================================
   Component registry — the single list that drives the sidebar + pages.
   Add a component = add an atom/molecule in packages/ui + an entry here.
   ========================================================================== */

export type Category = 'Getting started' | 'Atoms' | 'Molecules';

export interface Demo {
  title: string;
  description?: string;
  render: () => React.ReactNode;
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
  importLine?: string;
  demos: Demo[];
}

/* ========================================================== Getting started */

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
    'A surface composed of CardIcon + CardTitle + CardDescription (+ CardContent / CardFooter). Variants: default, invert (the signature invert-on-hover), lift, and quote. Hover the invert card to see it flip to solid yellow.',
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
    },
    {
      title: 'Quote',
      description: 'Testimonial card — left yellow border, italic body, attribution footer.',
      render: () => (
        <Card variant="quote" className="max-w-lg">
          <p className="font-body text-lg italic leading-relaxed text-foreground">
            “We were impressed with their flexibility and skills.”
          </p>
          <CardFooter className="mt-0">CEO · Series-A startup, US</CardFooter>
        </Card>
      ),
      code: `<Card variant="quote">
  <p className="text-lg italic leading-relaxed text-foreground">
    “We were impressed with their flexibility and skills.”
  </p>
  <CardFooter className="mt-0">CEO · Series-A startup, US</CardFooter>
</Card>`,
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

/* ------------------------------------------------------------------ Assembly */

export const registry: DocEntry[] = [
  overview,
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
];

export const categoryOrder: Category[] = ['Getting started', 'Atoms', 'Molecules'];

export function findEntry(slug: string): DocEntry | undefined {
  return registry.find((e) => e.slug === slug);
}
