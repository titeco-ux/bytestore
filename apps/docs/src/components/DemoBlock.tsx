import * as React from 'react';
import type { Demo } from '../registry';
import { CodeBlock } from './CodeBlock';

/** One demo: title, description, and a Preview / Code tab pair (shadcn-style). */
export function DemoBlock({ demo }: { demo: Demo }) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const tone = demo.tone ?? 'dark';

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-bold text-on-light">{demo.title}</h3>
        {demo.description && (
          <p className="max-w-2xl text-sm text-on-light-muted">{demo.description}</p>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-on-light-border">
        {/* Tab strip */}
        <div className="flex items-center gap-1 border-b border-on-light-border bg-black/[0.02] px-2">
          {(['preview', 'code'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={
                'relative px-3 py-2.5 text-sm font-medium capitalize transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' +
                (tab === t
                  ? 'text-on-light'
                  : 'text-on-light-dim hover:text-on-light-muted')
              }
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        {tab === 'preview' ? (
          <div
            className={
              'flex min-h-[180px] items-center justify-center p-8 ' +
              (tone === 'dark' ? 'bg-bg' : 'bg-light')
            }
          >
            {demo.render()}
          </div>
        ) : (
          <div className="p-3">
            <CodeBlock code={demo.code} />
          </div>
        )}
      </div>
    </section>
  );
}
