import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/* ==========================================================================
   Section — the dark / light / brand rhythm as a component.
   dark  = page base (#0F1112), light text
   light = off-white band, dark text
   brand = full-yellow interrupt band (use exactly one per page)
   ========================================================================== */

const sectionVariants = cva('w-full', {
  variants: {
    tone: {
      dark: 'bg-bg text-foreground',
      light: 'bg-light text-on-light',
      brand: 'bg-primary text-bg',
    },
    padding: {
      none: '',
      sm: 'py-16',
      default: 'py-24',
    },
  },
  defaultVariants: {
    tone: 'dark',
    padding: 'default',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, padding, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ tone, padding }), className)}
      {...props}
    />
  ),
);
Section.displayName = 'Section';

export { sectionVariants };
