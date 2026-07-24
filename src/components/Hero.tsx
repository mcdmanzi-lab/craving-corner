import React from 'react';
import { ShoppingBag, Calendar, MapPin, Clock, ShieldCheck, Car, Accessibility, Phone, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/cravingCornerData';

import logoImg from '../assets/images/craving_corner_logo_1784895507028.jpg';

interface HeroProps {
  onOrderNow: () => void;
  onOpenEventBooking: () => void;
  onOpenTableBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onOpenEventBooking, onOpenTableBooking }) => {
  return (
    <section id="hero" className="relative bg-[#0F0F10] text-[#F3F4F6] py-12 md:py-20 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Text Column - Editorial Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 pr-0 lg:pr-6">
            
            <div className="space-y-6">
              {/* Location Tagline */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <span className="text-[11px] font-bold tracking-[2px] uppercase text-stone-400">
                  Gasabo District // Kigali City
                </span>
                <span className="bg-[#C8102E] text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                  Open 24 Hours • 7 Days
                </span>
              </div>

              {/* Editorial Title */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#C8102E] bg-white shrink-0 shadow-md p-1 mt-1">
                  <img
                    src={logoImg}
                    alt="Craving Corner Official Logo"
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-serif text-white">
                    Craving<br />Corner
                  </h1>
                  <p className="serif-italic text-xl sm:text-2xl text-[#E5383B] font-serif">
                    East African Comfort & Continental Staples
                  </p>
                </div>
              </div>

              {/* Sub-description */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Located in Gisozi right next to Rubis Gas Station. Famous for our <strong className="text-white">30,000 RWF 5-person shared platters</strong>, Monday Burger Promos, sizzling steaks, beef pilau, craft coffee, and custom event decoration.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOrderNow}
                  className="bg-[#C8102E] hover:bg-[#A60C24] text-white font-bold px-6 py-3.5 flex items-center gap-2.5 text-sm uppercase tracking-wider transition-colors shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Order Now for Deliveries</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  onClick={onOpenTableBooking}
                  className="bg-stone-800 hover:bg-stone-700 text-white font-medium px-6 py-3.5 flex items-center gap-2 text-sm transition-colors border border-stone-700"
                >
                  <UtensilsCrossed className="w-4 h-4 text-[#C8102E]" />
                  <span>Reserve a Table</span>
                </button>

                <button
                  onClick={onOpenEventBooking}
                  className="bg-stone-800/60 hover:bg-stone-800 text-stone-200 font-medium px-5 py-3.5 border border-stone-700 flex items-center gap-2 text-sm transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#C8102E]" />
                  <span>Event Decor</span>
                </button>
              </div>
            </div>

            {/* Bottom Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-[#18181B] border border-stone-800 text-[#C8102E]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block font-bold text-white uppercase tracking-wider text-[10px]">Free Parking</strong>
                  <span className="text-stone-400 text-[11px]">Dedicated Lot & Street</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-[#18181B] border border-stone-800 text-[#C8102E]">
                  <Accessibility className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block font-bold text-white uppercase tracking-wider text-[10px]">Accessible</strong>
                  <span className="text-stone-400 text-[11px]">Step-free & Wheelchair Restroom</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 bg-[#18181B] border border-stone-800 text-[#C8102E]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block font-bold text-white uppercase tracking-wider text-[10px]">Fast Delivery</strong>
                  <span className="text-stone-400 text-[11px]">City-wide Kigali Delivery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Editorial Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1A1A1A] text-white p-6 sm:p-8 border border-[#1A1A1A] relative">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <p className="serif-italic text-stone-400 text-xs">Shared Dining Experience</p>
                <span className="bg-[#C8102E] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                  Gisozi Landmark
                </span>
              </div>

              <div className="relative overflow-hidden border border-stone-800 my-2">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80"
                  alt="Craving Corner Shared Platter"
                  className="w-full h-64 sm:h-72 object-cover filter contrast-105"
                />
                <div className="absolute bottom-3 left-3 bg-[#1A1A1A]/90 px-3 py-1.5 border border-stone-700 text-[11px] font-bold tracking-wider">
                  GISOZI // RUBIS GAS STATION
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl text-white">Large Shared Platter</h3>
                  <span className="text-[#C8102E] font-bold text-xl">30,000 RWF</span>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Grilled beef brochettes, chicken drumsticks, seasoned beef ribs, beef pilau rice, crispy french fries, kachumbari & house dips. Serves 5 people.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
                +250 791 393 785
              </span>
              <span className="uppercase tracking-widest text-[10px]">Kigali, Rwanda</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
