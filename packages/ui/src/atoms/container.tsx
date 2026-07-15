import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Container — centered max-width wrapper with the standard side padding.
   ========================================================================== */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrower reading width (760px) instead of the default 1200px. */
  narrow?: boolean;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, narrow = false, as = 'div', ...props }, ref) => {
    const Comp = as as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(
          'mx-auto w-full px-6',
          narrow ? 'max-w-container-narrow' : 'max-w-container',
          className,
        )}
        {...props}
      />
    );
  },
);
Container.displayName = 'Container';
