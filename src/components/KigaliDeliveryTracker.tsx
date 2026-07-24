import React, { useState } from 'react';
import { MapPin, Navigation, Truck, Clock, Phone, CheckCircle2, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { KIGALI_ZONES, RESTAURANT_INFO } from '../data/cravingCornerData';
import { KigaliZone } from '../types';

interface KigaliDeliveryTrackerProps {
  onSelectZoneAndOrder?: (zone: KigaliZone, landmark: string) => void;
}

export const KigaliDeliveryTracker: React.FC<KigaliDeliveryTrackerProps> = ({ onSelectZoneAndOrder }) => {
  const [selectedZone, setSelectedZone] = useState<KigaliZone>(KIGALI_ZONES[0]);
  const [customLandmark, setCustomLandmark] = useState('');
  const [pinnedCoordinates, setPinnedCoordinates] = useState<{ x: number; y: number }>({ x: 38, y: 32 }); // Gisozi default
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  // Map pin points for visual interactive Kigali map
  const kigaliMapPoints = [
    { name: 'Gisozi (Rubis Gas Station)', x: 38, y: 32, zone: KIGALI_ZONES[0] },
    { name: 'Kacyiru / Kagugu / Nyarutarama', x: 48, y: 38, zone: KIGALI_ZONES[1] },
    { name: 'Kimironko / Remera / Sonatube', x: 65, y: 45, zone: KIGALI_ZONES[2] },
    { name: 'Kiyovu / Town Center (CBD) / Muhima', x: 32, y: 55, zone: KIGALI_ZONES[3] },
    { name: 'Nyamirambo / Gikondo / Kicukiro', x: 35, y: 70, zone: KIGALI_ZONES[4] },
    { name: 'Kanombe / Masaka / Kibagabaga', x: 78, y: 60, zone: KIGALI_ZONES[5] }
  ];

  const handleSelectPinPoint = (pt: typeof kigaliMapPoints[0]) => {
    setPinnedCoordinates({ x: pt.x, y: pt.y });
    setSelectedZone(pt.zone);
  };

  const handleConfirmRoute = () => {
    if (onSelectZoneAndOrder) {
      onSelectZoneAndOrder(selectedZone, customLandmark);
    } else {
      setSubmittedInquiry(true);
    }
  };

  return (
    <section id="delivery" className="py-16 bg-[#0F0F10] text-[#F3F4F6] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#E5383B] block font-serif">
              CITYWIDE KIGALI DISPATCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Delivery Zone & Pin Selector
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md">
            Craving Corner dispatches hot meals and drinks from our Gisozi kitchen across all 3 sectors of Kigali City 24 hours a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Kigali Neighborhood Map Graphic */}
          <div className="lg:col-span-7 bg-[#18181B] text-white p-6 border border-stone-800 space-y-4 relative">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#E5383B]" />
                <span className="font-serif font-bold text-sm text-white">Interactive Kigali Delivery Grid</span>
              </div>
              <span className="bg-[#C8102E] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Gisozi Hub Active
              </span>
            </div>

            {/* Stylized Visual Map Representation */}
            <div className="relative w-full h-80 bg-[#121212] border border-stone-800 overflow-hidden rounded-none p-4 flex items-center justify-center">
              
              {/* Grid map lines background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8102E_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Hub Marker (Gisozi Craving Corner) */}
              <div className="absolute top-[32%] left-[38%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-6 h-6 bg-[#C8102E] text-white flex items-center justify-center rounded-full font-bold text-[10px] animate-bounce shadow-lg border-2 border-white">
                  ★
                </div>
                <span className="bg-[#1A1A1A] text-white text-[9px] px-1.5 py-0.5 border border-[#C8102E] font-bold mt-1 whitespace-nowrap">
                  Gisozi Kitchen (24/7)
                </span>
              </div>

              {/* Map Pin Buttons */}
              {kigaliMapPoints.map((pt, idx) => {
                const isSelected = selectedZone.name === pt.zone.name;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPinPoint(pt)}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all flex flex-col items-center group ${
                      isSelected ? 'scale-110 z-30' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className={`p-1.5 border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#C8102E] border-white text-white' : 'bg-[#1A1A1A] border-stone-700 text-stone-300 hover:border-[#C8102E]'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 mt-1 border whitespace-nowrap transition-colors ${
                      isSelected ? 'bg-white text-[#1A1A1A] border-white' : 'bg-[#1A1A1A] text-stone-300 border-stone-800'
                    }`}>
                      {pt.name.split('/')[0]}
                    </span>
                  </button>
                );
              })}

              <p className="absolute bottom-2 left-3 text-[9px] text-stone-500 italic">
                * Click any pin on the grid to calculate delivery fee & time
              </p>
            </div>

            {/* Quick Zone Badges */}
            <div className="pt-2">
              <span className="text-[10px] text-stone-400 block mb-2 font-serif uppercase tracking-wider">
                Select Neighborhood Zone:
              </span>
              <div className="flex flex-wrap gap-2">
                {KIGALI_ZONES.map(z => {
                  const isSel = selectedZone.name === z.name;
                  return (
                    <button
                      key={z.name}
                      onClick={() => setSelectedZone(z)}
                      className={`px-3 py-1.5 text-[10px] border transition-colors ${
                        isSel
                          ? 'bg-[#C8102E] border-[#C8102E] text-white font-bold'
                          : 'bg-[#1A1A1A] border-stone-800 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      {z.name.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Route Calculation Box & Direct WhatsApp Order Dispatch */}
          <div className="lg:col-span-5 bg-[#18181B] border border-stone-800 p-6 space-y-6">
            
            <div className="space-y-1 border-b border-stone-800 pb-3">
              <span className="text-[10px] text-[#E5383B] font-bold uppercase tracking-wider font-serif">
                SELECTED DELIVERY ROUTE
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                {selectedZone.name}
              </h3>
            </div>

            {/* Fee & Time Specs */}
            <div className="grid grid-cols-2 gap-4 bg-[#121214] p-4 border border-stone-800 text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">DELIVERY FEE</span>
                <span className="font-serif font-bold text-lg text-[#E5383B]">
                  {selectedZone.feeRWF.toLocaleString()} RWF
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">ESTIMATED TIME</span>
                <span className="font-serif font-bold text-lg text-white flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#E5383B]" />
                  {selectedZone.estMinutes}
                </span>
              </div>
            </div>

            {/* Landmark Input */}
            <div className="space-y-2">
              <label className="block text-xs font-serif font-bold text-white">
                Exact Landmark or House Number in Kigali:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Near BK Building, House #14, Opposite Pharmacy..."
                  value={customLandmark}
                  onChange={e => setCustomLandmark(e.target.value)}
                  className="w-full bg-[#121214] border border-stone-800 p-3 pr-9 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />
                <MapPin className="w-4 h-4 text-stone-500 absolute right-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleConfirmRoute}
                className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3.5 uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Truck className="w-4 h-4" />
                <span>Confirm Route & Order Delivery</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Centralized 24/7 dispatch from Craving Corner Gisozi</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
