import { CartItem as CartItemType } from './index';
import {ShoppingBag} from "lucide-react"
import CartItem from './CartItem';

interface CartSectionProps {
  cartItems: CartItemType[];
  cartTotal: number;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  handlePlaceOrder: () => void;
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleRemoveFromCart: (id: string) => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  cartItems,
  cartTotal,
  phoneNumber,
  setPhoneNumber,
  handlePlaceOrder,
  handleUpdateQuantity,
  handleRemoveFromCart
}) => (
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
);

export default CartSection;