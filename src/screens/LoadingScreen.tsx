import { useEffect, useState } from 'react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

const STEPS = [
  'analyzingTexture',
  'detectingPatterns',
  'identifying',
  'generatingReport',
];

export default function LoadingScreen() {
  const { language, navigate, analyzeImage } = useApp();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep(s => (s + 1) % STEPS.length);
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 2;
      });
    }, 60);

    analyzeImage().then(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      navigate('result');
    }).catch(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      navigate('scan');
    });

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] items-center justify-center px-8 animate-in fade-in duration-200">
      {/* Scanning Animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#2E7D32]/20" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2E7D32] animate-spin" style={{ animationDuration: '1.5s' }} />
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 rounded-full bg-[#2E7D32]/10 flex items-center justify-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-[#2E7D32]/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#2E7D32]" />
          </div>
        </div>
        {/* Scanning line */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2E7D32] to-transparent animate-bounce" style={{ animationDuration: '1.2s', top: '50%' }} />
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[240px] h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#2E7D32] rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Text */}
      <h2 className="text-white font-bold text-lg mb-2">{getTranslation(language, 'analyzing')}</h2>
      <p className="text-white/60 text-sm text-center animate-in fade-in duration-300">
        {getTranslation(language, STEPS[step])}
      </p>
    </div>
  );
}
