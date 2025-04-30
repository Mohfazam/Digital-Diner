// AllOrdersTab.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const AllOrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://dinerbackend.vercel.app/orders');
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <Loader className="w-8 h-8 animate-spin text-amber-600" />
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 md:px-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <motion.div
            key={order.order_id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.order_id}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-600">
                  Total: ${order.total_price}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.phone_number}
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <div className="grid gap-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.item_name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        (x{item.quantity})
                      </span>
                    </div>
                    <span className="text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllOrdersTab;