import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { BrainCircuit, CheckCircle2, Zap } from 'lucide-react';

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

export const AiRecommendation: React.FC = () => {
  const { selectedFarm, recommendations, togglePump, setPumpMode } = useFarmContext();
  const currentRec = recommendations[selectedFarm.id] || recommendations['farm-1'];

  const steps = [
    {
      title: 'Telemetry ingestion',
      body: 'Reads soil moisture (volumetric water content), ambient temperature, humidity and solar radiation from ESP32 field nodes every 15 minutes.',
    },
    {
      title: 'Crop coefficient',
      body: `Calculates crop water requirement as ETc = ETo × Kc, tuned for ${selectedFarm.cropType} at the ${selectedFarm.growthStage} stage.`,
    },
    {
      title: 'Weather fusion',
      body: 'Folds in the 7-day forecast. If rain probability exceeds 65%, irrigation is delayed to use it instead.',
    },
  ];

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs" style={{ color: palette.inkSoft }}>AI irrigation advisor</div>
            <h1 className="font-serif text-3xl mt-1">How the model decides</h1>
            <p className="text-sm mt-2 max-w-xl" style={{ color: palette.inkSoft }}>
              Crop water requirement via the FAO Penman-Monteith equation, fused with live
              sensor data and hyper-local weather.
            </p>
          </div>
          <div className="text-xs font-mono" style={{ color: palette.green }}>
            Model accuracy — 96.4%
          </div>
        </div>

        {/* THE MODEL — a real sequence, so numbering earns its place, shown first */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ border: `1px solid ${palette.line}` }}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="p-6 space-y-2"
              style={{ borderTop: i > 0 ? undefined : undefined, borderLeft: i > 0 ? `1px solid ${palette.line}` : undefined }}
            >
              <div className="font-mono text-xs" style={{ color: palette.green }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-sm font-medium">{step.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: palette.inkSoft }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* ACTIVE RECOMMENDATION — the output of the model above, as a field note */}
        <div className="pt-4" style={{ borderTop: `1px solid ${palette.line}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: palette.inkSoft }}>Active prescription</span>
            <span className="text-xs font-mono" style={{ color: palette.inkSoft }}>{currentRec.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-serif text-3xl italic" style={{ color: palette.greenDeep }}>
                {currentRec.title}
              </h2>
              <p className="text-sm leading-relaxed max-w-2xl">{currentRec.actionText}</p>
              <p
                className="text-sm leading-relaxed max-w-2xl pl-3"
                style={{ color: palette.inkSoft, borderLeft: `2px solid ${palette.line}` }}
              >
                {currentRec.reasoning}
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => togglePump(selectedFarm.id)}
                  className="px-5 py-2.5 text-sm text-white flex items-center gap-2"
                  style={{ backgroundColor: palette.green }}
                >
                  <Zap className="w-4 h-4" /> Execute — toggle pump
                </button>
                <button
                  onClick={() => setPumpMode(selectedFarm.id, 'AUTO')}
                  className="px-5 py-2.5 text-sm flex items-center gap-2"
                  style={{ border: `1px solid ${palette.ink}` }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Enable full autonomous mode
                </button>
              </div>
            </div>

            {/* Impact — ledger fields, not nested dark boxes */}
            <div className="lg:col-span-4 space-y-4 lg:pl-8 lg:border-l" style={{ borderColor: palette.line }}>
              <div className="text-xs" style={{ color: palette.inkSoft }}>Impact for {selectedFarm.name}</div>
              <div>
                <div className="text-xs" style={{ color: palette.inkSoft }}>Estimated water savings</div>
                <div className="font-mono text-3xl" style={{ color: palette.green }}>
                  ~{currentRec.waterSavingsEstLiters.toLocaleString()} L
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: palette.inkSoft }}>24-hour rain risk</div>
                <div className="font-mono text-3xl" style={{ color: palette.water }}>
                  {currentRec.rainProbabilityNext24h}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};