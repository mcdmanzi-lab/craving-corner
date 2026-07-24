import React from 'react';
import { UtensilsCrossed, ShoppingBag } from 'lucide-react';

interface FloatingTableBookingProps {
  onOpenTableBooking: () => void;
  onOrderDelivery: () => void;
}

export const FloatingTableBooking: React.FC<FloatingTableBookingProps> = ({ onOpenTableBooking, onOrderDelivery }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 font-sans">
      <button
        onClick={onOrderDelivery}
        className="bg-[#C8102E] hover:bg-[#A60C24] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xl transition-all flex items-center gap-2 group border border-white/20 uppercase tracking-wider font-bold text-xs"
        title="Order Food for Delivery in Kigali"
      >
        <ShoppingBag className="w-4 h-4 text-white" />
        <span className="font-serif font-bold text-xs">
          Order Delivery
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      <button
        onClick={onOpenTableBooking}
        className="bg-stone-900 hover:bg-stone-800 text-stone-200 px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xl transition-all flex items-center gap-2 group border border-stone-700 uppercase tracking-wider font-medium text-xs hidden sm:flex"
        title="Reserve a Table at Craving Corner Gisozi"
      >
        <UtensilsCrossed className="w-4 h-4 text-[#C8102E]" />
        <span className="font-serif text-xs">
          Reserve Table
        </span>
      </button>
    </div>
  );
};
