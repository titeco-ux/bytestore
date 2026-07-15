import * as React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/** Syntax-highlighted code block with a copy button (light theme). */
export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }, [code]);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-on-light-border bg-bg">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 rounded border border-white/10 bg-surface-2 px-2 py-1 text-xs font-medium text-muted transition-colors duration-fast hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="scroll-quiet overflow-x-auto p-4 text-sm leading-relaxed"
            style={{ ...style, background: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
