// src/components/SubNavbar.tsx
// This component renders the sub-navigation bar

import React from 'react';

interface SubNavbarProps {
  isDarkMode: boolean;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ isDarkMode }) => {
  return (
    <div className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-700 text-white'}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-200">Free Shipping</a>
          <a href="#" className="hover:text-blue-200">Weekly Releases</a>
          <a href="#" className="hover:text-blue-200">Track My Order</a>
        </div>
        <div>
          <a href="#" className="hover:text-blue-200">Sign Up & Save 20% on First Order</a>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;