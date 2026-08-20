import React from 'react';
import { 
  Camera, Sparkles, Trophy, Wand2, Menu, X, User, Home, BookOpen, Wrench, Bookmark, Pin, LogOut, Layout
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount?: number;
  onOpenAuth?: () => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount = 0,
  onOpenAuth,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Pinterest Ideas', icon: Pin, isNew: true, badgeText: '📌' },
    { id: 'generate', label: 'AI Director', icon: Wand2 },
    { id: 'camera', label: 'AI Camera', icon: Camera, isNew: true },
    { id: 'moodboard', label: 'Shoot Brief', icon: Layout, isNew: true },
    { id: 'best-photo', label: 'Best Photo', icon: Trophy },
    { id: 'poses', label: 'Pose Library', icon: BookOpen },
    { id: 'fix-pose', label: 'Fix Pose', icon: Wrench },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
  ];

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#15151C]/90 backdrop-blur-2xl border border-[#292933] shadow-2xl px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between relative overflow-hidden">
        
        {/* Subtle ambient light bar on top of nav */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-300 p-[2px] shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-[#0B0B0F] rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <Camera className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              <Sparkles className="w-3 h-3 text-purple-400 absolute top-1 right-1 animate-pulse" />
            </div>
          </div>
          <div className="hidden min-[380px]:block">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Pose<span className="text-gradient">Mate</span>
            </span>
            <span className="text-[9px] tracking-widest uppercase font-bold text-purple-300 block -mt-1">
              AI Photographer
            </span>
          </div>
        </div>

        {/* Desktop Floating Navigation Pills */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#0B0B0F]/80 p-1.5 rounded-2xl border border-[#292933]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-600/30 border border-purple-400/30 scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-[#1B1B23]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>

                {item.badgeText && (
                  <span className="text-[10px] ml-0.5">{item.badgeText}</span>
                )}

                {item.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-extrabold rounded-full bg-rose-500 text-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Quick Actions */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab('camera')}
            className="p-2.5 rounded-xl text-xs font-bold bg-[#1B1B23] hover:bg-purple-900/40 text-purple-300 border border-[#292933] hover:border-purple-500/40 transition-all flex items-center space-x-1.5 shadow-md"
            title="Launch AI Camera Coach"
          >
            <Camera className="w-4 h-4 text-purple-400" />
            <span className="hidden xl:inline">AI Camera</span>
          </button>

          <button
            onClick={() => setActiveTab('generate')}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-lg shadow-purple-600/30 hover:opacity-95 hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Pose</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-[#292933]">
              <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xs shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#1B1B23] hover:bg-[#252530] text-slate-200 border border-[#292933] transition-all"
            >
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 text-slate-300 hover:text-white bg-[#1B1B23] rounded-xl border border-[#292933]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Glassmorphism Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-[#15151C]/95 backdrop-blur-2xl border border-[#292933] p-4 space-y-2 animate-fadeIn shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between border transition-all ${
                    isActive
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                      : 'bg-[#1B1B23] border-[#292933] text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#292933] flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveTab('generate');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-xs font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Launch AI Director</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
