import { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { LANGUAGES, getTranslation } from '@/data/languages';
import type { LanguageCode } from '@/types';

export default function LanguageSelectScreen() {
  const { language, setLanguage, navigate } = useApp();
  const [selected, setSelected] = useState<LanguageCode>(language);

  const handleContinue = () => {
    setLanguage(selected);
    navigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] animate-in fade-in duration-400">
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-12 pb-4">
        <h1 className="text-2xl font-extrabold text-[#212121] mb-1">
          {getTranslation(selected, 'selectLanguage')}
        </h1>
        <p className="text-sm text-gray-500 mb-6">Choose your preferred language / अपनी भाषा चुनें</p>
        
        <div className="grid grid-cols-1 gap-2">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4 duration-400 fill-mode-both ${
                selected === lang.code
                  ? 'border-[#2E7D32] bg-[#E8F5E9]'
                  : 'border-transparent bg-white shadow-sm'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                selected === lang.code ? 'bg-[#2E7D32] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {lang.code.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-[#212121]">{lang.name}</p>
                <p className="text-sm text-gray-500">{lang.localName}</p>
              </div>
              {selected === lang.code && (
                <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="shrink-0 p-5 bg-white border-t border-gray-100">
        <button
          onClick={handleContinue}
          className="w-full h-14 bg-[#2E7D32] text-white font-semibold rounded-full text-base active:scale-[0.96] active:bg-[#1B5E20] transition-all duration-150 shadow-lg shadow-green-900/20"
        >
          {getTranslation(selected, 'continue')}
        </button>
      </div>
    </div>
  );
}
