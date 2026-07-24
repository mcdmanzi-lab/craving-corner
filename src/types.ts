export type MenuCategory = 
  | 'all'
  | 'platters'
  | 'mains'
  | 'rice'
  | 'fast_food'
  | 'drinks';

export interface PortionOption {
  name: string; // e.g. "Full Portion" or "Half Portion"
  price: number; // price in RWF
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number; // base price in RWF
  image: string;
  isPopular?: boolean;
  isMondayBurgerPromo?: boolean;
  mondayPromoPrice?: number;
  isChefSpecial?: boolean;
  portions?: PortionOption[];
  customizableOptions?: string[]; // e.g. for pizzas or burgers
  servingSize?: string; // e.g. "Serves 5 people", "3-4 people"
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedPortion?: PortionOption;
  selectedOptions?: string[];
  notes?: string;
}

export interface KigaliZone {
  name: string;
  feeRWF: number;
  estMinutes: string;
}

export type PaymentMethod = 'momo' | 'airtel' | 'card' | 'cash_on_delivery';

export type EventType = 
  | 'proposal'
  | 'birthday'
  | 'graduation'
  | 'civil_wedding'
  | 'romantic_date'
  | 'group_gathering';

export interface EventBookingData {
  eventType: EventType;
  customerName: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  decorPackage: 'standard' | 'deluxe' | 'romantic' | 'custom';
  selectedPlatter?: string;
  specialRequests?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestedItems?: MenuItem[];
}
