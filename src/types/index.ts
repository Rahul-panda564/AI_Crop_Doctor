export type LanguageCode = 
  | 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa' | 'or' | 'as';

export interface Language {
  code: LanguageCode;
  name: string;
  localName: string;
}

export type Severity = 'low' | 'medium' | 'high';

export interface Treatment {
  organic: string[];
  chemical: string[];
  prevention: string[];
}

export interface DiseaseInfo {
  id: string;
  name: string;
  cropType: string;
  severity: Severity;
  description: string;
  confidence: number;
  image: string;
  treatment: Treatment;
}

export interface ScanRecord {
  id: string;
  imageData: string;
  diseaseId: string;
  diseaseName: string;
  cropType: string;
  severity: Severity;
  confidence: number;
  timestamp: number;
  isHealthy: boolean;
}

export type Screen = 
  | 'language-select'
  | 'home'
  | 'scan'
  | 'preview'
  | 'loading'
  | 'result'
  | 'treatment'
  | 'history'
  | 'history-detail'
  | 'settings'
  | 'language-settings'
  | 'help';

export type TabScreen = 'home' | 'scan' | 'history' | 'settings';
