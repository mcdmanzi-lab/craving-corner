import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoDealsMatrix } from './components/PromoDealsMatrix';
import { PlattersHighlight } from './components/PlattersHighlight';
import { MenuSection } from './components/MenuSection';
import { KigaliDeliveryTracker } from './components/KigaliDeliveryTracker';
import { LocationAndAmenities } from './components/LocationAndAmenities';
import { InstagramFeedGallery } from './components/InstagramFeedGallery';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { EventBookingModal } from './components/EventBookingModal';
import { TableBookingModal } from './components/TableBookingModal';
import { AdminModal } from './components/AdminModal';
import { FloatingTableBooking } from './components/FloatingTableBooking';
import { CartItem, MenuItem, PortionOption } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTableBookingOpen, setIsTableBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [menuVersion, setMenuVersion] = useState(0);

  // Cart Handlers
  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedPortion?: PortionOption,
    selectedOptions?: string[],
    notes?: string
  ) => {
    setCartItems(prev => {
      // Check if item with same portion & options exists
      const existingIndex = prev.findIndex(
        ci => ci.item.id === item.id &&
              ci.selectedPortion?.name === selectedPortion?.name &&
              JSON.stringify(ci.selectedOptions?.sort()) === JSON.stringify(selectedOptions?.sort())
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${item.id}-${Date.now()}`,
          item,
          quantity,
          selectedPortion,
          selectedOptions,
          notes
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'events') {
      setIsEventModalOpen(true);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#F3F4F6] font-sans selection:bg-[#C8102E] selection:text-white">
      
      {/* Header Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenEventBooking={() => setIsEventModalOpen(true)}
        onOpenTableBooking={() => setIsTableBookingOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section */}
      <Hero
        onOrderNow={() => handleNavigateSection('menu')}
        onOpenEventBooking={() => setIsEventModalOpen(true)}
        onOpenTableBooking={() => setIsTableBookingOpen(true)}
      />

      {/* Dedicated Promo & Weekly Deals Matrix (Monday Burger & Platter Tiers) */}
      <PromoDealsMatrix
        onSelectItem={(item) => setCustomizerItem(item)}
        onQuickAdd={(item) => handleAddToCart(item, 1)}
      />

      {/* Famous Shared Platters Spotlight */}
      <PlattersHighlight
        onSelectItem={(item) => setCustomizerItem(item)}
      />

      {/* Full Digital Menu */}
      <MenuSection
        onSelectItem={(item) => setCustomizerItem(item)}
        onQuickAdd={(item) => handleAddToCart(item, 1)}
        menuVersion={menuVersion}
      />

      {/* Up-to-Date Delivery & Order Online Map Tracker */}
      <KigaliDeliveryTracker
        onSelectZoneAndOrder={() => handleNavigateSection('menu')}
      />

      {/* Location, 24/7 Schedule, Parking & Amenities */}
      <LocationAndAmenities />

      {/* Media Gallery & Instagram Feed / Influencer Proof */}
      <InstagramFeedGallery />

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenEventBooking={() => setIsEventModalOpen(true)}
        onOpenTableBooking={() => setIsTableBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Item Customizer Modal (Portion & Options picker) */}
      <ItemCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Event & Decor Booking Modal */}
      <EventBookingModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      />

      {/* Real Table Booking Modal */}
      <TableBookingModal
        isOpen={isTableBookingOpen}
        onClose={() => setIsTableBookingOpen(false)}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onMenuChange={() => setMenuVersion(v => v + 1)}
      />

      {/* Floating Table Reservation & Delivery Quick Action Bar */}
      <FloatingTableBooking
        onOpenTableBooking={() => setIsTableBookingOpen(true)}
        onOrderDelivery={() => handleNavigateSection('menu')}
      />

    </div>
  );
}
