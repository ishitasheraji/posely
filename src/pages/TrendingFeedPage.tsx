import React from 'react';
import type { PoseResult } from '../types/pose';
import { INITIAL_LIBRARY_POSES } from '../services/aiPoseService';
import { PinterestMasonryFeed } from '../components/PinterestMasonryFeed';
import { Flame } from 'lucide-react';

interface TrendingFeedPageProps {
  onSelectPose: (pose: PoseResult) => void;
  onSavePose: (pose: PoseResult) => void;
  savedPoses: PoseResult[];
  onTryPose: (pose: PoseResult) => void;
}

export const TrendingFeedPage: React.FC<TrendingFeedPageProps> = ({
  onSelectPose,
  onSavePose,
  savedPoses,
  onTryPose
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-bold text-red-300 mb-3 shadow-lg">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          <span>Pinterest-Style Visual Inspiration Feed</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          📌 Pinterest Pose Ideas
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Discover aesthetic photo ideas, save pins to your board, and direct your next shoot effortlessly.
        </p>
      </div>

      {/* Pinterest Staggered Masonry Feed */}
      <PinterestMasonryFeed
        poses={INITIAL_LIBRARY_POSES}
        onSelectPose={onSelectPose}
        onSavePose={onSavePose}
        savedPoses={savedPoses}
        onTryPose={onTryPose}
      />
    </div>
  );
};
