import { Home, ScanLine, History, Settings } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import type { TabScreen } from '@/types';
import { getTranslation } from '@/data/languages';

const TABS: { key: TabScreen; icon: typeof Home; label: string }[] = [
  { key: 'home', icon: Home, label: 'home' },
  { key: 'scan', icon: ScanLine, label: 'scan' },
  { key: 'history', icon: History, label: 'history' },
  { key: 'settings', icon: Settings, label: 'settings' },
];

export default function BottomNav() {
  const { activeTab, setActiveTab, language } = useApp();

  return (
    <nav className="shrink-0 h-[calc(4rem+env(safe-area-inset-bottom))] pb-safe bg-white/90 backdrop-blur-lg border-t border-gray-200 z-50 flex items-center justify-around select-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-all duration-200 active:scale-95 ${
              tab.key === 'scan' ? 'relative -mt-4' : ''
            }`}
          >
            {tab.key === 'scan' ? (
              <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg shadow-green-900/20">
                <Icon size={22} strokeWidth={2} className="text-white" />
              </div>
            ) : (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-[#2E7D32]' : 'text-gray-400'
                  }`}
                />
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-[#2E7D32]' : 'text-gray-400'
                }`}>
                  {getTranslation(language, tab.label)}
                </span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
}
