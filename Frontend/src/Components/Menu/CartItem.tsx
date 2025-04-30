import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from './index';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={item.image || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-gray-800">{item.name}</h4>
          <button 
            onClick={() => onRemove(item._id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-amber-600 font-medium mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
            className="w-6 h-6 flex items-center justify-center text-gray-500 border border-gray-200 rounded-full hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="mx-2 text-gray-800 w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center text-gray-500 border border-gray-200 rounded-full hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem