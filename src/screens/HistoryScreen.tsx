import { Clock, Trash2, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { getTranslation } from '@/data/languages';
import { useState } from 'react';
import type { ScanRecord } from '@/types';

function DeleteConfirm({ record, onConfirm, onCancel, language }: { 
  record: ScanRecord; 
  onConfirm: () => void; 
  onCancel: () => void;
  language: string;
}) {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-t-2xl p-5 animate-in slide-in-from-bottom duration-300">
        <h3 className="text-base font-bold text-[#212121] mb-1">{getTranslation(language as any, 'confirmDelete')}</h3>
        <p className="text-sm text-gray-500 mb-4">{record.diseaseName} — {new Date(record.timestamp).toLocaleDateString()}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-12 bg-gray-100 text-[#212121] font-semibold rounded-full text-sm active:scale-95 transition-transform"
          >
            {getTranslation(language as any, 'cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 bg-red-500 text-white font-semibold rounded-full text-sm active:scale-95 transition-transform"
          >
            {getTranslation(language as any, 'delete')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HistoryScreen() {
  const { language, scanRecords, navigate, selectHistoryItem, deleteHistoryItem } = useApp();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    selectHistoryItem(id);
    navigate('history-detail');
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setDeleteId(null);
  };

  const deleteRecord = scanRecords.find(r => r.id === deleteId);

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] animate-in fade-in duration-200">
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-3 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-[#212121]">{getTranslation(language, 'scanHistory')}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {scanRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Clock size={28} className="text-gray-400" />
            </div>
            <p className="text-base font-semibold text-gray-500 mb-1">{getTranslation(language, 'noHistory')}</p>
            <p className="text-sm text-gray-400 text-center">{getTranslation(language, 'startScanning')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scanRecords.map((record, i) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 fill-mode-both"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => handleItemClick(record.id)}
                  className="w-full flex items-center gap-3 p-4 active:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={record.imageData} alt={record.diseaseName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-[#212121] truncate">{record.diseaseName}</h3>
                      {record.isHealthy ? (
                        <CheckCircle size={14} className="text-green-500 shrink-0" />
                      ) : (
                        <AlertTriangle size={14} className="text-red-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{record.cropType} · {record.confidence}% confidence</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {new Date(record.timestamp).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </button>
                <div className="px-4 pb-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(record.id); }}
                    className="flex items-center gap-1.5 text-red-400 active:text-red-600 transition-colors ml-auto"
                  >
                    <Trash2 size={13} />
                    <span className="text-[11px] font-medium">{getTranslation(language, 'delete')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteRecord && (
        <DeleteConfirm
          record={deleteRecord}
          onConfirm={() => handleDelete(deleteId!)}
          onCancel={() => setDeleteId(null)}
          language={language}
        />
      )}
    </div>
  );
}
