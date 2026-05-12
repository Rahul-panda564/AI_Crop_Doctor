import { useState } from 'react';
import { ChevronLeft, ChevronDown, Leaf, FlaskConical, ShieldCheck, Sprout } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import { getDiseaseById } from '@/data/diseases';

interface AccordionSection {
  key: string;
  icon: typeof Leaf;
  iconColor: string;
  bgColor: string;
  items: string[];
}

export default function TreatmentScreen() {
  const { language, goBack, currentDiagnosis } = useApp();
  const [openSection, setOpenSection] = useState<string | null>('organic');

  if (!currentDiagnosis) {
    goBack();
    return null;
  }

  const disease = getDiseaseById(currentDiagnosis.id);
  if (!disease) {
    goBack();
    return null;
  }

  const sections: AccordionSection[] = [
    {
      key: 'organic',
      icon: Sprout,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      items: disease.treatment.organic,
    },
    {
      key: 'chemical',
      icon: FlaskConical,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: disease.treatment.chemical,
    },
    {
      key: 'prevention',
      icon: ShieldCheck,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      items: disease.treatment.prevention,
    },
  ];

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
        <h2 className="text-base font-bold text-[#212121]">{getTranslation(language, 'treatmentGuide')}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {/* Crop Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
            <Leaf size={22} className="text-[#2E7D32]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#212121]">{currentDiagnosis.name}</h3>
            <p className="text-sm text-gray-500">{currentDiagnosis.cropType}</p>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.key;
            const SectionIcon = section.icon;
            return (
              <div key={section.key} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.key)}
                  className="w-full flex items-center gap-3 p-4 active:bg-gray-50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-lg ${section.bgColor} flex items-center justify-center shrink-0`}>
                    <SectionIcon size={18} className={section.iconColor} />
                  </div>
                  <span className="flex-1 text-left text-sm font-bold text-[#212121]">
                    {getTranslation(language, section.key === 'organic' ? 'organicSolutions' : section.key === 'chemical' ? 'chemicalSolutions' : 'prevention')}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isOpen && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                    <ul className="space-y-2.5 ml-12">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl">
          <p className="text-xs text-amber-700 leading-relaxed">
            Always consult with your local agricultural extension officer before applying chemical treatments. Follow recommended dosages and safety precautions.
          </p>
        </div>
      </div>
    </div>
  );
}
