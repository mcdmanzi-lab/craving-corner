import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, UtensilsCrossed, Phone, Mail, AlertCircle, Sparkles, Plus, Minus, Search, ShoppingBag } from 'lucide-react';
import { saveTableReservation, TableReservation, getStoredMenuItems, PreOrderItem } from '../services/storeService';
import { RESTAURANT_INFO } from '../data/cravingCornerData';
import { MenuItem } from '../types';

import logoImg from '../assets/images/craving_corner_logo_1784895507028.jpg';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reservationDate, setReservationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [reservationTime, setReservationTime] = useState('19:00');
  const [guestCount, setGuestCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState('Terrace Lounge (City View)');
  const [specialNotes, setSpecialNotes] = useState('');

  // Pre-ordered menu items state
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [menuSearch, setMenuSearch] = useState('');
  const [preOrders, setPreOrders] = useState<PreOrderItem[]>([]);
  
  const [confirmedBooking, setConfirmedBooking] = useState<TableReservation | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMenuList(getStoredMenuItems());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const seatingOptions = [
    { id: 'terrace', name: 'Terrace Lounge (City View)', desc: 'Open-air seating overlooking Gisozi hills', badge: 'Popular' },
    { id: 'indoor', name: 'Indoor Main Dining Room', desc: 'Cozy climate-controlled interior with comfortable booths', badge: 'Cozy' },
    { id: 'garden', name: 'Romantic Outdoor Garden', desc: 'Private ambient lighted tables surrounded by greenery', badge: 'Romantic' },
    { id: 'vip', name: 'VIP Private Corner Table', desc: 'Spacious high-back seating suitable for business or celebrations', badge: 'Private' },
  ];

  const handleAddPreOrder = (item: MenuItem) => {
    setPreOrders(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { id: item.id, name: item.name, quantity: 1, priceRWF: item.price }];
    });
  };

  const handleUpdatePreOrderQty = (id: string, delta: number) => {
    setPreOrders(prev => {
      return prev.map(p => {
        if (p.id === id) {
          const newQty = p.quantity + delta;
          return newQty > 0 ? { ...p, quantity: newQty } : null;
        }
        return p;
      }).filter(Boolean) as PreOrderItem[];
    });
  };

  const preOrderTotalRWF = preOrders.reduce((sum, p) => sum + (p.priceRWF * p.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    const newRes = saveTableReservation({
      customerName,
      phone,
      email,
      reservationDate,
      reservationTime,
      guestCount,
      seatingArea,
      specialNotes,
      preOrderedItems: preOrders,
      preOrderTotalRWF,
    });

    setConfirmedBooking(newRes);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setPhone('');
    setEmail('');
    setSpecialNotes('');
    setPreOrders([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-[#121212] border border-stone-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-[#F3F4F6] shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#18181B] text-white p-5 flex items-center justify-between border-b border-stone-800 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[#C8102E] bg-white shrink-0">
              <img
                src={logoImg}
                alt="Craving Corner Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-1.5">
                <span>{confirmedBooking ? 'Reservation Confirmed' : 'Reserve a Table'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" />
              </h2>
              <p className="text-[11px] text-[#E5383B] font-medium">
                Craving Corner • Gisozi, Kigali (Open 24/7)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {confirmedBooking ? (
            /* Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-950 text-emerald-400 mx-auto rounded-full flex items-center justify-center border border-emerald-800">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#E5383B]">
                  REAL TABLE RESERVATION SAVED
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  We look forward to welcoming you, {confirmedBooking.customerName}!
                </h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  Your table request has been registered in our central booking system. Our host team at Gisozi will hold your table.
                </p>
              </div>

              {/* Receipt Ticket Box */}
              <div className="bg-[#18181B] border border-stone-800 p-5 text-left max-w-lg mx-auto space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                  <span className="font-bold text-white font-serif">RESERVATION REF:</span>
                  <span className="bg-stone-800 text-[#E5383B] px-2.5 py-0.5 font-bold font-mono text-sm border border-stone-700">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-sans">GUEST NAME</span>
                    <strong className="font-sans text-white">{confirmedBooking.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-sans">PHONE NUMBER</span>
                    <strong className="font-sans text-white">{confirmedBooking.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-sans">DATE & TIME</span>
                    <strong className="font-sans text-white">{confirmedBooking.reservationDate} at {confirmedBooking.reservationTime}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-sans">PARTY SIZE</span>
                    <strong className="font-sans text-white">{confirmedBooking.guestCount} Guests</strong>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-2">
                  <span className="text-[10px] text-stone-500 uppercase block font-sans">SEATING AREA</span>
                  <strong className="font-sans text-[#E5383B]">{confirmedBooking.seatingArea}</strong>
                </div>

                {confirmedBooking.preOrderedItems && confirmedBooking.preOrderedItems.length > 0 && (
                  <div className="border-t border-stone-800 pt-2 space-y-1.5 font-sans">
                    <span className="text-[10px] text-[#E5383B] font-bold uppercase block tracking-wider">
                      PRE-ORDERED MENU (SERVED AT TABLE)
                    </span>
                    <div className="bg-[#121214] p-2.5 border border-stone-800 space-y-1">
                      {confirmedBooking.preOrderedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-stone-200">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-mono text-stone-400">{(item.priceRWF * item.quantity).toLocaleString()} RWF</span>
                        </div>
                      ))}
                      <div className="border-t border-stone-800 pt-1 mt-1 flex justify-between text-xs font-bold text-white">
                        <span>Pre-Order Total:</span>
                        <span className="text-[#E5383B] font-mono">{(confirmedBooking.preOrderTotalRWF || 0).toLocaleString()} RWF</span>
                      </div>
                    </div>
                  </div>
                )}

                {confirmedBooking.specialNotes && (
                  <div className="border-t border-stone-800 pt-2">
                    <span className="text-[10px] text-stone-500 uppercase block font-sans">SPECIAL NOTES</span>
                    <span className="font-sans text-stone-300 italic">{confirmedBooking.specialNotes}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-stone-800 hover:bg-[#C8102E] text-white font-medium px-6 py-3 text-xs uppercase tracking-wider transition-colors border border-stone-700 hover:border-[#C8102E]"
                >
                  Done & Return to Menu
                </button>
              </div>
            </div>

          ) : (

            /* Booking Form View */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Step 1: Customer Info */}
              <div className="space-y-3">
                <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-stone-800 pb-2">
                  <Users className="w-3.5 h-3.5" />
                  1. Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Luc Nshuti"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1 font-medium">Phone Number (MTN / Airtel) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 78X XXX XXX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-medium">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>

              {/* Step 2: Date, Time & Guests */}
              <div className="space-y-3">
                <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-stone-800 pb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  2. Date, Time & Guest Count
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1 font-medium">Reservation Date *</label>
                    <input
                      type="date"
                      required
                      value={reservationDate}
                      onChange={e => setReservationDate(e.target.value)}
                      className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1 font-medium">Time *</label>
                    <input
                      type="time"
                      required
                      value={reservationTime}
                      onChange={e => setReservationTime(e.target.value)}
                      className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1 font-medium">Guests *</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      required
                      value={guestCount}
                      onChange={e => setGuestCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Seating Location Preference */}
              <div className="space-y-3">
                <label className="block font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-stone-800 pb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  3. Table Location Preference
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seatingOptions.map(opt => {
                    const isSel = seatingArea === opt.name;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSeatingArea(opt.name)}
                        className={`p-3 text-left border transition-all flex flex-col justify-between ${
                          isSel
                            ? 'bg-[#C8102E] text-white border-[#C8102E]'
                            : 'bg-[#18181B] text-stone-200 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-serif font-bold text-xs">{opt.name}</span>
                          <span className={`text-[9px] uppercase px-1.5 py-0.5 font-bold ${
                            isSel ? 'bg-white text-[#1A1A1A]' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {opt.badge}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 ${isSel ? 'text-stone-100' : 'text-stone-400'}`}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Pre-order Menu for Table Arrival */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <label className="font-serif font-bold text-[#E5383B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    4. Pre-Order Menu Items for Table Arrival (Optional)
                  </label>
                  {preOrders.length > 0 && (
                    <span className="text-[11px] font-bold text-white bg-[#C8102E] px-2 py-0.5 rounded-none font-mono">
                      {preOrders.reduce((a, b) => a + b.quantity, 0)} Items ({preOrderTotalRWF.toLocaleString()} RWF)
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-stone-400">
                  Select food or drinks to be cooked & served ready at your table upon arrival.
                </p>

                {/* Search Bar for Menu */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search menu items (e.g. Platter, Steak, Burger, Coffee)..."
                    value={menuSearch}
                    onChange={e => setMenuSearch(e.target.value)}
                    className="w-full bg-[#18181B] border border-stone-800 p-2 pr-8 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-2.5" />
                </div>

                {/* Pre-Ordered Items Selected Summary */}
                {preOrders.length > 0 && (
                  <div className="bg-[#18181B] border border-[#C8102E]/40 p-3 space-y-2">
                    <span className="text-[10px] font-bold text-[#E5383B] uppercase tracking-wider block">
                      Your Selected Table Pre-Orders:
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {preOrders.map(p => (
                        <div key={p.id} className="flex items-center justify-between text-xs bg-[#121214] p-2 border border-stone-800">
                          <span className="font-medium text-white truncate max-w-[180px] sm:max-w-[260px]">{p.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-stone-400 font-mono text-[11px]">{(p.priceRWF * p.quantity).toLocaleString()} RWF</span>
                            <div className="flex items-center gap-1 bg-stone-800 px-1 py-0.5 border border-stone-700">
                              <button
                                type="button"
                                onClick={() => handleUpdatePreOrderQty(p.id, -1)}
                                className="p-0.5 text-stone-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[11px] font-bold px-1 text-white">{p.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdatePreOrderQty(p.id, 1)}
                                className="p-0.5 text-stone-300 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Menu Quick Selection Scrollable list */}
                <div className="bg-[#18181B] border border-stone-800 max-h-44 overflow-y-auto p-2 space-y-1.5 divide-y divide-stone-800/50">
                  {menuList
                    .filter(m => m.name.toLowerCase().includes(menuSearch.toLowerCase()) || m.description.toLowerCase().includes(menuSearch.toLowerCase()))
                    .slice(0, 10)
                    .map(item => {
                      const selectedCount = preOrders.find(p => p.id === item.id)?.quantity || 0;
                      return (
                        <div key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs gap-2">
                          <div className="truncate flex-1">
                            <span className="font-bold text-stone-200 block truncate">{item.name}</span>
                            <span className="text-[10px] text-[#E5383B] font-mono">{item.price.toLocaleString()} RWF</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddPreOrder(item)}
                            className="bg-stone-800 hover:bg-[#C8102E] text-white px-2.5 py-1 text-[11px] font-medium border border-stone-700 hover:border-[#C8102E] transition-colors flex items-center gap-1 shrink-0"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{selectedCount > 0 ? `Add More (${selectedCount})` : 'Pre-order'}</span>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Step 5: Special Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-serif font-bold text-white">
                  Special Occasion or Dietary Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday dinner, need high chair for toddler, or quiet corner..."
                  value={specialNotes}
                  onChange={e => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3.5 uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Confirm Real Table Booking</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
