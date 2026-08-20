import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { GeneratorPage } from './pages/GeneratorPage';
import { PoseLibraryPage } from './pages/PoseLibraryPage';
import { FixPosePage } from './pages/FixPosePage';
import { SavedPage } from './pages/SavedPage';
import { TrendingFeedPage } from './pages/TrendingFeedPage';
import { LiveCameraCoachPage } from './pages/LiveCameraCoachPage';
import { BestPhotoPickerPage } from './pages/BestPhotoPickerPage';
import { MoodboardStudioPage } from './pages/MoodboardStudioPage';
import { AuthModal } from './components/AuthModal';
import { PoseResultCard } from './components/PoseResultCard';
import { AiChatbotWidget } from './components/AiChatbotWidget';
import { GoldenHourCalculator } from './components/GoldenHourCalculator';
import type { PoseResult } from './types/pose';
import { INITIAL_LIBRARY_POSES } from './services/aiPoseService';
import { Flame, Camera, Trophy } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [savedPoses, setSavedPoses] = React.useState<PoseResult[]>([INITIAL_LIBRARY_POSES[0]]);
  const [selectedPoseModal, setSelectedPoseModal] = React.useState<PoseResult | null>(null);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  const handleSavePose = (pose: PoseResult) => {
    if (savedPoses.some(p => p.id === pose.id)) {
      setSavedPoses(savedPoses.filter(p => p.id !== pose.id));
    } else {
      setSavedPoses([...savedPoses, { ...pose, isSaved: true }]);
    }
  };

  const handleRemoveSaved = (id: string) => {
    setSavedPoses(savedPoses.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col justify-between selection:bg-purple-600/30 selection:text-purple-200">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedPoses.length}
          onOpenAuth={() => setIsAuthOpen(true)}
          user={user}
          onLogout={() => setUser(null)}
        />

        <main className="pb-12">
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div>
              <Hero
                onStartGenerate={() => setActiveTab('generate')}
                onOpenLiveCamera={() => setActiveTab('camera')}
                onExploreTrending={() => setActiveTab('trending')}
              />

              {/* HOW IT WORKS SECTION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-dark-border">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/30">
                    3 Simple Steps
                  </span>
                  <h2 className="text-3xl font-extrabold text-white mt-3">
                    How PoseMate Works
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl border border-dark-border space-y-3">
                    <span className="text-2xl font-black text-purple-400 block">01</span>
                    <h3 className="text-lg font-bold text-white">Choose Your Scene</h3>
                    <p className="text-xs text-slate-400">
                      Select friends count, location (café, beach, street), style, outfit, and camera.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-dark-border space-y-3">
                    <span className="text-2xl font-black text-purple-400 block">02</span>
                    <h3 className="text-lg font-bold text-white">Let AI Direct You</h3>
                    <p className="text-xs text-slate-400">
                      PoseMate tells everyone where to stand, posture angles, hand placement, and camera height.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-dark-border space-y-3">
                    <span className="text-2xl font-black text-purple-400 block">03</span>
                    <h3 className="text-lg font-bold text-white">Take Your Best Shot</h3>
                    <p className="text-xs text-slate-400">
                      Use the Live AI Camera Coach and Best Photo Picker to pick the winning shot.
                    </p>
                  </div>
                </div>
              </section>

              {/* LIVE GOLDEN HOUR CALCULATOR */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <GoldenHourCalculator />
              </section>

              {/* 3 MAJOR DIFFERENTIATOR PROMOTIONAL CARDS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Trending Feed */}
                  <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-bold">
                      <Flame className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">🔥 Trending Pose Feed</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Discover what poses are going viral right now across café, beach, and street shoots.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('trending')}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md"
                    >
                      Explore Trending Feed →
                    </button>
                  </div>

                  {/* Card 2: Live AI Camera */}
                  <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">📱 Live AI Camera Coach</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Open your camera and get real-time voice & visual overlay directives while snapping.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('camera')}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md"
                    >
                      Launch AI Camera Coach →
                    </button>
                  </div>

                  {/* Card 3: Best Photo Picker */}
                  <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">🪄 Best Photo Picker</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Upload 5–50 photos from your shoot. AI scores smiles, composition & lighting to pick the best.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('best-photo')}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md"
                    >
                      Pick Best Photo →
                    </button>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="text-center glass-panel p-10 rounded-3xl border border-dark-border relative overflow-hidden space-y-4">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Let PoseMate Direct Your Next Photo.
                  </h3>
                  <p className="text-slate-300 text-sm max-w-xl mx-auto">
                    Never ask "How should we pose?" again. Get instant group positioning & camera placement.
                  </p>
                  <button
                    onClick={() => setActiveTab('generate')}
                    className="px-8 py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-xl shadow-purple-600/30 hover:scale-105 transition-all"
                  >
                    ✨ Start Photographing Now
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* GENERATE TAB */}
          {activeTab === 'generate' && (
            <GeneratorPage
              onSavePose={handleSavePose}
              savedPoses={savedPoses}
            />
          )}

          {/* TRENDING FEED TAB */}
          {activeTab === 'trending' && (
            <TrendingFeedPage
              onSelectPose={(pose) => setSelectedPoseModal(pose)}
              onSavePose={handleSavePose}
              savedPoses={savedPoses}
              onTryPose={(pose) => {
                setSelectedPoseModal(pose);
              }}
            />
          )}

          {/* LIVE AI CAMERA COACH TAB */}
          {activeTab === 'camera' && (
            <LiveCameraCoachPage />
          )}

          {/* MOODBOARD SHOOT BRIEF TAB */}
          {activeTab === 'moodboard' && (
            <MoodboardStudioPage
              savedPoses={savedPoses}
              onStartGenerator={() => setActiveTab('generate')}
            />
          )}

          {/* BEST PHOTO PICKER TAB */}
          {activeTab === 'best-photo' && (
            <BestPhotoPickerPage />
          )}

          {/* POSES LIBRARY TAB */}
          {activeTab === 'poses' && (
            <PoseLibraryPage
              onSelectPose={(pose) => setSelectedPoseModal(pose)}
              onSavePose={handleSavePose}
              savedPoses={savedPoses}
            />
          )}

          {/* FIX MY POSE TAB */}
          {activeTab === 'fix-pose' && (
            <FixPosePage
              onStartNewGenerator={() => setActiveTab('generate')}
            />
          )}

          {/* SAVED TAB */}
          {activeTab === 'saved' && (
            <SavedPage
              savedPoses={savedPoses}
              onRemoveSaved={handleRemoveSaved}
              onSelectPose={(pose) => setSelectedPoseModal(pose)}
              onStartGenerator={() => setActiveTab('generate')}
            />
          )}
        </main>
      </div>

      <Footer setActiveTab={setActiveTab} />

      {/* POSE DETAIL MODAL */}
      {selectedPoseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl my-8">
            <button
              onClick={() => setSelectedPoseModal(null)}
              className="absolute -top-10 right-0 text-slate-300 hover:text-white font-bold text-xs bg-dark-800 px-3.5 py-1.5 rounded-full border border-dark-border"
            >
              ✕ Close Detail
            </button>
            <PoseResultCard
              pose={selectedPoseModal}
              onSave={handleSavePose}
              isSaved={savedPoses.some(p => p.id === selectedPoseModal.id)}
            />
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
      />

      {/* AI CHATBOT WIDGET */}
      <AiChatbotWidget onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
