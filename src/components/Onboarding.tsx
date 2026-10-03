import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import type { Language } from '../types';
import { Droplet, ArrowRight } from 'lucide-react';

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

const CROPS = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Other'];
const STAGES = ['Seedling', 'Vegetative', 'Flowering', 'Maturity'];
const LANGUAGES: { code: Language; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिन्दी' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ' },
  { code: 'gu', native: 'ગુજરાતી' },
  { code: 'mr', native: 'मराठी' },
  { code: 'ta', native: 'தமிழ்' },
];

// Shape assumed from usage across Dashboard, AdminPanel, etc.
// Starter telemetry values are placeholders until real sensors report in.
export interface NewFarmProfile {
  id: string;
  name: string;
  location: string;
  cropType: string;
  areaAcres: number;
  growthStage: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  pumpStatus: 'ON' | 'OFF';
  pumpMode: 'AUTO' | 'MANUAL';
  waterSavedLiters: number;
  carbonSavedKg: number;
  yieldBoostPercent: number;
}

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { setLanguage, setUserRole, showNotification } = useFarmContext() as any;

  const [farmerName, setFarmerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [cropType, setCropType] = useState(CROPS[0]);
  const [areaAcres, setAreaAcres] = useState('');
  const [growthStage, setGrowthStage] = useState(STAGES[0]);
  const [language, setLocalLanguage] = useState<Language>('en');
  const [role, setRole] = useState<'farmer' | 'admin'>('farmer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim() || !location.trim() || !areaAcres.trim()) return;

    const profile: NewFarmProfile = {
      id: `farm-${Date.now()}`,
      name: farmName.trim(),
      location: location.trim(),
      cropType,
      areaAcres: Number(areaAcres) || 0,
      growthStage,
      soilMoisture: 40,
      temperature: 28,
      humidity: 55,
      pumpStatus: 'OFF',
      pumpMode: 'AUTO',
      waterSavedLiters: 0,
      carbonSavedKg: 0,
      yieldBoostPercent: 0,
    };

    // Persist so the flow only runs once, and so the app can pick this up
    // even before FarmContext is wired to read it (see integration note).
    localStorage.setItem('swg_onboarded', 'true');
    localStorage.setItem('swg_farmer_name', farmerName.trim());
    localStorage.setItem('swg_new_farm', JSON.stringify(profile));

    // Best-effort calls into context — safe no-ops if a function isn't defined yet.
    setLanguage?.(language);
    setUserRole?.(role);
    showNotification?.(`Welcome, ${farmerName.trim() || 'farmer'} — ${profile.name} is set up.`);

    onComplete();
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${palette.line}`,
    color: palette.ink,
  };

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-16 space-y-10">

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs" style={{ color: palette.inkSoft }}>
            <Droplet className="w-3.5 h-3.5" /> First-time setup
          </div>
          <h1 className="font-serif text-4xl">Let's set up your field record</h1>
          <p className="text-sm" style={{ color: palette.inkSoft }}>
            A few details and Smart Water Guardian builds your dashboard, advisory and
            telemetry views around your farm — no account or password needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Farmer */}
          <div className="space-y-5">
            <h2 className="text-sm" style={{ color: palette.inkSoft }}>About you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Your name</span>
                <input
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Ranjit Singh"
                  className="w-full py-2 text-sm focus:outline-none"
                  style={inputStyle}
                />
              </label>
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>I'll mostly use this as</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'farmer' | 'admin')}
                  className="w-full py-2 text-sm focus:outline-none bg-transparent"
                  style={inputStyle}
                >
                  <option value="farmer">Farmer</option>
                  <option value="admin">Admin / FPO</option>
                </select>
              </label>
            </div>
          </div>

          {/* Farm */}
          <div className="space-y-5 pt-2" style={{ borderTop: `1px solid ${palette.line}` }}>
            <h2 className="text-sm pt-6" style={{ color: palette.inkSoft }}>Your farm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="block sm:col-span-2">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Farm name</span>
                <input
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Green Valley Farm"
                  className="w-full py-2 text-sm focus:outline-none"
                  style={inputStyle}
                />
              </label>
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Location</span>
                <input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ludhiana, Punjab"
                  className="w-full py-2 text-sm focus:outline-none"
                  style={inputStyle}
                />
              </label>
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Area (acres)</span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.1"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full py-2 text-sm focus:outline-none"
                  style={inputStyle}
                />
              </label>
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Crop type</span>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full py-2 text-sm focus:outline-none bg-transparent"
                  style={inputStyle}
                >
                  {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs" style={{ color: palette.inkSoft }}>Growth stage</span>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full py-2 text-sm focus:outline-none bg-transparent"
                  style={inputStyle}
                >
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-3 pt-2" style={{ borderTop: `1px solid ${palette.line}` }}>
            <h2 className="text-sm pt-6" style={{ color: palette.inkSoft }}>Preferred language</h2>
            <div className="flex flex-wrap gap-5 text-sm">
              {LANGUAGES.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => setLocalLanguage(l.code)}
                  className="pb-1"
                  style={{
                    color: language === l.code ? palette.ink : palette.inkSoft,
                    borderBottom: language === l.code ? `2px solid ${palette.green}` : '2px solid transparent',
                  }}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-sm text-white flex items-center gap-2"
            style={{ backgroundColor: palette.green }}
          >
            Create my farm profile <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};