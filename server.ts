import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from './src/data/cravingCornerData';
import type { MenuItem } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TableReservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  seatingArea: string;
  specialNotes?: string;
  preOrderedItems?: Array<{ id: string; name: string; quantity: number; priceRWF: number }>;
  preOrderTotalRWF?: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface EventBooking {
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

interface FoodOrder {
  id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  deliveryZone: string;
  paymentMethod: string;
  items: Array<{ name: string; portion?: string; options?: string[]; quantity: number; totalRWF: number }>;
  subtotalRWF: number;
  deliveryFeeRWF: number;
  grandTotalRWF: number;
  status: 'Pending' | 'In Preparation' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface AdminDataStore {
  tables: TableReservation[];
  events: EventBooking[];
  orders: FoodOrder[];
  menuItems: MenuItem[];
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'admin-data.json');

app.use(express.json());

// Initialize Gemini API client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize Gemini AI client:', err);
  }
}

// System Instruction for Craving Corner Concierge
const CRAVING_CORNER_SYSTEM_PROMPT = `You are "Craving Bot", the friendly, knowledgeable, and polite AI concierge for Craving Corner Restaurant & Cafe located in Gisozi, Kigali, Rwanda.

RESTAURANT DETAILS:
- Name: Craving Corner Restaurant & Cafe
- Location: 33H5+8WW, Umurava, Ruhango, Gisozi, Gasabo, Kigali City, Rwanda. Right along the main road next to the Gisozi Rubis Gas Station.
- Phone & WhatsApp: +250 791 393 785
- Instagram: @cravingcorner_gisozi
- Opening Hours: Open 24 hours a day, 7 days a week (24/7).
- Weekly Promotion: Every single Monday features the Monday Burger Promo with discounted prices on all signature burgers (e.g. Signature Beef Burger for 4,500 RWF instead of 6,500 RWF).

MENU & PRICING (in RWF - Rwandan Francs):
1. Shared Platters:
   - Large mixed variety platter for 5 people: 30,000 RWF (Includes mixed grilled meats, chicken legs, beef ribs, pilau rice, fries, plantains, dips).
   - Mid-sized shared platter (3-4 people): 25,000 RWF.
   - Budget-friendly combo platter (2-3 people): 20,000 RWF.
2. Main Courses:
   - Craving Corner Steak: 12,000 RWF
   - Slow-Cooked Beef Ribs: 11,000 RWF
   - Aromatic Beef Curry: 9,500 RWF
   - Chicken Cordon Bleu: 11,500 RWF
   - Captain Fillet Fish: 12,500 RWF
   - Beef Stroganoff: 10,000 RWF
   - Crispy Fried Chicken Legs: 8,500 RWF
3. Rice Corner:
   - Aromatic Beef Pilau: Full portion 7,000 RWF / Half portion 4,000 RWF
   - Mushroom Fried Rice: Full portion 6,500 RWF / Half portion 3,800 RWF
4. Fast Food & Snacks:
   - Fresh Chicken Shawarma: 5,000 RWF
   - Triple Decker Club Sandwich: 6,500 RWF
   - Crispy Fish Fingers: 6,000 RWF
   - Creamy Vegetable Pasta: 7,000 RWF
   - Large Beef Burgers: 6,500 RWF (Monday Promo: 4,500 RWF)
   - Custom Pizzas: 9,000 RWF (Meat Lovers, Margherita, Chicken & Mushroom, Veggie Supreme)
5. Specialty Drinks:
   - "Blue Mountain" Iced Signature Drink: 4,500 RWF
   - "Mango Madness" Iced Signature Drink: 4,500 RWF
   - Artisanal Mocktails (Virgin Mojito, Hibiscus Passion): 4,000 RWF
   - Craft Coffee (Espresso, Cappuccino, Spiced Latte): 3,000 RWF

AMENITIES & LOGISTICS:
- Delivery: Runs a centralized delivery service across all neighborhoods in Kigali.
- Parking: Dedicated free parking lot + free street parking slots.
- Accessibility: Wheelchair-accessible restroom and step-free entrance.
- Payments: Traditional credit cards, debit cards, and local NFC Mobile Money (MTN MoMo *182#, Airtel Money).
- Event Services: Hosts marriage proposals & romantic dates, birthday parties, graduation celebrations, intimate civil wedding receptions with custom decor packages.

YOUR GOALS:
1. Provide enthusiastic, helpful, and clear food and drink recommendations.
2. Calculate total order estimates when users ask for group meals (e.g. recommending the 30,000 RWF platter for 5 people).
3. Answer any questions about location (next to Rubis Gas Station in Gisozi), 24/7 hours, delivery across Kigali, and event decoration bookings.
4. Keep responses warm, concise, well-structured, and formatted with clean bullet points or line breaks. Always quote prices in RWF.`;

function createDefaultStore(): AdminDataStore {
  return {
    tables: [],
    events: [],
    orders: [],
    menuItems: DEFAULT_MENU_ITEMS,
  };
}

function readAdminStore(): AdminDataStore {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(createDefaultStore(), null, 2));
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<AdminDataStore>;
    return {
      tables: parsed.tables || [],
      events: parsed.events || [],
      orders: parsed.orders || [],
      menuItems: parsed.menuItems || DEFAULT_MENU_ITEMS,
    };
  } catch (error) {
    console.warn('Failed to read admin data store:', error);
    return createDefaultStore();
  }
}

