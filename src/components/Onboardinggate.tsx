import React, { useState, useEffect } from 'react';
import { Onboarding } from './Onboarding';

interface OnboardingGateProps {
  children: React.ReactNode;
}

/**
 * Wrap your existing app content (Navbar + routed page + Footer + modals)
 * with this component. First-time visitors see the Onboarding form instead
 * of the normal app; everyone after that sees the app as usual.
 *
 * No login, no backend call — persistence is local to the browser via
 * localStorage. If you'd rather this reset per-device demo, just clear
 * the 'swg_onboarded' key.
 */
export const OnboardingGate: React.FC<OnboardingGateProps> = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    setOnboarded(localStorage.getItem('swg_onboarded') === 'true');
    setChecked(true);
  }, []);

  // Avoid a flash of the onboarding form while localStorage is read.
  if (!checked) return null;

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return <>{children}</>;
};