import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { PlusCircle, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import CartItem from './CartItem';
import AuthModal from './AuthModal';
import AllOrdersTab from './AllOrdersTab';
import { MenuItem as MenuItemType, CartItem as CartItemType, AddItemForm } from './index';
import { fetchMenuItems, placeOrder, addMenuItem } from './api';

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'orders'>('menu');
  const [addItemForm, setAddItemForm] = useState<AddItemForm>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'main'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setIsLoading(true);
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        toast.error('Failed to load menu items');
        console.error('Error loading menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const handleAddToCart = (item: MenuItemType) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${item.name} to cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const handlePlaceOrder = async () => {
    if (!localStorage.getItem('Login')) {
      setShowAuthModal(true);
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    try {
      await placeOrder(phoneNumber, cartItems, totalPrice);
      setCartItems([]);
      setPhoneNumber('');
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const addedItem = await addMenuItem(addItemForm);
      setMenuItems(prev => [...prev, addedItem]);
      setShowAddItemModal(false);
      setAddItemForm({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'main'
      });
      toast.success(`${addItemForm.name} added to the menu`);
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  const toggleAdminMode = () => {
    if (isAdmin) {
      localStorage.removeItem('admin');
      setIsAdmin(false);
      toast.success('Admin mode disabled');
    } else {
      navigate('/AdminLogin');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderTabs = () => (
    <div className="flex gap-4 mb-6 px-8 border-b border-gray-100 pb-4">
      <button
        onClick={() => setActiveTab('menu')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'menu' 
            ? 'bg-amber-600 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Menu
      </button>
      
      <button
        onClick={() => setActiveTab('cart')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'cart'
            ? 'bg-amber-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Cart ({cartItems.length})
      </button>

      <button
        onClick={() => setActiveTab('orders')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'orders'
            ? 'bg-amber-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        All Orders
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Admin toggle */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={toggleAdminMode}
          className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
        >
          {isAdmin ? 'Disable Admin' : 'Enable Admin'}
        </button>
      </div>

      {renderTabs()}

      {activeTab === 'menu' && (
        <div className="flex-1 pr-0 sm:pr-[350px]">
          <div className="w-full max-w-7xl mx-auto pb-24">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 px-8">Our Menu</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
                <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Loading menu items...</p>
              </div>
            ) : menuItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
                <p className="text-gray-600 mb-4">No menu items available.</p>
                {isAdmin && (
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Add First Menu Item
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item._id} 
                    item={item} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cart' && (
        <motion.div 
          initial={{ x: 350 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-screen w-full sm:w-[350px] bg-white shadow-xl z-10 flex flex-col"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-center">Your cart is empty</p>
              <p className="text-sm text-center mt-2">Add items from the menu to get started</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {cartItems.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between text-gray-800 font-bold mb-4">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-200 rounded-lg"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={cartItems.length === 0}
              />
            </div>
            
            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className={`w-full py-3 rounded-lg font-medium ${
                cartItems.length === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              } transition-colors`}
            >
              Place Order
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'orders' && <AllOrdersTab />}

      {/* Admin Add Item Modal */}
      {showAddItemModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddItemModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Add New Menu Item</h3>
              <button 
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMenuItem} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={addItemForm.name}
                    onChange={(e) => setAddItemForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Cheeseburger"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={addItemForm.price || ''}
                    onChange={(e) => setAddItemForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="9.99"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={addItemForm.description}
                    onChange={(e) => setAddItemForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Delicious burger with cheese, lettuce, tomato, and special sauce"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={addItemForm.image}
                    onChange={(e) => setAddItemForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="https://example.com/image.jpg (Optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={addItemForm.category}
                    onChange={(e) => setAddItemForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    required
                  >
                    <option value="appetizer">Appetizer</option>
                    <option value="main">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
      
      {/* Admin Add Item Button */}
      {isAdmin && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-[calc(350px+2rem)]"
        >
          <button
            onClick={() => setShowAddItemModal(true)}
            className="bg-amber-600 text-white p-4 rounded-full shadow-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
            aria-label="Add new menu item"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </motion.div>
      )}
      
      {/* Toast notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
          },
        }} 
      />
    </div>
  );
};

export default MenuPage;