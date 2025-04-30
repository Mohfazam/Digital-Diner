import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, ShoppingBag, X, Lock, Utensils } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import CartItem from './CartItem';
import AuthModal from './AuthModal';
import { fetchMenuItems, placeOrder, addMenuItem } from './api';
import { MenuItem as MenuItemType, CartItem as CartItemType, AddItemForm } from './index';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [addItemForm, setAddItemForm] = useState<AddItemForm>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'Main Courses'
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const adminStatus = localStorage.getItem('admin') === 'true';
      setIsAdmin(adminStatus);
      if (!token) setShowAuthModal(true);
    };

    checkAuth();
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        toast.error('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };
    loadMenuItems();
  }, []);

  // Cart Handlers
  const handleAddToCart = (item: MenuItemType) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      return existing 
        ? prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  // Order Handling
  const handlePlaceOrder = async () => {
    if (!localStorage.getItem('token')) {
      setShowAuthModal(true);
      return;
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await placeOrder(
        phoneNumber, 
        cartItems, 
        cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      );
      setCartItems([]);
      setPhoneNumber('');
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  // Admin Functions
  const toggleAdminMode = () => {
    if (isAdmin) {
      localStorage.removeItem('admin');
      setIsAdmin(false);
      toast.success('Admin mode disabled');
    } else {
      navigate('/adminlogin');
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = await addMenuItem({
        name: addItemForm.name,
        category: addItemForm.category,
        price: addItemForm.price,
        description: addItemForm.description,
        image: addItemForm.image
      });
      setMenuItems(prev => [...prev, newItem]);
      setShowAddItemModal(false);
      setAddItemForm({ 
        name: '', 
        price: 0, 
        description: '', 
        image: '', 
        category: 'Main Courses' 
      });
      toast.success(`${addItemForm.name} added to menu`);
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Utensils className="text-amber-600" />
            The Digital Diner
          </h1>
          <button
            onClick={toggleAdminMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isAdmin 
                ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700' 
                : 'bg-white text-gray-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isAdmin ? 'Admin Mode' : 'Enable Admin'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Section */}
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
                <MenuItem
                  key={item._id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <ShoppingBag className="text-amber-600 w-6 h-6" />
            Your Order
            <span className="text-sm text-amber-600 ml-auto">({cartItems.length} items)</span>
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                  />
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold text-amber-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl mb-4 focus:ring-2 focus:ring-amber-500 bg-gray-50/50"
                />

                <button
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-br from-amber-600 to-amber-700 text-white py-3 rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddItemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Add Menu Item</h3>
                <button 
                  onClick={() => setShowAddItemModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMenuItem} className="p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    required
                    value={addItemForm.name}
                    onChange={e => setAddItemForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-gray-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={addItemForm.price}
                      onChange={e => setAddItemForm(prev => ({ ...prev, price: +e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      required
                      value={addItemForm.category}
                      onChange={e => setAddItemForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl bg-gray-50/50"
                    >
                      <option value="Appetizers">Appetizers</option>
                      <option value="Main Courses">Main Courses</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={addItemForm.description}
                    onChange={e => setAddItemForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-gray-50/50"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    value={addItemForm.image}
                    onChange={e => setAddItemForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-gray-50/50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddItemModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-xl hover:shadow-lg"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setShowAuthModal(false)}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1f2937',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '16px'
          },
          iconTheme: {
            primary: '#d97706',
            secondary: '#fff',
          }
        }}
      />

      {isAdmin && (
        <motion.button
          onClick={() => setShowAddItemModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-amber-600 to-amber-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
        >
          <PlusCircle size={24} />
          <span className="text-sm font-medium hidden sm:inline">Add Item</span>
        </motion.button>
      )}
    </div>
  );
};

export default MenuPage;