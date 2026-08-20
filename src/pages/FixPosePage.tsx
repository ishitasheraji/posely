import React from 'react';
import type { FixPoseAnalysis } from '../types/pose';
import { analyzeFixPoseImage } from '../services/aiPoseService';
import { FormationDiagram } from '../components/FormationDiagram';
import { Camera, AlertTriangle, CheckCircle2, Wand2, RefreshCw, X } from 'lucide-react';


interface FixPosePageProps {
  onStartNewGenerator: () => void;
}

export const FixPosePage: React.FC<FixPosePageProps> = ({ onStartNewGenerator }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<FixPoseAnalysis | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      runAnalysis(url);
    }
  };

  const runAnalysis = (imageUrl: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeFixPoseImage(imageUrl);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          AI Vision Pose Correction Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
          Upload Your Photo. Let AI Fix Your Pose.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Detect stiff postures, uneven group spacing, occluded friends, and bad camera angles automatically.
        </p>
      </div>

      {/* Upload Box & Quick Demos */}
      {!selectedImage && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="glass-panel p-10 rounded-3xl border-2 border-dashed border-white/20 text-center space-y-4 hover:border-cyan-400/50 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Drag & Drop or Click to Upload Photo</h3>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP up to 15MB</p>
            </div>
            <button className="px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-dark-900 shadow-md pointer-events-none">
              Browse Local File
            </button>
          </div>

          {/* Quick Demo Sample Photos */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              📸 Or Test AI Pose Fix On High-Res Sample Photos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const demoUrl = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85';
                  setSelectedImage(demoUrl);
                  runAnalysis(demoUrl);
                }}
                className="p-3 rounded-xl bg-dark-900/80 hover:bg-cyan-950/40 border border-white/10 text-left transition-all text-xs flex items-center space-x-3 group"
              >
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=80"
                  alt="Group Stiff Pose"
                  className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div>
                  <span className="font-bold text-white block group-hover:text-cyan-300">👥 Group Occlusion Issue</span>
                  <span className="text-[10px] text-slate-400">Detect hidden members & spacing</span>
                </div>
              </button>

              <button
                onClick={() => {
                  const demoUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85';
                  setSelectedImage(demoUrl);
                  runAnalysis(demoUrl);
                }}
                className="p-3 rounded-xl bg-dark-900/80 hover:bg-cyan-950/40 border border-white/10 text-left transition-all text-xs flex items-center space-x-3 group"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Solo High Angle Pose"
                  className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div>
                  <span className="font-bold text-white block group-hover:text-cyan-300">🧘 Stiff Solo Stance</span>
                  <span className="text-[10px] text-slate-400">Fix hand position & camera angle</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing state */}
      {isAnalyzing && (
        <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-md mx-auto animate-pulse">
          <Wand2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-white">Scanning Postures & Group Spacing...</h3>
          <p className="text-xs text-slate-400">AI Vision Engine analyzing limb angles & depth alignment</p>
        </div>
      )}

      {/* Analysis Results Display */}
      {selectedImage && analysisResult && !isAnalyzing && (
        <div className="space-y-8">
          
          {/* Top Image Comparison Bar */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden h-72 border border-white/10">
              <img src={selectedImage} alt="Uploaded for analysis" className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 text-[10px] uppercase font-bold text-white bg-dark-900/80 px-2.5 py-1 rounded-md border border-white/10">
                Uploaded Original
              </span>
              <button
                onClick={() => { setSelectedImage(null); setAnalysisResult(null); }}
                className="absolute top-3 right-3 p-1.5 bg-dark-900/80 text-slate-300 rounded-full hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Summary Breakdown */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                  ⚠️ AI Posture Issues Detected
                </span>
                <button
                  onClick={() => runAnalysis(selectedImage)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-scan
                </button>
              </div>

              <div className="space-y-2">
                {analysisResult.detectedIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-dark-900/60 border border-white/5 flex items-start space-x-2 text-xs text-slate-300"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{issue.message}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20 text-xs text-emerald-200">
                <span className="font-bold block mb-1">✨ AI Posture Correction Summary</span>
                <p>{analysisResult.correctedPoseSummary}</p>
              </div>
            </div>
          </div>

          {/* Actionable Fix Recommendations & Corrected Formation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Direct Action Recommendations */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Recommended Posture Fixes</span>
              </h3>

              <div className="space-y-3 text-xs">
                {analysisResult.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-dark-900/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-brand-pink block">{rec.target}</span>
                    <p className="text-slate-200">{rec.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Corrected SVG Diagram */}
            <div>
              <FormationDiagram formation={analysisResult.improvedFormationDiagram} />
            </div>

          </div>

          {/* Bottom Action */}
          <div className="text-center pt-4">
            <button
              onClick={onStartNewGenerator}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-xl hover:opacity-95"
            >
              ✨ Generate Fresh Pose for this Scene
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
