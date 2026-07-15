import * as React from 'react';
import { Icosahedron } from '@bytenana/ui';
import { Slider, Segmented, Toggle } from './controls';

/* Interactive playground for the pulsating hero Icosahedron. */

type LineStyle = 'solid' | 'dashed' | 'dotted';

export function IcosahedronPlayground() {
  const [size, setSize] = React.useState(320);
  const [opacity, setOpacity] = React.useState(1);
  const [thickness, setThickness] = React.useState(1.5);
  const [lineStyle, setLineStyle] = React.useState<LineStyle>('solid');
  const [vertices, setVertices] = React.useState(true);
  const [pulse, setPulse] = React.useState(true);
  const [spin, setSpin] = React.useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-[400px] items-center justify-center overflow-hidden bg-bg p-8">
        <Icosahedron
          size={size}
          opacity={opacity}
          thickness={thickness}
          lineStyle={lineStyle}
          vertices={vertices}
          pulse={pulse}
          spin={spin}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-on-light-border bg-light p-6 sm:grid-cols-2">
        <Slider label="Size" value={size} min={160} max={460} step={4} unit="px" onChange={setSize} />
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
        <Segmented
          label="Line style"
          value={lineStyle}
          options={['solid', 'dashed', 'dotted']}
          onChange={(v) => setLineStyle(v as LineStyle)}
        />
        <div className="flex items-end gap-6">
          <Toggle label="Vertices" checked={vertices} onChange={setVertices} />
          <Toggle label="Pulse" checked={pulse} onChange={setPulse} />
          <Toggle label="Spin" checked={spin} onChange={setSpin} />
        </div>
      </div>

      <div className="border-t border-on-light-border bg-black/[0.02] px-6 py-4">
        <code className="block whitespace-pre-wrap font-mono text-xs text-on-light-muted">
          {`<Icosahedron size={${size}} opacity={${opacity}} thickness={${thickness}}
  lineStyle="${lineStyle}" vertices={${vertices}} pulse={${pulse}} spin={${spin}} />`}
        </code>
      </div>
    </div>
  );
}
