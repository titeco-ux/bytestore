import * as React from 'react';
import { DottedMesh } from '@bytenana/ui';
import { Slider, Segmented, Toggle } from './controls';

/* Interactive playground for the DottedMesh background. */

type Variant = 'dots-light' | 'dots-dark';
type Speed = 'slow' | 'normal' | 'fast';

export function DottedMeshPlayground() {
  const [variant, setVariant] = React.useState<Variant>('dots-light');
  const [speed, setSpeed] = React.useState<Speed>('fast');
  const [gap, setGap] = React.useState(28);
  const [opacity, setOpacity] = React.useState(1);
  const [height, setHeight] = React.useState(360);
  const [animated, setAnimated] = React.useState(true);

  const onDark = variant === 'dots-light';

  return (
    <div className="w-full">
      <div className={onDark ? 'bg-bg' : 'bg-light'}>
        <DottedMesh
          variant={variant}
          speed={speed}
          gap={gap}
          animated={animated}
          style={{ opacity, height }}
          className="flex w-full items-center justify-center"
        >
          <span
            className={
              'font-heading text-sm font-semibold uppercase tracking-[0.15em] ' +
              (onDark ? 'text-dim' : 'text-on-light-dim')
            }
          >
            {animated ? 'Drifting dot mesh' : 'Static dot mesh'}
          </span>
        </DottedMesh>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-on-light-border bg-light p-6 sm:grid-cols-2">
        <Segmented
          label="Dots"
          value={variant === 'dots-light' ? 'light' : 'dark'}
          options={['light', 'dark']}
          onChange={(v) => setVariant(v === 'light' ? 'dots-light' : 'dots-dark')}
        />
        <Segmented
          label="Speed"
          value={speed}
          options={['slow', 'normal', 'fast']}
          onChange={(v) => setSpeed(v as Speed)}
        />
        <Slider label="Gap" value={gap} min={16} max={48} step={2} unit="px" onChange={setGap} />
        <Slider
          label="Opacity"
          value={opacity}
          min={0.2}
          max={1}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={setOpacity}
        />
        <Slider label="Height" value={height} min={220} max={560} step={10} unit="px" onChange={setHeight} />
        <div className="flex items-end">
          <Toggle label="Animated" checked={animated} onChange={setAnimated} />
        </div>
      </div>

      <div className="border-t border-on-light-border bg-black/[0.02] px-6 py-4">
        <code className="block whitespace-pre-wrap font-mono text-xs text-on-light-muted">
          {`<DottedMesh variant="${variant}" speed="${speed}" gap={${gap}} animated={${animated}}
  style={{ opacity: ${opacity} }} className="h-[${height}px]" />`}
        </code>
      </div>
    </div>
  );
}
