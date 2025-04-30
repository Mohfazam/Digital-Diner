import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from './index';
import { fetchMenuItems } from './api';

interface MenuSectionProps {
  onAddToCart: (item: MenuItemType) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err) {
        setError('Failed to load menu. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadMenu();
  }, []);

  return (
    <div className="lg:col-span-2">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Culinary Experience
          <span className="block mt-1 h-1 w-16 bg-amber-600 rounded-full"></span>
        </h2>
        
        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${
                  selectedCategory === category 
                    ? 'bg-white text-amber-600 shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 p-6 rounded-2xl text-center space-y-4">
          <div className="text-red-600 text-4xl">⚠️</div>
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Content Grid */}
      {!error && (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              ))
            ) : filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 space-y-4"
              >
                <div className="text-gray-400 text-6xl">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  No items in this category
                </h3>
                <p className="text-gray-500">
                  Our chefs are preparing something special. Check back soon!
                </p>
              </motion.div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <MenuItem 
                    item={item}
                    onAddToCart={onAddToCart}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default MenuSection;