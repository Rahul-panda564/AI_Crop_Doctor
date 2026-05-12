import { Bell, MapPin, Sun, CloudRain, Thermometer, ChevronRight, Camera, Image, History, Droplets, Sprout, Shield } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import { useMemo, useState, useEffect } from 'react';

export default function HomeScreen() {
  const { language, navigate } = useApp();

  const [weather, setWeather] = useState<{ temp: number; city: string; condition: string; humidity: number; rain: number } | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Using wttr.in for quick, no-API-key real weather data
        const res = await fetch('https://wttr.in/?format=j1');
        const data = await res.json();
        const current = data.current_condition[0];
        const area = data.nearest_area[0];
        
        setWeather({
          temp: parseInt(current.temp_C),
          city: area.areaName[0].value,
          condition: current.weatherDesc[0].value,
          humidity: parseInt(current.humidity),
          rain: parseInt(data.weather[0].hourly[0].chanceofrain)
        });
      } catch (err) {
        console.error('Weather fetch failed:', err);
      } finally {
        setLoadingWeather(false);
      }
    }
    fetchWeather();
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return getTranslation(language, 'goodMorning');
    if (hour < 17) return getTranslation(language, 'goodAfternoon');
    return getTranslation(language, 'goodEvening');
  }, [language]);

  const tips = [
    { icon: Droplets, title: getTranslation(language, 'tip1Title'), desc: getTranslation(language, 'tip1Desc'), color: 'bg-blue-50 text-blue-600' },
    { icon: Sprout, title: getTranslation(language, 'tip2Title'), desc: getTranslation(language, 'tip2Desc'), color: 'bg-green-50 text-green-600' },
    { icon: Shield, title: getTranslation(language, 'tip3Title'), desc: getTranslation(language, 'tip3Desc'), color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-3 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#2E7D32]" />
            <span className="text-xs font-medium text-gray-500">{weather?.city || 'India'}</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors">
            <Bell size={20} strokeWidth={1.5} className="text-gray-600" />
          </button>
        </div>
        <h1 className="text-2xl font-extrabold text-[#212121]">
          {greeting}, <span className="text-[#2E7D32]">{getTranslation(language, 'farmer')}</span>
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Scan Hero Card */}
        <div className="px-5 pt-4 pb-2">
          <button
            onClick={() => navigate('scan')}
            className="w-full relative rounded-2xl overflow-hidden active:scale-[0.98] transition-transform duration-150 shadow-lg shadow-green-900/10"
          >
            <img src="/hero-scan.jpg" alt="Scan crop" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Camera size={18} className="text-white" />
                <span className="text-white font-bold text-lg">{getTranslation(language, 'scanCrop')}</span>
              </div>
              <p className="text-white/80 text-xs">Take a photo of your crop leaf to identify diseases instantly</p>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-3">
          <h2 className="text-sm font-bold text-[#212121] mb-3">{getTranslation(language, 'recentTips')}</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('scan')}
              className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                <Image size={18} className="text-[#2E7D32]" />
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                {getTranslation(language, 'uploadFromGallery')}
              </span>
            </button>
            <button 
              onClick={() => navigate('history')}
              className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <History size={18} className="text-blue-600" />
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                {getTranslation(language, 'viewHistory')}
              </span>
            </button>
            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <Sun size={18} className="text-amber-600" />
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                {getTranslation(language, 'weather')}
              </span>
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="px-5 py-2">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between min-h-[88px]">
            {loadingWeather ? (
              <div className="flex-1 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Thermometer size={22} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#212121]">{weather?.temp}°C</p>
                    <p className="text-xs text-gray-500 capitalize">{weather?.condition} · Humidity {weather?.humidity}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <CloudRain size={20} className="text-blue-400 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400">Rain: {weather?.rain}%</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Farming Tips */}
        <div className="px-5 py-3 pb-6">
          <h2 className="text-sm font-bold text-[#212121] mb-3">{getTranslation(language, 'recentTips')}</h2>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-400 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-10 h-10 rounded-xl ${tip.color} flex items-center justify-center shrink-0`}>
                  <tip.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#212121] mb-0.5">{tip.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
