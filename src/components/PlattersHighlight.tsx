import React from 'react';
import { Users, Sparkles, Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/cravingCornerData';
import { MenuItem } from '../types';

interface PlattersHighlightProps {
  onSelectItem: (item: MenuItem) => void;
}

export const PlattersHighlight: React.FC<PlattersHighlightProps> = ({ onSelectItem }) => {
  const platters = MENU_ITEMS.filter(i => i.category === 'platters');

  return (
    <section id="platters" className="py-16 bg-[#0F0F10] border-b border-stone-800 text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="serif-italic text-[#E5383B] text-sm">Shared Culinary Experience</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Famous Gisozi Shared Platters
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Designed for group gatherings, team lunches, family celebrations, and friends catching up in Gisozi. Loaded with mixed grilled meats, pilau rice, fries, plantains & artisanal dips.
          </p>
        </div>

        {/* Platters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platters.map(platter => (
            <div
              key={platter.id}
              className="bg-[#18181B] border border-stone-800 hover:border-[#C8102E] overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Platter Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={platter.image}
                    alt={platter.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  
                  {platter.servingSize && (
                    <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 shadow-md flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {platter.servingSize}
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 bg-[#1A1A1A]/90 backdrop-blur-md px-3 py-1 border border-stone-700 text-[#C8102E] font-serif font-bold text-lg">
                    {platter.price.toLocaleString()} RWF
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif text-white group-hover:text-[#C8102E] transition-colors">
                    {platter.name}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {platter.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectItem(platter)}
                  className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3 px-4 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  <span>Select Platter & Order</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
