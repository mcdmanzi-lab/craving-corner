import React from 'react';
import { Tag, Sparkles, Users, Flame, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import { MENU_ITEMS } from '../data/cravingCornerData';
import { MenuItem } from '../types';

interface PromoDealsMatrixProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const PromoDealsMatrix: React.FC<PromoDealsMatrixProps> = ({ onSelectItem, onQuickAdd }) => {
  const burgerPromoItem = MENU_ITEMS.find(i => i.isMondayBurgerPromo) || MENU_ITEMS.find(i => i.id === 'ff-burger')!;
  
  const platterCombo = MENU_ITEMS.find(i => i.id === 'platter-combo')!;
  const platterMid = MENU_ITEMS.find(i => i.id === 'platter-mid')!;
  const platterLarge = MENU_ITEMS.find(i => i.id === 'platter-large')!;

  return (
    <section id="promos" className="py-16 bg-[#121212] text-[#F3F4F6] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#E5383B] block font-serif">
              WEEKLY SPECIALS & GROUP COMBOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Promotions & Platter Matrix
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md">
            Craving Corner offers budget-friendly group platter options and our famous weekly Monday Burger discount for food lovers across Kigali.
          </p>
        </div>

        {/* 1. Monday Burger Promo Feature Banner */}
        <div className="bg-[#18181B] text-white p-6 sm:p-10 border border-stone-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="bg-[#C8102E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  EVERY SINGLE MONDAY
                </span>
                <span className="text-stone-300 text-xs font-serif italic">
                  Gisozi Weekly Special
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
                Monday Burger Promo Day
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Get our signature 100% beef brioche burger loaded with melted cheddar, bacon, caramelized onions, and house burger sauce at a special promo price every Monday!
              </p>

              <div className="flex items-baseline gap-4 pt-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block">PROMO PRICE</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#E5383B]">
                    4,500 RWF
                  </span>
                </div>
                <div className="space-y-0.5 opacity-60">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block">REGULAR</span>
                  <span className="text-lg line-through text-stone-300">
                    6,500 RWF
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectItem(burgerPromoItem)}
                  className="bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium px-6 py-3 text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customize & Order Burger</span>
                </button>

                <span className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                  Available 24 Hours on Mondays
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <img
                src={burgerPromoItem.image}
                alt="Monday Burger Promo"
                className="w-full h-64 sm:h-72 object-cover border border-stone-800 filter contrast-105"
              />
              <div className="absolute top-3 right-3 bg-[#C8102E] text-white px-3 py-1 font-serif text-xs font-bold uppercase tracking-wider">
                SAVE 2,000 RWF
              </div>
            </div>

          </div>
        </div>

        {/* 2. Tiered Group Platter Matrix (20k, 25k, 30k) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif text-2xl text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C8102E]" />
              The Tiered Shared Platter Matrix
            </h3>
            <span className="text-xs text-stone-400 font-serif italic">
              Designed for budget flexibility
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tier 1: 20,000 RWF */}
            <div className="bg-[#18181B] border border-stone-800 p-6 flex flex-col justify-between hover:border-stone-700 transition-all space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">TIER 1 COMBOS</span>
                    <h4 className="font-serif font-bold text-lg text-white">Budget-Friendly Combo</h4>
                  </div>
                  <span className="bg-stone-800 text-white text-xs font-bold px-2.5 py-1 font-serif border border-stone-700">
                    20,000 RWF
                  </span>
                </div>

                <img
                  src={platterCombo.image}
                  alt={platterCombo.name}
                  className="w-full h-44 object-cover border border-stone-800"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#E5383B] font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>Ideal for 2-3 People</span>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Includes mini beef burgers, crispy fried chicken wings, french fries, meat samosas & garlic mayo dipping sauce.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectItem(platterCombo)}
                className="w-full bg-stone-800 hover:bg-[#C8102E] text-white font-medium py-3 text-xs uppercase tracking-wider transition-colors border border-stone-700 hover:border-[#C8102E]"
              >
                Select 20,000 RWF Combo
              </button>
            </div>

            {/* Tier 2: 25,000 RWF */}
            <div className="bg-[#18181B] border-2 border-[#C8102E] p-6 flex flex-col justify-between transition-all space-y-6 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C8102E] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-0.5">
                MOST POPULAR CHOICE
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[9px] font-bold text-[#E5383B] uppercase tracking-widest block font-serif">TIER 2 COMBOS</span>
                    <h4 className="font-serif font-bold text-lg text-white">Mid-Sized Shared Platter</h4>
                  </div>
                  <span className="bg-[#C8102E] text-white text-xs font-bold px-2.5 py-1 font-serif">
                    25,000 RWF
                  </span>
                </div>

                <img
                  src={platterMid.image}
                  alt={platterMid.name}
                  className="w-full h-44 object-cover border border-stone-800"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#E5383B] font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>Ideal for 3-4 People</span>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Combination of tender grilled steak strips, chicken shawarma slices, fish fingers, potato wedges, and artisanal dipping sauces.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectItem(platterMid)}
                className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3 text-xs uppercase tracking-wider transition-colors"
              >
                Select 25,000 RWF Platter
              </button>
            </div>

            {/* Tier 3: 30,000 RWF */}
            <div className="bg-[#18181B] border border-stone-800 p-6 flex flex-col justify-between hover:border-stone-700 transition-all space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">TIER 3 COMBOS</span>
                    <h4 className="font-serif font-bold text-lg text-white">Large Variety Platter</h4>
                  </div>
                  <span className="bg-stone-800 text-white text-xs font-bold px-2.5 py-1 font-serif border border-stone-700">
                    30,000 RWF
                  </span>
                </div>

                <img
                  src={platterLarge.image}
                  alt={platterLarge.name}
                  className="w-full h-44 object-cover border border-stone-800"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#E5383B] font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>Feeds 5 People Generously</span>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Our grand master board with mixed grilled meats, chicken legs, slow-cooked beef ribs, beef pilau rice, fries, plantains & kachumbari.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectItem(platterLarge)}
                className="w-full bg-stone-800 hover:bg-[#C8102E] text-white font-medium py-3 text-xs uppercase tracking-wider transition-colors border border-stone-700 hover:border-[#C8102E]"
              >
                Select 30,000 RWF Platter
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
