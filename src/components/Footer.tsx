import React from 'react';
import { Droplet, Heart, Cpu, Globe2, Award } from 'lucide-react';

const palette = {
  base: '#2B2420',
  surface: '#3D342C',
  cream: '#F2E9DA',
  tan: '#B8A88F',
  copper: '#C1652F',
  sage: '#6E8B6B',
  line: 'rgba(242,233,218,0.15)',
};

const hardware = [
  'ESP32-WROOM-32 microcontroller',
  'Capacitive soil moisture sensor v1.2',
  'DHT22 temperature & humidity sensor',
  'MQTT over GSM / LoRaWAN',
];

const sdgs = [
  { label: 'SDG 6 — Clean water & sanitation', color: '#5C8AA6' },
  { label: 'SDG 13 — Climate action', color: '#6E8B6B' },
  { label: 'SDG 2 — Zero hunger & sustainable farming', color: '#C1652F' },
  { label: 'SDG 9 — Industry & infrastructure', color: '#9C7FB8' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16" style={{ backgroundColor: palette.base, color: palette.tan }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-10 text-xs">

        {/* Brand + accessibility, split two ways instead of four equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center text-sm font-serif"
                style={{ backgroundColor: palette.copper, color: palette.base }}
              >
                <Droplet className="w-4 h-4" style={{ color: palette.base }} />
              </div>
              <span className="text-base font-serif" style={{ color: palette.cream }}>Smart Water Guardian</span>
            </div>
            <p className="leading-relaxed max-w-md">
              An AI and IoT irrigation platform built for sustainable agriculture, climate
              adaptation, and groundwater conservation.
            </p>
            <div className="flex items-center gap-2" style={{ color: palette.copper }}>
              <Award className="w-4 h-4" /> NextStep Hacks 2026, Environment Challenge
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm" style={{ color: palette.cream }}>Built for every farmer</h4>
            <p className="leading-relaxed">
              Large buttons for low digital literacy, voice recognition in Hindi, Punjabi,
              Gujarati, Marathi and Tamil, and an offline SMS fallback.
            </p>
            <div className="flex items-center gap-2" style={{ color: palette.tan }}>
              <Globe2 className="w-4 h-4" /> Built for Indian and global farmers
            </div>
          </div>
        </div>

        {/* Hardware — a wrapped tag row, not a bulleted column */}
        <div className="pt-6 space-y-3" style={{ borderTop: `1px solid ${palette.line}` }}>
          <h4 className="text-sm" style={{ color: palette.cream }}>IoT and hardware</h4>
          <div className="flex flex-wrap gap-2">
            {hardware.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 px-3 py-1.5"
                style={{ border: `1px solid ${palette.line}` }}
              >
                <Cpu className="w-3.5 h-3.5" style={{ color: palette.sage }} />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* SDG alignment — a colored tag row instead of a bulleted column */}
        <div className="pt-6 space-y-3" style={{ borderTop: `1px solid ${palette.line}` }}>
          <h4 className="text-sm" style={{ color: palette.cream }}>UN SDG alignment</h4>
          <div className="flex flex-wrap gap-2">
            {sdgs.map((s) => (
              <span
                key={s.label}
                className="px-3 py-1.5"
                style={{ border: `1px solid ${s.color}`, color: s.color }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar — heart line and copyright swapped in position */}
        <div
          className="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: `1px solid ${palette.line}` }}
        >
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5" style={{ color: palette.copper, fill: palette.copper }} />
            <span>for farmers and climate action</span>
          </div>
          <p>© 2026 Smart Water Guardian. Open source for agricultural sustainability.</p>
        </div>
      </div>
    </footer>
  );
};