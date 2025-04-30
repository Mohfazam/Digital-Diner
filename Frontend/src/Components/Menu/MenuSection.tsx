import { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from './index';
import { fetchMenuItems } from './api';

interface MenuSectionProps {
  onAddToCart: (item: MenuItemType) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } finally {
        setIsLoading(false);
      }
    };
    loadMenu();
  }, []);

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Our Menu</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 h-48 rounded-xl mb-4 animate-pulse" />
              <div className="h-4 bg-amber-100 rounded-full w-3/4 mb-3" />
              <div className="h-4 bg-amber-100 rounded-full w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map(item => (
            <MenuItem key={item._id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;