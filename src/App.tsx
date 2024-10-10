// src/App.tsx
// This is the main component that renders the entire application

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import SupportButton from './components/SupportButton';
import { Comic, CartItem } from './types';
import { fetchComics } from './utils/api';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [newReleases, setNewReleases] = useState<Comic[]>([]);
  const [recommended, setRecommended] = useState<Comic[]>([]);
  const [backIssues, setBackIssues] = useState<Comic[]>([]);
  const [variants, setVariants] = useState<Comic[]>([]);
  const [clearance, setClearance] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Comic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [newReleasesData, recommendedData, backIssuesData, variantsData, clearanceData] = await Promise.all([
        fetchComics('New Releases'),
        fetchComics('Recommended'),
        fetchComics('Back Issues'),
        fetchComics('Variants'),
        fetchComics('Clearance')
      ]);
      setNewReleases(newReleasesData);
      setRecommended(recommendedData);
      setBackIssues(backIssuesData);
      setVariants(variantsData);
      setClearance(clearanceData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (comic: Comic) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === comic.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === comic.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...comic, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-blue-900'}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        setSearchResults={setSearchResults}
      />
      <SubNavbar isDarkMode={isDarkMode} />
      <MainContent
        isDarkMode={isDarkMode}
        loading={loading}
        searchResults={searchResults}
        newReleases={newReleases}
        recommended={recommended}
        backIssues={backIssues}
        variants={variants}
        clearance={clearance}
        addToCart={addToCart}
      />
      <Footer isDarkMode={isDarkMode} />
      <SupportButton isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;