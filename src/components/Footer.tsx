import React from 'react';
import { MapPin, Phone, Instagram, Clock, Heart, ArrowUp, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/cravingCornerData';

import logoImg from '../assets/images/craving_corner_logo_1784895507028.jpg';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenEventBooking: () => void;
  onOpenTableBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenEventBooking,
  onOpenTableBooking,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0F10] text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden border-2 border-[#C8102E] bg-white shrink-0 shadow-sm">
                <img
                  src={logoImg}
                  alt="Craving Corner Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-white flex items-center gap-1.5">
                  <span>Craving Corner</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
                </h3>
                <p className="text-xs text-[#C8102E] font-medium">Restaurant & Cafe • Gisozi, Kigali</p>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm">
              Your premier destination in Gisozi for East African comfort staples, 5-person shared platters, continental main courses, craft coffee & artisanal mocktails. Open 24/7 with city-wide delivery.
            </p>

            <div className="flex items-center gap-3 text-xs pt-1">
              <span className="bg-[#C8102E]/20 text-[#C8102E] font-medium px-2.5 py-1 border border-[#C8102E]/30 uppercase tracking-wider text-[10px]">
                🕒 Open 24/7
              </span>
              <span className="bg-stone-800 text-stone-300 font-medium px-2.5 py-1 border border-stone-700 uppercase tracking-wider text-[10px]">
                📍 Next to Rubis Gas Station
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenTableBooking}
                  className="text-white hover:text-[#C8102E] transition-colors font-bold flex items-center gap-1.5"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Real Table Reservations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('menu')}
                  className="hover:text-[#C8102E] transition-colors"
                >
                  Full Menu & Ordering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('platters')}
                  className="hover:text-[#C8102E] transition-colors"
                >
                  Shared Platters (30,000 RWF)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEventBooking}
                  className="hover:text-[#C8102E] transition-colors"
                >
                  Proposals & Birthday Decor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-[#C8102E] transition-colors"
                >
                  Location & Free Parking
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">Direct Contact</h4>
            
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8102E] shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#C8102E] font-bold"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={RESTAURANT_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-300 hover:text-[#C8102E]"
                >
                  Instagram: {RESTAURANT_INFO.instagramHandle}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>
            © {new Date().getFullYear()} Craving Corner Restaurant & Cafe. All rights reserved. Umurava, Ruhango, Gisozi, Kigali.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 bg-[#C8102E]/15 hover:bg-[#C8102E] text-[#C8102E] hover:text-white px-3 py-1.5 border border-[#C8102E]/30 transition-colors uppercase tracking-wider font-semibold text-[10px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manager Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors uppercase tracking-wider font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
