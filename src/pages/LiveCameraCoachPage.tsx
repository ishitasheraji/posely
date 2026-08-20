import React from 'react';
import { getLiveCameraInstruction } from '../services/aiPoseService';
import type { LiveCameraInstruction } from '../types/pose';
import { Camera, RefreshCw, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const LiveCameraCoachPage: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [streamActive, setStreamActive] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [facingMode, setFacingMode] = React.useState<'user' | 'environment'>('user');
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);
  const [instruction, setInstruction] = React.useState<LiveCameraInstruction>(getLiveCameraInstruction(0));

  // Speech synthesis helper
  const speakInstruction = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  };

  // Request browser camera stream
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
        setStreamActive(true);
      } else {
        setHasPermission(false);
      }
    } catch (err) {
      console.error('Camera access denied or unavailable', err);
      setHasPermission(false);
    }
  };

  const flipCamera = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    if (streamActive) {
      startCamera();
    }
  };

  // Cycle mock instructions dynamically & speak out loud
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => {
        const next = prev + 1;
        const nextInst = getLiveCameraInstruction(next);
        setInstruction(nextInst);
        speakInstruction(nextInst.primaryMessage);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [voiceEnabled]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-xs font-bold text-purple-300">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>LIVE AI PHOTOGRAPHER COACH</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          📱 Live AI Camera Director
        </h1>
        <p className="text-xs text-slate-400">
          Real-time posture overlay & dynamic framing directives.
        </p>
      </div>

      {/* Main Full-Screen Camera Viewport */}
      <div className="relative w-full h-[520px] sm:h-[600px] bg-dark-900 rounded-3xl overflow-hidden border border-dark-border shadow-2xl flex flex-col justify-between p-4">
        
        {/* Real HTML Video Stream or Fallback Viewport */}
        {hasPermission ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-dark-900 z-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-900/30 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Camera Access Required</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Grant camera permission to enable live pose tracking and alignment guidance.
              </p>
            </div>
            <button
              onClick={startCamera}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
            >
              Enable Camera Stream
            </button>
          </div>
        )}

        {/* TOP STATUS BAR OVERLAY */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <span className={`w-2.5 h-2.5 rounded-full ${instruction.alignmentOk ? 'bg-green-500 animate-pulse' : 'bg-purple-500 animate-pulse'}`} />
            <span className="text-xs font-extrabold tracking-wider uppercase text-white">
              {instruction.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (next) speakInstruction("Voice AI Director active.");
                else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full backdrop-blur-md border text-xs font-bold transition-all ${
                voiceEnabled
                  ? 'bg-purple-600/90 text-white border-purple-400 shadow-md shadow-purple-600/30'
                  : 'bg-dark-900/80 text-slate-400 border-white/10'
              }`}
              title="Toggle Hands-Free Voice Director"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{voiceEnabled ? 'Voice AI ON' : 'Muted'}</span>
            </button>

            <button
              onClick={flipCamera}
              className="p-2.5 rounded-full bg-dark-900/80 backdrop-blur-md text-white hover:bg-dark-700 border border-white/10"
              title="Flip Camera"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER VISUAL POSE OVERLAY (Wireframe Staggered Dots) */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64 border-2 border-dashed border-purple-500/40 rounded-3xl flex items-center justify-center">
            {/* SVG Wireframe Silhouette */}
            <svg className="w-full h-full opacity-60" viewBox="0 0 100 100">
              {/* Head nodes */}
              <circle cx="30" cy="35" r="5" fill="#8B5CF6" className="animate-pulse" />
              <circle cx="50" cy="25" r="6" fill="#8B5CF6" className="animate-pulse" />
              <circle cx="70" cy="35" r="5" fill="#8B5CF6" className="animate-pulse" />
              {/* Shoulder & torso line */}
              <path d="M 20 50 Q 50 35 80 50" stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
            </svg>
            <span className="absolute bottom-2 text-[10px] font-bold text-purple-300 bg-dark-900/90 px-2 py-0.5 rounded border border-purple-500/30">
              ALIGN GROUP INSIDE BOX
            </span>
          </div>
        </div>

        {/* BOTTOM DYNAMIC INSTRUCTION CARD & CAPTURE CONTROLS */}
        <div className="relative z-10 space-y-3">
          {/* Dynamic AI Directive Card */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border transition-all ${
            instruction.alignmentOk 
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-500/20' 
              : 'bg-dark-900/90 border-purple-500/40 text-white'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Director Command
              </span>
              <span className="text-[10px] font-mono text-slate-400">FPS: 60</span>
            </div>

            <h4 className="text-base font-extrabold tracking-tight">
              {instruction.primaryMessage}
            </h4>

            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              {instruction.actionDirectives.map((directive, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 font-medium"
                >
                  {directive}
                </span>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center space-x-6 pt-1">
            <button
              onClick={() => {
                const next = stepIndex + 1;
                setStepIndex(next);
                const nextInst = getLiveCameraInstruction(next);
                setInstruction(nextInst);
                speakInstruction(nextInst.primaryMessage);
              }}
              className="p-3 rounded-full bg-dark-900/80 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 text-xs font-bold"
            >
              Next Step
            </button>

            {/* Shutter Button */}
            <button
              onClick={() => alert('📸 Photo captured! Saved to PoseMate Gallery.')}
              className="w-16 h-16 rounded-full bg-white p-1 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="w-full h-full rounded-full border-2 border-dark-900 bg-gradient-to-tr from-purple-600 to-purple-800" />
            </button>

            <div className="w-12 h-12 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Privacy Notice */}
      <div className="bg-dark-800 p-4 rounded-2xl border border-dark-border text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">🔒 Camera Access & Privacy Guarantee</p>
        <p>
          Camera access is strictly used locally in your browser to provide real-time pose directives. Photos are never uploaded or saved without explicit action.
        </p>
      </div>
    </div>
  );
};
