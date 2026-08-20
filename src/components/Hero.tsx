import React from 'react';
import { Sparkles, Camera, Flame, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartGenerate: () => void;
  onOpenLiveCamera: () => void;
  onExploreTrending: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartGenerate, onOpenLiveCamera, onExploreTrending }) => {
  return (
    <div className="relative pt-8 pb-16 overflow-hidden">
      {/* Background Violet Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-xs font-bold text-purple-300 shadow-lg animate-float">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Know the pose. Nail the photo.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Your AI Photographer <br />
            <span className="text-gradient">Never Ask "How Should We Pose?" Again.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            PoseMate tells you where to stand, how to pose, where to look, how to position your friends, and where to place the camera.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartGenerate}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-xl shadow-purple-600/30 hover:opacity-95 hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-purple-200" />
              <span>✨ Generate My Pose</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenLiveCamera}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm bg-dark-800 hover:bg-dark-700 text-white border border-dark-border hover:border-purple-500/40 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <Camera className="w-5 h-5 text-purple-400" />
              <span>📱 Open AI Camera</span>
            </button>

            <button
              onClick={onExploreTrending}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-border flex items-center justify-center space-x-2 shadow-lg"
            >
              <Flame className="w-5 h-5 text-red-500" />
              <span>📌 Pinterest Ideas</span>
            </button>
          </div>

          {/* ⚡ 1-TAP QUICK POSE PRESETS BAR */}
          <div className="pt-6">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-300 block mb-2.5">
              ⚡ 1-Tap Express Pose Presets:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: '☕ Café Vibe', action: onStartGenerate },
                { label: '🏖️ Beach Sunset Duo', action: onStartGenerate },
                { label: '🌆 Rooftop City', action: onStartGenerate },
                { label: '🕶️ Streetwear Solo', action: onStartGenerate },
                { label: '🎉 Squad Group', action: onStartGenerate }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={preset.action}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#15151C] hover:bg-purple-900/40 text-slate-200 border border-[#292933] hover:border-purple-500/50 hover:scale-105 transition-all shadow-md flex items-center space-x-1.5"
                >
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-dark-border shadow-2xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Photo Image Card */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-80 sm:h-96 group">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
                  alt="Friends posing at café"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full w-max border border-emerald-500/30">
                    🟢 AI Photographer · Live Ready
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    Casual Café Triangle Formation
                  </h3>
                </div>
              </div>

              {/* Overlaid Live AI Suggestion Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="glass-card p-5 rounded-2xl border border-purple-500/40 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AI Director Command
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">CONFIDENCE 99%</span>
                  </div>

                  <blockquote className="text-sm italic text-slate-200 border-l-2 border-purple-500 pl-3 py-1 font-medium">
                    "Move Person 3 slightly right. Person 2 lean forward over table. Everyone come 20 cm closer."
                  </blockquote>

                  <div className="mt-4 pt-3 border-t border-dark-border grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">CAMERA HEIGHT</span>
                      <span className="text-white font-semibold">Chest Level (1.4m)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">RECOMMENDED LENS</span>
                      <span className="text-purple-300 font-semibold">50mm / 2x Portrait</span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 p-4 rounded-2xl border border-dark-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-bold">
                      3P
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Need a different layout?</h4>
                      <p className="text-[11px] text-slate-400">Generate 10 full session poses in 1 click</p>
                    </div>
                  </div>
                  <button
                    onClick={onStartGenerate}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    Try Studio
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
