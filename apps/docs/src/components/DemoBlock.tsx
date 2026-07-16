import * as React from 'react';
import type { Demo } from '../registry';
import { CodeBlock } from './CodeBlock';

type Lang = 'react' | 'html' | 'prompt';
const LANG_LABEL: Record<Lang, string> = { react: 'React', html: 'HTML / CSS', prompt: 'Prompt' };
const LANG_SYNTAX: Record<Lang, string> = { react: 'tsx', html: 'markup', prompt: 'markdown' };

/** One demo: title, description, and a Preview / Code tab pair (shadcn-style).
    The Code panel gains a React | HTML/CSS | Prompt toggle for whichever the
    demo provides (`codeHtml`, `codePrompt`). */
export function DemoBlock({ demo }: { demo: Demo }) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const [lang, setLang] = React.useState<Lang>('react');
  const tone = demo.tone ?? 'dark';

  const langs: Lang[] = [
    'react',
    ...(demo.codeHtml ? (['html'] as const) : []),
    ...(demo.codePrompt ? (['prompt'] as const) : []),
  ];
  const active = langs.includes(lang) ? lang : 'react';
  const codeFor = (l: Lang) =>
    l === 'html' ? demo.codeHtml! : l === 'prompt' ? demo.codePrompt! : demo.code;

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

        {/* Panel — `flush` demos fill the panel edge-to-edge (no padding). */}
        {tab === 'preview' ? (
          <div
            className={
              (demo.flush ? 'flex ' : 'flex min-h-[180px] items-center justify-center p-8 ') +
              (tone === 'dark' ? 'bg-bg' : 'bg-light')
            }
          >
            {demo.render()}
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-3">
            {langs.length > 1 && (
              <div className="inline-flex self-start rounded border border-on-light-border p-0.5">
                {langs.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={
                      'rounded-sm px-3 py-1 text-xs font-semibold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' +
                      (active === l ? 'bg-primary text-bg' : 'text-on-light-muted hover:text-on-light')
                    }
                  >
                    {LANG_LABEL[l]}
                  </button>
                ))}
              </div>
            )}
            <CodeBlock code={codeFor(active)} language={LANG_SYNTAX[active]} />
          </div>
        )}
      </div>
    </section>
  );
}
