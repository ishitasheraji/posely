import React from 'react';
import type { Formation } from '../types/pose';
import { Camera } from 'lucide-react';


interface FormationDiagramProps {
  formation: Formation;
  className?: string;
}

export const FormationDiagram: React.FC<FormationDiagramProps> = ({ formation, className = '' }) => {
  const people = formation.svgData?.people || [
    { id: 1, label: 'P1', x: 30, y: 45, role: 'Left' },
    { id: 2, label: 'P2', x: 50, y: 30, role: 'Center' },
    { id: 3, label: 'P3', x: 70, y: 45, role: 'Right' }
  ];

  const cameraPos = formation.svgData?.cameraPos || { x: 50, y: 90 };

  return (
    <div className={`glass-card p-5 rounded-2xl border border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-brand-pink bg-brand-pink/10 px-2.5 py-1 rounded-full border border-brand-pink/20">
            📍 Formation Diagram
          </span>
          <h4 className="text-lg font-bold text-white mt-1 capitalize">
            {formation.type.replace('_', ' ')} Layout
          </h4>
        </div>
        <div className="text-xs text-slate-400 max-w-[200px] text-right">
          {formation.description}
        </div>
      </div>

      {/* Interactive SVG Diagram Canvas */}
      <div className="relative w-full h-64 bg-dark-900/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Grid lines background */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Dynamic SVGs & Lines */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connection field lines to camera */}
          {people.map((person) => (
            <line
              key={`line-${person.id}`}
              x1={person.x}
              y1={person.y}
              x2={cameraPos.x}
              y2={cameraPos.y - 5}
              stroke="#EC4899"
              strokeWidth="0.4"
              strokeDasharray="1.5,1.5"
              className="opacity-40"
            />
          ))}

          {/* Inter-person connection lines */}
          {people.map((person, idx) => {
            if (idx === 0) return null;
            const prev = people[idx - 1];
            return (
              <line
                key={`inter-${person.id}`}
                x1={prev.x}
                y1={prev.y}
                x2={person.x}
                y2={person.y}
                stroke="#8B5CF6"
                strokeWidth="0.6"
                className="opacity-60"
              />
            );
          })}
        </svg>

        {/* Render People Nodes */}
        {people.map((person) => (
          <div
            key={person.id}
            style={{ left: `${person.x}%`, top: `${person.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple p-[2px] shadow-lg shadow-brand-purple/30">
              <div className="w-full h-full bg-dark-800 rounded-full flex items-center justify-center text-white font-bold text-xs group-hover:bg-brand-pink transition-colors">
                {person.label}
              </div>
            </div>
            <span className="mt-1 text-[10px] font-medium text-slate-300 bg-dark-900/80 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap shadow-sm">
              {person.role || `Person ${person.id}`}
            </span>
          </div>
        ))}

        {/* Camera Indicator Node */}
        <div
          style={{ left: `${cameraPos.x}%`, top: `${cameraPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
        >
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 animate-pulse shadow-md shadow-cyan-500/20">
            <Camera className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] uppercase font-semibold tracking-wider text-cyan-400 bg-dark-900/90 px-2 py-0.5 rounded border border-cyan-500/30">
            📷 Camera
          </span>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400 bg-dark-900/50 p-2.5 rounded-xl border border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-pink"></div>
          <span>Circles: People Stand Positions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          <span>Camera: Lens Direction Point</span>
        </div>
      </div>
    </div>
  );
};
