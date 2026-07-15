import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Input — surface-2 field with the yellow focus ring.
   Set aria-invalid for the error (red) border.
   ========================================================================== */

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full rounded border border-border bg-surface-2 px-4 py-3 font-body text-base leading-normal text-foreground',
        'placeholder:text-dim',
        'transition-[border-color,box-shadow] duration-fast',
        'focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-glow',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger-glow',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
