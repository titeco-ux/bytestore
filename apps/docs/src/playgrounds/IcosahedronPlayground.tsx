import * as React from 'react';
import { Icosahedron, Icon } from '@bytenana/ui';
import { Slider, Segmented, Toggle, TextField } from './controls';

/* Interactive playground for the tumbling hero Icosahedron (canvas). */

type CenterType = 'text' | 'icon' | 'none';

export function IcosahedronPlayground() {
  const [faces, setFaces] = React.useState(20);
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

  const [centerType, setCenterType] = React.useState<CenterType>('text');
  const [centerText, setCenterText] = React.useState('ByteNana');
  const [centerIcon, setCenterIcon] = React.useState('mdi:rocket-launch-outline');

  const inside =
    centerType === 'text' && centerText ? (
      <span className="font-heading text-xl font-extrabold leading-none text-foreground">
        {centerText}
      </span>
    ) : centerType === 'icon' && centerIcon ? (
      <Icon icon={centerIcon} className="text-5xl text-primary" />
    ) : null;

  const childCode =
    centerType === 'icon' && centerIcon
      ? `\n  <Icon icon="${centerIcon}" className="text-5xl text-primary" />\n`
      : centerType === 'text' && centerText
        ? `\n  <span>${centerText}</span>\n`
        : '';

  const openTag = `<Icosahedron faces={${faces}} size={${size}} opacity={${opacity}} thickness={${thickness}}
  radius={${radius}} speed={${(speed / 1000).toFixed(5)}} faceFill={${faceFill}} vertices={${vertices}}
  dashedHidden={${dashedHidden}} pulse={${pulse}} animated={${animated}}`;
  const code = childCode ? `${openTag}>${childCode}</Icosahedron>` : `${openTag} />`;

  return (
    <div className="w-full">
      <div className="flex min-h-[420px] items-center justify-center overflow-hidden bg-bg p-8">
        <Icosahedron
          faces={faces as 4 | 8 | 20 | 80}
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
          {inside}
        </Icosahedron>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-on-light-border bg-light p-6 sm:grid-cols-2">
        <Segmented
          label="Faces"
          value={String(faces)}
          options={['4', '8', '20', '80']}
          onChange={(v) => setFaces(Number(v))}
        />
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

        <Segmented
          label="Inside the polyhedron"
          value={centerType}
          options={['text', 'icon', 'none']}
          onChange={(v) => setCenterType(v as CenterType)}
        />
        {centerType === 'text' && (
          <TextField label="Center text" value={centerText} placeholder="ByteNana" onChange={setCenterText} />
        )}
        {centerType === 'icon' && (
          <TextField
            label="Icon (Iconify name)"
            value={centerIcon}
            placeholder="mdi:rocket-launch-outline"
            onChange={setCenterIcon}
          />
        )}

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
        <code className="block whitespace-pre-wrap font-mono text-xs text-on-light-muted">{code}</code>
      </div>
    </div>
  );
}
