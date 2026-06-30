// ============================================
// FILE: components/SettingsProvider.tsx
// ============================================

import React, { createContext, useContext, type ReactNode } from 'react';
import { useSettings as useSettingsHook } from '@/hooks/useSettings';

type SettingsContextType = ReturnType<typeof useSettingsHook>;

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useSettingsHook();
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}