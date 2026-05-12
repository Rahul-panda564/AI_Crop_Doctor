import { createContext, useContext } from 'react';
import type { LanguageCode, Screen, TabScreen, ScanRecord, DiseaseInfo } from '@/types';

export interface AppState {
  screen: Screen;
  prevScreen: Screen | null;
  language: LanguageCode;
  notifications: boolean;
  isOffline: boolean;
  scanRecords: ScanRecord[];
  currentScanImage: string | null;
  currentDiagnosis: DiseaseInfo | null;
  selectedHistoryId: string | null;
  activeTab: TabScreen;
  isModelLoading: boolean;
}

export interface AppContextType extends AppState {
  navigate: (screen: Screen) => void;
  goBack: () => void;
  setLanguage: (lang: LanguageCode) => void;
  setNotifications: (enabled: boolean) => void;
  setActiveTab: (tab: TabScreen) => void;
  startScan: (imageData: string) => void;
  analyzeImage: () => Promise<DiseaseInfo>;
  selectHistoryItem: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
  resetScan: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
