import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { Battery, Plus, Wifi } from 'lucide-react';

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

const hardware = [
  { part: 'Microcontroller gateway', spec: 'ESP32-WROOM-32 (Wi-Fi + BLE + GSM)', purpose: 'Reads analog moisture data and sends MQTT packets', cost: 450 },
  { part: 'Soil moisture sensor', spec: 'Capacitive moisture sensor v1.2, corrosion resistant', purpose: 'Measures dielectric permittivity of soil', cost: 120 },
  { part: 'Climate sensor', spec: 'DHT22 / AM2302 temperature & humidity sensor', purpose: 'Measures ambient microclimate evapotranspiration', cost: 220 },
  { part: 'Relay module', spec: '5V 10A optocoupler relay board', purpose: 'Controls the water pump starter relay', cost: 90 },
  { part: 'Solar power & battery', spec: '5V solar panel with 18650 Li-ion 3.7V battery', purpose: '24/7 off-grid power supply in the field', cost: 850 },
];

export const SensorMonitoring: React.FC = () => {
  const { sensors, selectedFarmId, selectedFarm, addSensorNode, showNotification } = useFarmContext();
  const [newSensorName, setNewSensorName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const farmSensors = sensors.filter((s) => s.farmId === selectedFarmId);
  const onlineCount = farmSensors.filter((s) => s.status === 'ONLINE').length;
  const avgBattery = farmSensors.length
    ? Math.round(farmSensors.reduce((a, s) => a + s.batteryLevel, 0) / farmSensors.length)
    : 0;
  const avgSignal = farmSensors.length
    ? Math.round(farmSensors.reduce((a, s) => a + s.signalStrength, 0) / farmSensors.length)
    : 0;

  const handleAddSensor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSensorName.trim()) return;
    addSensorNode(selectedFarmId, newSensorName.trim());
    setNewSensorName('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs" style={{ color: palette.inkSoft }}>IoT telemetry</div>
            <h1 className="font-serif text-3xl mt-1">Hardware nodes for {selectedFarm.name}</h1>
            <p className="text-sm mt-2 max-w-xl" style={{ color: palette.inkSoft }}>
              ESP32 microcontrollers, capacitive soil sensors and solar gateways reporting
              from the field.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 text-sm text-white flex items-center gap-2 self-start"
            style={{ backgroundColor: palette.green }}
          >
            <Plus className="w-4 h-4" /> Add sensor node
          </button>
        </div>

        {/* SUMMARY STRIP — new, wasn't in the original */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 divide-x"
          style={{ border: `1px solid ${palette.line}`, borderColor: palette.line, backgroundColor: palette.panel }}
        >
          {[
            ['Nodes paired', farmSensors.length, palette.ink],
            ['Online now', onlineCount, palette.green],
            ['Avg. battery', `${avgBattery}%`, palette.ochre],
            ['Avg. signal', `${avgSignal}%`, palette.water],
          ].map(([label, value, color]) => (
            <div key={label as string} className="px-5 py-4">
              <div className="font-mono text-2xl" style={{ color: color as string }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: palette.inkSoft }}>{label}</div>
            </div>
          ))}
        </div>

        {/* SENSOR LIST — a vertical list of entries, not a grid of cards */}
        <div>
          {farmSensors.map((sensor) => (
            <div
              key={sensor.id}
              className="py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"
              style={{ borderBottom: `1px solid ${palette.line}` }}
            >
              <div className="lg:w-48 shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: sensor.status === 'ONLINE' ? palette.green : palette.ochre }}
                  />
                  <span className="text-sm font-medium">{sensor.nodeName}</span>
                </div>
                <div className="text-[10px] font-mono mt-0.5" style={{ color: palette.inkSoft }}>
                  {sensor.firmwareVersion}
                </div>
              </div>

              <div className="flex gap-8">
                <div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>Soil moisture</div>
                  <div className="font-mono text-xl" style={{ color: palette.green }}>{sensor.moistureReading}%</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>Soil temp</div>
                  <div className="font-mono text-xl" style={{ color: palette.ochre }}>{sensor.tempReading}°C</div>
                </div>
              </div>

              <div className="flex gap-6 text-xs" style={{ color: palette.inkSoft }}>
                <span className="flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5" /> {sensor.batteryLevel}%
                </span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" /> {sensor.signalStrength}%
                </span>
              </div>

              <div className="flex-1 flex justify-between items-center text-xs lg:justify-end lg:gap-6" style={{ color: palette.inkSoft }}>
                <span>Last packet {sensor.lastUpdated}</span>
                <button
                  onClick={() => showNotification(`Calibrated ${sensor.nodeName} offset successfully.`)}
                  className="underline"
                  style={{ color: palette.green }}
                >
                  Calibrate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* HARDWARE COST TABLE — a plain ledger table, not a dark data-grid */}
        <div className="pt-4 space-y-4">
          <h2 className="font-serif text-2xl">Hardware schematic and cost</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${palette.ink}` }}>
                  <th className="py-2 pr-4 font-normal" style={{ color: palette.inkSoft }}>Component</th>
                  <th className="py-2 pr-4 font-normal" style={{ color: palette.inkSoft }}>Specification</th>
                  <th className="py-2 pr-4 font-normal" style={{ color: palette.inkSoft }}>Purpose</th>
                  <th className="py-2 font-normal text-right" style={{ color: palette.inkSoft }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {hardware.map((row) => (
                  <tr key={row.part} style={{ borderBottom: `1px solid ${palette.line}` }}>
                    <td className="py-3 pr-4 font-medium">{row.part}</td>
                    <td className="py-3 pr-4" style={{ color: palette.inkSoft }}>{row.spec}</td>
                    <td className="py-3 pr-4" style={{ color: palette.inkSoft }}>{row.purpose}</td>
                    <td className="py-3 font-mono text-right" style={{ color: palette.green }}>₹{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD SENSOR MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(38,43,30,0.6)' }}
        >
          <div className="w-full max-w-md p-6 space-y-4" style={{ backgroundColor: palette.panel }}>
            <h3 className="font-serif text-xl">Pair a new field sensor</h3>
            <form onSubmit={handleAddSensor} className="space-y-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: palette.inkSoft }}>Sensor node name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ESP32-Node #3 (North Plot)"
                  value={newSensorName}
                  onChange={(e) => setNewSensorName(e.target.value)}
                  className="w-full px-4 py-2 text-sm focus:outline-none"
                  style={{ backgroundColor: palette.parchment, border: `1px solid ${palette.line}`, color: palette.ink }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm"
                  style={{ color: palette.inkSoft }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white"
                  style={{ backgroundColor: palette.green }}
                >
                  Pair node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};