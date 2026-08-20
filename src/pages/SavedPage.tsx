import React from 'react';
import type { PoseResult } from '../types/pose';
import { Heart, Trash2, Sparkles, Folder } from 'lucide-react';


interface SavedPageProps {
  savedPoses: PoseResult[];
  onRemoveSaved: (id: string) => void;
  onSelectPose: (pose: PoseResult) => void;
  onStartGenerator: () => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  savedPoses,
  onRemoveSaved,
  onSelectPose,
  onStartGenerator
}) => {
  const [activeCollection, setActiveCollection] = React.useState('All');
  const collections = ['All', 'Friends', 'College', 'Travel', 'Birthday', 'Beach', 'Café', 'Instagram'];

  const filtered = activeCollection === 'All'
    ? savedPoses
    : savedPoses.filter(p => p.background.toLowerCase() === activeCollection.toLowerCase() || p.style.toLowerCase() === activeCollection.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Heart className="w-8 h-8 text-brand-pink fill-brand-pink" />
            <span>Saved Poses & Collections</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Your personal bookmarks & custom photo session plans
          </p>
        </div>

        <button
          onClick={onStartGenerator}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Pose</span>
        </button>
      </div>

      {/* Collections Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
        {collections.map((col) => (
          <button
            key={col}
            onClick={() => setActiveCollection(col)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeCollection === col
                ? 'bg-brand-purple text-white shadow-md'
                : 'bg-dark-900/60 text-slate-300 hover:bg-dark-800'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{col}</span>
          </button>
        ))}
      </div>

      {/* Saved Poses Content */}
      {filtered.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">❤️ No saved poses yet</h3>
          <p className="text-xs text-slate-400">
            Generate your first pose or explore the Pose Library, then save your favorite setups here.
          </p>
          <button
            onClick={onStartGenerator}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-brand-pink text-white shadow-md"
          >
            Generate Pose Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pose) => (
            <div
              key={pose.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={pose.sampleImage} alt={pose.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemoveSaved(pose.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-dark-900/80 text-slate-400 hover:text-rose-400 backdrop-blur-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-pink tracking-wider">
                    {pose.style} • {pose.peopleLabel}
                  </span>
                  <h3 className="font-bold text-white text-base">{pose.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{pose.subtitle}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectPose(pose)}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-white border border-white/10"
                >
                  View Full Instructions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
