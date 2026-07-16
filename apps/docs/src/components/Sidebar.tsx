import * as React from 'react';
import {
  registry,
  drawerOrder,
  categoryOrder,
  drawerOf,
  FLAT_DRAWERS,
  type Drawer,
  type Category,
} from '../registry';

interface SidebarProps {
  activeSlug: string;
  onNavigate: (slug: string) => void;
}

/** Left navigation: brand mark + collapsible drawers → categories → items. */
export function Sidebar({ activeSlug, onNavigate }: SidebarProps) {
  const activeEntry = registry.find((e) => e.slug === activeSlug);

  // All drawers open by default; each toggles freely.
  const [open, setOpen] = React.useState<Set<Drawer>>(() => new Set(drawerOrder));

  const toggle = (drawer: Drawer) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(drawer) ? next.delete(drawer) : next.add(drawer);
      return next;
    });

  // Opening a page ensures its drawer is expanded (but never re-opens a drawer
  // the user just collapsed while staying on the same page).
  React.useEffect(() => {
    if (activeEntry) setOpen((prev) => new Set(prev).add(drawerOf(activeEntry)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);

  return (
    <aside className="scroll-quiet flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-on-light-border bg-light">
      {/* Brand */}
      <button
        type="button"
        onClick={() => onNavigate('overview')}
        className="flex items-center gap-2.5 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="grid h-8 w-8 place-items-center rounded bg-bg font-heading text-lg font-extrabold text-primary">
          B
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-base font-bold text-on-light">Bytestore</span>
          <span className="text-xs text-on-light-dim">Design system</span>
        </span>
      </button>

      <nav className="flex flex-col gap-2 px-3 pb-10">
        {drawerOrder.map((drawer) => {
          const entries = registry.filter((e) => drawerOf(e) === drawer && !e.hidden);
          if (entries.length === 0) return null;
          const isOpen = open.has(drawer);

          return (
            <div key={drawer} className="flex flex-col">
              <DrawerHeader
                label={drawer}
                open={isOpen}
                count={entries.length}
                onClick={() => toggle(drawer)}
              />
              {isOpen && (
                <div className="mb-2 flex flex-col gap-4 pt-1">
                  {FLAT_DRAWERS.includes(drawer) ? (
                    // Flat: list items directly, no category sub-headers.
                    <div className="flex flex-col gap-1">
                      {entries.map((entry) => (
                        <NavItem
                          key={entry.slug}
                          name={entry.name}
                          status={entry.status}
                          active={entry.slug === activeSlug}
                          onClick={() => onNavigate(entry.slug)}
                        />
                      ))}
                    </div>
                  ) : (
                    categoryOrder.map((category) => {
                      const items = entries.filter((e) => e.category === category);
                      if (items.length === 0) return null;
                      return (
                        <div key={category} className="flex flex-col gap-1">
                          <CategoryLabel category={category} />
                          {items.map((entry) => (
                            <NavItem
                              key={entry.slug}
                              name={entry.name}
                              status={entry.status}
                              active={entry.slug === activeSlug}
                              onClick={() => onNavigate(entry.slug)}
                            />
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function DrawerHeader({
  label,
  open,
  count,
  onClick,
}: {
  label: Drawer;
  open: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="flex items-center gap-2 rounded px-3 py-2 text-left transition-colors duration-fast hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <Chevron open={open} />
      <span className="font-heading text-sm font-bold tracking-tight text-on-light">
        {label}
      </span>
      <span className="ml-auto text-xs font-medium text-on-light-dim">{count}</span>
    </button>
  );
}

function NavItem({
  name,
  status,
  active,
  onClick,
}: {
  name: string;
  status?: 'stable' | 'new' | 'wip';
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'ml-4 flex items-center justify-between rounded px-3 py-1.5 text-left text-sm transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' +
        (active
          ? 'bg-primary/15 font-semibold text-on-light'
          : 'text-on-light-muted hover:bg-black/[0.04] hover:text-on-light')
      }
    >
      <span>{name}</span>
      {status === 'new' && (
        <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-bg">
          New
        </span>
      )}
      {status === 'wip' && (
        <span className="text-[10px] font-medium uppercase text-on-light-dim">WIP</span>
      )}
    </button>
  );
}

function CategoryLabel({ category }: { category: Category }) {
  return (
    <p className="ml-4 px-3 pb-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-on-light-dim">
      {category}
    </p>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={
        'shrink-0 text-on-light-muted transition-transform duration-fast ' +
        (open ? 'rotate-90' : '')
      }
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
