import { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { LANGUAGES, getTranslation } from '@/data/languages';
import type { LanguageCode } from '@/types';

export default function LanguageSettingsScreen() {
  const { language, setLanguage, goBack } = useApp();
  const [selected, setSelected] = useState<LanguageCode>(language);

  const handleSelect = (code: LanguageCode) => {
    setSelected(code);
    setLanguage(code);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] animate-in slide-in-from-right duration-400">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={goBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-[#212121]" />
        </button>
        <h2 className="text-base font-bold text-[#212121]">{getTranslation(selected, 'language')}</h2>
      </div>

      {/* Language List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors ${
                i < LANGUAGES.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                selected === lang.code ? 'bg-[#2E7D32] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {lang.code.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#212121]">{lang.name}</p>
                <p className="text-xs text-gray-500">{lang.localName}</p>
              </div>
              {selected === lang.code && (
                <Check size={18} className="text-[#2E7D32]" />
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center px-8 leading-relaxed">
          Important information for farmers will be displayed in your selected language. Technical details remain in English.
        </p>
      </div>
    </div>
  );
}
