export interface PersonInstruction {
  person: number;
  label?: string;
  position: string;
  body: string;
  hands: string;
  legs: string;
  eyes: string;
  expression: string;
}

export interface CameraSetup {
  angle: string;
  height: string;
  distance: string;
  lens: string;
  orientation: string;
  position: string;
}

export interface BackgroundSetup {
  recommended_area: string;
  lighting: string;
  composition: string;
  depth: string;
  tips: string;
}

export interface Formation {
  type: string; // 'line' | 'triangle' | 'v_shape' | 'sitting_standing' | 'staggered' | 'walking' | 'circular'
  description: string;
  svgData?: {
    people: { id: number; label: string; x: number; y: number; role?: string }[];
    cameraPos?: { x: number; y: number };
  };
}

export interface PoseResult {
  id: string;
  title: string;
  subtitle: string;
  style: string;
  peopleCount: number;
  peopleLabel: string;
  background: string;
  outfit: string;
  time: string;
  cameraType: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  formation: Formation;
  peopleInstructions: PersonInstruction[];
  camera: CameraSetup;
  backgroundSetup: BackgroundSetup;
  expressionTip: {
    recommended: string;
    alternatives: string[];
  };
  bodyGuide: {
    head: string;
    shoulders: string;
    hands: string;
    body: string;
    legs: string;
    eyes: string;
  };
  sampleImage: string;
  sampleImageVariants?: string[];
  colorGradePreset?: string;
  recommendedProps?: string[];
  gender?: string;
  isSaved?: boolean;
  likes?: number;
  saves?: number;
  isTrending?: boolean;
}

export interface GeneratorInputs {
  peopleCount: number | string;
  gender?: string;
  background: string;
  style: string;
  outfit: string;
  time: string;
  camera: string;
  customBackgroundUrl?: string;
}

export interface FixPoseAnalysis {
  id: string;
  imageUrl: string;
  detectedIssues: {
    severity: 'error' | 'warning' | 'info';
    message: string;
  }[];
  recommendations: {
    target: string;
    action: string;
  }[];
  improvedFormationDiagram: Formation;
  correctedPoseSummary: string;
}

export interface PhotoAnalysisResult {
  id: string;
  imageUrl: string;
  overallScore: number;
  subScores: {
    expression: number;
    composition: number;
    lighting: number;
    groupPosition: number;
    sharpness: number;
    visibility: number;
  };
  summary: string;
  highlights: string[];
  improvements: string[];
}

export interface BestPhotoAnalysis {
  bestPhotoId: string;
  photos: PhotoAnalysisResult[];
  comparisonSummary: string;
}

export interface LiveCameraInstruction {
  status: 'AI ANALYZING' | 'AI READY' | 'PERFECT COMPOSITION';
  statusColor: 'violet' | 'green' | 'amber' | 'red';
  primaryMessage: string;
  actionDirectives: string[];
  alignmentOk: boolean;
}
