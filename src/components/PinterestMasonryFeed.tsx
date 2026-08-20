import React from 'react';
import type { PoseResult } from '../types/pose';
import { FormationDiagram } from './FormationDiagram';
import { 
  Bookmark, Sparkles, Eye, Search, X
} from 'lucide-react';

interface PinterestMasonryFeedProps {
  poses: PoseResult[];
  onSelectPose?: (pose: PoseResult) => void;
  onSavePose: (pose: PoseResult) => void;
  savedPoses: PoseResult[];
  onTryPose: (pose: PoseResult) => void;
}

export const PinterestMasonryFeed: React.FC<PinterestMasonryFeedProps> = ({
  poses,
  onSavePose,
  savedPoses,
  onTryPose
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTag, setActiveTag] = React.useState('All Ideas');
  const [quickViewPose, setQuickViewPose] = React.useState<PoseResult | null>(null);
  const [pinnedIds, setPinnedIds] = React.useState<Record<string, boolean>>({});

  const tags = [
    'All Ideas', '☕ Café Vibes', '🏖️ Beach Sunset', '🌆 Rooftop City', 
    '🕶️ Streetwear', '👩 Female Solo', '👨 Male Fits', '👩‍👨 Couples', '🎉 Group Shoots'
  ];

  const filteredPoses = poses.filter((pose) => {
    const matchesSearch = 
      pose.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pose.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pose.style.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTag === 'All Ideas') return true;
    if (activeTag.includes('Café')) return pose.background.toLowerCase().includes('caf');
    if (activeTag.includes('Beach')) return pose.background.toLowerCase().includes('beach');
    if (activeTag.includes('Rooftop')) return pose.background.toLowerCase().includes('roof');
    if (activeTag.includes('Streetwear')) return pose.style.toLowerCase().includes('street') || pose.outfit.toLowerCase().includes('street');
    if (activeTag.includes('Female')) return !pose.gender || pose.gender.toLowerCase().includes('female');
    if (activeTag.includes('Male')) return pose.gender && pose.gender.toLowerCase().includes('male');
    if (activeTag.includes('Couples')) return pose.peopleCount === 2;
    if (activeTag.includes('Group')) return pose.peopleCount >= 3;
    return true;
  });

  const togglePin = (pose: PoseResult) => {
    onSavePose(pose);
    setPinnedIds(prev => ({ ...prev, [pose.id]: !prev[pose.id] }));
  };

  // Vary height for authentic Pinterest masonry staggered look
  const getImageHeight = (idx: number) => {
    const heights = ['h-64', 'h-80', 'h-96', 'h-72', 'h-88'];
    return heights[idx % heights.length];
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Tag Pills Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Pinterest ideas (e.g. Café, Beach, Rooftop, Couple)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900/90 border border-white/15 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-xl"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tag Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                activeTag === tag
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                  : 'bg-dark-800 text-slate-300 hover:bg-dark-700 border border-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest Masonry Grid */}
      {filteredPoses.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl text-center space-y-3 max-w-md mx-auto my-10">
          <p className="text-white font-bold">No pins found for this tag</p>
          <button onClick={() => { setActiveTag('All Ideas'); setSearchTerm(''); }} className="text-xs text-red-400 font-bold underline">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPoses.map((pose, idx) => {
            const isSaved = savedPoses.some(p => p.id === pose.id) || pinnedIds[pose.id];

            return (
              <div
                key={pose.id}
                className="break-inside-avoid relative rounded-3xl overflow-hidden glass-card border border-white/10 group hover:border-red-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Pin Image */}
                <div className={`w-full relative ${getImageHeight(idx)} overflow-hidden bg-dark-950`}>
                  <img
                    src={pose.sampleImage}
                    alt={pose.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Right Pin Button (Pinterest Red) */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center space-x-1.5">
                    <button
                      onClick={() => togglePin(pose)}
                      className={`px-4 py-2 rounded-full text-xs font-extrabold shadow-xl transition-all flex items-center space-x-1 ${
                        isSaved 
                          ? 'bg-dark-900/90 text-red-400 border border-red-500/40' 
                          : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40 scale-105'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      <span>{isSaved ? 'Saved' : 'Save Pin'}</span>
                    </button>
                  </div>

                  {/* Top Left Tag */}
                  <div className="absolute top-3 left-3 opacity-90 z-10">
                    <span className="bg-dark-900/80 backdrop-blur-md text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-amber-500/30">
                      {pose.peopleLabel}
                    </span>
                  </div>

                  {/* Bottom Hover Actions */}
                  <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setQuickViewPose(pose)}
                      className="px-3 py-1.5 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={() => onTryPose(pose)}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-lg backdrop-blur-md flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Direct Pose →</span>
                    </button>
                  </div>
                </div>

                {/* Pin Card Info */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                      {pose.background} • {pose.style}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      ❤️ {(pose.likes || 1200).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight group-hover:text-red-400 transition-colors">
                    {pose.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {pose.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PINTEREST QUICK VIEW MODAL */}
      {quickViewPose && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-dark-950 rounded-3xl border border-white/15 overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setQuickViewPose(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-dark-900/90 text-white hover:bg-dark-800 border border-white/20 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="md:w-1/2 bg-black relative flex items-center justify-center p-4">
              <img
                src={quickViewPose.sampleImage}
                alt={quickViewPose.title}
                className="max-h-[75vh] w-full object-contain rounded-2xl"
              />
              <span className="absolute top-6 left-6 bg-red-600 text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-lg">
                Pinterest Inspo Card
              </span>
            </div>

            {/* Right Details & Directive Side */}
            <div className="md:w-1/2 p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-red-400 bg-red-600/10 px-3 py-1 rounded-full border border-red-500/20">
                    {quickViewPose.style} Style
                  </span>
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {quickViewPose.peopleLabel}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {quickViewPose.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {quickViewPose.subtitle}
                </p>

                {/* Directives */}
                <div className="bg-dark-900/80 p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                  <span className="font-bold text-white block">📍 Setup Quick Reference</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9px]">BACKGROUND</span>
                      <span className="text-cyan-300 font-semibold">{quickViewPose.background}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">CAMERA LENS</span>
                      <span className="text-amber-300 font-semibold">{quickViewPose.camera.lens}</span>
                    </div>
                  </div>
                </div>

                {/* Formation Diagram */}
                <FormationDiagram formation={quickViewPose.formation} />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                <button
                  onClick={() => togglePin(quickViewPose)}
                  className="flex-1 py-3 rounded-xl font-extrabold text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save to Board</span>
                </button>

                <button
                  onClick={() => {
                    const target = quickViewPose;
                    setQuickViewPose(null);
                    onTryPose(target);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Full Pose →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
