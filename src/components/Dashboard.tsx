import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import {
  Droplets,
  Power,
  CloudRain,
  Thermometer,
  Wind,
  Clock,
  Sprout,
  Radio,
  Mic,
  ArrowUpRight,
  Loader2,
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

export const Dashboard: React.FC = () => {
  const {
    selectedFarm,
    recommendations,
    togglePump,
    isPumpLoading,
    setPumpMode,
    updateSoilMoisture,
    setIsVoiceAssistantOpen,
    setActiveTab,
  } = useFarmContext();

  const currentRec = recommendations[selectedFarm.id] || recommendations['farm-1'];

  const moistureState = (m: number) => {
    if (m < 25) return { color: palette.ochre, label: 'Running dry' };
    if (m <= 65) return { color: palette.green, label: 'Holding well' };
    return { color: palette.water, label: 'Waterlogged' };
  };
  const moisture = moistureState(selectedFarm.soilMoisture);
  const isCritical = currentRec.status === 'CRITICAL_LOW';

  const quickLinks = [
    { tab: 'weather', title: 'Weather radar', icon: CloudRain },
    { tab: 'analytics', title: 'Water & cost analytics', icon: Sprout },
    { tab: 'community', title: 'Farmer community', icon: ArrowUpRight },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: palette.parchment, color: palette.ink }}>
      <div className="max-w-6xl mx-auto lg:flex">

        {/* SIDEBAR — identity, controls, navigation. Fixed rail rather than a top masthead. */}
        <aside
          className="lg:w-72 lg:min-h-screen lg:sticky lg:top-0 px-6 py-8 flex flex-col justify-between text-white"
          style={{ backgroundColor: palette.greenDeep }}
        >
          <div className="space-y-8">
            <div>
              <div className="text-xs opacity-60">Field record</div>
              <h1 className="font-serif text-3xl mt-1 leading-tight">{selectedFarm.name}</h1>
              <div className="mt-4 space-y-1.5 text-sm opacity-80">
                <div>{selectedFarm.cropType}</div>
                <div>{selectedFarm.location}</div>
                <div>{selectedFarm.areaAcres} acres · {selectedFarm.growthStage}</div>
              </div>
            </div>

            {/* Pump control lives in the rail now, not a metric card */}
            <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-60">Tube-well motor</div>
                  <div className="font-mono text-sm mt-0.5">{selectedFarm.pumpStatus}</div>
                </div>
                <button
                  onClick={() => togglePump(selectedFarm.id)}
                  disabled={isPumpLoading}
                  className="w-12 h-12 flex items-center justify-center transition-colors"
                  style={{ backgroundColor: selectedFarm.pumpStatus === 'ON' ? palette.ochre : palette.green }}
                >
                  {isPumpLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Power className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                {(['AUTO', 'MANUAL'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPumpMode(selectedFarm.id, m)}
                    className="pb-1"
                    style={{
                      opacity: selectedFarm.pumpMode === m ? 1 : 0.55,
                      borderBottom: selectedFarm.pumpMode === m ? '2px solid white' : '2px solid transparent',
                    }}
                  >
                    {m === 'AUTO' ? 'Auto' : 'Manual'}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav className="pt-6 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {quickLinks.map(({ tab, title, icon: Icon }) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className="w-full flex items-center gap-3 py-2.5 text-sm text-left opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Icon className="w-4 h-4" />
                  {title}
                </button>
              ))}
              <button
                onClick={() => setActiveTab('sensors')}
                className="w-full flex items-center gap-3 py-2.5 text-sm text-left opacity-80 hover:opacity-100 transition-opacity"
              >
                <Radio className="w-4 h-4" />
                Open sensors
              </button>
            </nav>
          </div>

          <button
            onClick={() => setIsVoiceAssistantOpen(true)}
            className="w-full mt-8 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.4)' }}
          >
            <Mic className="w-4 h-4" />
            Ask by voice
          </button>
        </aside>

        {/* MAIN — a single vertical stream instead of a banner + grid + list */}
        <main className="flex-1 px-6 sm:px-10 py-10 space-y-10">

          {/* Advisory, now the lead entry in the stream */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: palette.inkSoft }}>Today's recommendation</span>
              <span className="text-xs font-mono" style={{ color: palette.inkSoft }}>{currentRec.timestamp}</span>
            </div>
            <h2
              className="font-serif text-3xl italic"
              style={{ color: isCritical ? palette.ochre : palette.greenDeep }}
            >
              {currentRec.title}
            </h2>
            <p className="text-sm leading-relaxed mt-3 max-w-2xl">{currentRec.actionText}</p>
            <p
              className="text-sm leading-relaxed mt-3 pl-3 max-w-2xl"
              style={{ color: palette.inkSoft, borderLeft: `2px solid ${palette.line}` }}
            >
              Why: {currentRec.reasoning}
            </p>
            <div className="flex gap-8 mt-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.inkSoft }}>
                  <CloudRain className="w-3.5 h-3.5" /> Rain, next 24h
                </div>
                <div className="font-mono text-2xl mt-0.5" style={{ color: palette.water }}>
                  {currentRec.rainProbabilityNext24h}%
                </div>
              </div>
              {currentRec.waterSavingsEstLiters > 0 && (
                <div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>Water saved by waiting</div>
                  <div className="font-mono text-2xl mt-0.5" style={{ color: palette.green }}>
                    ~{currentRec.waterSavingsEstLiters.toLocaleString()} L
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Soil moisture — now a full-width hero entry rather than one of four equal cards */}
          <section className="pt-8" style={{ borderTop: `1px solid ${palette.line}` }}>
            <div className="flex items-center gap-2 text-xs mb-2" style={{ color: palette.inkSoft }}>
              <Droplets className="w-3.5 h-3.5" /> Soil moisture
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10">
              <div className="font-mono text-6xl leading-none" style={{ color: moisture.color }}>
                {selectedFarm.soilMoisture}%
              </div>
              <div className="flex-1 pb-2">
                <div className="text-sm mb-2">{moisture.label}</div>
                <div className="h-1.5 w-full" style={{ backgroundColor: palette.line }}>
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${selectedFarm.soilMoisture}%`, backgroundColor: moisture.color }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-3" style={{ color: palette.inkSoft }}>
                  <span>Simulate sensor reading</span>
                  <span className="font-mono">{selectedFarm.soilMoisture}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={selectedFarm.soilMoisture}
                  onChange={(e) => updateSoilMoisture(selectedFarm.id, parseInt(e.target.value))}
                  className="w-full cursor-pointer mt-1"
                  style={{ accentColor: palette.green }}
                />
              </div>
            </div>
          </section>

          {/* Climate and season impact — paired side by side, lower priority than moisture and the advisory */}
          <section className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-10" style={{ borderTop: `1px solid ${palette.line}` }}>
            <div>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: palette.inkSoft }}>
                <Thermometer className="w-3.5 h-3.5" /> Ambient climate
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="font-mono text-3xl">{selectedFarm.temperature}°</div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>Temperature</div>
                </div>
                <div>
                  <div className="font-mono text-3xl">{selectedFarm.humidity}%</div>
                  <div className="text-xs flex items-center gap-1" style={{ color: palette.inkSoft }}>
                    <Wind className="w-3 h-3" /> Humidity
                  </div>
                </div>
              </div>
              <div className="text-xs flex items-center gap-1.5 mt-3" style={{ color: palette.inkSoft }}>
                <Clock className="w-3.5 h-3.5" /> Read from ESP32, 2 min ago
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: palette.inkSoft }}>
                <Sprout className="w-3.5 h-3.5" /> Season impact
              </div>
              <div className="font-mono text-3xl" style={{ color: palette.green }}>
                {selectedFarm.waterSavedLiters.toLocaleString()} L
              </div>
              <div className="text-xs mb-2" style={{ color: palette.inkSoft }}>Water conserved so far</div>
              <div className="flex gap-8">
                <div>
                  <div className="font-mono">{selectedFarm.carbonSavedKg} kg</div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>CO₂ reduced</div>
                </div>
                <div>
                  <div className="font-mono" style={{ color: palette.green }}>+{selectedFarm.yieldBoostPercent}%</div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>Yield boost</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};