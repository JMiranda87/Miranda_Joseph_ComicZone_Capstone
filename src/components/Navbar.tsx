// src/components/Navbar.tsx
// This component renders the main navigation bar

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Sun, Moon, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import CartPopover from './CartPopover';
import ProfilePopover from './ProfilePopover';
import { CartItem } from '../types';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  cartItems,
  removeFromCart,
  clearCart,
  setSearchResults,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    setSearchResults([]); // Replace with actual search results
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery(''); // Clear the search query after search
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Reset cart state when menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setIsCartOpen(false);
    }
  }, [isMenuOpen]);

  return (
    <nav className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'} sticky top-0 z-50 shadow-md`}>
      {/* Promo Banner */}
      <div className="bg-yellow-400 text-blue-900 text-center py-1 text-sm font-semibold">
        🎉 Team-up & Booth #3043 at NYCC 2024! 🎉
      </div>
      
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">Comic Zone</div>
          
          {/* Search Bar for larger screens */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-grow mx-8">
            <Input 
              type="search" 
              placeholder="Search" 
              className="w-full max-w-md" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {/* Nav Items and Icons for larger screens */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#new-releases" className="hover:text-blue-200">New Releases</a>
            <a href="#back-issues" className="hover:text-blue-200">Back Issues</a>
            <a href="#variants" className="hover:text-blue-200">Variants</a>
            <a href="#clearance" className="hover:text-blue-200">Clearance</a>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="focus:outline-none p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>
              
              <ProfilePopover isDarkMode={isDarkMode} />
              <CartPopover
                isDarkMode={isDarkMode}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            </div>
          </div>
          
          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Menu */}
      {isSearchOpen && (
        <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-blue-900'}`}>
          <div className="container mx-auto px-4 py-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <Input 
                type="search" 
                placeholder="Search for comics..." 
                className={`w-full ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-blue-900 border-blue-300'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Search
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsSearchOpen(false)} 
                className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-current`}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-blue-900'}`}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 mt-8">
              <a href="#new-releases" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>New Releases</a>
              <a href="#back-issues" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Back Issues</a>
              <a href="#variants" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Variants</a>
              <a href="#clearance" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Clearance</a>
              <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-200'} />
              <div className="flex flex-col space-y-4 mt-4">
                <Button onClick={toggleTheme} variant="ghost" className="justify-start">
                  {isDarkMode ? <Sun className="mr-2 h-6 w-6" /> : <Moon className="mr-2 h-6 w-6" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <ProfilePopover isDarkMode={isDarkMode} isMobile={true} />
                {isCartOpen ? (
                  <CartPopover
                    isDarkMode={isDarkMode}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    isMobile={true}
                  />
                ) : (
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingCart className="mr-2 h-6 w-6" />
                    Cart ({totalItems})
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;