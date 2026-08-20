import React from 'react';
import type { PoseResult } from '../types/pose';
import { INITIAL_LIBRARY_POSES } from '../services/aiPoseService';
import { Search, Filter, Heart, Eye } from 'lucide-react';


interface PoseLibraryPageProps {
  onSelectPose: (pose: PoseResult) => void;
  onSavePose: (pose: PoseResult) => void;
  savedPoses: PoseResult[];
}

export const PoseLibraryPage: React.FC<PoseLibraryPageProps> = ({
  onSelectPose,
  onSavePose,
  savedPoses
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [peopleFilter, setPeopleFilter] = React.useState('All');
  const [genderFilter, setGenderFilter] = React.useState('All');

  const categories = [
    'All', 'Friends', 'Solo', 'Couple', 'College', 'Travel', 'Beach', 'Café', 
    'Street', 'Birthday', 'Party', 'Traditional', 'Group', 'Cinematic', 'Funny'
  ];

  const filteredPoses = INITIAL_LIBRARY_POSES.filter((pose) => {
    const matchesSearch = 
      pose.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pose.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pose.style.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || 
      pose.background.toLowerCase() === selectedCategory.toLowerCase() ||
      pose.style.toLowerCase() === selectedCategory.toLowerCase();

    const matchesPeople = 
      peopleFilter === 'All' ||
      (peopleFilter === 'Solo' && pose.peopleCount === 1) ||
      (peopleFilter === '2 People' && pose.peopleCount === 2) ||
      (peopleFilter === '3+ People' && pose.peopleCount >= 3);

    const matchesGender = 
      genderFilter === 'All' ||
      !pose.gender ||
      pose.gender.toLowerCase().includes(genderFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesPeople && matchesGender;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore AI Pose Library
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Curated collection of tested photography compositions, group formations & studio postures.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search poses by style, location (e.g. Café, Beach, Street)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={peopleFilter}
              onChange={(e) => setPeopleFilter(e.target.value)}
              className="bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="All">All Group Sizes</option>
              <option value="Solo">Solo</option>
              <option value="2 People">2 People</option>
              <option value="3+ People">3+ People</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Female">👩 Female</option>
              <option value="Male">👨 Male</option>
              <option value="Co-ed">👩‍👨 Co-ed / Mix</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-pink text-white shadow-md'
                  : 'bg-dark-900/60 text-slate-300 hover:bg-dark-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Poses */}
      {filteredPoses.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl">
          <p className="text-slate-400 text-sm">No poses found matching your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoses.map((pose) => {
            const isSaved = savedPoses.some(p => p.id === pose.id);
            return (
              <div
                key={pose.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-pink/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={pose.sampleImage}
                      alt={pose.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                    
                    <button
                      onClick={() => onSavePose(pose)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-rose-500 text-white' : 'bg-dark-900/60 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-brand-purple/80 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold">
                        {pose.peopleLabel}
                      </span>
                      <span className="bg-dark-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold text-slate-300">
                        {pose.style}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-white text-lg group-hover:text-brand-pink transition-colors">
                      {pose.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {pose.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400">
                    📍 {pose.background}
                  </span>
                  <button
                    onClick={() => onSelectPose(pose)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-white border border-white/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Instructions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
