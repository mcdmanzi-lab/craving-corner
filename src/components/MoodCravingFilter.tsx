import React from 'react';
import { Flame, Users, Sparkles, Clock, DollarSign, Heart } from 'lucide-react';

interface MoodCravingFilterProps {
  selectedMood: string;
  onSelectMood: (mood: string) => void;
}

export const MOOD_PRESETS = [
  { id: 'all', name: 'Full Menu', icon: Sparkles, color: 'text-amber-400' },
  { id: 'platters', name: 'Group Shared Platters', icon: Users, color: 'text-[#E5383B]' },
  { id: 'steaks', name: 'Sizzling Meat & Grills', icon: Flame, color: 'text-orange-400' },
  { id: 'latenight', name: '24/7 Comfort Eats', icon: Clock, color: 'text-indigo-400' },
  { id: 'budget', name: 'Budget Friendly (< 10k)', icon: DollarSign, color: 'text-emerald-400' },
];

export const MoodCravingFilter: React.FC<MoodCravingFilterProps> = ({
  selectedMood,
  onSelectMood
}) => {
  return (
    <div className="bg-[#121214] border border-stone-800 p-4 rounded-none space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#E5383B] flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5" />
          What are you in the mood for today?
        </span>
        <span className="text-[10px] text-stone-500 hidden sm:inline">Tap a craving preset to quick filter</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {MOOD_PRESETS.map(preset => {
          const Icon = preset.icon;
          const isSel = selectedMood === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectMood(preset.id)}
              className={`px-3 py-2 text-xs font-medium transition-all flex items-center gap-2 border ${
                isSel
                  ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-[0_0_15px_rgba(200,16,46,0.3)]'
                  : 'bg-[#18181B] border-stone-800 text-stone-300 hover:border-stone-700 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-white' : preset.color}`} />
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
