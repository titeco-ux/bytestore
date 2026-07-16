import * as React from 'react';
import { cn } from '../lib/cn';

/* ==========================================================================
   Tabs — accessible compound tabs.
     <Tabs defaultValue="a" variant="underline|segment">
       <TabList aria-label="…">
         <Tab value="a">A</Tab>
         <Tab value="b">B</Tab>
       </TabList>
       <TabPanel value="a">…</TabPanel>
       <TabPanel value="b">…</TabPanel>
     </Tabs>
   Roving tabindex + Arrow/Home/End keys; role tablist/tab/tabpanel wired with
   aria-controls/labelledby. Controlled (value) or uncontrolled (defaultValue).
   ========================================================================== */

type Variant = 'underline' | 'segment';

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  variant: Variant;
  baseId: string;
}
const Ctx = React.createContext<TabsCtx | null>(null);
function useTabs(): TabsCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error('Tab, TabList and TabPanel must be used inside <Tabs>');
  return c;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: Variant;
}

export function Tabs({
  defaultValue = '',
  value,
  onValueChange,
  variant = 'underline',
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  const baseId = React.useId();
  const setValue = React.useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );
  return (
    <Ctx.Provider value={{ value: active, setValue, variant, baseId }}>
      <div className={cn('flex flex-col', className)} {...props}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function TabList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useTabs();
  const ref = React.useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    const tabs = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
    );
    if (!tabs.length) return;
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    let next = i < 0 ? 0 : i;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    e.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  };

  return (
    <div
      ref={ref}
      role="tablist"
      onKeyDown={onKeyDown}
      className={cn(
        variant === 'underline'
          ? 'flex flex-wrap gap-1 border-b border-border'
          : 'grid auto-cols-fr grid-flow-col gap-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function Tab({ value, className, children, ...props }: TabProps) {
  const { value: active, setValue, variant, baseId } = useTabs();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        'cursor-pointer font-body transition-colors duration-fast ease-byte focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variant === 'underline'
          ? cn(
              '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium',
              selected
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted hover:text-foreground',
            )
          : cn(
              'rounded-md border p-3 text-left',
              selected
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border text-muted hover:border-border-hover hover:text-foreground',
            ),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { value: active, baseId } = useTabs();
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('mt-4 focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </div>
  );
}
