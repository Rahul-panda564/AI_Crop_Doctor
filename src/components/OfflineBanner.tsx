import { WifiOff } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

export default function OfflineBanner() {
  const { language } = useApp();
  
  return (
    <div className="shrink-0 bg-amber-50 border-t border-amber-200 px-4 py-2 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
      <WifiOff size={14} className="text-amber-600 shrink-0" />
      <span className="text-xs font-medium text-amber-700">
        {getTranslation(language, 'offlineNotice')}
      </span>
    </div>
  );
}
