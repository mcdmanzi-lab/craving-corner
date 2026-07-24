import React, { useState } from 'react';
import { MapPin, Clock, Phone, Car, Accessibility, CreditCard, Truck, Calendar, Copy, Check, ExternalLink, Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/cravingCornerData';

export const LocationAndAmenities: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-16 bg-[#0F0F10] text-[#F3F4F6] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="serif-italic text-[#E5383B] text-sm">Gisozi Landmark & Amenities</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Find Craving Corner in Gisozi, Kigali
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Conveniently positioned along the main road right next to the Gisozi Rubis Gas Station. Open 24/7 with free parking.
          </p>
        </div>

        {/* Location & Details Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-6 bg-[#18181B] border border-stone-800 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-stone-800 text-white flex items-center justify-center shrink-0 font-serif border border-stone-700">
                  <MapPin className="w-5 h-5 text-[#E5383B]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#E5383B] uppercase tracking-widest">Exact Address & Landmark</span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-stone-400 font-medium">
                    📍 {RESTAURANT_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 border-t border-stone-800 pt-4">
                <div className="w-10 h-10 bg-stone-800 text-white flex items-center justify-center shrink-0 border border-stone-700">
                  <Clock className="w-5 h-5 text-[#E5383B]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5383B] uppercase tracking-widest">Operating Schedule</span>
                  <p className="text-sm font-bold text-white">
                    {RESTAURANT_INFO.hours}
                  </p>
                  <p className="text-xs text-stone-400">
                    Breakfast, lunch, late-night dining & 24/7 coffee lounge
                  </p>
                </div>
              </div>

              {/* Contact & Socials */}
              <div className="flex items-start gap-4 border-t border-stone-800 pt-4">
                <div className="w-10 h-10 bg-stone-800 text-white flex items-center justify-center shrink-0 border border-stone-700">
                  <Phone className="w-5 h-5 text-[#E5383B]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#E5383B] uppercase tracking-widest">Direct WhatsApp & Phone</span>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-white hover:text-[#E5383B] transition-colors block"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <a
                    href={RESTAURANT_INFO.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-stone-400 hover:text-[#E5383B] flex items-center gap-1 pt-0.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    <span>Instagram: {RESTAURANT_INFO.instagramHandle}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyAddress}
                className="bg-stone-800 hover:bg-[#C8102E] text-white text-xs font-medium px-4 py-2.5 transition-colors uppercase tracking-wider flex items-center gap-2 border border-stone-700 hover:border-[#C8102E]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E5383B]" />}
                <span>{copied ? 'Address Copied!' : 'Copy Plus Code Address'}</span>
              </button>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#C8102E] hover:bg-[#A60C24] text-white text-xs font-semibold px-4 py-2.5 transition-colors uppercase tracking-wider flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right Amenities Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-[#18181B] border border-stone-800 p-5 space-y-2">
              <div className="w-9 h-9 bg-stone-800 text-[#E5383B] flex items-center justify-center font-bold border border-stone-700">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">24/7 Hours Schedule</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Open around the clock, 7 days a week for breakfast, lunch, late-night cravings & coffee lounge.
              </p>
            </div>

            <div className="bg-[#18181B] border border-stone-800 p-5 space-y-2">
              <div className="w-9 h-9 bg-stone-800 text-[#E5383B] flex items-center justify-center font-bold border border-stone-700">
                <Accessibility className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Wheelchair Accessible</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Features a fully wheelchair-accessible restroom and step-free main entry for all valued guests.
              </p>
            </div>

            <div className="bg-[#18181B] border border-stone-800 p-5 space-y-2">
              <div className="w-9 h-9 bg-stone-800 text-[#E5383B] flex items-center justify-center font-bold border border-stone-700">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Dedicated Free Parking</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Equipped with a dedicated free on-site parking lot and additional free street parking slots.
              </p>
            </div>

            <div className="bg-[#18181B] border border-stone-800 p-5 space-y-2">
              <div className="w-9 h-9 bg-stone-800 text-[#E5383B] flex items-center justify-center font-bold border border-stone-700">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Accepted Payments</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Accepts Credit Cards, Debit Cards, and local NFC Mobile Money (MTN MoMo & Airtel Money).
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
