import type { DocEntry } from '../registry';
import { DemoBlock } from './DemoBlock';
import { CodeBlock } from './CodeBlock';

/** The middle column: explains one component, then its live demos + code. */
export function ComponentPage({ entry }: { entry: DocEntry }) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {entry.category}
        </p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-on-light">
          {entry.name}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-on-light-muted">
          {entry.description}
        </p>
      </header>

      {/* Import */}
      {entry.importLine && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-light-dim">
            Import
          </p>
          <CodeBlock code={entry.importLine} language="tsx" />
        </div>
      )}

      {/* Demos */}
      <div className="flex flex-col gap-10">
        {entry.demos.map((demo) => (
          <DemoBlock key={demo.title} demo={demo} />
        ))}
      </div>
    </article>
  );
}
