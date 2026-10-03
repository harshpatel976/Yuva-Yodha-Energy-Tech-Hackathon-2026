import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_WATER_ANALYTICS } from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, IndianRupee, Leaf, Droplet } from 'lucide-react';

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

const PERIODS = ['Weekly', 'Monthly', 'Season'] as const;

export const AnalyticsCenter: React.FC = () => {
  const { selectedFarm } = useFarmContext();
  const [period, setPeriod] = useState<typeof PERIODS[number]>('Weekly');

  const kpis = [
    { label: 'Water saved this week', value: '18,700 L', note: '44% below flood irrigation', color: palette.green, icon: Droplet },
    { label: 'Electricity bill saved', value: '₹1,435', note: '18.5 pump hours saved', color: palette.ochre, icon: IndianRupee },
    { label: 'CO₂ footprint reduced', value: `${selectedFarm.carbonSavedKg} kg`, note: 'Diesel generator stayed off', color: palette.water, icon: Leaf },
    { label: 'Yield improvement', value: `+${selectedFarm.yieldBoostPercent}%`, note: 'Prevents root rot', color: palette.greenDeep, icon: TrendingUp },
  ];

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs" style={{ color: palette.inkSoft }}>Water & carbon analytics</div>
            <h1 className="font-serif text-3xl mt-1">Savings for {selectedFarm.name}</h1>
            <p className="text-sm mt-2" style={{ color: palette.inkSoft }}>
              Quantified environmental and financial impact, measured against traditional irrigation.
            </p>
          </div>
          <div className="flex gap-5 text-sm">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="pb-1"
                style={{
                  color: period === p ? palette.ink : palette.inkSoft,
                  borderBottom: period === p ? `2px solid ${palette.green}` : '2px solid transparent',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI LEDGER STRIP — one row, not four separate cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x"
          style={{ border: `1px solid ${palette.line}`, borderColor: palette.line, backgroundColor: palette.panel }}
        >
          {kpis.map(({ label, value, note, color, icon: Icon }) => (
            <div key={label} className="p-5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.inkSoft }}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </div>
              <div className="font-mono text-2xl" style={{ color }}>{value}</div>
              <div className="text-xs" style={{ color: palette.inkSoft }}>{note}</div>
            </div>
          ))}
        </div>

        {/* CHARTS — side by side, not stacked full-width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Smart irrigation vs traditional flood irrigation</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_WATER_ANALYTICS}>
                  <CartesianGrid strokeDasharray="3 3" stroke={palette.line} />
                  <XAxis dataKey="date" stroke={palette.inkSoft} fontSize={11} />
                  <YAxis stroke={palette.inkSoft} fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: palette.panel, border: `1px solid ${palette.line}`, color: palette.ink, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: palette.inkSoft }} />
                  <Bar dataKey="actualUsed" name="Smart Water Guardian (L)" fill={palette.green} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="traditionalUsed" name="Traditional irrigation (L)" fill={palette.line} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Daily net water conserved</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_WATER_ANALYTICS}>
                  <defs>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={palette.water} stopOpacity={0.5} />
                      <stop offset="95%" stopColor={palette.water} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={palette.line} />
                  <XAxis dataKey="date" stroke={palette.inkSoft} fontSize={11} />
                  <YAxis stroke={palette.inkSoft} fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: palette.panel, border: `1px solid ${palette.line}`, color: palette.ink, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="saved" name="Net conserved (L)" stroke={palette.water} fillOpacity={1} fill="url(#colorSaved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};