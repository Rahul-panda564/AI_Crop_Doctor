import { useRef } from 'react';
import { X, Flashlight, ImagePlus } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

export default function ScanScreen() {
  const { language, navigate, startScan } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      startScan(imageData);
      navigate('preview');
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] animate-in slide-in-from-bottom duration-300">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>
        <span className="text-white font-semibold text-sm">{getTranslation(language, 'scanCrop')}</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors">
          <Flashlight size={20} className="text-white" />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative w-full aspect-square max-w-[300px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white/60 rounded-br-lg" />
          
          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/40 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/40 -translate-x-1/2" />
          </div>
          
          {/* Instruction text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16">
            <p className="text-white/60 text-xs text-center whitespace-nowrap">
              Position leaf in frame
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="shrink-0 pb-10 pt-4 px-8 flex flex-col items-center gap-4">
        {/* Gallery button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-white/70 active:text-white transition-colors"
        >
          <ImagePlus size={18} />
          <span className="text-sm font-medium">{getTranslation(language, 'chooseFromGallery')}</span>
        </button>
        
        {/* Shutter button */}
        <button
          onClick={handleCameraCapture}
          className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <div className="w-12 h-12 rounded-full bg-white" />
        </button>
        
        <p className="text-white/40 text-[10px]">{getTranslation(language, 'cancel')}</p>
      </div>
    </div>
  );
}
