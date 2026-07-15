import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Icon — thin wrapper over the Iconify web component (<iconify-icon>).
   Matches the design kit, which uses Iconify via CDN. Consumers must load the
   iconify-icon script once (see the docs index.html / README).

   Color + size are inherited: set them on `className`
   (e.g. `text-primary text-2xl`). Decorative by default; pass `label` for
   meaningful icons.
   ========================================================================== */

interface IconifyElementProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  flip?: string;
  rotate?: string | number;
  inline?: boolean;
}

// The custom element isn't in React's JSX types; cast avoids a global d.ts.
const IconifyIcon = 'iconify-icon' as unknown as React.FC<
  IconifyElementProps & React.HTMLAttributes<HTMLElement>
>;

export interface IconProps extends IconifyElementProps {
  /** Accessible label. Omit for purely decorative icons. */
  label?: string;
  className?: string;
}

export function Icon({ icon, label, className, ...rest }: IconProps) {
  return (
    <span
      className={cn('inline-flex items-center justify-center leading-none', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <IconifyIcon icon={icon} {...rest} />
    </span>
  );
}
