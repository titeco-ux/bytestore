import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/* ==========================================================================
   Typography — Heading, Text, Eyebrow, SectionLabel, Highlight
   Byte rules: IBM Plex Sans headings (800 for h1, 700 for h2–h4), Inter body.
   Headings scale up responsively. <em> is repurposed as a yellow highlight.
   ========================================================================== */

/* ------------------------------------------------------------------ Heading */

const HEADING_LEVELS = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-xl md:text-2xl font-bold',
  4: 'text-lg md:text-xl font-bold',
} as const;

type HeadingLevel = keyof typeof HEADING_LEVELS;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual + semantic level (1–4). Drives size + weight. */
  level?: HeadingLevel;
  /** Override the rendered tag without changing the visual level. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, className, ...props }, ref) => {
    const Tag = (as ?? `h${level}`) as React.ElementType;
    return (
      <Tag
        ref={ref}
        className={cn(
          'font-heading text-foreground tracking-tight [text-wrap:balance]',
          HEADING_LEVELS[level],
          className,
        )}
        {...props}
      />
    );
  },
);
Heading.displayName = 'Heading';

/* --------------------------------------------------------------------- Text */

const textVariants = cva('font-body', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted',
      dim: 'text-dim',
    },
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg leading-relaxed',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as = 'p', variant, size, weight, className, ...props }, ref) => {
    const Tag = as as React.ElementType;
    return (
      <Tag
        ref={ref}
        className={cn(textVariants({ variant, size, weight }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';

/* ------------------------------------------------------------------ Eyebrow */

/** Yellow uppercase kicker above a heading. */
export const Eyebrow = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary',
      className,
    )}
    {...props}
  />
));
Eyebrow.displayName = 'Eyebrow';

/* ------------------------------------------------------------- SectionLabel */

/** Dim, quiet uppercase section index. */
export const SectionLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'font-body text-xs font-medium uppercase tracking-[0.15em] text-dim',
      className,
    )}
    {...props}
  />
));
SectionLabel.displayName = 'SectionLabel';

/* ---------------------------------------------------------------- Highlight */

/** Inline yellow highlight — Byte repurposes <em> (not italic). */
export const Highlight = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <em
    ref={ref}
    className={cn('not-italic font-medium text-primary', className)}
    {...props}
  />
));
Highlight.displayName = 'Highlight';

export { textVariants };
