import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/* ==========================================================================
   Card — a surface composed of icon + title + description (+ content/footer).
   Variants:
     default = surface card, border turns yellow on hover
     invert  = SIGNATURE — flips to solid yellow with dark content + lift
     lift    = border + translateY on hover
     quote   = left yellow border, italic body (testimonials)

   The invert variant tags itself `group/invert`; the subcomponents below use
   `group-hover/invert:*` so their color flips only inside an invert card.
   ========================================================================== */

const cardVariants = cva('rounded-lg border transition-colors duration-fast ease-byte', {
  variants: {
    variant: {
      default: 'border-border bg-surface px-8 py-6 hover:border-border-hover',
      invert:
        'group/invert border-border bg-surface p-8 transition-all duration-base hover:-translate-y-1 hover:border-primary hover:bg-primary hover:shadow-md',
      lift: 'border-border bg-surface px-8 py-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-border-hover',
      quote:
        'flex flex-col gap-4 border-border border-l-[3px] border-l-primary bg-surface px-8 py-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

/** Yellow icon block above the title. Flips to dark inside an invert card. */
export const CardIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mb-4 flex text-2xl leading-none text-primary transition-colors duration-base group-hover/invert:text-bg',
        className,
      )}
      {...props}
    />
  ),
);
CardIcon.displayName = 'CardIcon';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'mb-2 font-heading text-lg font-bold text-foreground transition-colors duration-base group-hover/invert:text-bg',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'font-body text-sm leading-relaxed text-muted transition-colors duration-base group-hover/invert:text-bg',
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />,
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        'mt-4 font-body text-sm text-muted transition-colors duration-base group-hover/invert:text-bg',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { cardVariants };
