import * as React from 'react';

/* Shared control primitives for the interactive background playgrounds. */

export function Slider({
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

export function Segmented({
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
              (value === opt ? 'bg-primary text-bg' : 'text-on-light-muted hover:text-on-light')
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-on-light">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-on-light-border bg-white px-3 py-1.5 text-sm text-on-light placeholder:text-on-light-dim focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-glow"
      />
    </label>
  );
}

export function Toggle({
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
