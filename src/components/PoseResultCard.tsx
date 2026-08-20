import React from 'react';
import type { PoseResult } from '../types/pose';
import { FormationDiagram } from './FormationDiagram';
import { CameraSetupCard } from './CameraSetupCard';
import { 
  Heart, Share2, RefreshCw, UserCheck, Smile, Sun, User, Sparkles, Maximize2, Sliders, Grid, X, Copy, ShoppingBag, Check
} from 'lucide-react';

interface PoseResultCardProps {
  pose: PoseResult;
  onSave?: (pose: PoseResult) => void;
  onRegenerateSimilar?: (pose: PoseResult) => void;
  onGenerateSession?: () => void;
  isSaved?: boolean;
}

export const PoseResultCard: React.FC<PoseResultCardProps> = ({
  pose,
  onSave,
  onRegenerateSimilar,
  onGenerateSession,
  isSaved = false,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(pose.sampleImage);
  const [showLightbox, setShowLightbox] = React.useState(false);
  const [showGrid, setShowGrid] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState<'none' | 'golden' | 'cinematic' | 'vivid' | 'bw'>('none');

  React.useEffect(() => {
    setActiveImage(pose.sampleImage);
  }, [pose.sampleImage]);

  const filterCss = {
    none: '',
    golden: 'sepia-[0.25] contrast-105 brightness-105 hue-rotate-[-10deg]',
    cinematic: 'contrast-115 saturate-110 hue-rotate-[10deg]',
    vivid: 'saturate-150 contrast-110',
    bw: 'grayscale contrast-125'
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyDirectives = () => {
    if (navigator.clipboard) {
      const summaryText = `📸 PoseMate Director: ${pose.title}\n📍 Location: ${pose.background} | ${pose.time}\n📷 Camera: ${pose.camera.lens} (${pose.camera.height})\n\nDIRECTIVES:\n` +
        pose.peopleInstructions.map(p => `• ${p.label || 'Person ' + p.person}: ${p.body} Hands: ${p.hands}`).join('\n');
      navigator.clipboard.writeText(summaryText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner & Main Actions */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20">
                {pose.style} Style
              </span>
              <span className="text-xs font-semibold text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/20">
                {pose.peopleLabel}
              </span>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                {pose.background}
              </span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {pose.time}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {pose.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              {pose.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSave && onSave(pose)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isSaved
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-dark-800 hover:bg-dark-700 text-white border border-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {onRegenerateSimilar && (
              <button
                onClick={() => onRegenerateSimilar(pose)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-dark-800 hover:bg-dark-700 text-slate-200 border border-white/10 transition-all"
              >
                <RefreshCw className="w-4 h-4 text-brand-purple" />
                <span>Similar</span>
              </button>
            )}

            <button
              onClick={handleCopyDirectives}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 transition-all shadow-md"
              title="Copy formatted pose instructions for WhatsApp / Group chat"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
              <span>{copiedText ? 'Copied to Chat!' : 'Copy Directives'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-dark-800 hover:bg-dark-700 text-slate-200 border border-white/10 transition-all"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>

            {onGenerateSession && (
              <button
                onClick={onGenerateSession}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-lg shadow-brand-purple/25 hover:opacity-95 transition-all"
              >
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Full 10-Pose Session</span>
              </button>
            )}
          </div>
        </div>

        {/* Visual Preview + Formation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-6 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/10 relative group h-80 sm:h-96 bg-dark-950">
              <img
                src={activeImage}
                alt={pose.title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${filterCss[activeFilter]}`}
              />
              
              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                <span className="bg-emerald-500/90 text-dark-900 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md">
                  ✨ 4K HD Benchmark
                </span>
                <span className="bg-dark-900/80 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-amber-500/30 backdrop-blur-md">
                  🎨 {pose.colorGradePreset || 'Golden Hour Warmth'}
                </span>
              </div>

              {/* Zoom Lightbox Trigger Button */}
              <button
                onClick={() => setShowLightbox(true)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-white border border-white/20 shadow-lg backdrop-blur-md transition-all text-xs flex items-center space-x-1.5"
                title="Expand Full Resolution Lightbox"
              >
                <Maximize2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline font-bold">Zoom 4K</span>
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-transparent to-transparent flex items-end p-5 pointer-events-none">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-brand-pink">
                    Reference Visual Preview
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Lighting & composition benchmark for {pose.background} backdrop.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Variant Thumbnails & Filter Switcher */}
            <div className="glass-card p-3 rounded-2xl border border-white/10 space-y-3">
              {/* Angle/Variant Selector */}
              {pose.sampleImageVariants && pose.sampleImageVariants.length > 1 && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
                    📷 Photo Angle Reference Variants ({pose.sampleImageVariants.length})
                  </span>
                  <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                    {pose.sampleImageVariants.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all relative shrink-0 ${
                          activeImage === imgUrl ? 'border-brand-pink scale-105 shadow-md shadow-brand-pink/20' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-dark-900/90 text-[8px] text-center text-white font-bold py-0.5">
                          Angle #{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Retouching Filter Presets */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between mb-1.5">
                  <span className="flex items-center space-x-1">
                    <Sliders className="w-3 h-3 text-cyan-400" />
                    <span>Color Retouch Filter Presets</span>
                  </span>
                  <span className="text-cyan-300 text-[9px] font-mono uppercase">{activeFilter}</span>
                </span>
                <div className="grid grid-cols-5 gap-1.5 text-[10px]">
                  <button
                    onClick={() => setActiveFilter('none')}
                    className={`py-1 px-1.5 rounded-lg border font-bold text-center transition-all ${
                      activeFilter === 'none' ? 'bg-purple-600/30 border-purple-400 text-purple-200' : 'bg-dark-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Original
                  </button>
                  <button
                    onClick={() => setActiveFilter('golden')}
                    className={`py-1 px-1.5 rounded-lg border font-bold text-center transition-all ${
                      activeFilter === 'golden' ? 'bg-amber-500/30 border-amber-400 text-amber-200' : 'bg-dark-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Golden
                  </button>
                  <button
                    onClick={() => setActiveFilter('cinematic')}
                    className={`py-1 px-1.5 rounded-lg border font-bold text-center transition-all ${
                      activeFilter === 'cinematic' ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' : 'bg-dark-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Teal
                  </button>
                  <button
                    onClick={() => setActiveFilter('vivid')}
                    className={`py-1 px-1.5 rounded-lg border font-bold text-center transition-all ${
                      activeFilter === 'vivid' ? 'bg-pink-500/30 border-pink-400 text-pink-200' : 'bg-dark-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Vivid
                  </button>
                  <button
                    onClick={() => setActiveFilter('bw')}
                    className={`py-1 px-1.5 rounded-lg border font-bold text-center transition-all ${
                      activeFilter === 'bw' ? 'bg-slate-700 border-slate-300 text-white' : 'bg-dark-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    B&W
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <FormationDiagram formation={pose.formation} className="h-full flex flex-col justify-between" />
          </div>
        </div>
      </div>

      {/* Person-by-Person Instructions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">👤 Person-by-Person Directives</h3>
            <p className="text-xs text-slate-400">Step-by-step posture, hands, eyes & expression instructions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pose.peopleInstructions.map((person) => (
            <div
              key={person.person}
              className="glass-card p-5 rounded-2xl border border-white/10 hover:border-brand-purple/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 text-xs font-bold flex items-center justify-center">
                    P{person.person}
                  </span>
                  <h4 className="font-bold text-white text-base">
                    {person.label || `Person ${person.person}`}
                  </h4>
                </div>
                <span className="text-xs text-slate-400 bg-dark-900/60 px-2.5 py-1 rounded-md border border-white/5 font-medium">
                  📍 {person.position}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <span className="text-slate-400 font-semibold w-16 shrink-0">Body:</span>
                  <span className="text-slate-200">{person.body}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-slate-400 font-semibold w-16 shrink-0">Hands:</span>
                  <span className="text-brand-pink font-medium">{person.hands}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-slate-400 font-semibold w-16 shrink-0">Legs:</span>
                  <span>{person.legs}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-slate-400 font-semibold w-16 shrink-0">Eyes:</span>
                  <span className="text-cyan-300">{person.eyes}</span>
                </div>
                <div className="flex items-start space-x-2 bg-dark-900/40 p-2 rounded-lg border border-white/5">
                  <span className="text-amber-400 font-semibold w-16 shrink-0">Expression:</span>
                  <span className="text-amber-200 font-medium">{person.expression}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Camera & Background Technical Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CameraSetupCard camera={pose.camera} />

        {/* Background & Lighting Setup */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">🌅 Background & Lighting</h4>
                <p className="text-xs text-slate-400">Environment framing & ambience advice</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 font-medium">Best Spot:</span>
                <p className="text-slate-200 font-semibold mt-0.5">{pose.backgroundSetup.recommended_area}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400">Lighting</span>
                  <p className="text-amber-300 font-medium mt-0.5">{pose.backgroundSetup.lighting}</p>
                </div>
                <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400">Depth</span>
                  <p className="text-brand-purple font-medium mt-0.5">{pose.backgroundSetup.depth}</p>
                </div>
              </div>

              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-200 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p><span className="font-bold">Pro Tip:</span> {pose.backgroundSetup.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Position Quick Reference & Expression Guide */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Body Position Guide */}
        <div className="md:col-span-7 glass-card p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <User className="w-5 h-5 text-brand-pink" />
            <span>🧘 Body Posture Anatomy Guide</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-brand-pink font-bold uppercase tracking-wider block text-[10px]">Head</span>
              <span className="text-slate-200">{pose.bodyGuide.head}</span>
            </div>
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-brand-purple font-bold uppercase tracking-wider block text-[10px]">Shoulders</span>
              <span className="text-slate-200">{pose.bodyGuide.shoulders}</span>
            </div>
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[10px]">Hands</span>
              <span className="text-slate-200">{pose.bodyGuide.hands}</span>
            </div>
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">Torso Angle</span>
              <span className="text-slate-200">{pose.bodyGuide.body}</span>
            </div>
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px]">Legs / Footing</span>
              <span className="text-slate-200">{pose.bodyGuide.legs}</span>
            </div>
            <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block text-[10px]">Eyes</span>
              <span className="text-slate-200">{pose.bodyGuide.eyes}</span>
            </div>
          </div>
        </div>

        {/* Expression Suggestions */}
        <div className="md:col-span-5 glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Smile className="w-5 h-5 text-amber-400" />
              <span>😊 Expression Recommendations</span>
            </h4>

            <div className="bg-gradient-to-r from-amber-500/20 to-brand-pink/20 p-4 rounded-xl border border-amber-500/30 mb-3">
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">Top Choice</span>
              <p className="text-base font-extrabold text-white mt-1">{pose.expressionTip.recommended}</p>
            </div>

            <span className="text-xs font-semibold text-slate-400 block mb-2">Alternative Mood Options:</span>
            <div className="flex flex-wrap gap-2">
              {pose.expressionTip.alternatives.map((alt, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-dark-900/80 text-slate-300 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Props */}
          {pose.recommendedProps && pose.recommendedProps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recommended Props for Natural Hands:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pose.recommendedProps.map((prop, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-cyan-950/40 text-cyan-200 px-2.5 py-1 rounded-lg border border-cyan-500/20 font-medium"
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[85vh] bg-dark-950 rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Header controls */}
            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 bg-dark-900/80 backdrop-blur-md z-20">
              <div className="flex items-center space-x-3">
                <span className="bg-purple-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  4K High-Res Visual Director
                </span>
                <h3 className="text-white font-bold text-lg hidden sm:block">
                  {pose.title} — Reference Benchmark
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    showGrid ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-dark-800 border-white/10 text-slate-400'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Rule of Thirds Grid</span>
                </button>

                <button
                  onClick={() => setShowLightbox(false)}
                  className="w-9 h-9 rounded-full bg-dark-800 hover:bg-dark-700 text-white flex items-center justify-center border border-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Canvas */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeImage}
                alt="Full High-Res Preview"
                className={`max-h-full max-w-full object-contain ${filterCss[activeFilter]}`}
              />

              {/* Grid Lines Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-cyan-500/20">
                  <div className="border-r border-b border-cyan-500/25"></div>
                  <div className="border-r border-b border-cyan-500/25"></div>
                  <div className="border-b border-cyan-500/25"></div>
                  <div className="border-r border-b border-cyan-500/25"></div>
                  <div className="border-r border-b border-cyan-500/25"></div>
                  <div className="border-b border-cyan-500/25"></div>
                  <div className="border-r border-cyan-500/25"></div>
                  <div className="border-r border-cyan-500/25"></div>
                  <div></div>
                </div>
              )}
            </div>

            {/* Footer details */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-dark-900/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
              <div className="text-xs space-y-0.5 text-center sm:text-left">
                <span className="text-slate-400">CAMERA SPECIFICATION:</span>
                <p className="text-white font-semibold">
                  {pose.camera.lens} • {pose.camera.height} • {pose.camera.distance} distance
                </p>
              </div>

              {/* Filter selector in modal */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-medium">Filter Preset:</span>
                <div className="flex space-x-1">
                  {(['none', 'golden', 'cinematic', 'vivid', 'bw'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-2.5 py-1 rounded-lg border uppercase text-[10px] font-bold ${
                        activeFilter === f ? 'bg-purple-600 border-purple-400 text-white' : 'bg-dark-800 border-white/10 text-slate-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
