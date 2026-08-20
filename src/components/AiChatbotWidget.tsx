import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, Wand2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    action: string;
  };
}

export const AiChatbotWidget: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hi! I'm your AI Director Coach. Ask me anything about photo poses, lighting, camera angles, or what to do with awkward hands!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    "☕ Best pose for café photo?",
    "🙌 What to do with awkward hands?",
    "👫 Poses for 2 people / couples",
    "🌅 Golden hour lighting tips",
    "🕶️ How to look aesthetic in streetwear"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getAiResponse = (userQuery: string): { text: string; actionLabel?: string; actionTab?: string } => {
    const q = userQuery.toLowerCase();

    if (q.includes('hand') || q.includes('awkward')) {
      return {
        text: "💡 **Pro Tip for Awkward Hands:**\n1. Hold a prop (coffee cup, sunglasses, phone, jacket lapel).\n2. Touch hair or adjust collar lightly.\n3. Hook one thumb into belt loop or pocket.\n4. Resting hand on hip with elbow back narrows profile!",
        actionLabel: "✨ Generate Hand Pose",
        actionTab: "generate"
      };
    } else if (q.includes('2') || q.includes('couple') || q.includes('duo') || q.includes('bestie')) {
      return {
        text: "👫 **Best Poses for 2 People:**\n• **Walking Candid**: Walk side-by-side laughing naturally.\n• **Shoulder Lean**: Person 1 turns 30°, Person 2 rests shoulder lightly.\n• **Back-to-Back**: High fashion back-to-back angle looking past camera.",
        actionLabel: "📸 Try 2-People Generator",
        actionTab: "generate"
      };
    } else if (q.includes('café') || q.includes('cafe') || q.includes('coffee')) {
      return {
        text: "☕ **Café Shoot Formula:**\n• Position near window light.\n• Lean forward over table with both hands cupping a mug.\n• Look away at scenery or laugh with friend for natural candid vibes.",
        actionLabel: "📌 See Pinterest Café Ideas",
        actionTab: "trending"
      };
    } else if (q.includes('light') || q.includes('golden hour') || q.includes('sun')) {
      return {
        text: "🌅 **Golden Hour Secrets:**\n• Position sun 45° behind subject for gorgeous hair rim lighting.\n• Use 2x portrait mode lens to avoid distortion.\n• Lower exposure slider slightly for rich warm tones.",
        actionLabel: "📱 Open Live AI Camera",
        actionTab: "camera"
      };
    } else if (q.includes('street') || q.includes('fit') || q.includes('outfit')) {
      return {
        text: "🕶️ **Streetwear & Fashion Posing:**\n• Low 30° angle shot (makes you look taller & confident).\n• Mid-stride walking motion with hands in jacket pockets.\n• Turn body 20° away from lens for dynamic angles.",
        actionLabel: "⚡ Try Fix Pose AI",
        actionTab: "fix-pose"
      };
    } else {
      return {
        text: `✨ I can direct your pose! Try choosing a location or group size, or launch our custom **AI Director** to get instant step-by-step posture diagrams!`,
        actionLabel: "✨ Launch AI Director",
        actionTab: "generate"
      };
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = getAiResponse(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: resp.actionLabel && resp.actionTab ? { label: resp.actionLabel, action: resp.actionTab } : undefined
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-extrabold text-xs shadow-2xl shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all border border-purple-400/40"
      >
        <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
        <span>Ask PoseAI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Glassmorphism Chatbot Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] rounded-3xl bg-[#15151C]/95 backdrop-blur-2xl border border-[#292933] shadow-2xl flex flex-col justify-between overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-dark-900/80 border-b border-[#292933] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px] shadow-md">
                <div className="w-full h-full bg-[#0B0B0F] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-300" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  PoseAI Assistant <span className="text-[10px] bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">ONLINE</span>
                </h3>
                <p className="text-[10px] text-slate-400">Personal AI Photography Coach</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1B1B23] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none shadow-md'
                    : 'bg-[#1B1B23] text-slate-200 border border-[#292933] rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {msg.quickAction && (
                    <button
                      onClick={() => {
                        if (onNavigate && msg.quickAction) onNavigate(msg.quickAction.action);
                        setIsOpen(false);
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl text-[11px] font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center space-x-1.5 shadow-md transition-all"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{msg.quickAction.label}</span>
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 bg-[#1B1B23] border border-[#292933] px-3.5 py-2.5 rounded-2xl w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#0B0B0F]/90 border-t border-[#292933] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[10px] font-medium bg-[#1B1B23] hover:bg-purple-900/30 text-purple-300 px-2.5 py-1 rounded-full border border-[#292933] shrink-0 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-dark-900/90 border-t border-[#292933] flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask pose or photography tip..."
              className="flex-1 bg-[#1B1B23] border border-[#292933] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
