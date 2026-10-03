import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import {
  ArrowRight,
  CloudRain,
  TrendingUp,
  Mic,
  Cpu,
  Sliders,
  ShieldCheck,
  Activity,
  Droplet,
} from 'lucide-react';

const palette = {
  parchment: '#EAE3CD',
  panel: '#F6F1E3',
  ink: '#262B1E',
  inkSoft: '#5C6350',
  line: '#CDC3A0',
  green: '#3E6B45',
  greenDeep: '#26422B',
  water: '#2E6C89',
  ochre: '#B0651E',
};

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsVoiceAssistantOpen } = useFarmContext();

  // Problem and solution merged into paired rows for the zigzag narrative
  const pairs = [
    {
      problem: 'Fields are watered on a fixed timer, not on what the soil actually needs — wasting close to 70% of freshwater used in agriculture.',
      solution: 'Capacitive sensors read root-zone moisture continuously, so irrigation starts and stops based on real conditions.',
    },
    {
      problem: 'Deeper borewells and heavier pumping have pushed water tables down year after year.',
      solution: 'A weather-aware AI model prescribes the exact duration needed, cutting pumping time and the electricity bill with it.',
    },
    {
      problem: 'Over-watering suffocates roots, degrades soil, and lets fungal disease take hold before anyone notices.',
      solution: 'Automated valves hold moisture inside a healthy band, and a voice assistant in five regional languages keeps every farmer in the loop.',
    },
  ];

  const features = [
    { n: '01', title: 'Real-time telemetry', body: 'Moisture, humidity, temperature and pump status live from ESP32 field nodes.', icon: Activity },
    { n: '02', title: 'Weather intelligence', body: '7-day rainfall forecasts delay irrigation when rain is coming.', icon: CloudRain },
    { n: '03', title: 'Multilingual voice bot', body: 'Ask in Hindi, Punjabi, Gujarati, Marathi or Tamil, get an answer in kind.', icon: Mic },
    { n: '04', title: 'Auto pump relay', body: 'Trigger rules switch the pump on and off at precise thresholds.', icon: Sliders },
    { n: '05', title: 'Water & carbon impact', body: 'Liters saved, rupees saved, CO₂ reduced — tracked for reporting.', icon: TrendingUp },
    { n: '06', title: 'FPO & NGO portal', body: 'One regional dashboard for cooperatives across many farms.', icon: ShieldCheck },
  ];

  const stack = [
    { title: 'Soil sensors', body: 'Capacitive moisture v1.2 with a DHT22 for temperature and humidity.' },
    { title: 'ESP32 gateway', body: 'Microcontroller transmitting readings over Wi-Fi or GSM.' },
    { title: 'MQTT broker', body: 'Low-latency streaming for sensor telemetry.' },
    { title: 'AI engine', body: 'A crop evapotranspiration model combined with weather data.' },
    { title: 'Farmer app', body: 'Voice assistant, SMS alerts and the web dashboard.' },
  ];

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans">

      {/* TOP IDENTITY BAR — new, wasn't here before */}
      <div
        className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4"
        style={{ borderBottom: `1px solid ${palette.line}` }}
      >
        <span className="font-serif text-lg">Smart Water Guardian</span>
        <div className="hidden sm:flex items-center gap-8 text-xs" style={{ color: palette.inkSoft }}>
          <span>NextStep Hacks 2026</span>
          <span>ESP32 · MQTT · React</span>
        </div>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-xs px-4 py-2 text-white"
          style={{ backgroundColor: palette.green }}
        >
          Open dashboard
        </button>
      </div>

      {/* HERO — pure typography, centered, no side panel */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 text-center max-w-3xl mx-auto space-y-6">
        <h1 className="font-serif text-5xl sm:text-6xl leading-[1.05]">
          Water the field, not the calendar
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: palette.inkSoft }}>
          An AI and IoT irrigation platform that reads the soil instead of the clock —
          saving up to 50% of water while lifting crop yield.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className="px-5 py-3 text-sm text-white flex items-center gap-2"
            style={{ backgroundColor: palette.green }}
          >
            Test the AI engine <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsVoiceAssistantOpen(true)}
            className="px-5 py-3 text-sm flex items-center gap-2"
            style={{ border: `1px solid ${palette.ink}` }}
          >
            <Mic className="w-4 h-4" /> Try voice, Hindi or English
          </button>
        </div>
      </section>

      {/* TICKER — stats and live telemetry fused into one strip, not separate blocks */}
      <section
        className="grid grid-cols-2 sm:grid-cols-4 divide-x"
        style={{ borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}`, borderColor: palette.line, backgroundColor: palette.panel }}
      >
        {[
          ['Water saved', '30–50%', palette.green],
          ['Electricity saved', '₹4,200/mo', palette.water],
          ['Yield boost', '+15%', palette.ochre],
        ].map(([label, value, color]) => (
          <div key={label as string} className="px-6 py-6">
            <div className="font-mono text-2xl" style={{ color: color as string }}>{value}</div>
            <div className="text-xs mt-1" style={{ color: palette.inkSoft }}>{label}</div>
          </div>
        ))}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: palette.green }} />
            <span style={{ color: palette.inkSoft }}>Live node</span>
          </div>
          <div className="font-mono text-2xl" style={{ color: palette.ochre }}>26%</div>
          <div className="text-xs" style={{ color: palette.inkSoft }}>Root-zone moisture, below threshold</div>
        </div>
      </section>

      {/* ZIGZAG PROBLEM/SOLUTION — alternating rows, not a two-column box */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 max-w-5xl mx-auto space-y-16">
        <h2 className="font-serif text-3xl max-w-xl">
          Every field problem, answered in the same breath
        </h2>

        <div className="space-y-14">
          {pairs.map((pair, i) => (
            <div
              key={pair.problem.slice(0, 12)}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="pl-4" style={{ borderLeft: `2px solid ${palette.ochre}` }}>
                <div className="text-xs mb-1" style={{ color: palette.ochre }}>Without it</div>
                <p className="text-sm leading-relaxed">{pair.problem}</p>
              </div>
              <div className="pl-4" style={{ borderLeft: `2px solid ${palette.green}` }}>
                <div className="text-xs mb-1" style={{ color: palette.green }}>With Smart Water Guardian</div>
                <p className="text-sm leading-relaxed">{pair.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — a magazine index, not a card grid */}
      <section style={{ backgroundColor: palette.panel, borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <div className="px-4 sm:px-8 lg:px-12 py-20 max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl mb-10">What's in the platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            {features.map(({ n, title, body, icon: Icon }) => (
              <div key={n} className="flex items-baseline gap-4 py-5" style={{ borderTop: `1px solid ${palette.line}` }}>
                <span className="font-mono text-xs shrink-0" style={{ color: palette.inkSoft }}>{n}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: palette.green }} />
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: palette.inkSoft }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HARDWARE STACK — vertical timeline, not a horizontal strip */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl mb-2">How a field node works</h2>
        <p className="text-sm mb-10" style={{ color: palette.inkSoft }}>Roughly ₹3,500 in hardware per node.</p>

        <div className="relative pl-8" style={{ borderLeft: `2px solid ${palette.line}` }}>
          {stack.map((step, i) => (
            <div key={step.title} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[2.55rem] w-4 h-4 flex items-center justify-center text-[10px] font-mono text-white"
                style={{ backgroundColor: palette.green }}
              >
                {i + 1}
              </span>
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs mt-1" style={{ color: palette.inkSoft }}>{step.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING BAND — dark, new; bookends the light page with the sidebar's tone */}
      <section
        className="px-4 sm:px-8 lg:px-12 py-16 text-center text-white space-y-5"
        style={{ backgroundColor: palette.greenDeep }}
      >
        <Droplet className="w-6 h-6 mx-auto opacity-70" />
        <h2 className="font-serif text-3xl">Ready to see your own field's numbers?</h2>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-6 py-3 text-sm inline-flex items-center gap-2"
          style={{ border: '1px solid rgba(255,255,255,0.5)' }}
        >
          Open the farmer dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};