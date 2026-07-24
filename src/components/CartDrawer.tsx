import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, MapPin, Phone, CreditCard, CheckCircle, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { CartItem, PaymentMethod } from '../types';
import { KIGALI_ZONES, RESTAURANT_INFO } from '../data/cravingCornerData';
import { saveFoodOrder } from '../services/storeService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedZone, setSelectedZone] = useState(KIGALI_ZONES[0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [orderPlacedReceipt, setOrderPlacedReceipt] = useState<any | null>(null);

  // Subtotal calculation
  const subtotalRWF = cartItems.reduce((sum, item) => {
    const isMondayActive = item.item.isMondayBurgerPromo;
    const basePrice = isMondayActive && item.item.mondayPromoPrice ? item.item.mondayPromoPrice : item.item.price;
    const unitPrice = item.selectedPortion ? item.selectedPortion.price : basePrice;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const deliveryFeeRWF = cartItems.length > 0 ? selectedZone.feeRWF : 0;
  const grandTotalRWF = subtotalRWF + deliveryFeeRWF;

  if (!isOpen) return null;

  const handlePlaceDirectOrder = async () => {
    if (cartItems.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number so our kitchen can prepare your delivery.');
      return;
    }

    const itemSummaries = cartItems.map(ci => {
      const isMondayActive = ci.item.isMondayBurgerPromo;
      const basePrice = isMondayActive && ci.item.mondayPromoPrice ? ci.item.mondayPromoPrice : ci.item.price;
      const unitPrice = ci.selectedPortion ? ci.selectedPortion.price : basePrice;
      return {
        name: ci.item.name,
        portion: ci.selectedPortion?.name,
        options: ci.selectedOptions,
        quantity: ci.quantity,
        totalRWF: unitPrice * ci.quantity
      };
    });

    const newSavedOrder = await saveFoodOrder({
      customerName,
      phone: customerPhone,
      deliveryAddress: deliveryAddress || `${selectedZone.name} (Main Road Landmark)`,
      deliveryZone: selectedZone.name,
      paymentMethod,
      items: itemSummaries,
      subtotalRWF,
      deliveryFeeRWF,
      grandTotalRWF
    });

    setOrderPlacedReceipt({
      orderId: newSavedOrder.id,
      date: newSavedOrder.createdAt,
      customerName,
      phone: customerPhone,
      zone: selectedZone,
      deliveryAddress: deliveryAddress || `${selectedZone.name} (Main Road)`,
      items: [...cartItems],
      subtotal: subtotalRWF,
      deliveryFee: deliveryFeeRWF,
      total: grandTotalRWF,
      paymentMethod
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121214] border-l border-stone-800 text-[#F3F4F6] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#18181B] text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C8102E] text-white flex items-center justify-center font-serif font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">Your Order Cart</h3>
                <p className="text-[11px] text-stone-400">Craving Corner • Gisozi Delivery</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Success View */}
          {orderPlacedReceipt ? (
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-center bg-[#121214]">
              <div className="w-16 h-16 bg-[#C8102E]/20 text-[#E5383B] rounded-full flex items-center justify-center mx-auto border border-[#C8102E]">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="bg-[#C8102E] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
                  ORDER CONFIRMED #{orderPlacedReceipt.orderId}
                </span>
                <h4 className="text-xl font-serif text-white pt-2">Thank you, {orderPlacedReceipt.customerName}!</h4>
                <p className="text-xs text-stone-300">
                  Your meal is being prepared at Craving Corner Gisozi. Estimated delivery time: <strong className="text-[#E5383B]">{orderPlacedReceipt.zone.estMinutes}</strong>.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#18181B] border border-stone-800 p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Delivery Zone:</span>
                  <span className="font-bold text-white">{orderPlacedReceipt.zone.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Payment:</span>
                  <span className="font-bold text-[#E5383B] uppercase">{orderPlacedReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 font-serif font-bold text-sm">
                  <span className="text-white">Total Paid:</span>
                  <span className="text-[#E5383B]">{orderPlacedReceipt.total.toLocaleString()} RWF</span>
                </div>
              </div>

              {orderPlacedReceipt.paymentMethod === 'momo' && (
                <div className="bg-[#C8102E]/10 border border-[#C8102E]/40 p-3 text-xs text-stone-200 text-left space-y-1">
                  <strong className="block text-white font-serif">MTN Mobile Money Prompt:</strong>
                  <p className="text-stone-300">Dial <strong>*182#</strong> or check your phone for the prompt to confirm payment to Craving Corner (+250 791 393 785).</p>
                </div>
              )}

              <button
                onClick={() => {
                  setOrderPlacedReceipt(null);
                  onClose();
                }}
                className="w-full bg-stone-800 hover:bg-[#C8102E] text-white font-medium py-3 uppercase tracking-wider text-xs transition-colors border border-stone-700"
              >
                Done
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="p-8 text-center space-y-4 flex-1 flex flex-col justify-center items-center bg-[#121214]">
              <div className="w-16 h-16 bg-[#18181B] border border-stone-800 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8 text-[#E5383B]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-white">Your cart is empty</h4>
                <p className="text-xs text-stone-400 mt-1 max-w-xs">
                  Explore our shared platters, steaks, pilau, burgers and signature drinks from the menu.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-stone-800 hover:bg-[#C8102E] text-white font-medium px-5 py-2.5 text-xs uppercase tracking-wider transition-colors border border-stone-700"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Cart Items & Checkout Scrollable Body */
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-6 text-xs bg-[#121214]">
              
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-white uppercase tracking-wider text-[11px]">
                    ORDER ITEMS ({cartItems.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-400 text-[11px] flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Trash2 className="w-3 h-3" /> Clear All
                  </button>
                </div>

                {cartItems.map(item => {
                  const isMondayActive = item.item.isMondayBurgerPromo;
                  const basePrice = isMondayActive && item.item.mondayPromoPrice ? item.item.mondayPromoPrice : item.item.price;
                  const unitPrice = item.selectedPortion ? item.selectedPortion.price : basePrice;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="bg-[#18181B] border border-stone-800 p-3 flex items-center gap-3"
                    >
                      <img
                        src={item.item.image}
                        alt={item.item.name}
                        className="w-12 h-12 object-cover shrink-0 filter contrast-105"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-white text-xs truncate">{item.item.name}</h4>
                        {item.selectedPortion && (
                          <span className="text-[10px] text-[#E5383B] block font-medium">
                            {item.selectedPortion.name}
                          </span>
                        )}
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <span className="text-[10px] text-stone-400 truncate block">
                            +{item.selectedOptions.join(', ')}
                          </span>
                        )}
                        <span className="text-xs font-serif font-bold text-[#E5383B] block mt-0.5">
                          {itemTotal.toLocaleString()} RWF
                        </span>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 bg-[#121214] border border-stone-800 p-1 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-red-600 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Zone Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="block font-serif font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#E5383B]" />
                  Kigali Delivery Zone
                </label>
                <select
                  value={selectedZone.name}
                  onChange={e => {
                    const z = KIGALI_ZONES.find(kz => kz.name === e.target.value);
                    if (z) setSelectedZone(z);
                  }}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                >
                  {KIGALI_ZONES.map(zone => (
                    <option key={zone.name} value={zone.name} className="bg-[#18181B] text-white">
                      {zone.name} (+{zone.feeRWF.toLocaleString()} RWF • ~{zone.estMinutes})
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Contact & Address */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <span className="font-serif font-bold text-white uppercase tracking-wider text-[11px] block">
                  Delivery Details
                </span>

                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number (e.g. +250 788...)"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />

                <input
                  type="text"
                  placeholder="Detailed Address / House / Landmark in Kigali"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#18181B] border border-stone-800 p-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <span className="font-serif font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#E5383B]" />
                  Payment Option
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-2.5 border text-left transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-bold'
                        : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-[#E5383B] font-serif font-bold">MTN MoMo</span>
                    <span className="text-[10px] text-stone-400">*182# Prompt</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-2.5 border text-left transition-all ${
                      paymentMethod === 'airtel'
                        ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-bold'
                        : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-red-400 font-serif font-bold">Airtel Money</span>
                    <span className="text-[10px] text-stone-400">Mobile Money</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-bold'
                        : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-emerald-400 font-serif font-bold">Credit / Debit</span>
                    <span className="text-[10px] text-stone-400">Visa / Mastercard</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-2.5 border text-left transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-bold'
                        : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-white font-serif font-bold">Cash / NFC</span>
                    <span className="text-[10px] text-stone-400">Upon Delivery</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Checkout Footer Actions */}
          {!orderPlacedReceipt && cartItems.length > 0 && (
            <div className="p-4 bg-[#18181B] text-white border-t border-stone-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal:</span>
                  <span>{subtotalRWF.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Delivery ({selectedZone.name}):</span>
                  <span>{deliveryFeeRWF.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-white pt-1 border-t border-stone-800">
                  <span>Grand Total:</span>
                  <span className="text-[#E5383B]">{grandTotalRWF.toLocaleString()} RWF</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handlePlaceDirectOrder}
                  className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3.5 uppercase tracking-wider flex items-center justify-center gap-2 text-xs transition-colors shadow-lg"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Place Real Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