function writeAdminStore(store: AdminDataStore) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
  } catch (error) {
    console.warn('Failed to write admin data store:', error);
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'Craving Corner Restaurant & Cafe', location: 'Gisozi, Kigali' });
});

app.get('/api/admin/data', (req, res) => {
  const store = readAdminStore();
  res.json(store);
});

app.post('/api/admin/tables', (req, res) => {
  const { action, data } = req.body as { action?: string; data?: any };
  const store = readAdminStore();

  if (action === 'create') {
    const newReservation: TableReservation = {
      ...data,
      id: data?.id || `TB-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    store.tables = [newReservation, ...store.tables];
    writeAdminStore(store);
    return res.json(newReservation);
  }

  if (action === 'update') {
    store.tables = store.tables.map(item => item.id === data?.id ? { ...item, ...data } : item);
    writeAdminStore(store);
    return res.json(store.tables);
  }

  if (action === 'delete') {
    store.tables = store.tables.filter(item => item.id !== data?.id);
    writeAdminStore(store);
    return res.json(store.tables);
  }

  res.status(400).json({ error: 'Unsupported table action.' });
});

app.post('/api/admin/events', (req, res) => {
  const { action, data } = req.body as { action?: string; data?: any };
  const store = readAdminStore();

  if (action === 'create') {
    const booking: EventBooking = {
      ...data,
      id: data?.id || `EV-${Math.floor(200 + Math.random() * 800)}`,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    store.events = [booking, ...store.events];
    writeAdminStore(store);
    return res.json(booking);
  }

  if (action === 'update') {
    store.events = store.events.map(item => item.id === data?.id ? { ...item, ...data } : item);
    writeAdminStore(store);
    return res.json(store.events);
  }

  if (action === 'delete') {
    store.events = store.events.filter(item => item.id !== data?.id);
    writeAdminStore(store);
    return res.json(store.events);
  }

  res.status(400).json({ error: 'Unsupported event action.' });
});

app.post('/api/admin/orders', (req, res) => {
  const { action, data } = req.body as { action?: string; data?: any };
  const store = readAdminStore();

  if (action === 'create') {
    const order: FoodOrder = {
      ...data,
      id: data?.id || `ORD-${Math.floor(300 + Math.random() * 700)}`,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    store.orders = [order, ...store.orders];
    writeAdminStore(store);
    return res.json(order);
  }

  if (action === 'update') {
    store.orders = store.orders.map(item => item.id === data?.id ? { ...item, ...data } : item);
    writeAdminStore(store);
    return res.json(store.orders);
  }

  if (action === 'delete') {
    store.orders = store.orders.filter(item => item.id !== data?.id);
    writeAdminStore(store);
    return res.json(store.orders);
  }

  res.status(400).json({ error: 'Unsupported order action.' });
});

app.post('/api/admin/menu', (req, res) => {
  const { action, data } = req.body as { action?: string; data?: any };
  const store = readAdminStore();

  if (action === 'create') {
    const item = data as MenuItem;
    const existingIdx = store.menuItems.findIndex(m => m.id === item.id);
    if (existingIdx > -1) {
      store.menuItems = [...store.menuItems];
      store.menuItems[existingIdx] = item;
    } else {
      store.menuItems = [item, ...store.menuItems];
    }
    writeAdminStore(store);
    return res.json(store.menuItems);
  }

  if (action === 'delete') {
    store.menuItems = store.menuItems.filter(item => item.id !== data?.id);
    writeAdminStore(store);
    return res.json(store.menuItems);
  }

  if (action === 'reset') {
    store.menuItems = DEFAULT_MENU_ITEMS;
    writeAdminStore(store);
    return res.json(store.menuItems);
  }

  res.status(400).json({ error: 'Unsupported menu action.' });
});

app.post('/api/admin/clear', (req, res) => {
  const store = createDefaultStore();
  writeAdminStore(store);
  res.json({ ok: true });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!ai) {
      // Fallback if GEMINI_API_KEY is missing or client failed to init
      return res.json({
        reply: `Welcome to Craving Corner Restaurant & Cafe in Gisozi! We are open 24/7 next to Gisozi Rubis Gas Station (+250 791 393 785). You can explore our menu above, order online for Kigali delivery, or book an event!`
      });
    }

    // Build chat conversation context
    const contents: any[] = [];
    
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: h.text }] });
        } else if (h.sender === 'assistant') {
          contents.push({ role: 'model', parts: [{ text: h.text }] });
        }
      }
    }
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: CRAVING_CORNER_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Thank you for reaching out to Craving Corner! How can we serve you today in Gisozi?";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/chat route:', error);
    res.status(500).json({ 
      error: 'An error occurred while communicating with Craving Bot.',
      fallbackReply: 'Welcome to Craving Corner Restaurant & Cafe in Gisozi! We are open 24/7. Call or WhatsApp +250 791 393 785 for instant orders or reservations!' 
    });
  }
});

// Vite middleware / static production handling
async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const shouldServeBuiltFiles = process.env.NODE_ENV === 'production' || fs.existsSync(indexPath);

  if (!shouldServeBuiltFiles) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Craving Corner server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
