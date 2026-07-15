import * as React from 'react';
import { cn } from '../lib/cn';
import { Icon } from '../atoms/icon';

/* ==========================================================================
   ProjectCard — full-bleed thumbnail that reveals info on hover.
   Category + title are always visible; the blurb / link block slides up and
   fades in on hover (and on keyboard focus when it's a link). The image zooms
   slightly and the bottom gradient darkens. Ported from work.css .work-feature.

   Renders as an <a> when `href` is set (focusable, so the reveal also opens on
   keyboard focus), otherwise an <article>. Reduced-motion safe.
   ========================================================================== */

const BASE_GRADIENT =
  'linear-gradient(to top, rgba(15,17,18,0.92) 0%, rgba(15,17,18,0.55) 34%, rgba(15,17,18,0.04) 70%)';
const HOVER_GRADIENT =
  'linear-gradient(to top, rgba(15,17,18,0.95) 0%, rgba(15,17,18,0.82) 55%, rgba(15,17,18,0.4) 100%)';

export interface ProjectCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Background thumbnail. Falls back to a surface + icon placeholder. */
  image?: string;
  imageAlt?: string;
  /** Iconify name for the no-image placeholder watermark. */
  icon?: string;
  /** Yellow uppercase kicker, e.g. "IIoT · Industrial Mining". */
  category?: React.ReactNode;
  title: React.ReactNode;
  /** Description shown in the hover reveal. */
  blurb?: React.ReactNode;
  /** Turns the card into a link and enables focus-reveal. */
  href?: string;
  /** CTA label appended to the reveal when `href` is set. */
  linkLabel?: React.ReactNode;
  /** Extra reveal content (e.g. a quote), rendered between blurb and link. */
  children?: React.ReactNode;
}

export const ProjectCard = React.forwardRef<HTMLElement, ProjectCardProps>(
  (
    {
      image,
      imageAlt = '',
      icon = 'mdi:image-outline',
      category,
      title,
      blurb,
      href,
      linkLabel = 'Read case study →',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = (href ? 'a' : 'article') as React.ElementType;
    const hasReveal = blurb != null || children != null || (href && linkLabel);

    return (
      <Comp
        ref={ref as never}
        href={href}
        className={cn(
          'group relative block min-h-[420px] overflow-hidden rounded-lg bg-surface-2 text-foreground no-underline',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          className,
        )}
        {...props}
      >
        {/* Thumbnail (or placeholder) */}
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center text-6xl text-white/15"
          >
            <Icon icon={icon} />
          </span>
        )}

        {/* Overlay gradients — base + a darker one that fades in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: BASE_GRADIENT }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ backgroundImage: HOVER_GRADIENT }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-[1] flex flex-col justify-end p-8">
          {category && (
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.1em] text-primary">
              {category}
            </p>
          )}
          <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>

          {hasReveal && (
            <div
              className={cn(
                'max-h-0 translate-y-4 overflow-hidden opacity-0 will-change-[max-height,transform]',
                'transition-[max-height,opacity,transform] duration-[550ms] ease-byte',
                'group-hover:mt-4 group-hover:max-h-[340px] group-hover:translate-y-0 group-hover:opacity-100',
                'group-focus-visible:mt-4 group-focus-visible:max-h-[340px] group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
                'motion-reduce:transition-none',
              )}
            >
              {blurb && (
                <p className="font-body text-sm leading-relaxed text-white/85">{blurb}</p>
              )}
              {children}
              {href && linkLabel && (
                <span className="mt-3 inline-block font-body text-sm font-semibold text-primary">
                  {linkLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </Comp>
    );
  },
);
ProjectCard.displayName = 'ProjectCard';
