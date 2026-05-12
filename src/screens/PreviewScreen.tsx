import { X, RotateCcw } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

export default function PreviewScreen() {
  const { language, navigate, currentScanImage, startScan } = useApp();

  const handleRetake = () => {
    startScan('');
    navigate('scan');
  };

  const handleAnalyze = () => {
    navigate('loading');
  };

  if (!currentScanImage) {
    navigate('scan');
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-black animate-in fade-in duration-200">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-black/50">
        <button
          onClick={handleRetake}
          className="flex items-center gap-1.5 text-white active:opacity-70 transition-opacity"
        >
          <RotateCcw size={18} />
          <span className="text-sm font-medium">{getTranslation(language, 'retake')}</span>
        </button>
        <button
          onClick={() => navigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Image Preview */}
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={currentScanImage}
          alt="Crop preview"
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>

      {/* Bottom Action */}
      <div className="shrink-0 p-5 bg-black/50">
        <button
          onClick={handleAnalyze}
          className="w-full h-14 bg-[#2E7D32] text-white font-semibold rounded-full text-base active:scale-[0.96] active:bg-[#1B5E20] transition-all duration-150 shadow-lg shadow-green-900/30"
        >
          {getTranslation(language, 'analyzeCrop')}
        </button>
      </div>
    </div>
  );
}
