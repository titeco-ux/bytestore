import * as React from 'react';
import { OrbitRings } from '@bytenana/ui';

/* Interactive playground for the OrbitRings hero shape — dark preview on top,
   light control panel below. Lets the user tweak every prop live. */

type LineStyle = 'solid' | 'dashed' | 'dotted';

export function OrbitRingsPlayground() {
  const [size, setSize] = React.useState(300);
  const [opacity, setOpacity] = React.useState(1);
  const [thickness, setThickness] = React.useState(1.5);
  const [rings, setRings] = React.useState(3);
  const [lineStyle, setLineStyle] = React.useState<LineStyle>('solid');
  const [dots, setDots] = React.useState(true);
  const [animated, setAnimated] = React.useState(true);

  return (
    <div className="w-full">
      {/* Preview */}
      <div className="flex min-h-[380px] items-center justify-center overflow-hidden bg-bg p-8">
        <OrbitRings
          size={size}
          opacity={opacity}
          thickness={thickness}
          rings={rings}
          lineStyle={lineStyle}
          dots={dots}
          animated={animated}
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-on-light-border bg-light p-6 sm:grid-cols-2">
        <Slider label="Size" value={size} min={140} max={440} step={4} unit="px" onChange={setSize} />
        <Slider
          label="Opacity"
          value={opacity}
          min={0.1}
          max={1}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={setOpacity}
        />
        <Slider
          label="Border thickness"
          value={thickness}
          min={0.5}
          max={8}
          step={0.5}
          unit="px"
          onChange={setThickness}
        />
        <Slider label="Rings" value={rings} min={1} max={4} step={1} onChange={setRings} />

        <Segmented
          label="Line style"
          value={lineStyle}
          options={['solid', 'dashed', 'dotted']}
          onChange={(v) => setLineStyle(v as LineStyle)}
        />

        <div className="flex items-end gap-6">
          <Toggle label="Dots" checked={dots} onChange={setDots} />
          <Toggle label="Animated" checked={animated} onChange={setAnimated} />
        </div>
      </div>

      {/* Live code readout */}
      <div className="border-t border-on-light-border bg-black/[0.02] px-6 py-4">
        <code className="block whitespace-pre-wrap font-mono text-xs text-on-light-muted">
          {`<OrbitRings size={${size}} opacity={${opacity}} thickness={${thickness}}
  rings={${rings}} lineStyle="${lineStyle}" dots={${dots}} animated={${animated}} />`}
        </code>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ controls */

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-sm font-medium text-on-light">
        {label}
        <span className="font-mono text-xs text-on-light-muted">
          {format ? format(value) : value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-primary"
      />
    </label>
  );
}

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-on-light">{label}</span>
      <div className="inline-flex rounded border border-on-light-border p-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={
              'flex-1 rounded-sm px-3 py-1.5 text-xs font-semibold capitalize transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' +
              (value === opt
                ? 'bg-primary text-bg'
                : 'text-on-light-muted hover:text-on-light')
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-on-light">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-primary"
      />
      {label}
    </label>
  );
}
