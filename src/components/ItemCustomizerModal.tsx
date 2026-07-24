import React, { useState } from 'react';
import { X, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { MenuItem, PortionOption } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedPortion?: PortionOption, selectedOptions?: string[], notes?: string) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(
    item.portions && item.portions.length > 0 ? item.portions[0] : undefined
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');

  const toggleOption = (opt: string) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter(o => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  // Price calculation
  const isMondayActive = item.isMondayBurgerPromo;
  const basePrice = isMondayActive && item.mondayPromoPrice ? item.mondayPromoPrice : item.price;
  const currentItemPrice = selectedPortion ? selectedPortion.price : basePrice;
  const totalPrice = currentItemPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedPortion, selectedOptions, specialNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121214] border border-stone-800 max-w-lg w-full overflow-hidden shadow-2xl text-[#F3F4F6] max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-stone-900/80 text-white p-2 backdrop-blur-md border border-stone-700 transition-colors hover:bg-[#C8102E]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="text-xl font-serif font-bold text-white drop-shadow-md">{item.name}</h3>
            {item.servingSize && (
              <p className="text-[#E5383B] text-xs font-semibold uppercase tracking-wider">{item.servingSize}</p>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 text-sm bg-[#121214]">
          <p className="text-stone-300 text-xs leading-relaxed">{item.description}</p>

          {/* Portion Selection (e.g. Beef Pilau / Mushroom Fried Rice) */}
          {item.portions && item.portions.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-serif font-bold text-[#E5383B] uppercase tracking-wider">
                Select Portion Size *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.portions.map(p => {
                  const isSelected = selectedPortion?.name === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPortion(p)}
                      className={`p-3 border text-left transition-all flex justify-between items-center ${
                        isSelected
                          ? 'border-[#C8102E] bg-[#C8102E]/20 text-white font-bold'
                          : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <span className="block font-serif text-xs text-stone-200">{p.name}</span>
                        <span className="text-xs text-[#E5383B] font-bold">{p.price.toLocaleString()} RWF</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#E5383B]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customizable Options (e.g. Burger toppings or Pizza flavors) */}
          {item.customizableOptions && item.customizableOptions.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-serif font-bold text-[#E5383B] uppercase tracking-wider">
                Custom Choices / Extra Toppings
              </label>
              <div className="space-y-1.5">
                {item.customizableOptions.map(opt => {
                  const isChecked = selectedOptions.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      className={`w-full p-2.5 border text-xs text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#C8102E] bg-[#C8102E]/20 text-white'
                          : 'border-stone-800 bg-[#18181B] text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 border flex items-center justify-center ${
                        isChecked ? 'bg-[#C8102E] border-[#C8102E] text-white' : 'border-stone-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-stone-400">
              Special Instructions / Dietary Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy, no onions, sauce on the side..."
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              className="w-full bg-[#18181B] border border-stone-800 px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C8102E]"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-800">
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Quantity</span>
            <div className="flex items-center gap-3 bg-[#18181B] border border-stone-800 px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-300 hover:text-[#E5383B] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-white w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-300 hover:text-[#E5383B] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 bg-[#18181B] text-white border-t border-stone-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[9px] text-stone-400 uppercase tracking-widest block font-bold">TOTAL PRICE</span>
            <span className="text-[#E5383B] font-serif font-bold text-lg">
              {totalPrice.toLocaleString()} RWF
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium px-6 py-3 uppercase tracking-wider flex items-center gap-2 text-xs transition-colors shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
