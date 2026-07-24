import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from '../data/cravingCornerData';
import { MenuItem } from '../types';

export interface PreOrderItem {
  id: string;
  name: string;
  quantity: number;
  priceRWF: number;
}

export interface TableReservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  seatingArea: string; // e.g. "Indoor Main Dining", "Terrace Lounge", "Romantic Garden", "VIP Corner"
  specialNotes?: string;
  preOrderedItems?: PreOrderItem[];
  preOrderTotalRWF?: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface EventBooking {
  id: string;
  eventType: string;
  customerName: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  selectedAddons: string[];
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface FoodOrder {
  id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  deliveryZone: string;
  paymentMethod: string;
  items: {
    name: string;
    portion?: string;
    options?: string[];
    quantity: number;
    totalRWF: number;
  }[];
  subtotalRWF: number;
  deliveryFeeRWF: number;
  grandTotalRWF: number;
  status: 'Pending' | 'In Preparation' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const STORAGE_KEYS = {
  TABLES: 'craving_corner_table_reservations',
  EVENTS: 'craving_corner_event_bookings',
  ORDERS: 'craving_corner_food_orders',
  MENU: 'craving_corner_custom_menu_items',
};

// Seed Data initialized as empty so the app starts clean and new
const SEED_TABLES: TableReservation[] = [];
const SEED_EVENTS: EventBooking[] = [];
const SEED_ORDERS: FoodOrder[] = [];

// Helper functions for persistent storage
export const getStoredTables = (): TableReservation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TABLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(SEED_TABLES));
      return SEED_TABLES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_TABLES;
  }
};

export const saveTableReservation = (data: Omit<TableReservation, 'id' | 'createdAt' | 'status'>): TableReservation => {
  const current = getStoredTables();
  const newReservation: TableReservation = {
    ...data,
    id: `TB-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newReservation, ...current];
  localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(updated));
  return newReservation;
};

export const updateTableStatus = (id: string, status: TableReservation['status']) => {
  const current = getStoredTables();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(updated));
  return updated;
};

export const deleteTableReservation = (id: string) => {
  const current = getStoredTables();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(updated));
  return updated;
};

// Event Bookings
export const getStoredEvents = (): EventBooking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(SEED_EVENTS));
      return SEED_EVENTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_EVENTS;
  }
};

export const saveEventBooking = (data: Omit<EventBooking, 'id' | 'createdAt' | 'status'>): EventBooking => {
  const current = getStoredEvents();
  const newBooking: EventBooking = {
    ...data,
    id: `EV-${Math.floor(200 + Math.random() * 800)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newBooking, ...current];
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updated));
  return newBooking;
};

export const updateEventStatus = (id: string, status: EventBooking['status']) => {
  const current = getStoredEvents();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updated));
  return updated;
};

export const deleteEventBooking = (id: string) => {
  const current = getStoredEvents();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updated));
  return updated;
};

// Food Orders
export const getStoredOrders = (): FoodOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
};

export const saveFoodOrder = (data: Omit<FoodOrder, 'id' | 'createdAt' | 'status'>): FoodOrder => {
  const current = getStoredOrders();
  const newOrder: FoodOrder = {
    ...data,
    id: `ORD-${Math.floor(300 + Math.random() * 700)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newOrder, ...current];
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  return newOrder;
};

export const updateOrderStatus = (id: string, status: FoodOrder['status']) => {
  const current = getStoredOrders();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  return updated;
};

export const deleteFoodOrder = (id: string) => {
  const current = getStoredOrders();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  return updated;
};

export const clearAllStoreData = () => {
  localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
};

// Menu Management Functions
export const getStoredMenuItems = (): MenuItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENU);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
      return DEFAULT_MENU_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return parsed.length > 0 ? parsed : DEFAULT_MENU_ITEMS;
  } catch {
    return DEFAULT_MENU_ITEMS;
  }
};

export const saveMenuItem = (item: MenuItem): MenuItem[] => {
  const current = getStoredMenuItems();
  const existingIdx = current.findIndex(m => m.id === item.id);
  let updated: MenuItem[];
  if (existingIdx > -1) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(updated));
  return updated;
};

export const deleteMenuItem = (id: string): MenuItem[] => {
  const current = getStoredMenuItems();
  const updated = current.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(updated));
  return updated;
};

export const resetMenuItemsToDefault = (): MenuItem[] => {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
  return DEFAULT_MENU_ITEMS;
};
