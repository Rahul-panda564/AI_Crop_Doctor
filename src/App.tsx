import { useApp } from '@/hooks/useAppContext';
import { AppProvider } from '@/hooks/AppProvider';

// Components
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import LanguageSelectScreen from '@/screens/LanguageSelectScreen';
import HomeScreen from '@/screens/HomeScreen';
import ScanScreen from '@/screens/ScanScreen';
import PreviewScreen from '@/screens/PreviewScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import ResultScreen from '@/screens/ResultScreen';
import TreatmentScreen from '@/screens/TreatmentScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import HistoryDetailScreen from '@/screens/HistoryDetailScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import LanguageSettingsScreen from '@/screens/LanguageSettingsScreen';
import HelpScreen from '@/screens/HelpScreen';

const TAB_ROOTS = ['home', 'scan', 'history', 'settings'];

function AppContent() {
  const { screen, isOffline } = useApp();
  
  const showNav = TAB_ROOTS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'language-select': return <LanguageSelectScreen />;
      case 'home': return <HomeScreen />;
      case 'scan': return <ScanScreen />;
      case 'preview': return <PreviewScreen />;
      case 'loading': return <LoadingScreen />;
      case 'result': return <ResultScreen />;
      case 'treatment': return <TreatmentScreen />;
      case 'history': return <HistoryScreen />;
      case 'history-detail': return <HistoryDetailScreen />;
      case 'settings': return <SettingsScreen />;
      case 'language-settings': return <LanguageSettingsScreen />;
      case 'help': return <HelpScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-900">
      <div className="flex-1 overflow-hidden relative">
        {renderScreen()}
      </div>
      {isOffline && <OfflineBanner />}
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
