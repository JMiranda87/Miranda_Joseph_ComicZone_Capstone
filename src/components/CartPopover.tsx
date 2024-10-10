// src/components/CartPopover.tsx
// This component renders the cart popover

import React from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CartItem } from '../types';

interface CartPopoverProps {
  isDarkMode: boolean;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isMobile?: boolean;
}

const CartPopover: React.FC<CartPopoverProps> = ({
  isDarkMode,
  cartItems,
  removeFromCart,
  clearCart,
  isMobile = false,
}) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const content = (
    <div className="grid gap-4 p-4">
      <div className="space-y-2">
        <h4 className={`font-semibold text-xl ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>Your Cart</h4>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
          {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
        </p>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className={`flex justify-between items-center py-3 border-b ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}>
            <div className="flex items-center">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded mr-3" />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}>{item.title}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.title} from cart`}
              className={isDarkMode ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-600' : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100'}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className={`flex justify-between items-center pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}>
        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}>Total:</p>
        <p className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <Button className={`${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} flex-grow mr-2`}>Checkout</Button>
        <Button 
          variant="outline" 
          className={isDarkMode ? 'bg-gray-600 text-gray-100 hover:bg-gray-500' : 'bg-white text-blue-800 hover:bg-blue-100'}
          onClick={clearCart}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        {content}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          className="focus:outline-none transition-transform hover:scale-110 relative"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
              {totalItems}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-96 p-0 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;