import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Carousel — one slide (card) at a time, with dot nav, prev/next arrows,
   auto-advance (pause on hover/focus), swipe, and keyboard support. Ported
   from the kit's .steps-carousel (slide variant). Auto-advance and the slide
   transition are gated on prefers-reduced-motion.

   Each child is a slide:
     <Carousel>
       <Card>…</Card>
       <Card>…</Card>
     </Carousel>
   ========================================================================== */

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  /** Auto-advance interval in ms. */
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  'aria-label'?: string;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      autoPlay = true,
      interval = 4500,
      showArrows = true,
      showDots = true,
      className,
      children,
      'aria-label': ariaLabel = 'Carousel',
      ...props
    },
    ref,
  ) => {
    const slides = React.Children.toArray(children);
    const count = slides.length;
    const [index, setIndex] = React.useState(0);
    const paused = React.useRef(false);
    const reduce = usePrefersReducedMotion();

    const go = React.useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
    const next = React.useCallback(() => go(index + 1), [go, index]);
    const prev = React.useCallback(() => go(index - 1), [go, index]);

    // Auto-advance (paused on hover/focus and under reduced motion).
    React.useEffect(() => {
      if (!autoPlay || reduce || count <= 1) return;
      const id = window.setInterval(() => {
        if (!paused.current) setIndex((i) => (i + 1) % count);
      }, interval);
      return () => window.clearInterval(id);
    }, [autoPlay, reduce, count, interval]);

    // Swipe.
    const startX = React.useRef<number | null>(null);
    const onPointerDown = (e: React.PointerEvent) => {
      startX.current = e.clientX;
    };
    const onPointerUp = (e: React.PointerEvent) => {
      if (startX.current == null) return;
      const dx = e.clientX - startX.current;
      if (dx > 40) prev();
      else if (dx < -40) next();
      startX.current = null;
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={cn('flex flex-col gap-6', className)}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') next();
          else if (e.key === 'ArrowLeft') prev();
        }}
        {...props}
      >
        <div
          className="relative overflow-hidden rounded-lg"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className={cn('flex', !reduce && 'transition-transform duration-500 ease-byte')}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="w-full shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {(showDots || showArrows) && count > 1 && (
          <div className="flex items-center justify-center gap-5">
            {showArrows && (
              <Arrow label="Previous slide" onClick={prev} dir="left" />
            )}
            {showDots && (
              <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => go(i)}
                    className={cn(
                      'h-2.5 rounded-full transition-[width,background-color] duration-300 ease-byte focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                      i === index ? 'w-6 bg-primary' : 'w-2.5 bg-muted hover:bg-foreground/60',
                    )}
                  />
                ))}
              </div>
            )}
            {showArrows && <Arrow label="Next slide" onClick={next} dir="right" />}
          </div>
        )}
      </div>
    );
  },
);
Carousel.displayName = 'Carousel';

function Arrow({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: 'left' | 'right';
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-fast ease-byte hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
