import React from 'react';
import { Camera, Sparkles } from 'lucide-react';


interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-white/10 bg-dark-900/80 backdrop-blur-md pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-pink to-brand-purple flex items-center justify-center text-white font-bold">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white">PoseMate</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your AI Photographer & Pose Director. Get perfect group formations, hand positions, expressions, and camera angles for every shot.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-3">Quick Navigation</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-brand-pink transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('generate')} className="hover:text-brand-pink transition-colors">
                  AI Pose Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('poses')} className="hover:text-brand-pink transition-colors">
                  Pose Catalog & Library
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('fix-pose')} className="hover:text-brand-pink transition-colors">
                  Fix My Pose (AI Vision)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-3">Popular Categories</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Café & Coffee Shop Poses</li>
              <li>Beach & Golden Hour Duo</li>
              <li>Friend Group V-Formations</li>
              <li>Rooftop Sunset Solo Portraits</li>
              <li>College & Casual Street Style</li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-3">Never Ask "How Should We Pose?" Again</h5>
            <p className="text-xs text-slate-400 mb-3">
              Generate actionable posture instructions in seconds with PoseMate.
            </p>
            <button
              onClick={() => setActiveTab('generate')}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-md hover:opacity-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Director</span>
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PoseMate AI Photography Studio. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">AI Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
