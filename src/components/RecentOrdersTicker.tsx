import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Clock, Sparkles } from 'lucide-react';

const RECENT_ACTIVITIES = [
  { text: "Someone in Kagugu just ordered a 30,000 RWF 5-Person Shared Platter", time: "2 min ago", badge: "🔥 HOT" },
  { text: "Monday Burger Special (4,500 RWF) dispatched to Remera", time: "4 min ago", badge: "🍔 PROMO" },
  { text: "Table for 4 reserved in Gisozi Garden Terrace", time: "7 min ago", badge: "📅 TABLE" },
  { text: "Juicy Sizzling T-Bone Steak ordered in Kacyiru", time: "11 min ago", badge: "🥩 POPULAR" },
  { text: "Romantic Event Decor booked for Saturday Evening", time: "15 min ago", badge: "🎉 DECOR" },
  { text: "Swahili Beef Pilau & Passion Juice dispatched to Town Center", time: "18 min ago", badge: "⚡ FAST" },
];

export const RecentOrdersTicker: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = RECENT_ACTIVITIES[index];

  return (
    <div className="bg-[#121214] border-y border-stone-800/80 py-2.5 px-4 text-xs text-stone-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 bg-[#C8102E]/20 text-[#E5383B] border border-[#C8102E]/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5383B] animate-ping" />
            <span>LIVE KIGALI PULSE</span>
          </div>

          <div className="flex items-center gap-2 transition-all duration-500 ease-in-out truncate">
            <span className="bg-stone-800 text-stone-200 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded border border-stone-700 shrink-0">
              {current.badge}
            </span>
            <span className="text-stone-200 font-medium truncate text-xs sm:text-sm">
              {current.text}
            </span>
            <span className="text-stone-500 text-[11px] shrink-0 font-mono hidden md:inline">
              • {current.time}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[11px] text-stone-400 font-medium shrink-0">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Kitchen Operating</span>
          </span>
          <span className="text-stone-700">|</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Average Dispatch: 25 Mins</span>
          </span>
        </div>

      </div>
    </div>
  );
};
