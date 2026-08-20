import React, { useState, useEffect } from 'react';
import { Sun, Sparkles, Compass, Clock } from 'lucide-react';

export const GoldenHourCalculator: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  let phase = 'Golden Hour';
  let statusText = 'Optimal Rim Lighting Active!';
  let tip = 'Position sun 45° behind subjects for warm hair highlights and soft skin tones.';
  let bgGradient = 'from-amber-500/20 via-rose-500/10 to-purple-900/30';
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';

  if (hours >= 6 && hours < 11) {
    phase = 'Morning Soft Glow';
    statusText = 'Low Sun & Fresh Shadows';
    tip = 'Face subjects 30° toward morning sun for clean, bright eye catchlights.';
    bgGradient = 'from-amber-400/20 via-sky-500/10 to-indigo-900/30';
    badgeColor = 'bg-amber-400/20 text-amber-200 border-amber-400/30';
  } else if (hours >= 11 && hours < 16) {
    phase = 'Harsh Midday Sun';
    statusText = 'High Overhead Sun';
    tip = 'Seek open shade under trees or awnings to avoid harsh under-eye shadows.';
    bgGradient = 'from-yellow-500/20 via-amber-500/10 to-dark-900/40';
    badgeColor = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  } else if (hours >= 16 && hours < 19) {
    phase = 'Peak Golden Hour';
    statusText = 'Magical Sunset Rim Light';
    tip = 'Ideal shooting window! Use 2x portrait lens with backlighting for dream aesthetic.';
    bgGradient = 'from-rose-500/25 via-amber-500/20 to-purple-900/40';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  } else {
    phase = 'Blue Hour & Night';
    statusText = 'Ambient Street Bulbs & Neon';
    tip = 'Find storefront neon lights or cafe string bulbs to anchor low-light portraits.';
    bgGradient = 'from-indigo-900/40 via-purple-900/20 to-dark-900/60';
    badgeColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
  }

  return (
    <div className={`p-6 rounded-3xl bg-gradient-to-br ${bgGradient} border border-[#292933] shadow-xl relative overflow-hidden backdrop-blur-xl space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-md">
            <Sun className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              🌅 Live Sunset & Sun Angle Calculator
            </h3>
            <p className="text-xs text-slate-300">Real-time local lighting & sun position advice</p>
          </div>
        </div>

        <span className={`px-3 py-1 text-[11px] font-extrabold rounded-full border uppercase tracking-wider ${badgeColor}`}>
          {phase}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-[#0B0B0F]/70 p-3 rounded-2xl border border-[#292933]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Current Time
          </span>
          <span className="text-sm font-extrabold text-white mt-1 block">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className="bg-[#0B0B0F]/70 p-3 rounded-2xl border border-[#292933]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Compass className="w-3 h-3 text-purple-400" /> Sun Status
          </span>
          <span className="text-sm font-extrabold text-amber-300 mt-1 block">
            {statusText}
          </span>
        </div>

        <div className="bg-[#0B0B0F]/70 p-3 rounded-2xl border border-[#292933]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400" /> Best Lens Mode
          </span>
          <span className="text-sm font-extrabold text-purple-200 mt-1 block">
            2x Portrait (50mm equivalent)
          </span>
        </div>
      </div>

      <div className="bg-[#0B0B0F]/80 p-3.5 rounded-2xl border border-[#292933] flex items-start space-x-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          <strong className="text-white">Lighting Directive:</strong> {tip}
        </p>
      </div>
    </div>
  );
};
