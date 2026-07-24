import { MenuItem, KigaliZone } from '../types';

export const RESTAURANT_INFO = {
  name: 'Craving Corner Restaurant & Cafe',
  tagline: 'East African Staples, Continental Mains, Fast Food & Artisanal Drinks',
  address: '33H5+8WW, Umurava, Ruhango, Gisozi, Gasabo, Kigali City, Rwanda',
  landmark: 'Positioned right along the main road next to the Gisozi Rubis Gas Station',
  phone: '+250 791 393 785',
  whatsappRaw: '250791393785',
  instagram: 'https://www.instagram.com/craving_corner_resto_and_cafe/',
  instagramHandle: '@craving_corner_resto_and_cafe',
  hours: 'Open 24 Hours a Day, 7 Days a Week (24/7)',
  weeklyPromotion: 'Every Single Monday: Monday Burger Promo with discounted prices on all signature burgers!',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=33H5%2B8WW+Umurava+Gisozi+Kigali',
  amenities: [
    { title: '24/7 Operation', desc: 'Open 24 hours daily for breakfast, lunch, late-night cravings & coffee', icon: 'Clock' },
    { title: 'Wheelchair Accessible', desc: 'Step-free entrance and fully accessible restroom facilities', icon: 'Accessibility' },
    { title: 'Dedicated Free Parking', desc: 'On-site free parking lot plus additional free street parking slots', icon: 'Car' },
    { title: 'Kigali-Wide Delivery', desc: 'Fast centralized delivery dispatch dropping orders anywhere across Kigali', icon: 'Truck' },
    { title: 'Flexible Payments', desc: 'MTN Mobile Money (*182#), Airtel Money, Credit & Debit Cards, NFC', icon: 'CreditCard' },
    { title: 'Event Space', desc: 'Hosts proposals, birthday parties, graduations & civil wedding receptions', icon: 'Calendar' }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Shared Platters
  {
    id: 'platter-large',
    name: 'Large Mixed Variety Platter (Serves 5)',
    category: 'platters',
    description: 'Our signature grand platter loaded with mixed grilled meats, juicy chicken legs, beef ribs, pilau rice, crispy potato wedges, plantains, fresh salads and custom house dips.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isChefSpecial: true,
    servingSize: 'Perfect for 5 People'
  },
  {
    id: 'platter-mid',
    name: 'Mid-Sized Shared Platter (Serves 3-4)',
    category: 'platters',
    description: 'Generous combination of grilled steak strips, chicken shawarma slices, fish fingers, seasoned french fries, and artisanal dipping sauces.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Ideal for 3-4 People'
  },
  {
    id: 'platter-combo',
    name: 'Budget-Friendly Combo Platter',
    category: 'platters',
    description: 'Great value platter featuring mini beef burgers, crispy fried chicken wings, french fries, samosas, and garlic mayo.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Ideal for 2-3 People'
  },

  // Main Courses
  {
    id: 'main-steak',
    name: 'Craving Corner Steak',
    category: 'mains',
    description: 'Prime cut tender beef steak cooked to perfection, served with garlic herb butter, sautéed vegetables, and your choice of french fries or mashed potatoes.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    isPopular: true
  },
  {
    id: 'main-ribs',
    name: 'Slow-Cooked Beef Ribs',
    category: 'mains',
    description: 'Tender beef ribs glazed in house BBQ sauce, served with coleslaw and crispy golden fries.',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-curry',
    name: 'Aromatic Beef Curry',
    category: 'mains',
    description: 'Rich East African style beef curry simmered in coconut milk, fresh ginger, garlic, and aromatic spices. Served with steamed rice or chapati.',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-cordon-bleu',
    name: 'Chicken Cordon Bleu',
    category: 'mains',
    description: 'Succulent chicken breast stuffed with savory ham and melted cheese, breaded and fried to golden perfection.',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-captain-fish',
    name: 'Captain Fillet Fish',
    category: 'mains',
    description: 'Pan-seared lake fish fillet with lemon garlic butter sauce, served with tartar sauce, grilled vegetables and parsley rice.',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-stroganoff',
    name: 'Beef Stroganoff',
    category: 'mains',
    description: 'Tender beef strips in a creamy mushroom and Dijon mustard sauce served over buttered rice or pasta.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-chicken-legs',
    name: 'Crispy Fried Chicken Legs',
    category: 'mains',
    description: 'Double-breaded seasoned chicken legs fried crisp and juicy, served with seasoned fries and house spicy sauce.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },

  // Rice Corner
  {
    id: 'rice-pilau',
    name: 'Aromatic Beef Pilau',
    category: 'rice',
    description: 'Traditional East African spiced rice slow-cooked with tender beef chunks, cumin, cardamom, and onions. Served with kachumbari salad.',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    portions: [
      { name: 'Full Portion', price: 7000 },
      { name: 'Half Portion', price: 4000 }
    ]
  },
  {
    id: 'rice-mushroom',
    name: 'Mushroom Fried Rice',
    category: 'rice',
    description: 'Fragrant wok-fried jasmine rice with fresh button mushrooms, spring onions, garlic, and light soy sauce.',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    portions: [
      { name: 'Full Portion', price: 6500 },
      { name: 'Half Portion', price: 3800 }
    ]
  },

  // Fast Food & Snacks
  {
    id: 'ff-burger',
    name: 'Craving Corner Signature Large Beef Burger',
    category: 'fast_food',
    description: '100% juicy beef patty, melted cheddar, crispy bacon, lettuce, tomato, caramelized onions & house burger sauce on a toasted sesame brioche bun. Special Monday discount available!',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isMondayBurgerPromo: true,
    mondayPromoPrice: 4500,
    customizableOptions: ['Extra Cheese (+500 RWF)', 'Double Patty (+2,000 RWF)', 'Extra Bacon (+1,000 RWF)', 'Jalapeños']
  },
  {
    id: 'ff-shawarma',
    name: 'Fresh Chicken Shawarma',
    category: 'fast_food',
    description: 'Marinated shaved chicken, pickled vegetables, fries, and garlic toum sauce wrapped inside warm Lebanese flatbread.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'ff-club-sandwich',
    name: 'Triple Decker Club Sandwich',
    category: 'fast_food',
    description: 'Toasted bread layers filled with grilled chicken, fried egg, crispy bacon, lettuce, tomato, and mayo. Served with french fries.',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-fish-fingers',
    name: 'Crispy Fish Fingers',
    category: 'fast_food',
    description: 'Golden-breaded lake fish fillets served with homemade tartar sauce and lemon wedges.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-veg-pasta',
    name: 'Creamy Vegetable Pasta',
    category: 'fast_food',
    description: 'Penne pasta tossed with zucchini, bell peppers, sweet corn, and garlic in a rich herb parmesan cream sauce.',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281216?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-custom-pizza',
    name: 'Craving Custom Pizza',
    category: 'fast_food',
    description: 'Fresh hand-stretched artisan dough topped with rich tomato sauce and mozzarella. Choose your favorite style & custom toppings.',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    customizableOptions: ['Meat Lovers (Beef, Chicken, Sausage)', 'Margherita Classic', 'Chicken & Mushroom', 'Veggie Supreme', 'Extra Mozzarella (+1,000 RWF)']
  },

  // Drinks
  {
    id: 'drink-blue-mountain',
    name: '"Blue Mountain" Iced Signature Drink',
    category: 'drinks',
    description: 'Craving Corner signature refresher layered with blue curaçao syrup, coconut water, fresh lime, and crushed ice.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    isPopular: true
  },
  {
    id: 'drink-mango-madness',
    name: '"Mango Madness" Iced Signature Drink',
    category: 'drinks',
    description: 'Blend of fresh Rwandan tropical mangoes, passionfruit, mint leaves, and ice topped with sparkling soda.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4172?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'drink-mocktails',
    name: 'Artisanal Mocktail (Virgin Mojito / Hibiscus Passion)',
    category: 'drinks',
    description: 'Handcrafted non-alcoholic cocktails made with fresh muddled mint, hibiscus flower extract, lime, and cane sugar.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-craft-coffee',
    name: 'Craft Coffee Specialty (Espresso / Cappuccino / Spiced Latte)',
    category: 'drinks',
    description: 'Brewed from 100% premium Rwandan Bourbon arabica coffee beans roasted locally.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  }
];

export const KIGALI_ZONES: KigaliZone[] = [
  { name: 'Gisozi (Local Neighborhood & Rubis Gas Station Area)', feeRWF: 1000, estMinutes: '15-25 min' },
  { name: 'Kacyiru / Kagugu / Nyarutarama', feeRWF: 1500, estMinutes: '20-30 min' },
  { name: 'Kimironko / Remera / Sonatube', feeRWF: 2000, estMinutes: '25-35 min' },
  { name: 'Kiyovu / Town Center (CBD) / Muhima', feeRWF: 2000, estMinutes: '25-35 min' },
  { name: 'Nyamirambo / Gikondo / Kicukiro', feeRWF: 2500, estMinutes: '30-40 min' },
  { name: 'Kanombe / Masaka / Kibagabaga', feeRWF: 3000, estMinutes: '35-45 min' }
];

export const EVENT_DECOR_PACKAGES = [
  {
    id: 'romantic',
    title: 'Marriage Proposal & Romantic Date Setup',
    subtitle: 'Candlelight setup, floral decorations, private corner arrangement & champagne / signature mocktails',
    priceEstimate: 'From 35,000 RWF',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'birthday',
    title: 'Birthday Celebration Package',
    subtitle: 'Custom balloon arch, table decor, party favors, birthday song playlist & platter arrangement',
    priceEstimate: 'From 45,000 RWF',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'graduation',
    title: 'Graduation Party Hosting',
    subtitle: 'Reserved group seating for up to 20 guests, customized congratulatory banners & group platters',
    priceEstimate: 'From 50,000 RWF',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'civil_wedding',
    title: 'Intimate Civil Wedding Reception',
    subtitle: 'Full indoor or terrace reservation, elegant white & gold table settings, custom menu printouts & dedicated servers',
    priceEstimate: 'Custom quote based on guest count',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  }
];
