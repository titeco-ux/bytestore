import { registry, categoryOrder, type Category } from '../registry';

interface SidebarProps {
  activeSlug: string;
  onNavigate: (slug: string) => void;
}

/** Left navigation: brand mark + components grouped by category. */
export function Sidebar({ activeSlug, onNavigate }: SidebarProps) {
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

      <nav className="flex flex-col gap-6 px-3 pb-10">
        {categoryOrder.map((category) => {
          const items = registry.filter((e) => e.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="flex flex-col gap-1">
              <CategoryLabel category={category} />
              {items.map((entry) => {
                const active = entry.slug === activeSlug;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => onNavigate(entry.slug)}
                    className={
                      'flex items-center justify-between rounded px-3 py-1.5 text-left text-sm transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' +
                      (active
                        ? 'bg-primary/15 font-semibold text-on-light'
                        : 'text-on-light-muted hover:bg-black/[0.04] hover:text-on-light')
                    }
                  >
                    <span>{entry.name}</span>
                    {entry.status === 'new' && (
                      <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-bg">
                        New
                      </span>
                    )}
                    {entry.status === 'wip' && (
                      <span className="text-[10px] font-medium uppercase text-on-light-dim">
                        WIP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function CategoryLabel({ category }: { category: Category }) {
  return (
    <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-on-light-dim">
      {category}
    </p>
  );
}
