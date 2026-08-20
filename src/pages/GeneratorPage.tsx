import React from 'react';
import type { GeneratorInputs, PoseResult } from '../types/pose';
import { generatePoseData, generateMultipleSessionPoses } from '../services/aiPoseService';
import { PoseResultCard } from '../components/PoseResultCard';
import { 
  Users, Sparkles, Wand2, Upload, X, Camera, Sun, Shirt, Dice5 
} from 'lucide-react';


interface GeneratorPageProps {
  onSavePose: (pose: PoseResult) => void;
  savedPoses: PoseResult[];
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ onSavePose, savedPoses }) => {
  // Generator Input States
  const [peopleCount, setPeopleCount] = React.useState<number | string>(3);
  const [gender, setGender] = React.useState('Female');
  const [background, setBackground] = React.useState('Café');
  const [style, setStyle] = React.useState('Candid');
  const [outfit, setOutfit] = React.useState('Casual');
  const [time, setTime] = React.useState('Golden Hour');
  const [camera, setCamera] = React.useState('Portrait');
  const [customBgUrl, setCustomBgUrl] = React.useState<string | null>(null);

  // Result & Loading states
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('Analyzing your requirements...');
  const [generatedPose, setGeneratedPose] = React.useState<PoseResult | null>(null);
  const [sessionPoses, setSessionPoses] = React.useState<PoseResult[] | null>(null);

  // Handle custom background image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please choose a smaller image.');
        return;
      }
      const url = URL.createObjectURL(file);
      setCustomBgUrl(url);
      setBackground('Custom Background');
    }
  };

  const executeGeneration = (inputs?: GeneratorInputs) => {
    setIsGenerating(true);
    setSessionPoses(null);
    const targetInputs = inputs || {
      peopleCount,
      gender,
      background,
      style,
      outfit,
      time,
      camera,
      customBackgroundUrl: customBgUrl || undefined
    };

    // Sequential realistic loader steps
    setLoadingText('Analyzing environment & lighting requirements...');
    setTimeout(() => {
      setLoadingText('Finding perfect body composition & formation...');
      setTimeout(() => {
        setLoadingText('Creating person-by-person pose instructions...');
        setTimeout(() => {
          const result = generatePoseData(targetInputs);
          setGeneratedPose(result);
          setIsGenerating(false);
        }, 600);
      }, 600);
    }, 600);
  };

  // Feature 16: Surprise Me
  const handleSurpriseMe = () => {
    const peopleOpts = [1, 2, 3, 4, 5];
    const bgOpts = ['Café', 'Beach', 'Street', 'Park', 'Rooftop', 'Stairs', 'Car', 'Mountains'];
    const styleOpts = ['Candid', 'Aesthetic', 'Cool', 'Funny', 'Cinematic', 'Instagram', 'Moody', 'Luxury'];
    const outfitOpts = ['Casual', 'Formal', 'Streetwear', 'Oversized', 'Party'];
    const timeOpts = ['Morning', 'Golden Hour', 'Evening', 'Night'];
    const cameraOpts = ['Front Camera', 'Back Camera', 'Wide', 'Portrait', 'DSLR'];

    const randomPeople = peopleOpts[Math.floor(Math.random() * peopleOpts.length)];
    const randomBg = bgOpts[Math.floor(Math.random() * bgOpts.length)];
    const randomStyle = styleOpts[Math.floor(Math.random() * styleOpts.length)];
    const randomOutfit = outfitOpts[Math.floor(Math.random() * outfitOpts.length)];
    const randomTime = timeOpts[Math.floor(Math.random() * timeOpts.length)];
    const randomCamera = cameraOpts[Math.floor(Math.random() * cameraOpts.length)];

    setPeopleCount(randomPeople);
    setBackground(randomBg);
    setStyle(randomStyle);
    setOutfit(randomOutfit);
    setTime(randomTime);
    setCamera(randomCamera);
    setCustomBgUrl(null);

    executeGeneration({
      peopleCount: randomPeople,
      background: randomBg,
      style: randomStyle,
      outfit: randomOutfit,
      time: randomTime,
      camera: randomCamera
    });
  };

  // Feature 17: Full 10-Pose Photo Session
  const handleGenerateFullSession = () => {
    if (!generatedPose) return;
    setIsGenerating(true);
    setLoadingText('Generating 10 diverse photo session poses...');
    setTimeout(() => {
      const poses = generateMultipleSessionPoses({
        peopleCount,
        background,
        style,
        outfit,
        time,
        camera,
        customBackgroundUrl: customBgUrl || undefined
      }, 10);
      setSessionPoses(poses);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Pose & Photo Director
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Configure your setting in 6 steps to receive custom formation diagrams, body postures & camera setups.
        </p>
      </div>

      {/* STEP CONFIGURATION FORM */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8 mb-12">
        
        {/* STEP 1: Number of People */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold flex items-center justify-center border border-brand-pink/30">
              1
            </span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Number of People</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Solo (1)', count: 1 },
              { label: '2 People', count: 2 },
              { label: '3 People', count: 3 },
              { label: '4 People', count: 4 },
              { label: '5+ Group', count: 5 }
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setPeopleCount(opt.count)}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  peopleCount === opt.count
                    ? 'bg-gradient-to-tr from-brand-pink/20 to-brand-purple/20 border-brand-pink text-white shadow-lg'
                    : 'bg-dark-900/60 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <Users className={`w-5 h-5 mx-auto mb-2 ${peopleCount === opt.count ? 'text-brand-pink' : 'text-slate-400'}`} />
                <span className="font-bold text-sm block">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: Subject Demographic / Gender */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold flex items-center justify-center border border-brand-pink/30">
              2
            </span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Subject Gender / Group Type</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Female', icon: '👩', value: 'Female', desc: 'Feminine pose directives' },
              { label: 'Male', icon: '👨', value: 'Male', desc: 'Masculine posture & angles' },
              { label: 'Co-ed / Couple', icon: '👩‍👨', value: 'Co-ed / Mix', desc: 'Mixed group & pair dynamics' },
              { label: 'Any / Neutral', icon: '👥', value: 'Any', desc: 'Universal gender-neutral' }
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setGender(opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  gender === opt.value
                    ? 'bg-gradient-to-tr from-brand-pink/20 to-brand-purple/20 border-brand-pink text-white shadow-lg'
                    : 'bg-dark-900/60 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl">{opt.icon}</span>
                  <span className="font-bold text-sm text-white">{opt.label}</span>
                </div>
                <span className="text-[10px] text-slate-400 block">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: Background / Location + Custom Upload */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-bold flex items-center justify-center border border-brand-purple/30">
                3
              </span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Background / Location</h3>
            </div>
            <label className="cursor-pointer text-xs font-semibold text-brand-pink bg-brand-pink/10 hover:bg-brand-pink/20 px-3 py-1.5 rounded-xl border border-brand-pink/30 flex items-center space-x-1.5 transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>📸 Upload Custom Backdrop</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {customBgUrl && (
            <div className="mb-4 bg-dark-900/90 p-3 rounded-2xl border border-brand-pink/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={customBgUrl} alt="Uploaded Backdrop" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <span className="text-xs font-bold text-white block">Custom Upload Active</span>
                  <span className="text-[10px] text-slate-400">AI will analyze this specific photo structure</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setCustomBgUrl(null); setBackground('Café'); }}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {['Café', 'Beach', 'College', 'Street', 'Park', 'Rooftop', 'Stairs', 'Car', 'Mirror', 'Mountains', 'Indoor', 'Outdoor', 'Restaurant'].map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => { setBackground(bg); setCustomBgUrl(null); }}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  background === bg && !customBgUrl
                    ? 'bg-brand-purple text-white border-brand-purple shadow-md'
                    : 'bg-dark-900/60 border-white/5 text-slate-300 hover:bg-dark-800'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 4: Photo Style */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-500/30">
              4
            </span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Photo Style</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {['Candid', 'Aesthetic', 'Cool', 'Funny', 'Cinematic', 'Instagram', 'Moody', 'Cute', 'Street', 'Luxury'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all ${
                  style === s
                    ? 'bg-cyan-500 text-dark-900 border-cyan-400 font-extrabold shadow-md'
                    : 'bg-dark-900/60 border-white/5 text-slate-300 hover:bg-dark-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 5 & 6 & 7 Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 5: Outfit */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Shirt className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Step 5 — Outfit</h4>
            </div>
            <select
              value={outfit}
              onChange={(e) => setOutfit(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
            >
              {['Casual', 'Formal', 'Traditional', 'Western', 'Party', 'College', 'Oversized', 'Saree/Kurti', 'Hoodie'].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* STEP 6: Time */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Step 6 — Lighting / Time</h4>
            </div>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
            >
              {['Morning', 'Afternoon', 'Golden Hour', 'Evening', 'Night'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* STEP 7: Camera Mode */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Step 7 — Camera Mode</h4>
            </div>
            <select
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
            >
              {['Front Camera', 'Back Camera', 'Normal', 'Wide', 'Portrait', 'DSLR'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* FINAL BUTTONS */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm bg-dark-800 hover:bg-dark-700 text-slate-200 border border-white/10 flex items-center justify-center space-x-2"
          >
            <Dice5 className="w-4 h-4 text-amber-400" />
            <span>🎲 Surprise Me</span>
          </button>

          <button
            type="button"
            onClick={() => executeGeneration()}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-brand-pink via-brand-purple to-cyan-500 text-white shadow-xl shadow-brand-purple/30 hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ Generate My Pose</span>
          </button>
        </div>

      </div>

      {/* LOADING STATE ANIMATION */}
      {isGenerating && (
        <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-md mx-auto animate-pulse">
          <div className="w-14 h-14 rounded-full bg-brand-purple/20 border-2 border-brand-purple flex items-center justify-center mx-auto text-brand-purple">
            <Wand2 className="w-7 h-7 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-white">Your AI Director is thinking...</h3>
          <p className="text-xs text-brand-pink font-medium animate-pulse">{loadingText}</p>
        </div>
      )}

      {/* GENERATED RESULT DISPLAY */}
      {generatedPose && !isGenerating && (
        <div className="space-y-12">
          <PoseResultCard
            pose={generatedPose}
            onSave={onSavePose}
            isSaved={savedPoses.some(p => p.id === generatedPose.id)}
            onRegenerateSimilar={() => executeGeneration()}
            onGenerateSession={handleGenerateFullSession}
          />

          {/* Feature 17: Render Full 10-Pose Session Grid */}
          {sessionPoses && (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-brand-pink">
                    📸 Complete Photo Session (10 Variations)
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Full Studio Pose Breakdown
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sessionPoses.map((p, idx) => (
                  <div key={p.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                        Pose #{idx + 1}
                      </span>
                      <span className="text-xs text-slate-400">{p.style}</span>
                    </div>
                    <h4 className="font-bold text-white text-base">{p.title}</h4>
                    <p className="text-xs text-slate-300">{p.subtitle}</p>

                    <div className="bg-dark-900/60 p-3 rounded-xl text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-400">Posture:</span> {p.peopleInstructions[0]?.body}</p>
                      <p><span className="text-slate-400">Hands:</span> {p.peopleInstructions[0]?.hands}</p>
                    </div>

                    <button
                      onClick={() => setGeneratedPose(p)}
                      className="w-full text-center py-2 text-xs font-semibold text-brand-purple hover:text-brand-pink transition-colors"
                    >
                      View Full Instructions & Diagram →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
