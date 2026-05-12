import { useState } from 'react';
import { ChevronLeft, ChevronDown, MessageCircle } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';

interface FAQItem {
  question: string;
  answer: string;
}

function getFAQs(): FAQItem[] {
  return [
    {
      question: 'How does the AI disease detection work?',
      answer: 'CropGenius uses TensorFlow.js to run a machine learning model directly in your browser. When you upload a photo of a crop leaf, the AI analyzes visual patterns like color changes, spots, lesions, and texture abnormalities to identify potential diseases. The model runs entirely on your device — no photos are uploaded to any server.',
    },
    {
      question: 'Does the app work without internet?',
      answer: 'Yes! After your first visit, CropGenius works completely offline. The app uses Service Workers to cache all necessary files. The AI model, disease database, and treatment information are all stored locally on your device. You can scan crops and get results even in areas with no network coverage.',
    },
    {
      question: 'How accurate is the disease detection?',
      answer: 'Our AI model is trained on thousands of images of crop diseases. For common diseases like Rice Blast, Wheat Rust, and Cotton Blight, accuracy typically ranges from 85-98%. However, we always recommend consulting with your local agricultural extension officer for confirmation, especially for high-severity detections.',
    },
    {
      question: 'What crops are supported?',
      answer: 'Currently, CropGenius can detect diseases in Rice, Wheat, Corn (Maize), Cotton, and Tomato. We are continuously expanding our disease database to cover more crops common in Indian agriculture, including Sugarcane, Soybean, and various vegetable crops.',
    },
    {
      question: 'Are the treatment suggestions safe?',
      answer: 'The app provides both organic (natural) and chemical treatment options. Organic solutions like neem oil and biofungicides are generally safe. For chemical treatments, always follow the recommended dosages and consult your local agricultural officer. Wear protective equipment when applying chemical treatments.',
    },
    {
      question: 'How do I get the best scan results?',
      answer: 'For best results: 1) Take photos in good natural light, 2) Hold the camera steady and close to the leaf (within 6-12 inches), 3) Make sure the affected area is clearly visible and in focus, 4) Avoid shadows on the leaf, 5) Include both healthy and affected parts for comparison if possible.',
    },
    {
      question: 'Can I use this app in my local language?',
      answer: 'Absolutely! CropGenius supports 12 Indian languages including Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and Assamese. Important information for farmers is displayed in your chosen language while technical details remain in English.',
    },
    {
      question: 'Is my data private?',
      answer: 'Yes, completely. All photos you take are processed locally on your device and never uploaded to any server. Your scan history is stored only in your browser\'s local storage. We do not collect any personal information or farming data.',
    },
  ];
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left active:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-[#212121] flex-1">{item.question}</span>
        <ChevronDown
          size={18}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
          <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpScreen() {
  const { language, goBack } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = getFAQs();

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
        <h2 className="text-base font-bold text-[#212121]">{getTranslation(language, 'helpSupport')}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {/* Contact Card */}
        <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl p-5 mb-5 shadow-lg shadow-green-900/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{getTranslation(language, 'contactUs')}</h3>
              <p className="text-white/70 text-xs">We are here to help</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            For technical support or to report issues with disease detection, contact your local Krishi Vigyan Kendra (KVK) or agricultural extension office.
          </p>
        </div>

        {/* FAQ Section */}
        <h3 className="text-sm font-bold text-[#212121] mb-3">{getTranslation(language, 'faq')}</h3>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-5 p-4 bg-amber-50 rounded-xl">
          <p className="text-xs text-amber-700 leading-relaxed">
            CropGenius is designed to assist farmers with early disease detection. Always consult with qualified agricultural experts before making treatment decisions. The app does not replace professional agricultural advice.
          </p>
        </div>
      </div>
    </div>
  );
}
