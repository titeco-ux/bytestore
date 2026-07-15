import * as React from 'react';
import { cn } from '../lib/cn';
import { Icon } from '../atoms/icon';

/* ==========================================================================
   Timeline — phase / process flow of circular "atom" nodes joined by a yellow
   gradient bond. Each node lifts + glows on hover. Horizontal on desktop,
   vertical on mobile. Ported from work.css .arch-flow / .mol-timeline.

   Compose:
     <Timeline>
       <TimelineStep number={1} title="Stabilization" description="…" />
       <TimelineStep number={2} title="Deployment"    description="…" />
       <TimelineStep number={3} title="Growth"        description="…" />
     </Timeline>
   Pass `icon` instead of `number` for an icon node.
   ========================================================================== */

export const Timeline = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex list-none flex-col gap-6 md:flex-row md:gap-4', className)}
      {...props}
    />
  ),
);
Timeline.displayName = 'Timeline';

export interface TimelineStepProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Number shown in the atom (ignored when `icon` is set). */
  number?: React.ReactNode;
  /** Iconify name to show in the atom instead of a number. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const TimelineStep = React.forwardRef<HTMLLIElement, TimelineStepProps>(
  ({ number, icon, title, description, className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'group relative flex items-center gap-5 text-left md:flex-1 md:flex-col md:items-center md:text-center',
        // Bond connecting this node to the next (vertical on mobile, horizontal on md).
        "after:absolute after:z-0 after:bg-gradient-to-b after:from-primary/60 after:to-primary/25 after:content-['']",
        'after:left-[26px] after:top-[52px] after:h-[calc(100%+1.5rem)] after:w-0.5',
        'md:after:left-1/2 md:after:top-[26px] md:after:h-0.5 md:after:w-[calc(100%+1rem)] md:after:bg-gradient-to-r',
        'last:after:hidden',
        className,
      )}
      {...props}
    >
      {/* Atom */}
      <span className="relative z-10 flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border border-primary/50 bg-bg font-heading text-lg font-bold text-primary shadow-[0_0_0_6px_rgba(242,183,5,0.06)] transition-[border-color,background-color,box-shadow,transform] duration-base ease-byte group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_0_8px_rgba(242,183,5,0.1)] motion-safe:group-hover:-translate-y-1.5">
        {icon ? <Icon icon={icon} className="text-2xl" /> : number}
      </span>

      {/* Info */}
      <div className="mt-0 transition-transform duration-[350ms] ease-byte motion-safe:group-hover:-translate-y-1.5 md:mt-5">
        <p className="mb-1 font-heading text-xs font-bold uppercase tracking-[0.08em] text-primary">
          {title}
        </p>
        {description && (
          <p className="max-w-none font-body text-sm leading-snug text-muted md:max-w-[22ch]">
            {description}
          </p>
        )}
        {children}
      </div>
    </li>
  ),
);
TimelineStep.displayName = 'TimelineStep';
