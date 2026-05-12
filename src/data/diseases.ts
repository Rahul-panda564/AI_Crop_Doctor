import type { DiseaseInfo } from '@/types';

export const PLANT_VILLAGE_CLASSES = [
  'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
  'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
  'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
  'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
  'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
  'Raspberry___healthy', 'Soybean___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
  'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
];

export const DISEASES: DiseaseInfo[] = PLANT_VILLAGE_CLASSES.map((className) => {
  const parts = className.split('___');
  const cropName = (parts[0] || '').replace(/_/g, ' ');
  const diseaseName = (parts[1] || 'Healthy').replace(/_/g, ' ');
  const isHealthy = diseaseName.toLowerCase().includes('healthy');
  
  return {
    id: className,
    name: diseaseName,
    cropType: cropName,
    severity: isHealthy ? 'low' : (diseaseName.includes('Blight') || diseaseName.includes('rot') ? 'high' : 'medium'),
    description: isHealthy 
      ? `Your ${cropName} plant looks healthy and strong. Keep up the good work!` 
      : `Common symptoms of ${diseaseName} on ${cropName} include spotting, wilting, or discoloration of leaves.`,
    confidence: 0,
    image: `/diseases/${className}.jpg`,
    treatment: {
      organic: isHealthy ? ['Continue regular watering', 'Apply compost monthly'] : [
        'Remove and burn infected leaves',
        'Spray with Neem Oil solution (3%)',
        'Apply copper-based organic fungicide',
      ],
      chemical: isHealthy ? ['No chemical needed'] : [
        'Apply Chlorothalonil 75% WP',
        'Spray Mancozeb 75% WP',
        'Consult local expert for specific dosage',
      ],
      prevention: [
        'Practice crop rotation',
        'Ensure proper spacing for airflow',
        'Avoid overhead irrigation',
        'Use resistant varieties',
      ],
    },
  };
});

export function detectDiseaseMock(_imageData: string): DiseaseInfo {
  const diseases = DISEASES.filter(d => !d.id.includes('healthy'));
  const selected = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = 85 + Math.floor(Math.random() * 14);
  
  return {
    ...selected,
    confidence,
  };
}

export function getDiseaseById(id: string): DiseaseInfo | undefined {
  return DISEASES.find(d => d.id === id);
}

export function getDiseaseByIndex(index: number): DiseaseInfo {
  return DISEASES[index] || DISEASES[DISEASES.length - 1]; 
}
