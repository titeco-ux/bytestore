import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Label — form control label.
   ========================================================================== */

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('font-body text-sm font-semibold text-foreground', className)}
      {...props}
    />
  ),
);
Label.displayName = 'Label';
