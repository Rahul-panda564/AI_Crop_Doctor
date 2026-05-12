import { ChevronLeft, CheckCircle, Activity } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import { getDiseaseById } from '@/data/diseases';

export default function HistoryDetailScreen() {
  const { language, goBack, navigate, currentDiagnosis } = useApp();

  if (!currentDiagnosis) {
    goBack();
    return null;
  }

  const disease = getDiseaseById(currentDiagnosis.id);
  const isHealthy = currentDiagnosis.id === 'tomato-healthy';

  const severityConfig = {
    low: { label: getTranslation(language, 'low') },
    medium: { label: getTranslation(language, 'medium') },
    high: { label: getTranslation(language, 'high') },
  };

  const sev = severityConfig[currentDiagnosis.severity];

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
        <h2 className="text-base font-bold text-[#212121]">{getTranslation(language, 'diagnosisResult')}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Image */}
        <div className="px-5 pt-4 pb-3">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={currentDiagnosis.image || disease?.image}
              alt="Analyzed crop"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="px-5 pb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isHealthy ? <CheckCircle size={14} /> : <Activity size={14} />}
                <span className="text-xs font-semibold">
                  {isHealthy ? getTranslation(language, 'healthy') : getTranslation(language, 'diseased')}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-[#212121] mb-1">
              {currentDiagnosis.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{currentDiagnosis.cropType}</p>

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
                <p className="text-lg font-extrabold text-[#212121]">{sev.label}</p>
              </div>
            </div>
          </div>
        </div>

        {disease?.description && (
          <div className="px-5 pb-4">
            <p className="text-sm text-gray-600 leading-relaxed">{disease.description}</p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      {!isHealthy && (
        <div className="shrink-0 p-5 bg-white border-t border-gray-100">
          <button
            onClick={() => navigate('treatment')}
            className="w-full h-14 bg-[#2E7D32] text-white font-semibold rounded-full text-base active:scale-[0.96] active:bg-[#1B5E20] transition-all duration-150 shadow-lg shadow-green-900/20"
          >
            {getTranslation(language, 'viewTreatment')}
          </button>
        </div>
      )}
    </div>
  );
}
