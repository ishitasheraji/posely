import React, { useState } from 'react';
import type { PoseResult } from '../types/pose';
import { Camera, Plus, Trash2, Download, Layout, CheckSquare, Palette, FolderPlus } from 'lucide-react';

interface MoodboardStudioPageProps {
  savedPoses: PoseResult[];
  onStartGenerator: () => void;
}

export const MoodboardStudioPage: React.FC<MoodboardStudioPageProps> = ({
  savedPoses,
  onStartGenerator
}) => {
  const [boardTitle, setBoardTitle] = useState('My Café Sunset Shoot Brief');
  const [selectedPoses, setSelectedPoses] = useState<PoseResult[]>(savedPoses.slice(0, 4));
  const [colorPalette] = useState(['#E9D5FF', '#8B5CF6', '#1E1B4B', '#F43F5E', '#F59E0B']);
  const [shotList, setShotList] = useState([
    { id: 1, text: 'Wide 0.5x entrance shot walking in', done: true },
    { id: 2, text: 'Medium 50mm seated coffee mug candid', done: false },
    { id: 3, text: 'Close-up eye catchlight detail shot', done: false },
    { id: 4, text: 'Golden hour backlit silhouette at window', done: false }
  ]);
  const [newShotText, setNewShotText] = useState('');

  const toggleShot = (id: number) => {
    setShotList(shotList.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  const addShot = () => {
    if (!newShotText.trim()) return;
    setShotList([...shotList, { id: Date.now(), text: newShotText, done: false }]);
    setNewShotText('');
  };

  const removeShot = (id: number) => {
    setShotList(shotList.filter(s => s.id !== id));
  };

  const handleExportBrief = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#292933] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-xs font-bold text-purple-300 mb-2">
            <Layout className="w-3.5 h-3.5" />
            <span>AI SHOOT PLANNER & MOODBOARD</span>
          </div>
          <input
            type="text"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            className="text-2xl sm:text-4xl font-extrabold text-white bg-transparent border-b border-transparent hover:border-purple-500/40 focus:border-purple-500 focus:outline-none transition-all w-full"
          />
          <p className="text-xs text-slate-400 mt-1">
            Curate your moodboard, color palette, and shot list brief for your upcoming shoot.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onStartGenerator}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#1B1B23] hover:bg-[#252530] text-slate-200 border border-[#292933] transition-all"
          >
            <FolderPlus className="w-4 h-4 text-purple-400" />
            <span>Add Poses</span>
          </button>

          <button
            onClick={handleExportBrief}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Brief PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Moodboard Canvas (Left) + Shot List & Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Visual Moodboard Pins */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              📸 Visual Inspiration Grid ({selectedPoses.length} Poses)
            </h3>
            <span className="text-xs text-slate-400">Drag to reorder photos</span>
          </div>

          {selectedPoses.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {selectedPoses.map((pose) => (
                <div key={pose.id} className="glass-card rounded-2xl overflow-hidden border border-[#292933] group relative">
                  <img
                    src={pose.sampleImage}
                    alt={pose.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                  
                  <button
                    onClick={() => setSelectedPoses(selectedPoses.filter(p => p.id !== pose.id))}
                    className="absolute top-3 right-3 p-2 rounded-full bg-dark-900/80 text-rose-400 hover:text-rose-200 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from board"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider bg-purple-900/60 px-2 py-0.5 rounded border border-purple-500/30">
                      {pose.peopleLabel}
                    </span>
                    <h4 className="text-sm font-extrabold text-white truncate">{pose.title}</h4>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{pose.background} • {pose.cameraType}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 rounded-3xl border border-dashed border-[#292933] text-center space-y-4">
              <Camera className="w-10 h-10 text-purple-400 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-white">Your Moodboard is Empty</h4>
                <p className="text-xs text-slate-400 mt-1">Save poses from the Pinterest tab or Generator to build your shoot brief.</p>
              </div>
              <button
                onClick={onStartGenerator}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-purple-600 text-white shadow-lg"
              >
                + Add Custom Poses
              </button>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Outfit Color Palette + Shot List Checklist */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Color Palette */}
          <div className="glass-card p-6 rounded-3xl border border-[#292933] space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-400" /> Outfit Color Harmony Swatches
            </h4>
            <div className="flex items-center justify-between gap-2 p-2 bg-[#0B0B0F] rounded-2xl border border-[#292933]">
              {colorPalette.map((color, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full h-10 rounded-xl border border-white/10 shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[9px] font-mono text-slate-400">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shot List Checklist */}
          <div className="glass-card p-6 rounded-3xl border border-[#292933] space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" /> Shot List & Directing Checklist
            </h4>

            <div className="space-y-2">
              {shotList.map((shot) => (
                <div
                  key={shot.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    shot.done
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-slate-400 line-through'
                      : 'bg-[#1B1B23] border-[#292933] text-slate-200 font-medium'
                  }`}
                >
                  <label className="flex items-center space-x-2.5 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={shot.done}
                      onChange={() => toggleShot(shot.id)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-0 accent-purple-600"
                    />
                    <span>{shot.text}</span>
                  </label>

                  <button
                    onClick={() => removeShot(shot.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-[#292933]">
              <input
                type="text"
                value={newShotText}
                onChange={(e) => setNewShotText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addShot()}
                placeholder="Add new shot idea..."
                className="flex-1 bg-[#0B0B0F] border border-[#292933] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={addShot}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
