import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Separator — hairline divider, horizontal (default) or vertical.
   ========================================================================== */

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Decorative separators are hidden from the a11y tree. */
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = 'Separator';
