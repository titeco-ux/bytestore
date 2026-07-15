import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Textarea — multiline sibling of Input.
   ========================================================================== */

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full resize-y rounded border border-border bg-surface-2 px-4 py-3 font-body text-base leading-relaxed text-foreground',
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
Textarea.displayName = 'Textarea';
