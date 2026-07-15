import * as React from 'react';
import { Sidebar } from './components/Sidebar';
import { ComponentPage } from './components/ComponentPage';
import { registry, findEntry } from './registry';

const DEFAULT_SLUG = 'overview';

function slugFromHash(): string {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  return findEntry(raw) ? raw : DEFAULT_SLUG;
}

export default function App() {
  const [slug, setSlug] = React.useState<string>(slugFromHash);

  // Keep the URL hash in sync so pages are shareable + back/forward works.
  React.useEffect(() => {
    const onHash = () => setSlug(slugFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = React.useCallback((next: string) => {
    window.location.hash = `/${next}`;
    setSlug(next);
    // Scroll the content column back to top on navigation.
    document.getElementById('doc-scroll')?.scrollTo({ top: 0 });
  }, []);

  const entry = findEntry(slug) ?? registry[0];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-light">
      <Sidebar activeSlug={entry.slug} onNavigate={navigate} />
      <main id="doc-scroll" className="scroll-quiet h-full flex-1 overflow-y-auto">
        <ComponentPage entry={entry} />
      </main>
    </div>
  );
}
