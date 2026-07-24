import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Heart, Award, Sparkles, CheckCircle, Gift } from 'lucide-react';
import { EVENT_DECOR_PACKAGES } from '../data/cravingCornerData';
import { saveEventBooking, EventBooking } from '../services/storeService';

interface EventBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventBookingModal: React.FC<EventBookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedPackage, setSelectedPackage] = useState(EVENT_DECOR_PACKAGES[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('18:00');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Table Decorations & Candlelight',
    'Fresh Flower Arrangements'
  ]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedEvent, setConfirmedEvent] = useState<EventBooking | null>(null);

  const availableAddons = [
    { id: 'decor', name: 'Table Decorations & Candlelight', price: '+10,000 RWF' },
    { id: 'lighting', name: 'Custom Ambient Lighting Setups', price: '+15,000 RWF' },
    { id: 'arch', name: 'Balloon Archs & Photo Backdrops', price: '+20,000 RWF' },
    { id: 'flowers', name: 'Fresh Flower Arrangements', price: '+15,000 RWF' },
    { id: 'cake', name: 'Custom Cake Stand & Sparklers', price: '+5,000 RWF' },
  ];

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const getSeatingConfigLabel = (count: number) => {
    if (count === 1) return 'Solo Date / Quiet Corner Table';
    if (count === 2) return 'Romantic Couple Arrangement (Candlelight)';
    if (count <= 6) return 'Small Group Table Configuration';
    if (count <= 15) return 'Private Terrace Lounge Reserve';
    return 'Multi-Table Group Banquet Configuration';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const newBooking = saveEventBooking({
      eventType: selectedPackage.title,
      customerName,
      phone: customerPhone,
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      eventTime,
      guestCount,
      selectedAddons,
      specialRequests
    });

    setConfirmedEvent(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121214] border border-stone-800 max-w-2xl w-full overflow-hidden shadow-2xl text-[#F3F4F6] max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#18181B] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C8102E] text-white flex items-center justify-center font-serif font-bold shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Event & Decor Booking</h3>
              <p className="text-xs text-stone-400">Proposals, Birthdays, Graduations & Civil Weddings in Gisozi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {confirmedEvent ? (
          <div className="p-8 text-center space-y-6 my-auto bg-[#121214]">
            <div className="w-16 h-16 bg-[#C8102E]/20 text-[#E5383B] rounded-full flex items-center justify-center mx-auto border border-[#C8102E]">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#E5383B]">
                EVENT BOOKING CONFIRMED #{confirmedEvent.id}
              </span>
              <h4 className="text-2xl font-serif text-white">Booking Inquiry Registered!</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Thank you, <strong className="text-[#E5383B]">{confirmedEvent.customerName}</strong>. Your request for <strong>{confirmedEvent.eventType}</strong> on <strong>{confirmedEvent.eventDate}</strong> at <strong>{confirmedEvent.eventTime}</strong> has been saved.
              </p>
            </div>

            <div className="bg-[#18181B] border border-stone-800 p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Guests:</span>
                <span className="font-bold text-white">{confirmedEvent.guestCount} Guests</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Phone:</span>
                <span className="font-bold text-white">{confirmedEvent.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Selected Add-ons:</span>
                <span className="font-bold text-[#E5383B]">{confirmedEvent.selectedAddons.join(', ') || 'Standard Decor'}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  setConfirmedEvent(null);
                  onClose();
                }}
                className="bg-stone-800 hover:bg-[#C8102E] text-white font-medium px-8 py-3 text-xs uppercase tracking-wider transition-colors border border-stone-700"
              >
                Done & Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-6 flex-1 text-xs bg-[#121214]">
            
            {/* Package Selection */}
            <div className="space-y-3">
              <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                1. Select Event Type & Decoration Package
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVENT_DECOR_PACKAGES.map(pkg => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3 border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-medium'
                          : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-xs text-white">{pkg.title}</h4>
                          {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#E5383B]" />}
                        </div>
                        <p className="text-[10px] text-stone-400 leading-tight">{pkg.subtitle}</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#E5383B] pt-2 block font-serif">
                        {pkg.priceEstimate}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date, Time & Seating Capacity Slider */}
            <div className="space-y-4 pt-2 border-t border-stone-800">
              <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                2. Date, Time & Seating Capacity Options
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1">Preferred Time *</label>
                  <input
                    type="time"
                    required
                    value={eventTime}
                    onChange={e => setEventTime(e.target.value)}
                    className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>

              {/* Seating Capacity Interactive Slider */}
              <div className="bg-[#18181B] p-3 border border-stone-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-serif font-bold text-white">Seating Capacity:</span>
                  <span className="font-bold text-[#E5383B] font-serif">{guestCount} Guests</span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={50}
                  value={guestCount}
                  onChange={e => setGuestCount(parseInt(e.target.value) || 1)}
                  className="w-full accent-[#C8102E] cursor-pointer"
                />

                <div className="flex justify-between items-center text-[10px] text-stone-400 border-t border-stone-800 pt-1.5">
                  <span className="font-bold text-[#E5383B]">{getSeatingConfigLabel(guestCount)}</span>
                  <span>Range: 1 to 50+ Guests</span>
                </div>
              </div>
            </div>

            {/* Aesthetic Add-on Packages */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                3. Aesthetic Add-on Packages (Custom Options)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableAddons.map(addon => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-2.5 border text-left text-xs flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-medium'
                          : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-[11px]">{addon.name}</span>
                      <span className="text-[10px] text-[#E5383B] font-bold font-serif">{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px]">
                4. Primary Contact Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />

                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone Number *"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Special decor requests, flower color themes, platter food preferences, cake setup..."
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
                className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            {/* Form Footer Action */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-4">
              <div className="text-[10px] text-stone-400">
                <span>Estimated decor & seating package: </span>
                <strong className="text-[#E5383B] font-bold block text-xs font-serif">{selectedPackage.priceEstimate}</strong>
              </div>

              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium px-6 py-3 uppercase tracking-wider flex items-center gap-2 text-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Submit Booking Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
