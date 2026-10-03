import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { ShieldCheck, Send, MapPin } from 'lucide-react';

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

export const AdminPanel: React.FC = () => {
  const { farms, sensors, showNotification } = useFarmContext();
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const totalAcres = farms.reduce((acc, f) => acc + f.areaAcres, 0);
  const totalWaterSaved = farms.reduce((acc, f) => acc + f.waterSavedLiters, 0);
  const onlineSensors = sensors.filter((s) => s.status === 'ONLINE').length;

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    showNotification(`Emergency broadcast dispatched via WhatsApp/SMS to all registered farmers: "${broadcastMessage.trim()}"`);
    setBroadcastMessage('');
  };

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">

        {/* HEADER — stats folded in as ledger fields, not a separate card row */}
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs" style={{ color: palette.inkSoft }}>
                <ShieldCheck className="w-3.5 h-3.5" /> FPO regional portal
              </div>
              <h1 className="font-serif text-3xl mt-1">Cluster oversight</h1>
              <p className="text-sm mt-2 max-w-xl" style={{ color: palette.inkSoft }}>
                Water conservation, IoT nodes and heatwave alerts across the district's farm clusters.
              </p>
            </div>
            <div className="text-xs font-mono" style={{ color: palette.water }}>
              Role — FPO regional director
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-4" style={{ borderTop: `1px solid ${palette.line}` }}>
            {[
              ['Registered farms', `${farms.length} clusters`, palette.ink],
              ['Cultivated area', `${totalAcres} acres`, palette.ink],
              ['Water conserved', `${totalWaterSaved.toLocaleString()} L`, palette.green],
              ['Sensors online', `${onlineSensors} / ${sensors.length}`, palette.water],
              ['Crops loaded', 'Wheat, cotton, rice', palette.ochre],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="font-mono text-xl" style={{ color: color as string }}>{value}</div>
                <div className="text-xs" style={{ color: palette.inkSoft }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN — table and broadcast form side by side, not stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-serif text-2xl">Cluster telemetry</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${palette.ink}` }}>
                    <th className="py-2 pr-3 font-normal" style={{ color: palette.inkSoft }}>Farm</th>
                    <th className="py-2 pr-3 font-normal" style={{ color: palette.inkSoft }}>Location</th>
                    <th className="py-2 pr-3 font-normal" style={{ color: palette.inkSoft }}>Crop</th>
                    <th className="py-2 pr-3 font-normal" style={{ color: palette.inkSoft }}>Moisture</th>
                    <th className="py-2 pr-3 font-normal" style={{ color: palette.inkSoft }}>Pump</th>
                    <th className="py-2 pr-3 font-normal text-right" style={{ color: palette.inkSoft }}>Water saved</th>
                    <th className="py-2 font-normal text-right" style={{ color: palette.inkSoft }}></th>
                  </tr>
                </thead>
                <tbody>
                  {farms.map((f) => (
                    <tr key={f.id} style={{ borderBottom: `1px solid ${palette.line}` }}>
                      <td className="py-3 pr-3 font-medium">{f.name}</td>
                      <td className="py-3 pr-3" style={{ color: palette.inkSoft }}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {f.location}
                        </span>
                      </td>
                      <td className="py-3 pr-3" style={{ color: palette.inkSoft }}>{f.cropType}</td>
                      <td className="py-3 pr-3 font-mono" style={{ color: palette.green }}>{f.soilMoisture}%</td>
                      <td className="py-3 pr-3">
                        <span style={{ color: f.pumpStatus === 'ON' ? palette.green : palette.inkSoft }}>
                          {f.pumpStatus} ({f.pumpMode})
                        </span>
                      </td>
                      <td className="py-3 pr-3 font-mono text-right" style={{ color: palette.green }}>
                        {f.waterSavedLiters.toLocaleString()} L
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => showNotification(`Audit report dispatched for ${f.name}`)}
                          className="text-xs underline"
                          style={{ color: palette.water }}
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Broadcast alert — a side panel instead of a full-width section below */}
          <div className="lg:col-span-4 space-y-3 lg:pl-8 lg:border-l" style={{ borderColor: palette.line }}>
            <h2 className="font-serif text-2xl">District alert</h2>
            <p className="text-xs" style={{ color: palette.inkSoft }}>
              Sent over SMS and WhatsApp, auto-translated to Hindi, Punjabi and Gujarati.
            </p>
            <form onSubmit={handleBroadcastAlert} className="space-y-3">
              <textarea
                rows={5}
                required
                placeholder="e.g. Heatwave warning for Ludhiana district. Irrigate between 5–7 AM to prevent evaporation loss."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full px-4 py-2.5 text-sm focus:outline-none"
                style={{ backgroundColor: palette.panel, border: `1px solid ${palette.line}`, color: palette.ink }}
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: palette.water }}
              >
                <Send className="w-4 h-4" /> Send to all farmers
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};