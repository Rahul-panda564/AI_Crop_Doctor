import { ChevronRight, Globe, Bell, WifiOff, HelpCircle, FileText, Info } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import type { LucideIcon } from 'lucide-react';

interface SettingsItem {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
  action?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  badge?: string;
  detail?: string;
}

interface SettingsSection {
  items: SettingsItem[];
}

export default function SettingsScreen() {
  const { language, notifications, setNotifications, navigate } = useApp();

  const sections: SettingsSection[] = [
    {
      items: [
        { icon: Globe, label: getTranslation(language, 'language'), action: () => navigate('language-settings'), color: 'text-blue-600', bg: 'bg-blue-50' },
      ],
    },
    {
      items: [
        { icon: Bell, label: getTranslation(language, 'notifications'), toggle: true, toggleValue: notifications, onToggle: setNotifications, color: 'text-amber-600', bg: 'bg-amber-50' },
        { icon: WifiOff, label: getTranslation(language, 'offlineMode'), badge: getTranslation(language, 'offlineReady'), color: 'text-green-600', bg: 'bg-green-50' },
      ],
    },
    {
      items: [
        { icon: HelpCircle, label: getTranslation(language, 'helpSupport'), action: () => navigate('help'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { icon: FileText, label: getTranslation(language, 'privacyPolicy'), color: 'text-gray-600', bg: 'bg-gray-50' },
        { icon: Info, label: getTranslation(language, 'about'), color: 'text-gray-600', bg: 'bg-gray-50', detail: getTranslation(language, 'version') },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] animate-in fade-in duration-200">
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-3 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-[#212121]">{getTranslation(language, 'settings')}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="space-y-6">
          {sections.map((section, si) => (
            <div key={si} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, ii) => {
                const hasAction = !!item.action;
                const isToggle = item.toggle;
                const ItemIcon = item.icon;
                return (
                    <div
                      key={ii}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${hasAction ? 'active:bg-gray-50 cursor-pointer' : ''} transition-colors`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                        <ItemIcon size={18} className={item.color} />
                      </div>
                      <span className="flex-1 text-sm font-medium text-[#212121]">{item.label}</span>
                      
                      {isToggle ? (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); item.onToggle?.(!item.toggleValue); }}
                          className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                            item.toggleValue ? 'bg-[#2E7D32]' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                            item.toggleValue ? 'translate-x-5' : 'translate-x-0.5'
                          }`} />
                        </button>
                      ) : item.badge ? (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">{item.badge}</span>
                      ) : item.detail ? (
                        <span className="text-xs text-gray-400">{item.detail}</span>
                      ) : hasAction ? (
                        <ChevronRight size={18} className="text-gray-300" />
                      ) : null}
                    </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-lg font-extrabold text-[#2E7D32]">CropGenius</p>
          <p className="text-xs text-gray-400 mt-1">{getTranslation(language, 'version')}</p>
          <p className="text-[10px] text-gray-300 mt-3">Made with care for farmers across India</p>
        </div>
      </div>
    </div>
  );
}
