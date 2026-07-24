import React, { useState, useEffect } from 'react';
import {
  X, Lock, ShieldCheck, Search, Filter, RefreshCw, Trash2, CheckCircle,
  Clock, AlertCircle, Utensils, Calendar, ShoppingBag, Phone, MapPin, LogOut,
  Plus, Edit3, RotateCcw, Image, Tag, Sparkles
} from 'lucide-react';
import {
  getStoredTables, updateTableStatus, deleteTableReservation, TableReservation,
  getStoredEvents, updateEventStatus, deleteEventBooking, EventBooking,
  getStoredOrders, updateOrderStatus, deleteFoodOrder, FoodOrder,
  getStoredMenuItems, saveMenuItem, deleteMenuItem, resetMenuItemsToDefault,
  clearAllStoreData
} from '../services/storeService';
import { MenuItem, MenuCategory } from '../types';

import logoImg from '../assets/images/craving_corner_logo_1784895507028.jpg';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuChange?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onMenuChange }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'tables' | 'events' | 'orders' | 'menu'>('tables');
  const [searchQuery, setSearchQuery] = useState('');

  const [tables, setTables] = useState<TableReservation[]>([]);
  const [events, setEvents] = useState<EventBooking[]>([]);
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Menu item add/edit state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form states for menu item
  const [menuName, setMenuName] = useState('');
  const [menuCategory, setMenuCategory] = useState<MenuCategory>('platters');
  const [menuPrice, setMenuPrice] = useState<number>(15000);
  const [menuDesc, setMenuDesc] = useState('');
  const [menuImage, setMenuImage] = useState('');
  const [menuServingSize, setMenuServingSize] = useState('Serves 1-2 people');
  const [menuIsChefSpecial, setMenuIsChefSpecial] = useState(false);
  const [menuIsPopular, setMenuIsPopular] = useState(false);
  const [menuIsMondayBurgerPromo, setMenuIsMondayBurgerPromo] = useState(false);
  const [menuMondayPromoPrice, setMenuMondayPromoPrice] = useState<number>(10000);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  const loadAllData = () => {
    setTables(getStoredTables());
    setEvents(getStoredEvents());
    setOrders(getStoredOrders());
    setMenuItems(getStoredMenuItems());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    // Required admin password: "craving corner"
    if (cleanInput === 'craving corner' || cleanInput === 'cravingcorner') {
      setIsAuthenticated(true);
      setAuthError('');
      loadAllData();
    } else {
      setAuthError('Incorrect password! Password is "craving corner".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all table bookings, event packages, and food orders to start newly?')) {
      clearAllStoreData();
      loadAllData();
    }
  };

  // Table status actions
  const handleTableStatusChange = (id: string, status: TableReservation['status']) => {
    const updated = updateTableStatus(id, status);
    setTables(updated);
  };

  const handleTableDelete = (id: string) => {
    const updated = deleteTableReservation(id);
    setTables(updated);
  };

  // Event status actions
  const handleEventStatusChange = (id: string, status: EventBooking['status']) => {
    const updated = updateEventStatus(id, status);
    setEvents(updated);
  };

  const handleEventDelete = (id: string) => {
    const updated = deleteEventBooking(id);
    setEvents(updated);
  };

  // Order status actions
  const handleOrderStatusChange = (id: string, status: FoodOrder['status']) => {
    const updated = updateOrderStatus(id, status);
    setOrders(updated);
  };

  const handleOrderDelete = (id: string) => {
    const updated = deleteFoodOrder(id);
    setOrders(updated);
  };

  // Menu Management CRUD Handlers
  const handleOpenNewMenuForm = () => {
    setEditingItem(null);
    setIsCreatingNew(true);
    setMenuName('');
    setMenuCategory('platters');
    setMenuPrice(15000);
    setMenuDesc('');
    setMenuImage('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000');
    setMenuServingSize('Serves 1-2 people');
    setMenuIsChefSpecial(false);
    setMenuIsPopular(false);
    setMenuIsMondayBurgerPromo(false);
    setMenuMondayPromoPrice(10000);
  };

  const handleEditMenuForm = (item: MenuItem) => {
    setEditingItem(item);
    setIsCreatingNew(true);
    setMenuName(item.name);
    setMenuCategory(item.category);
    setMenuPrice(item.price);
    setMenuDesc(item.description);
    setMenuImage(item.image);
    setMenuServingSize(item.servingSize || 'Serves 1-2 people');
    setMenuIsChefSpecial(!!item.isChefSpecial);
    setMenuIsPopular(!!item.isPopular);
    setMenuIsMondayBurgerPromo(!!item.isMondayBurgerPromo);
    setMenuMondayPromoPrice(item.mondayPromoPrice || 10000);
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName.trim()) return;

    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : `menu-${Date.now()}`,
      name: menuName,
      category: menuCategory,
      price: Number(menuPrice),
      description: menuDesc,
      image: menuImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
      servingSize: menuServingSize,
      isChefSpecial: menuIsChefSpecial,
      isPopular: menuIsPopular,
      isMondayBurgerPromo: menuIsMondayBurgerPromo,
      mondayPromoPrice: menuIsMondayBurgerPromo ? Number(menuMondayPromoPrice) : undefined,
    };

    const updated = saveMenuItem(newItem);
    setMenuItems(updated);
    setIsCreatingNew(false);
    setEditingItem(null);
    if (onMenuChange) onMenuChange();
  };

  const handleDeleteMenuItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item from Craving Corner menu?')) {
      const updated = deleteMenuItem(id);
      setMenuItems(updated);
      if (onMenuChange) onMenuChange();
    }
  };

  const handleResetMenuDefaults = () => {
    if (window.confirm('Reset all menu items to original Craving Corner default items? Custom items will be replaced.')) {
      const resetList = resetMenuItemsToDefault();
      setMenuItems(resetList);
      if (onMenuChange) onMenuChange();
    }
  };

  if (!isOpen) return null;

  // Filtered lists
  const filteredTables = tables.filter(
    t => t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         t.phone.includes(searchQuery) ||
         t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(
    e => e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         e.phone.includes(searchQuery) ||
         e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(
    o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         o.phone.includes(searchQuery) ||
         o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter(
    m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
         m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenueRWF = orders.reduce((sum, o) => sum + o.grandTotalRWF, 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0E10] text-white font-sans overflow-y-auto flex flex-col animate-fadeIn">
      <div className="w-full flex-1 flex flex-col">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#141416]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-stone-800 flex items-center justify-between shadow-2xl w-full">
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
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
                Craving Corner Admin Portal
              </h2>
              <p className="text-[10px] sm:text-xs text-stone-400">
                Staff Management Dashboard • Gisozi, Kigali
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-stone-800 hover:bg-red-900 text-stone-300 hover:text-white px-3 py-1.5 text-xs flex items-center gap-1.5 border border-stone-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-[#C8102E] hover:bg-[#A60C24] text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#C8102E] transition-colors shadow-md"
            >
              <span>Exit Dashboard</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Password Form Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/40 mx-auto rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-white">Manager Authentication</h3>
              <p className="text-xs text-stone-400">
                Please enter the staff administration password to view bookings and orders.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full bg-[#121212] border border-stone-700 p-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              {authError && (
                <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium py-3 uppercase tracking-wider text-xs transition-colors"
              >
                Unlock Dashboard
              </button>
            </form>

            <p className="text-[10px] text-stone-500 italic">
              Hint: Password is <strong className="text-stone-300 font-mono">craving corner</strong>
            </p>
          </div>

        ) : (

          /* Authenticated Dashboard View */
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
            
            {/* Top Stat Counter Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#121212] p-3.5 border border-stone-800 flex items-center gap-3">
                <Utensils className="w-7 h-7 text-[#C8102E]" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-mono">TABLE BOOKINGS</span>
                  <strong className="text-lg font-serif font-bold text-white">{tables.length} Reservations</strong>
                </div>
              </div>

              <div className="bg-[#121212] p-3.5 border border-stone-800 flex items-center gap-3">
                <Calendar className="w-7 h-7 text-[#C8102E]" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-mono">EVENT PACKAGES</span>
                  <strong className="text-lg font-serif font-bold text-white">{events.length} Events</strong>
                </div>
              </div>

              <div className="bg-[#121212] p-3.5 border border-stone-800 flex items-center gap-3">
                <ShoppingBag className="w-7 h-7 text-[#C8102E]" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-mono">ONLINE ORDERS</span>
                  <strong className="text-lg font-serif font-bold text-white">{orders.length} Orders</strong>
                </div>
              </div>

              <div className="bg-[#121212] p-3.5 border border-stone-800 flex items-center gap-3">
                <span className="text-xl font-bold font-serif text-[#C8102E]">RWF</span>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block font-mono">ORDER REVENUE</span>
                  <strong className="text-lg font-serif font-bold text-emerald-400">
                    {totalRevenueRWF.toLocaleString()} RWF
                  </strong>
                </div>
              </div>
            </div>

            {/* Navigation Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-800 pb-3">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('tables')}
                  className={`px-4 py-2 text-xs font-serif font-bold border transition-colors flex items-center gap-2 ${
                    activeTab === 'tables'
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'bg-[#121212] border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Table Bookings ({tables.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 text-xs font-serif font-bold border transition-colors flex items-center gap-2 ${
                    activeTab === 'events'
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'bg-[#121212] border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Event & Decor ({events.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 text-xs font-serif font-bold border transition-colors flex items-center gap-2 ${
                    activeTab === 'orders'
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'bg-[#121212] border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Food Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-4 py-2 text-xs font-serif font-bold border transition-colors flex items-center gap-2 ${
                    activeTab === 'menu'
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'bg-[#121212] border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Manage Menu ({menuItems.length})</span>
                </button>
              </div>

              {/* Search input & refresh */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search by name, phone, ref..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121212] border border-stone-800 py-1.5 pl-8 pr-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C8102E]"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
                </div>

                <button
                  onClick={loadAllData}
                  className="bg-[#121212] hover:bg-stone-800 text-stone-300 p-2 border border-stone-800 transition-colors flex items-center gap-1 text-xs"
                  title="Reload Latest Data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Refresh</span>
                </button>

                <button
                  onClick={handleClearAll}
                  className="bg-red-950/60 hover:bg-red-900 text-red-300 p-2 border border-red-800/80 transition-colors flex items-center gap-1 text-xs"
                  title="Wipe store data & start newly"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset Store</span>
                </button>
              </div>

            </div>

            {/* Tab Views Content Area */}
            <div className="space-y-4">
              
              {/* TAB 1: TABLES */}
              {activeTab === 'tables' && (
                filteredTables.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 text-xs border border-dashed border-stone-800">
                    No table reservations found.
                  </div>
                ) : (
                  filteredTables.map(t => (
                    <div
                      key={t.id}
                      className="bg-[#121212] border border-stone-800 p-4 space-y-3 hover:border-stone-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#C8102E] text-white text-[10px] font-mono px-2 py-0.5 font-bold">
                            {t.id}
                          </span>
                          <strong className="font-serif font-bold text-sm text-white">{t.customerName}</strong>
                          <span className="text-stone-400 text-xs font-mono">({t.phone})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                            t.status === 'Confirmed' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                            t.status === 'Completed' ? 'bg-blue-900/60 text-blue-300 border border-blue-700' :
                            t.status === 'Cancelled' ? 'bg-red-900/60 text-red-300 border border-red-700' :
                            'bg-amber-900/60 text-amber-300 border border-amber-700'
                          }`}>
                            {t.status}
                          </span>

                          <select
                            value={t.status}
                            onChange={e => handleTableStatusChange(t.id, e.target.value as any)}
                            className="bg-[#1A1A1A] border border-stone-700 text-[11px] text-stone-300 px-2 py-1 focus:outline-none focus:border-[#C8102E]"
                          >
                            <option value="Pending">Mark Pending</option>
                            <option value="Confirmed">Mark Confirmed</option>
                            <option value="Completed">Mark Completed</option>
                            <option value="Cancelled">Mark Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleTableDelete(t.id)}
                            className="text-stone-500 hover:text-red-400 p-1"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-300">
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">RESERVATION DATE</span>
                          <strong>{t.reservationDate} at {t.reservationTime}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">GUESTS</span>
                          <strong>{t.guestCount} People</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">SEATING AREA</span>
                          <strong className="text-[#C8102E]">{t.seatingArea}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">BOOKED AT</span>
                          <span className="text-stone-400">{t.createdAt}</span>
                        </div>
                      </div>

                      {t.preOrderedItems && t.preOrderedItems.length > 0 && (
                        <div className="bg-[#1A1A1A] p-2.5 border border-stone-800 space-y-1">
                          <div className="flex justify-between items-center border-b border-stone-800 pb-1">
                            <span className="text-[10px] text-[#C8102E] font-bold uppercase tracking-wider">
                              PRE-ORDERED TABLE MENU
                            </span>
                            <span className="text-[11px] font-mono font-bold text-emerald-400">
                              {(t.preOrderTotalRWF || 0).toLocaleString()} RWF
                            </span>
                          </div>
                          {t.preOrderedItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-stone-200">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="font-mono text-stone-400">{(item.priceRWF * item.quantity).toLocaleString()} RWF</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {t.specialNotes && (
                        <div className="bg-[#1A1A1A] p-2 text-[11px] text-stone-300 border border-stone-800">
                          <strong className="text-[#C8102E]">Notes:</strong> {t.specialNotes}
                        </div>
                      )}
                    </div>
                  ))
                )
              )}

              {/* TAB 2: EVENTS */}
              {activeTab === 'events' && (
                filteredEvents.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 text-xs border border-dashed border-stone-800">
                    No event bookings found.
                  </div>
                ) : (
                  filteredEvents.map(e => (
                    <div
                      key={e.id}
                      className="bg-[#121212] border border-stone-800 p-4 space-y-3 hover:border-stone-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#C8102E] text-white text-[10px] font-mono px-2 py-0.5 font-bold">
                            {e.id}
                          </span>
                          <strong className="font-serif font-bold text-sm text-white">{e.customerName}</strong>
                          <span className="text-[#C8102E] text-xs font-serif font-bold">({e.eventType})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                            e.status === 'Confirmed' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                            e.status === 'Completed' ? 'bg-blue-900/60 text-blue-300 border border-blue-700' :
                            e.status === 'Cancelled' ? 'bg-red-900/60 text-red-300 border border-red-700' :
                            'bg-amber-900/60 text-amber-300 border border-amber-700'
                          }`}>
                            {e.status}
                          </span>

                          <select
                            value={e.status}
                            onChange={evt => handleEventStatusChange(e.id, evt.target.value as any)}
                            className="bg-[#1A1A1A] border border-stone-700 text-[11px] text-stone-300 px-2 py-1 focus:outline-none focus:border-[#C8102E]"
                          >
                            <option value="Pending">Mark Pending</option>
                            <option value="Confirmed">Mark Confirmed</option>
                            <option value="Completed">Mark Completed</option>
                            <option value="Cancelled">Mark Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleEventDelete(e.id)}
                            className="text-stone-500 hover:text-red-400 p-1"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-300">
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">PHONE</span>
                          <strong>{e.phone}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">DATE & TIME</span>
                          <strong>{e.eventDate} at {e.eventTime}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">GUESTS</span>
                          <strong>{e.guestCount} Guests</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">ADD-ONS</span>
                          <span className="text-[#C8102E] font-medium">{e.selectedAddons.join(', ') || 'None'}</span>
                        </div>
                      </div>

                      {e.specialRequests && (
                        <div className="bg-[#1A1A1A] p-2 text-[11px] text-stone-300 border border-stone-800">
                          <strong className="text-[#C8102E]">Decor Requests:</strong> {e.specialRequests}
                        </div>
                      )}
                    </div>
                  ))
                )
              )}

              {/* TAB 3: FOOD ORDERS */}
              {activeTab === 'orders' && (
                filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 text-xs border border-dashed border-stone-800">
                    No online orders found.
                  </div>
                ) : (
                  filteredOrders.map(o => (
                    <div
                      key={o.id}
                      className="bg-[#121212] border border-stone-800 p-4 space-y-3 hover:border-stone-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#C8102E] text-white text-[10px] font-mono px-2 py-0.5 font-bold">
                            {o.id}
                          </span>
                          <strong className="font-serif font-bold text-sm text-white">{o.customerName}</strong>
                          <span className="text-stone-400 text-xs font-mono">({o.phone})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-emerald-400 text-sm mr-2">
                            {o.grandTotalRWF.toLocaleString()} RWF
                          </span>

                          <select
                            value={o.status}
                            onChange={evt => handleOrderStatusChange(o.id, evt.target.value as any)}
                            className="bg-[#1A1A1A] border border-stone-700 text-[11px] text-stone-300 px-2 py-1 focus:outline-none focus:border-[#C8102E]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Preparation">In Preparation</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleOrderDelete(o.id)}
                            className="text-stone-500 hover:text-red-400 p-1"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-300">
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">DELIVERY ZONE</span>
                          <strong>{o.deliveryZone}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">ADDRESS / LANDMARK</span>
                          <strong>{o.deliveryAddress}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase block">PAYMENT METHOD</span>
                          <strong className="uppercase text-[#C8102E]">{o.paymentMethod}</strong>
                        </div>
                      </div>

                      {/* Item list */}
                      <div className="bg-[#1A1A1A] p-2.5 border border-stone-800 space-y-1">
                        <span className="text-[10px] text-stone-400 font-mono block uppercase border-b border-stone-800 pb-1">
                          Ordered Menu Items:
                        </span>
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-stone-200">
                            <span>
                              {it.quantity}x {it.name} {it.portion ? `(${it.portion})` : ''}
                            </span>
                            <span className="font-mono text-stone-400">{it.totalRWF.toLocaleString()} RWF</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )
              )}

              {/* TAB 4: MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  {/* Top Bar Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121212] p-3 border border-stone-800">
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                        <Utensils className="w-4 h-4 text-[#C8102E]" />
                        <span>Live Restaurant Menu Items ({menuItems.length})</span>
                      </h4>
                      <p className="text-[10px] text-stone-400">
                        Admin can add, edit, or delete dishes. Changes immediately sync to table booking pre-orders & main menu.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleOpenNewMenuForm}
                        className="bg-[#C8102E] hover:bg-[#A60C24] text-white px-3 py-1.5 text-xs font-medium border border-[#C8102E] flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Item</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetMenuDefaults}
                        className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
                        title="Restore original menu"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset Defaults</span>
                      </button>
                    </div>
                  </div>

                  {/* Add / Edit Form Panel */}
                  {isCreatingNew && (
                    <form onSubmit={handleSaveMenuItem} className="bg-[#121212] border-2 border-[#C8102E] p-4 space-y-4 animate-fadeIn">
                      <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                        <h5 className="font-serif font-bold text-sm text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C8102E]" />
                          <span>{editingItem ? `Edit Item: ${editingItem.name}` : 'Add New Dish or Drink to Craving Corner'}</span>
                        </h5>
                        <button
                          type="button"
                          onClick={() => setIsCreatingNew(false)}
                          className="text-stone-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-stone-400 mb-1 font-medium">Dish Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Kigali Sizzling Nyama Choma Platter"
                            value={menuName}
                            onChange={e => setMenuName(e.target.value)}
                            className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-stone-400 mb-1 font-medium">Category *</label>
                          <select
                            value={menuCategory}
                            onChange={e => setMenuCategory(e.target.value as MenuCategory)}
                            className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                          >
                            <option value="platters">Group Shared Platters</option>
                            <option value="mains">Sizzling Meat & Grills</option>
                            <option value="fast_food">Burgers, Wraps & Fast Food</option>
                            <option value="rice">Traditional African Rice & Bowls</option>
                            <option value="drinks">Cocktails, Coffee & Smoothies</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-stone-400 mb-1 font-medium">Price in RWF *</label>
                          <input
                            type="number"
                            required
                            min={500}
                            step={500}
                            value={menuPrice}
                            onChange={e => setMenuPrice(Number(e.target.value))}
                            className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-stone-400 mb-1 font-medium">Serving Size Note</label>
                          <input
                            type="text"
                            placeholder="e.g. Serves 2-3 people, or Serves 1"
                            value={menuServingSize}
                            onChange={e => setMenuServingSize(e.target.value)}
                            className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-400 mb-1 font-medium">Description</label>
                        <textarea
                          rows={2}
                          placeholder="Describe ingredients, cooking style, or flavor profile..."
                          value={menuDesc}
                          onChange={e => setMenuDesc(e.target.value)}
                          className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
                        />
                      </div>

                      {/* Image URL & Preset Selection */}
                      <div className="space-y-2">
                        <label className="block text-[10px] text-stone-400 font-medium">Image URL or Quick Preset</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={menuImage}
                          onChange={e => setMenuImage(e.target.value)}
                          className="w-full bg-[#18181B] border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                        />
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1 mr-1">
                            Presets:
                          </span>
                          {[
                            { name: 'Shared Platter', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Sizzling Steak', url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'BBQ Ribs', url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Grilled Fish', url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Iced Latte', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Fresh Cocktail', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000' },
                          ].map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setMenuImage(p.url)}
                              className="text-[10px] bg-stone-800 hover:bg-[#C8102E] text-stone-300 hover:text-white px-2 py-0.5 border border-stone-700 transition-colors"
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Checkboxes for Badges */}
                      <div className="flex flex-wrap gap-4 pt-1 border-t border-stone-800">
                        <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={menuIsChefSpecial}
                            onChange={e => setMenuIsChefSpecial(e.target.checked)}
                            className="accent-[#C8102E]"
                          />
                          <span>Chef's Special Badge</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={menuIsPopular}
                            onChange={e => setMenuIsPopular(e.target.checked)}
                            className="accent-[#C8102E]"
                          />
                          <span>Most Popular Badge</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={menuIsMondayBurgerPromo}
                            onChange={e => setMenuIsMondayBurgerPromo(e.target.checked)}
                            className="accent-[#C8102E]"
                          />
                          <span>Monday Promo Offer</span>
                        </label>
                      </div>

                      {menuIsMondayBurgerPromo && (
                        <div className="bg-[#18181B] p-2.5 border border-[#C8102E]/40 flex items-center gap-3">
                          <label className="text-xs text-stone-300 font-medium whitespace-nowrap">
                            Monday Special Price (RWF):
                          </label>
                          <input
                            type="number"
                            step={500}
                            value={menuMondayPromoPrice}
                            onChange={e => setMenuMondayPromoPrice(Number(e.target.value))}
                            className="w-32 bg-[#121212] border border-stone-700 p-1.5 text-xs text-white focus:outline-none focus:border-[#C8102E]"
                          />
                        </div>
                      )}

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCreatingNew(false)}
                          className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-4 py-2 text-xs border border-stone-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#C8102E] hover:bg-[#A60C24] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider border border-[#C8102E]"
                        >
                          Save Item to Menu
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Menu Items List */}
                  {filteredMenuItems.length === 0 ? (
                    <div className="p-8 text-center text-stone-500 text-xs border border-dashed border-stone-800">
                      No menu items match your search.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredMenuItems.map(item => (
                        <div
                          key={item.id}
                          className="bg-[#121212] border border-stone-800 p-3 flex gap-3 hover:border-stone-700 transition-colors"
                        >
                          <div className="w-20 h-20 bg-stone-900 overflow-hidden border border-stone-800 shrink-0 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h5 className="font-serif font-bold text-xs text-white truncate">{item.name}</h5>
                                <span className="font-mono font-bold text-xs text-[#E5383B] shrink-0">
                                  {item.price.toLocaleString()} RWF
                                </span>
                              </div>

                              <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-stone-800/80 text-[10px]">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="bg-stone-800 text-stone-300 px-1.5 py-0.5 uppercase font-mono text-[9px]">
                                  {item.category}
                                </span>
                                {item.isChefSpecial && (
                                  <span className="bg-[#C8102E] text-white px-1.5 py-0.5 font-bold text-[9px]">
                                    CHEF
                                  </span>
                                )}
                                {item.isMondayBurgerPromo && (
                                  <span className="bg-amber-600 text-white px-1.5 py-0.5 font-bold text-[9px]">
                                    PROMO
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleEditMenuForm(item)}
                                  className="text-stone-400 hover:text-white p-1"
                                  title="Edit Dish"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="text-stone-500 hover:text-red-400 p-1"
                                  title="Delete Dish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
