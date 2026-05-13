import { useRef, useEffect, useState, useCallback } from 'react';
import { X, Flashlight, ImagePlus, RefreshCw, AlertCircle } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

export default function ScanScreen() {
  const { language, navigate, startScan } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    stopStream();
    setError(null);
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      setError(err.name === 'NotAllowedError' ? 'permission_denied' : 'camera_unavailable');
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    startCamera();
    return () => stopStream();
  }, [facingMode]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      startScan(imageData);
      stopStream();
      navigate('preview');
    }
    setIsCapturing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      startScan(imageData);
      stopStream();
      navigate('preview');
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="h-full flex flex-col bg-black animate-in slide-in-from-bottom duration-300 overflow-hidden relative">
      {/* Hidden elements */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Video Viewfinder */}
      <div className="absolute inset-0 z-0">
        {!error && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        
        {error && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 px-8 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <AlertCircle className="text-red-500" size={32} />
            </div>
            <h3 className="text-white font-semibold">Camera Error</h3>
            <p className="text-white/60 text-sm">
              {error === 'permission_denied' 
                ? "Please grant camera permission to scan crops." 
                : "Could not access the camera. You can still upload from gallery."}
            </p>
            <button
              onClick={() => startCamera()}
              className="mt-2 px-6 py-2 bg-white/10 text-white rounded-full text-sm font-medium active:bg-white/20 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-4 pointer-events-auto">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white active:bg-black/60 transition-colors"
          >
            <X size={20} />
          </button>
          <span className="text-white font-medium text-sm drop-shadow-md">
            {getTranslation(language, 'scanCrop')}
          </span>
          <button 
            onClick={toggleCamera}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white active:bg-black/60 transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Viewfinder Area (Overlay) */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="relative w-full aspect-square max-w-[300px]">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white/80 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white/80 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white/80 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white/80 rounded-br-xl" />
            
            {/* Animated scanning line if active */}
            {!error && (
              <div className="absolute inset-x-4 top-0 h-0.5 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_linear_infinite]" />
            )}
            
            {/* Instruction text */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full">
              <p className="text-white text-xs text-center font-medium drop-shadow-md">
                Position leaf clearly inside the frame
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="shrink-0 pb-6 pt-8 px-8 flex flex-col items-center gap-6 pointer-events-auto bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between w-full max-w-[280px]">
            {/* Gallery button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-1 text-white/80 active:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <ImagePlus size={24} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">Gallery</span>
            </button>
            
            {/* Shutter button */}
            <button
              onClick={handleCapture}
              disabled={!!error || isCapturing}
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-all duration-150 ${isCapturing ? 'opacity-50' : ''}`}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-black/10" />
              </div>
            </button>
            
            {/* Flash button (Placeholder for now) */}
            <button
              className="flex flex-col items-center gap-1 text-white/80 active:text-white transition-colors opacity-40 cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Flashlight size={24} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">Flash</span>
            </button>
          </div>
          
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
            Scan leaf to detect disease
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}

