import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Accordion — accessible disclosure list (the FAQ pattern).
     <Accordion type="single" defaultValue="q1">
       <AccordionItem value="q1" title="Question one?">Answer one.</AccordionItem>
       <AccordionItem value="q2" title="Question two?">Answer two.</AccordionItem>
     </Accordion>
   type="single" (one panel open, collapsible by default) or "multiple".
   Each header is a real <button> with aria-expanded / aria-controls; the panel
   is a labelled region. Up/Down/Home/End move between headers. The panel height
   animates via the grid-rows 0fr→1fr trick and the ± marker rotates —
   both gated on prefers-reduced-motion. Controlled (value) or uncontrolled
   (defaultValue).
   ========================================================================== */

type Type = 'single' | 'multiple';

interface AccordionCtx {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  baseId: string;
}
const Ctx = React.createContext<AccordionCtx | null>(null);
function useAccordion(): AccordionCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error('AccordionItem must be used inside <Accordion>');
  return c;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 'single' keeps one panel open at a time; 'multiple' allows many. */
  type?: Type;
  /** For type="single", allow closing the open panel so none is open. */
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function toArray(v: string | string[] | undefined): string[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

export function Accordion({
  type = 'single',
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internal, setInternal] = React.useState<string[]>(() => toArray(defaultValue));
  const controlled = value !== undefined;
  const open = controlled ? toArray(value) : internal;
  const baseId = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);

  const commit = React.useCallback(
    (next: string[]) => {
      if (!controlled) setInternal(next);
      onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
    },
    [controlled, onValueChange, type],
  );

  const toggle = React.useCallback(
    (v: string) => {
      const isOpen = open.includes(v);
      let next: string[];
      if (type === 'single') {
        next = isOpen ? (collapsible ? [] : open) : [v];
      } else {
        next = isOpen ? open.filter((x) => x !== v) : [...open, v];
      }
      commit(next);
    },
    [open, type, collapsible, commit],
  );

  const isOpen = React.useCallback((v: string) => open.includes(v), [open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const triggers = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not([disabled])') ??
        [],
    );
    if (!triggers.length) return;
    const i = triggers.indexOf(document.activeElement as HTMLButtonElement);
    let next = i;
    if (e.key === 'ArrowDown') next = (i + 1) % triggers.length;
    else if (e.key === 'ArrowUp') next = (i - 1 + triggers.length) % triggers.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = triggers.length - 1;
    if (next < 0) next = 0;
    e.preventDefault();
    triggers[next].focus();
  };

  return (
    <Ctx.Provider value={{ isOpen, toggle, baseId }}>
      <div ref={ref} onKeyDown={onKeyDown} className={cn('flex flex-col gap-3', className)} {...props}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  value: string;
  /** The header / question. */
  title: React.ReactNode;
  disabled?: boolean;
}

export function AccordionItem({
  value,
  title,
  disabled,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { isOpen, toggle, baseId } = useAccordion();
  const open = isOpen(value);
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border transition-colors duration-base ease-byte',
        open ? 'border-border-hover bg-surface-3' : 'border-border bg-surface-2 hover:border-border-hover',
        className,
      )}
      {...props}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          data-accordion-trigger
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => toggle(value)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-heading text-lg font-semibold tracking-[-0.01em] text-foreground transition-colors duration-fast ease-byte focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{title}</span>
          {/* ± marker: horizontal bar stays; vertical bar rotates out + fades when open */}
          <span className="relative h-[18px] w-[18px] shrink-0" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
            <span
              className={cn(
                'absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[transform,opacity] duration-base ease-byte motion-reduce:transition-none',
                open ? 'rotate-0 opacity-0' : 'rotate-90 opacity-100',
              )}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-base ease-byte motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 font-body text-base leading-relaxed text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
