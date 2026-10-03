import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import type { Language } from '../types';
import {
  Droplet,
  LayoutDashboard,
  Cpu,
  BrainCircuit,
  CloudSun,
  BarChart3,
  Mic,
  Users,
  ShieldCheck,
  Globe,
  Bell,
} from 'lucide-react';

const palette = {
  base: '#2B2420',
  surface: '#3D342C',
  cream: '#F2E9DA',
  tan: '#B8A88F',
  copper: '#C1652F',
  sage: '#6E8B6B',
  line: 'rgba(242,233,218,0.15)',
};

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export const Navbar: React.FC = () => {
  const {
    farms,
    selectedFarmId,
    setSelectedFarmId,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    userRole,
    setUserRole,
    setIsVoiceAssistantOpen,
    notificationMessage,
  } = useFarmContext();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Droplet },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sensors', label: 'Sensors', icon: Cpu },
    { id: 'ai-advisor', label: 'AI Advisor', icon: BrainCircuit },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'admin', label: 'Admin/FPO', icon: ShieldCheck },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: palette.base, color: palette.cream, borderBottom: `1px solid ${palette.line}` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Wordmark — a plain square mark, no gradient tile or pulsing icon */}
            <div onClick={() => setActiveTab('landing')} className="flex items-center gap-3 cursor-pointer shrink-0">
              <div
                className="w-8 h-8 flex items-center justify-center text-sm font-serif"
                style={{ backgroundColor: palette.copper, color: palette.base }}
              >
                W
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-serif">Smart Water Guardian</div>
                <div className="text-[10px]" style={{ color: palette.tan }}>YUVA YODHA ENERGY TECH HACKATHON 2026 </div>
              </div>
            </div>

            {/* Primary nav — underlined text links, not pill buttons */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center overflow-x-auto">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center gap-1.5 text-xs pb-1 whitespace-nowrap transition-colors"
                    style={{
                      color: isActive ? palette.cream : palette.tan,
                      borderBottom: isActive ? `2px solid ${palette.copper}` : '2px solid transparent',
                    }}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Voice + role, right side */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setUserRole(userRole === 'farmer' ? 'admin' : 'farmer')}
                className="hidden md:block text-xs px-3 py-1.5"
                style={{ border: `1px solid ${palette.line}`, color: userRole === 'admin' ? palette.sage : palette.tan }}
              >
                {userRole === 'admin' ? 'Admin / FPO' : 'Farmer view'}
              </button>
              <button
                onClick={() => setIsVoiceAssistantOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors"
                style={{ backgroundColor: palette.copper, color: palette.base }}
              >
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Voice</span>
              </button>
            </div>
          </div>

          {/* Control strip — ledger fields instead of pill dropdowns, only on larger screens */}
          <div
            className="hidden lg:flex items-center gap-8 py-2 text-xs"
            style={{ borderTop: `1px solid ${palette.line}` }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: palette.tan }}>Farm</span>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
                style={{ color: palette.cream }}
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: palette.base }}>
                    {f.name} ({f.cropType})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" style={{ color: palette.tan }} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent focus:outline-none cursor-pointer"
                style={{ color: palette.cream }}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} style={{ backgroundColor: palette.base }}>
                    {l.native}
                  </option>
                ))}
              </select>
            </div>

            <span style={{ color: palette.tan }}>AI + IoT farm water resilience platform</span>
          </div>
        </div>
      </header>

      {/* MOBILE NAV — moved to a fixed bottom tab bar instead of a scrollable strip under the header */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex overflow-x-auto"
        style={{ backgroundColor: palette.base, borderTop: `1px solid ${palette.line}` }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 flex-1 py-2.5 min-w-[64px]"
              style={{ color: isActive ? palette.copper : palette.tan }}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* TOAST — bottom-left slide-in instead of a top-right floating card */}
      {notificationMessage && (
        <div
          className="fixed bottom-20 lg:bottom-4 left-4 z-50 px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: palette.surface, color: palette.cream, border: `1px solid ${palette.copper}` }}
        >
          <Bell className="w-4 h-4" style={{ color: palette.copper }} />
          <span className="text-xs">{notificationMessage}</span>
        </div>
      )}
    </>
  );
};