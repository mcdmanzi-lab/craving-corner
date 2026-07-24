import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, MapPin, Clock, Calendar, UtensilsCrossed, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/cravingCornerData';

import logoImg from '../assets/images/craving_corner_logo_1784895507028.jpg';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenEventBooking: () => void;
  onOpenTableBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenEventBooking,
  onOpenTableBooking,
  onNavigateSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Ticker / Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-[#C8102E] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              24/7 OPEN
            </span>
            <span className="font-normal text-stone-200">
              🍔 Every Monday: <strong className="text-white font-semibold underline decoration-[#C8102E]">Monday Burger Promo</strong> with discounted prices on all signature burgers!
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-stone-300 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
              Gisozi // Rubis Station
            </span>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#C8102E] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
              {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-[#121212]/95 backdrop-blur-md text-[#F3F4F6] transition-all duration-200 ${isScrolled ? 'py-3 shadow-md' : 'py-4'} border-b border-stone-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border-2 border-[#C8102E] shadow-sm group-hover:border-[#A60C24] transition-colors bg-white shrink-0">
              <img
                src={logoImg}
                alt="Craving Corner Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl md:text-2xl tracking-tight text-white group-hover:text-[#C8102E] transition-colors leading-none flex items-center gap-1.5">
                <span>Craving Corner</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
              </h1>
              <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="serif-italic text-stone-300">Restaurant & Cafe</span>
                <span className="text-[#C8102E]">•</span>
                <span className="text-stone-400 uppercase tracking-widest text-[9px] font-semibold">Gisozi, Kigali</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('menu')}
              className="text-stone-200 hover:text-[#C8102E] transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => handleNavClick('platters')}
              className="text-stone-200 hover:text-[#C8102E] transition-colors flex items-center gap-1"
            >
              <span className="text-[#C8102E]">🔥</span> Shared Platters
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className="text-stone-200 hover:text-[#C8102E] transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
              Events & Decor
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="text-stone-200 hover:text-[#C8102E] transition-colors"
            >
              Location & Hours
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order Delivery Button */}
            <button
              onClick={() => handleNavClick('menu')}
              className="flex items-center gap-1.5 bg-[#C8102E] hover:bg-[#A60C24] text-white text-xs px-3.5 py-2 transition-colors font-bold shadow-xs uppercase tracking-wider"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Delivery</span>
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={onOpenTableBooking}
              className="hidden sm:flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs px-3.5 py-2 border border-stone-700 transition-colors font-medium shadow-xs"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Reserve Table</span>
            </button>

            {/* Event Booking Button */}
            <button
              onClick={onOpenEventBooking}
              className="hidden lg:flex items-center gap-1.5 bg-[#C8102E]/20 hover:bg-[#C8102E]/30 text-[#E5383B] text-xs px-3.5 py-2 border border-[#C8102E]/50 transition-colors font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event Decor</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-stone-800 hover:bg-[#C8102E] text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-95 border border-stone-700 hover:border-[#C8102E]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline uppercase text-[11px] tracking-wider font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#C8102E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-200 hover:text-[#C8102E] rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#18181B] border-t border-stone-800 px-4 py-4 space-y-3 text-stone-200">
            <button
              onClick={() => handleNavClick('menu')}
              className="block w-full text-left py-2 text-stone-200 hover:text-[#C8102E] font-medium text-sm"
            >
              Full Menu & Online Order
            </button>
            <button
              onClick={() => handleNavClick('platters')}
              className="block w-full text-left py-2 text-stone-200 hover:text-[#C8102E] font-medium text-sm"
            >
              🔥 Shared Platters (5 People & Combos)
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className="block w-full text-left py-2 text-stone-200 hover:text-[#C8102E] font-medium text-sm"
            >
              🎉 Event Booking & Decorations
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="block w-full text-left py-2 text-stone-200 hover:text-[#C8102E] font-medium text-sm"
            >
              📍 Location, 24/7 Hours & Parking
            </button>
            
            <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEventBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#C8102E] text-white py-2.5 rounded-lg font-medium text-xs"
              >
                <Calendar className="w-4 h-4" />
                Book Proposal / Party Setup
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-2.5 rounded-lg font-medium text-xs border border-stone-700"
              >
                <Phone className="w-4 h-4 text-[#C8102E]" />
                Call / WhatsApp: {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
