import * as React from 'react';
import { cn } from '../lib/cn';
import { Label } from '../atoms/label';

/* ==========================================================================
   FormField — composes a Label + control + hint/error into one block.
   Wrap an <Input>/<Textarea> as children; the field renders the label above
   and either a hint (dim) or an error (red) below. Pass `error` and set
   aria-invalid on the control to light up the red border.
   ========================================================================== */

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Ties the label to the control. */
  htmlFor?: string;
  /** Quiet helper text below the control. */
  hint?: React.ReactNode;
  /** Error message. Overrides the hint and turns red. */
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, htmlFor, hint, error, required, children, className, ...props }, ref) => {
    const messageId = htmlFor ? `${htmlFor}-message` : undefined;
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
        {label && (
          <Label htmlFor={htmlFor}>
            {label}
            {required && <span className="text-primary"> *</span>}
          </Label>
        )}
        {children}
        {error ? (
          <p id={messageId} className="font-body text-xs text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={messageId} className="font-body text-xs text-dim">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = 'FormField';
