import React from 'react';
import { FarmProvider, useFarmContext } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SensorMonitoring } from './components/SensorMonitoring';
import { AiRecommendation } from './components/AiRecommendation';
import { WeatherCenter } from './components/WeatherCenter';
import { AnalyticsCenter } from './components/AnalyticsCenter';
import { CommunityForum } from './components/CommunityForum';
import { AdminPanel } from './components/AdminPanel';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { OnboardingGate } from './components/OnboardingGate';

const AppContent: React.FC = () => {
  const { activeTab } = useFarmContext();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'sensors':
        return <SensorMonitoring />;
      case 'ai-advisor':
        return <AiRecommendation />;
      case 'weather':
        return <WeatherCenter />;
      case 'analytics':
        return <AnalyticsCenter />;
      case 'community':
        return <CommunityForum />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage />;
    }
  };

  return (
    // bg-slate-950/text-slate-100 removed — each page now sets its own
    // background from the shared palette (parchment content pages,
    // espresso navbar/footer), so the shell itself stays neutral.
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        {renderActiveView()}
      </main>
      <Footer />
      <VoiceAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <FarmProvider>
      {/* First-time visitors fill out the onboarding form here instead of
          logging in; everyone after that sees AppContent as before. */}
      <OnboardingGate>
        <AppContent />
      </OnboardingGate>
    </FarmProvider>
  );
}