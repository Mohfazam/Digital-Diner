import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem as MenuItemType } from './index';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img 
          src={item.image || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          alt={item.name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-amber-600 font-bold">${item.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem