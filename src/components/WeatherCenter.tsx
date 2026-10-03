import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_WEATHER_7DAYS } from '../data/mockData';
import { CloudSun, CloudRain, Sun, CloudLightning, Wind, Droplets } from 'lucide-react';

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

export const WeatherCenter: React.FC = () => {
  const { selectedFarm } = useFarmContext();

  const getWeatherIcon = (condition: string, size = 'w-6 h-6') => {
    switch (condition) {
      case 'Rainy':
        return <CloudRain className={size} style={{ color: palette.water }} />;
      case 'Thunderstorm':
        return <CloudLightning className={size} style={{ color: palette.ochre }} />;
      case 'Sunny':
        return <Sun className={size} style={{ color: palette.ochre }} />;
      default:
        return <CloudSun className={size} style={{ color: palette.green }} />;
    }
  };

  const today = MOCK_WEATHER_7DAYS[0];

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs" style={{ color: palette.inkSoft }}>Weather intelligence</div>
            <h1 className="font-serif text-3xl mt-1">Forecast for {selectedFarm.location}</h1>
            <p className="text-sm mt-2" style={{ color: palette.inkSoft }}>
              Rainfall-aware scheduling to decide when irrigation can wait.
            </p>
          </div>
          <div className="text-xs font-mono" style={{ color: palette.inkSoft }}>
            Radar sync — live OpenWeatherMap API
          </div>
        </div>

        {/* TODAY — a typographic hero, not a boxed widget */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8" style={{ borderBottom: `1px solid ${palette.line}` }}>
          <div className="flex items-center gap-5">
            {getWeatherIcon(today.condition, 'w-12 h-12')}
            <div>
              <h2 className="font-serif text-5xl">{today.condition}</h2>
              <p className="text-sm mt-1" style={{ color: palette.inkSoft }}>
                High {today.tempMax}° · Low {today.tempMin}°
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            <div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.inkSoft }}>
                <CloudRain className="w-3.5 h-3.5" /> Rain probability
              </div>
              <div className="font-mono text-2xl mt-0.5" style={{ color: palette.water }}>{today.rainProbability}%</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.inkSoft }}>
                <Droplets className="w-3.5 h-3.5" /> Humidity
              </div>
              <div className="font-mono text-2xl mt-0.5" style={{ color: palette.green }}>{today.humidity}%</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.inkSoft }}>
                <Wind className="w-3.5 h-3.5" /> Wind
              </div>
              <div className="font-mono text-2xl mt-0.5" style={{ color: palette.ochre }}>{today.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* 7-DAY FORECAST — a ledger table of rows, not seven identical cards */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl">7-day irrigation outlook</h3>

          <div>
            {MOCK_WEATHER_7DAYS.map((day, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 sm:gap-8 py-4"
                style={{
                  borderBottom: `1px solid ${palette.line}`,
                  borderLeft: idx === 1 ? `3px solid ${palette.water}` : '3px solid transparent',
                  paddingLeft: '0.75rem',
                }}
              >
                <div className="w-20 shrink-0">
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className="text-xs" style={{ color: palette.inkSoft }}>{day.date}</div>
                </div>

                <div className="w-8 flex justify-center shrink-0">{getWeatherIcon(day.condition)}</div>

                <div className="w-28 shrink-0 text-sm">
                  {day.tempMax}° <span style={{ color: palette.inkSoft }}>/ {day.tempMin}°</span>
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <div className="h-1.5 flex-1" style={{ backgroundColor: palette.line }}>
                    <div
                      className="h-full"
                      style={{ width: `${day.rainProbability}%`, backgroundColor: palette.water }}
                    />
                  </div>
                  <span className="font-mono text-xs w-10 text-right" style={{ color: palette.water }}>
                    {day.rainProbability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};