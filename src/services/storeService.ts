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
  seatingArea: string;
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

const SEED_TABLES: TableReservation[] = [];
const SEED_EVENTS: EventBooking[] = [];
const SEED_ORDERS: FoodOrder[] = [];

const isBrowser = typeof window !== 'undefined' && typeof window.fetch === 'function';

function getLocalStorageItem(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return window.localStorage.getItem(key);
}

function setLocalStorageItem(key: string, value: unknown) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!isBrowser) return null;

  try {
    const response = await fetch(path, {
      headers: { 'Accept': 'application/json' },
      ...init,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchJsonWithFallback<T>(path: string, init: RequestInit | undefined, fallback: T): Promise<T> {
  const result = await fetchJson<T>(path, init);
  return result ?? fallback;
}

export const getStoredTables = async (): Promise<TableReservation[]> => {
  const result = await fetchJsonWithFallback<{ tables: TableReservation[] }>('/api/admin/data', undefined, { tables: [] });
  if (result?.tables) {
    return result.tables;
  }

  try {
    const raw = getLocalStorageItem(STORAGE_KEYS.TABLES);
    if (!raw) {
      setLocalStorageItem(STORAGE_KEYS.TABLES, SEED_TABLES);
      return SEED_TABLES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_TABLES;
  }
};

export const saveTableReservation = async (data: Omit<TableReservation, 'id' | 'createdAt' | 'status'>): Promise<TableReservation> => {
  const result = await fetchJson<TableReservation>('/api/admin/tables', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', data }),
  });

  if (result) {
    return result;
  }

  const current = await getStoredTables();
  const newReservation: TableReservation = {
    ...data,
    id: `TB-${Math.floor(100 + Math.random() * 900)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newReservation, ...current];
  setLocalStorageItem(STORAGE_KEYS.TABLES, updated);
  return newReservation;
};

export const updateTableStatus = async (id: string, status: TableReservation['status']): Promise<TableReservation[]> => {
  const result = await fetchJson<TableReservation[]>('/api/admin/tables', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', data: { id, status } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredTables();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  setLocalStorageItem(STORAGE_KEYS.TABLES, updated);
  return updated;
};

export const deleteTableReservation = async (id: string): Promise<TableReservation[]> => {
  const result = await fetchJson<TableReservation[]>('/api/admin/tables', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', data: { id } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredTables();
  const updated = current.filter(item => item.id !== id);
  setLocalStorageItem(STORAGE_KEYS.TABLES, updated);
  return updated;
};

export const getStoredEvents = async (): Promise<EventBooking[]> => {
  const result = await fetchJsonWithFallback<{ events: EventBooking[] }>('/api/admin/data', undefined, { events: [] });
  if (result?.events) {
    return result.events;
  }

  try {
    const raw = getLocalStorageItem(STORAGE_KEYS.EVENTS);
    if (!raw) {
      setLocalStorageItem(STORAGE_KEYS.EVENTS, SEED_EVENTS);
      return SEED_EVENTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_EVENTS;
  }
};

export const saveEventBooking = async (data: Omit<EventBooking, 'id' | 'createdAt' | 'status'>): Promise<EventBooking> => {
  const result = await fetchJson<EventBooking>('/api/admin/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', data }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredEvents();
  const newBooking: EventBooking = {
    ...data,
    id: `EV-${Math.floor(200 + Math.random() * 800)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newBooking, ...current];
  setLocalStorageItem(STORAGE_KEYS.EVENTS, updated);
  return newBooking;
};

export const updateEventStatus = async (id: string, status: EventBooking['status']): Promise<EventBooking[]> => {
  const result = await fetchJson<EventBooking[]>('/api/admin/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', data: { id, status } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredEvents();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  setLocalStorageItem(STORAGE_KEYS.EVENTS, updated);
  return updated;
};

export const deleteEventBooking = async (id: string): Promise<EventBooking[]> => {
  const result = await fetchJson<EventBooking[]>('/api/admin/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', data: { id } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredEvents();
  const updated = current.filter(item => item.id !== id);
  setLocalStorageItem(STORAGE_KEYS.EVENTS, updated);
  return updated;
};

export const getStoredOrders = async (): Promise<FoodOrder[]> => {
  const result = await fetchJsonWithFallback<{ orders: FoodOrder[] }>('/api/admin/data', undefined, { orders: [] });
  if (result?.orders) {
    return result.orders;
  }

  try {
    const raw = getLocalStorageItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      setLocalStorageItem(STORAGE_KEYS.ORDERS, SEED_ORDERS);
      return SEED_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
};

export const saveFoodOrder = async (data: Omit<FoodOrder, 'id' | 'createdAt' | 'status'>): Promise<FoodOrder> => {
  const result = await fetchJson<FoodOrder>('/api/admin/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', data }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredOrders();
  const newOrder: FoodOrder = {
    ...data,
    id: `ORD-${Math.floor(300 + Math.random() * 700)}`,
    status: 'Pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const updated = [newOrder, ...current];
  setLocalStorageItem(STORAGE_KEYS.ORDERS, updated);
  return newOrder;
};

export const updateOrderStatus = async (id: string, status: FoodOrder['status']): Promise<FoodOrder[]> => {
  const result = await fetchJson<FoodOrder[]>('/api/admin/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', data: { id, status } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredOrders();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  setLocalStorageItem(STORAGE_KEYS.ORDERS, updated);
  return updated;
};

export const deleteFoodOrder = async (id: string): Promise<FoodOrder[]> => {
  const result = await fetchJson<FoodOrder[]>('/api/admin/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', data: { id } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredOrders();
  const updated = current.filter(item => item.id !== id);
  setLocalStorageItem(STORAGE_KEYS.ORDERS, updated);
  return updated;
};

export const clearAllStoreData = async (): Promise<void> => {
  await fetchJson('/api/admin/clear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  setLocalStorageItem(STORAGE_KEYS.TABLES, []);
  setLocalStorageItem(STORAGE_KEYS.EVENTS, []);
  setLocalStorageItem(STORAGE_KEYS.ORDERS, []);
};

export const getStoredMenuItems = async (): Promise<MenuItem[]> => {
  const result = await fetchJsonWithFallback<{ menuItems: MenuItem[] }>('/api/admin/data', undefined, { menuItems: [] });
  if (result?.menuItems) {
    return result.menuItems;
  }

  try {
    const raw = getLocalStorageItem(STORAGE_KEYS.MENU);
    if (!raw) {
      setLocalStorageItem(STORAGE_KEYS.MENU, DEFAULT_MENU_ITEMS);
      return DEFAULT_MENU_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return parsed.length > 0 ? parsed : DEFAULT_MENU_ITEMS;
  } catch {
    return DEFAULT_MENU_ITEMS;
  }
};

export const saveMenuItem = async (item: MenuItem): Promise<MenuItem[]> => {
  const result = await fetchJson<MenuItem[]>('/api/admin/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', data: item }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredMenuItems();
  const existingIdx = current.findIndex(m => m.id === item.id);
  let updated: MenuItem[];
  if (existingIdx > -1) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [item, ...current];
  }
  setLocalStorageItem(STORAGE_KEYS.MENU, updated);
  return updated;
};

export const deleteMenuItem = async (id: string): Promise<MenuItem[]> => {
  const result = await fetchJson<MenuItem[]>('/api/admin/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', data: { id } }),
  });
  if (result) {
    return result;
  }

  const current = await getStoredMenuItems();
  const updated = current.filter(m => m.id !== id);
  setLocalStorageItem(STORAGE_KEYS.MENU, updated);
  return updated;
};

export const resetMenuItemsToDefault = async (): Promise<MenuItem[]> => {
  const result = await fetchJson<MenuItem[]>('/api/admin/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reset' }),
  });
  if (result) {
    return result;
  }

  setLocalStorageItem(STORAGE_KEYS.MENU, DEFAULT_MENU_ITEMS);
  return DEFAULT_MENU_ITEMS;
};
