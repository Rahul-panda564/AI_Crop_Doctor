import { X, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import { getDiseaseById } from '@/data/diseases';

export default function ResultScreen() {
  const { language, navigate, goBack, currentDiagnosis, currentScanImage } = useApp();

  if (!currentDiagnosis) {
    goBack();
    return null;
  }

  const disease = getDiseaseById(currentDiagnosis.id);
  const isHealthy = currentDiagnosis.id === 'tomato-healthy';
  
  const severityConfig = {
    low: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: getTranslation(language, 'low') },
    medium: { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle, label: getTranslation(language, 'medium') },
    high: { color: 'bg-red-100 text-red-700', icon: AlertTriangle, label: getTranslation(language, 'high') },
  };
  
  const sev = severityConfig[currentDiagnosis.severity];
  const SevIcon = sev.icon;

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] animate-in slide-in-from-bottom duration-400">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="w-10" />
        <h2 className="text-base font-bold text-[#212121]">{getTranslation(language, 'diagnosisResult')}</h2>
        <button
          onClick={() => navigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Image */}
        <div className="px-5 pt-4 pb-3">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={currentScanImage || disease?.image}
              alt="Analyzed crop"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="px-5 pb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isHealthy ? <CheckCircle size={14} /> : <Activity size={14} />}
                <span className="text-xs font-semibold">
                  {isHealthy ? getTranslation(language, 'healthy') : getTranslation(language, 'diseased')}
                </span>
              </div>
            </div>

            {/* Disease Name */}
            <h3 className="text-xl font-extrabold text-[#212121] mb-1">
              {currentDiagnosis.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {currentDiagnosis.cropType}
            </p>

            {/* Confidence & Severity */}
            <div className="flex gap-3">
              <div className="flex-1 bg-[#F8F9FA] rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mb-1">
                  {getTranslation(language, 'confidence')}
                </p>
                <p className="text-lg font-extrabold text-[#2E7D32]">{currentDiagnosis.confidence}%</p>
              </div>
              <div className="flex-1 bg-[#F8F9FA] rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mb-1">
                  {getTranslation(language, 'severity')}
                </p>
                <div className="flex items-center gap-1.5">
                  <SevIcon size={16} className={currentDiagnosis.severity === 'high' ? 'text-red-500' : currentDiagnosis.severity === 'medium' ? 'text-amber-500' : 'text-green-500'} />
                  <span className="text-lg font-extrabold text-[#212121]">{sev.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {disease?.description && (
          <div className="px-5 pb-4">
            <p className="text-sm text-gray-600 leading-relaxed">{disease.description}</p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-5 bg-white border-t border-gray-100 space-y-3">
        {!isHealthy && (
          <button
            onClick={() => navigate('treatment')}
            className="w-full h-14 bg-[#2E7D32] text-white font-semibold rounded-full text-base active:scale-[0.96] active:bg-[#1B5E20] transition-all duration-150 shadow-lg shadow-green-900/20"
          >
            {getTranslation(language, 'viewTreatment')}
          </button>
        )}
        <button
          onClick={() => navigate('scan')}
          className="w-full h-12 bg-gray-100 text-[#212121] font-semibold rounded-full text-sm active:scale-[0.96] active:bg-gray-200 transition-all duration-150"
        >
          {getTranslation(language, 'scanAnother')}
        </button>
      </div>
    </div>
  );
}
