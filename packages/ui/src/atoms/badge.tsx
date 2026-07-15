import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/* ==========================================================================
   Badge — small status / tag chip.
   default  = yellow fill, dark text (the signature Byte accent chip)
   secondary= surface fill, light text
   outline  = bordered ghost
   muted    = quiet surface chip
   ========================================================================== */

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-sm border font-body font-medium leading-none transition-colors duration-fast ease-byte whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-bg',
        secondary: 'border-transparent bg-surface-2 text-foreground',
        outline: 'border-border text-foreground',
        muted: 'border-transparent bg-surface-3 text-muted',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { badgeVariants };
