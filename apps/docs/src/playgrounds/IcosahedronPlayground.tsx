import * as React from 'react';
import { Icosahedron } from '@bytenana/ui';
import { Slider, Toggle, TextField } from './controls';

/* Interactive playground for the tumbling hero Icosahedron (canvas). */

export function IcosahedronPlayground() {
  const [size, setSize] = React.useState(340);
  const [opacity, setOpacity] = React.useState(1);
  const [thickness, setThickness] = React.useState(2.6);
  const [radius, setRadius] = React.useState(0.4);
  const [speed, setSpeed] = React.useState(0.18);
  const [faceFill, setFaceFill] = React.useState(true);
  const [vertices, setVertices] = React.useState(false);
  const [dashedHidden, setDashedHidden] = React.useState(true);
  const [pulse, setPulse] = React.useState(true);
  const [animated, setAnimated] = React.useState(true);
  const [center, setCenter] = React.useState('ByteNana');

  return (
    <div className="w-full">
      <div className="flex min-h-[420px] items-center justify-center overflow-hidden bg-bg p-8">
        <Icosahedron
          size={size}
          opacity={opacity}
          thickness={thickness}
          radius={radius}
          speed={speed / 1000}
          faceFill={faceFill}
          vertices={vertices}
          dashedHidden={dashedHidden}
          pulse={pulse}
          animated={animated}
        >
          {center && (
            <span className="font-heading text-xl font-extrabold leading-none text-foreground">
              {center}
            </span>
          )}
        </Icosahedron>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-on-light-border bg-light p-6 sm:grid-cols-2">
        <Slider label="Size" value={size} min={200} max={480} step={4} unit="px" onChange={setSize} />
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
          min={1}
          max={6}
          step={0.2}
          unit="px"
          format={(v) => v.toFixed(1)}
          onChange={setThickness}
        />
        <Slider
          label="Radius"
          value={radius}
          min={0.25}
          max={0.48}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={setRadius}
        />
        <Slider label="Spin speed" value={speed} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={setSpeed} />
        <TextField
          label="Inside the polyhedron"
          value={center}
          placeholder="logo, text, an icon…"
          onChange={setCenter}
        />
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Toggle label="Face fill" checked={faceFill} onChange={setFaceFill} />
          <Toggle label="Vertices" checked={vertices} onChange={setVertices} />
          <Toggle label="Dashed back edges" checked={dashedHidden} onChange={setDashedHidden} />
        </div>
        <div className="flex items-end gap-6">
          <Toggle label="Pulse" checked={pulse} onChange={setPulse} />
          <Toggle label="Animate" checked={animated} onChange={setAnimated} />
        </div>
      </div>

      <div className="border-t border-on-light-border bg-black/[0.02] px-6 py-4">
        <code className="block whitespace-pre-wrap font-mono text-xs text-on-light-muted">
          {`<Icosahedron size={${size}} opacity={${opacity}} thickness={${thickness}} radius={${radius}}
  speed={${(speed / 1000).toFixed(5)}} faceFill={${faceFill}} vertices={${vertices}}
  dashedHidden={${dashedHidden}} pulse={${pulse}} animated={${animated}}` +
            (center
              ? `>\n  {/* anything: logo, text, an icon */}\n  <span>${center}</span>\n</Icosahedron>`
              : ` />`)}
        </code>
      </div>
    </div>
  );
}
