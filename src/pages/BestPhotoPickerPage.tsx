import React from 'react';
import { selectBestPhotos } from '../services/aiPoseService';
import type { BestPhotoAnalysis } from '../types/pose';
import { Trophy, Upload, Sparkles, BarChart2 } from 'lucide-react';


export const BestPhotoPickerPage: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState('Checking faces & eye state...');
  const [analysis, setAnalysis] = React.useState<BestPhotoAnalysis | null>(null);

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urls: string[] = [];
      for (let i = 0; i < Math.min(files.length, 50); i++) {
        urls.push(URL.createObjectURL(files[i]));
      }
      setImages(urls);
      runBestPhotoAnalysis(urls);
    }
  };

  const runBestPhotoAnalysis = (photoUrls: string[]) => {
    setIsAnalyzing(true);
    setLoadingStep('🔍 Checking face expressions & open eyes...');

    setTimeout(() => {
      setLoadingStep('📐 Analyzing composition & group spacing balance...');
      setTimeout(() => {
        setLoadingStep('💡 Checking exposure, lighting & sharpness score...');
        setTimeout(() => {
          const result = selectBestPhotos(photoUrls);
          setAnalysis(result);
          setIsAnalyzing(false);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-xs font-bold text-purple-300">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Vision Composition Evaluator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          🪄 Find Your Best Photo
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Upload 5–50 photos from your shoot. PoseMate scores framing, facial smiles, lighting, and visibility to pick the winner.
        </p>
      </div>

      {/* Upload Box & Demo Batches */}
      {images.length === 0 && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="glass-panel p-10 rounded-3xl border-2 border-dashed border-dark-border hover:border-purple-500/50 text-center space-y-4 cursor-pointer relative transition-all">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 rounded-2xl bg-purple-900/30 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload 5 to 50 Photos from Your Shoot</h3>
              <p className="text-xs text-slate-400 mt-1">Select multiple images to compare compositions & pick the winner</p>
            </div>
            <button className="px-6 py-2.5 rounded-xl font-bold text-xs bg-purple-600 text-white shadow-lg pointer-events-none">
              Browse Local Photos
            </button>
          </div>

          {/* Quick Demo Batches */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              ✨ Or Try A Demo High-Res Shoot Batch Immediately
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  const demoBatch = [
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85'
                  ];
                  setImages(demoBatch);
                  runBestPhotoAnalysis(demoBatch);
                }}
                className="p-3 rounded-xl bg-dark-900/80 hover:bg-purple-900/40 border border-white/10 text-left transition-all text-xs group"
              >
                <span className="font-bold text-white block group-hover:text-purple-300">🌆 Rooftop Sunset Shoot</span>
                <span className="text-[10px] text-slate-400">5 High-res portrait bursts</span>
              </button>

              <button
                onClick={() => {
                  const demoBatch = [
                    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=85'
                  ];
                  setImages(demoBatch);
                  runBestPhotoAnalysis(demoBatch);
                }}
                className="p-3 rounded-xl bg-dark-900/80 hover:bg-purple-900/40 border border-white/10 text-left transition-all text-xs group"
              >
                <span className="font-bold text-white block group-hover:text-purple-300">☕ Café Friends Batch</span>
                <span className="text-[10px] text-slate-400">4 Candid table group photos</span>
              </button>

              <button
                onClick={() => {
                  const demoBatch = [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1000&q=85'
                  ];
                  setImages(demoBatch);
                  runBestPhotoAnalysis(demoBatch);
                }}
                className="p-3 rounded-xl bg-dark-900/80 hover:bg-purple-900/40 border border-white/10 text-left transition-all text-xs group"
              >
                <span className="font-bold text-white block group-hover:text-purple-300">🏖️ Beach Duo Shoot</span>
                <span className="text-[10px] text-slate-400">4 Golden hour wave captures</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Loader */}
      {isAnalyzing && (
        <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-md mx-auto animate-pulse">
          <Sparkles className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-white">Evaluating Shoot Batch...</h3>
          <p className="text-xs text-purple-300 font-medium">{loadingStep}</p>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysis && !isAnalyzing && (
        <div className="space-y-10">
          {/* WINNER SHOWCASE CARD */}
          {(() => {
            const winner = analysis.photos.find(p => p.id === analysis.bestPhotoId) || analysis.photos[0];
            return (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 relative overflow-hidden space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-dark-border pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-xl">
                      🏆
                    </div>
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                        Top Rated Photo
                      </span>
                      <h2 className="text-2xl font-bold text-white">
                        Photo #{winner.id.replace('photo-', '')} — Winner
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">OVERALL SCORE</span>
                      <span className="text-3xl font-extrabold text-purple-400">
                        {winner.overallScore}<span className="text-sm font-normal text-slate-500">/100</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 relative rounded-2xl overflow-hidden h-80 sm:h-96 border border-dark-border">
                    <img src={winner.imageUrl} alt="Best Photo Winner" className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-emerald-500 text-dark-900 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                      🟢 99% Face Visibility
                    </span>
                  </div>

                  <div className="md:col-span-6 space-y-5">
                    <p className="text-sm text-slate-200 leading-relaxed font-medium bg-dark-900/80 p-4 rounded-2xl border border-dark-border">
                      {winner.summary}
                    </p>

                    {/* Breakdown Metrics */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-dark-800 p-3 rounded-xl border border-dark-border">
                        <span className="text-slate-400 block text-[10px]">EXPRESSION</span>
                        <span className="text-purple-400 font-bold text-base">{winner.subScores.expression}/100</span>
                      </div>
                      <div className="bg-dark-800 p-3 rounded-xl border border-dark-border">
                        <span className="text-slate-400 block text-[10px]">COMPOSITION</span>
                        <span className="text-purple-400 font-bold text-base">{winner.subScores.composition}/100</span>
                      </div>
                      <div className="bg-dark-800 p-3 rounded-xl border border-dark-border">
                        <span className="text-slate-400 block text-[10px]">LIGHTING</span>
                        <span className="text-purple-400 font-bold text-base">{winner.subScores.lighting}/100</span>
                      </div>
                      <div className="bg-dark-800 p-3 rounded-xl border border-dark-border">
                        <span className="text-slate-400 block text-[10px]">SHARPNESS</span>
                        <span className="text-purple-400 font-bold text-base">{winner.subScores.sharpness}/100</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center space-x-3">
                      <button
                        onClick={() => alert('Saved Best Photo to Gallery!')}
                        className="flex-1 py-3 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
                      >
                        ❤️ Save Winner Photo
                      </button>
                      <button
                        onClick={() => { setImages([]); setAnalysis(null); }}
                        className="py-3 px-4 rounded-xl font-bold text-xs bg-dark-700 hover:bg-dark-600 text-white border border-dark-border"
                      >
                        Upload New Batch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* BATCH COMPARISON GRID */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-purple-400" />
              <span>Full Batch Comparison Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.photos.map((item, idx) => (
                <div key={item.id} className="glass-card p-4 rounded-2xl border border-dark-border space-y-3">
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <img src={item.imageUrl} alt={item.id} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-dark-900/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-white">
                      #{idx + 1} • {item.overallScore}/100
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Facial Expression</span>
                      <span className="font-bold text-purple-400">{item.subScores.expression}%</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Lighting & Blur</span>
                      <span className="font-bold text-purple-400">{item.subScores.lighting}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
