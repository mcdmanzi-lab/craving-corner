import React, { useState, useEffect } from 'react';
import { Search, Flame, Sparkles, Filter, Plus, ShoppingBag, Check } from 'lucide-react';
import { getStoredMenuItems } from '../services/storeService';
import { MenuItem, MenuCategory } from '../types';
import { MoodCravingFilter } from './MoodCravingFilter';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  menuVersion?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd, menuVersion }) => {
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMondayPromoOnly, setShowMondayPromoOnly] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMenuItems = async () => {
      const items = await getStoredMenuItems();
      if (active) {
        setMenuItemsList(items);
      }
    };

    void loadMenuItems();

    return () => {
      active = false;
    };
  }, [menuVersion]);

  const categories: { id: MenuCategory; label: string; icon?: string }[] = [
    { id: 'all', label: 'All Menu Items' },
    { id: 'platters', label: 'Shared Platters' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'rice', label: 'Rice Corner' },
    { id: 'fast_food', label: 'Fast Food & Snacks' },
    { id: 'drinks', label: 'Specialty Drinks' }
  ];

  const filteredItems = menuItemsList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPromo = !showMondayPromoOnly || item.isMondayBurgerPromo;

    let matchesMood = true;
    if (selectedMood === 'platters') {
      matchesMood = item.category === 'platters' || item.name.toLowerCase().includes('platter');
    } else if (selectedMood === 'steaks') {
      matchesMood = item.name.toLowerCase().includes('steak') || item.name.toLowerCase().includes('meat') || item.name.toLowerCase().includes('brochette') || item.name.toLowerCase().includes('pork') || item.name.toLowerCase().includes('beef') || item.name.toLowerCase().includes('ribs') || item.description.toLowerCase().includes('grilled');
    } else if (selectedMood === 'latenight') {
      matchesMood = item.category === 'fast_food' || item.category === 'drinks' || item.name.toLowerCase().includes('burger') || item.name.toLowerCase().includes('chips') || item.name.toLowerCase().includes('samosa');
    } else if (selectedMood === 'budget') {
      matchesMood = item.price < 10000;
    }

    return matchesCategory && matchesSearch && matchesPromo && matchesMood;
  });

  return (
    <section id="menu" className="py-16 bg-[#0F0F10] text-[#F3F4F6] min-h-screen border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <p className="serif-italic text-[#E5383B] text-sm">Chef's Curated Selection</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Craving Corner Digital Menu
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              Freshly prepared in Gisozi. Available 24/7 for dine-in & city-wide Kigali delivery.
            </p>
          </div>

          {/* Search & Monday Burger Promo Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Monday Promo Filter Toggle */}
            <button
              onClick={() => setShowMondayPromoOnly(!showMondayPromoOnly)}
              className={`px-3.5 py-2 rounded-none sm:rounded-md text-xs font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 ${
                showMondayPromoOnly
                  ? 'bg-[#C8102E] text-white border-[#C8102E]'
                  : 'bg-[#18181B] text-stone-200 border-stone-800 hover:border-[#C8102E]'
              }`}
            >
              <span>🍔 Monday Burger Promo</span>
              {showMondayPromoOnly && <Check className="w-3.5 h-3.5" />}
            </button>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food, steak, pilau..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#18181B] border border-stone-800 rounded-none sm:rounded-md pl-9 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#C8102E]"
              />
            </div>
          </div>
        </div>

        {/* Mood & Craving Filter Preset Bar */}
        <MoodCravingFilter
          selectedMood={selectedMood}
          onSelectMood={setSelectedMood}
        />

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#C8102E] text-white border-[#C8102E]'
                  : 'bg-[#18181B] text-stone-300 border-stone-800 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Monday Burger Promo Highlight Banner - Editorial Dashed Box */}
        <div className="p-5 border border-dashed border-[#C8102E] bg-[#C8102E]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍔</span>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#E5383B] block">
                Weekly Promo
              </span>
              <p className="font-serif text-lg text-white">Monday Burger Special</p>
              <p className="text-xs text-stone-300">
                Signature Large Beef Burger available for <strong className="text-[#E5383B] font-bold">4,500 RWF</strong> (Regular: 6,500 RWF) every Monday!
              </p>
            </div>
          </div>
          <span className="text-[11px] bg-[#C8102E] text-white font-semibold px-3 py-1 uppercase tracking-wider shrink-0">
            Auto-Applied in Cart
          </span>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-stone-500 space-y-2">
            <p className="text-base font-semibold">No menu items found matching "{searchQuery}"</p>
            <p className="text-xs">Try searching for pilau, steak, shawarma, or mocktail.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const hasCustomOptions = (item.portions && item.portions.length > 0) || (item.customizableOptions && item.customizableOptions.length > 0);
              const isMondayActive = item.isMondayBurgerPromo;
              const displayPrice = isMondayActive && item.mondayPromoPrice ? item.mondayPromoPrice : item.price;

              return (
                <div
                  key={item.id}
                  className="bg-[#18181B] border border-stone-800 hover:border-[#C8102E] overflow-hidden flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Image with Badges */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.isPopular && (
                          <span className="bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow">
                            POPULAR
                          </span>
                        )}
                        {item.isChefSpecial && (
                          <span className="bg-[#C8102E] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow">
                            CHEF SPECIAL
                          </span>
                        )}
                        {item.isMondayBurgerPromo && (
                          <span className="bg-[#1A1A1A] text-amber-300 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow border border-amber-300/30">
                            MONDAY PROMO
                          </span>
                        )}
                      </div>

                      {/* Serving size badge */}
                      {item.servingSize && (
                        <div className="absolute bottom-2 left-2 bg-[#1A1A1A]/90 text-white text-[10px] font-semibold px-2 py-0.5">
                          {item.servingSize}
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="p-4 space-y-1.5">
                      <h3 className="font-serif font-bold text-base text-white group-hover:text-[#E5383B] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add Button */}
                  <div className="p-4 pt-0 space-y-3">
                    <div className="flex items-center justify-between border-t border-stone-800 pt-3">
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold">PRICE</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#E5383B] font-bold text-sm font-serif">
                            {displayPrice.toLocaleString()} RWF
                          </span>
                          {isMondayActive && item.mondayPromoPrice && (
                            <span className="text-stone-500 text-xs line-through">
                              {item.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectItem(item)}
                        className="bg-stone-800 hover:bg-[#C8102E] text-white p-2 sm:px-3 sm:py-2 transition-all font-semibold text-xs flex items-center gap-1.5 uppercase tracking-wider border border-stone-700 hover:border-[#C8102E]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {hasCustomOptions ? 'Options' : 'Add'}
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
