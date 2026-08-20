import React from 'react';
import type { CameraSetup } from '../types/pose';
import { Camera, Maximize, MoveUp, Sliders, Eye, Compass } from 'lucide-react';


interface CameraSetupCardProps {
  camera: CameraSetup;
}

export const CameraSetupCard: React.FC<CameraSetupCardProps> = ({ camera }) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">📷 Camera Setup</h4>
            <p className="text-xs text-slate-400">Optimal angle, distance & lens settings</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          {camera.orientation}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Angle</span>
          </div>
          <span className="text-sm font-semibold text-white">{camera.angle}</span>
        </div>

        <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <MoveUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Height</span>
          </div>
          <span className="text-sm font-semibold text-white">{camera.height}</span>
        </div>

        <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Maximize className="w-3.5 h-3.5 text-cyan-400" />
            <span>Distance</span>
          </div>
          <span className="text-sm font-semibold text-white">{camera.distance}</span>
        </div>

        <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lens / Mode</span>
          </div>
          <span className="text-sm font-semibold text-white">{camera.lens}</span>
        </div>

        <div className="bg-dark-900/60 p-3 rounded-xl border border-white/5 flex flex-col col-span-2 sm:col-span-2">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Positioning</span>
          </div>
          <span className="text-sm font-semibold text-white">{camera.position}</span>
        </div>
      </div>
    </div>
  );
};
