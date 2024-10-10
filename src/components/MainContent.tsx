// src/components/MainContent.tsx
// This component renders the main content of the application

import React from 'react';
import ComicSection from './ComicSection';
import { Comic } from '../types';

interface MainContentProps {
  isDarkMode: boolean;
  loading: boolean;
  searchResults: Comic[];
  newReleases: Comic[];
  recommended: Comic[];
  backIssues: Comic[];
  variants: Comic[];
  clearance: Comic[];
  addToCart: (comic: Comic) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  isDarkMode,
  loading,
  searchResults,
  newReleases,
  recommended,
  backIssues,
  variants,
  clearance,
  addToCart,
}) => {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {loading ? (
        <div className="text-center py-12">Loading comics...</div>
      ) : searchResults.length > 0 ? (
        <ComicSection title="Search Results" comics={searchResults} isDarkMode={isDarkMode} addToCart={addToCart} />
      ) : (
        <>
          <ComicSection title="New Releases" comics={newReleases} isDarkMode={isDarkMode} addToCart={addToCart} />
          <ComicSection title="Recommended for You" comics={recommended} isDarkMode={isDarkMode} addToCart={addToCart} />
          <ComicSection title="Back Issues" comics={backIssues} isDarkMode={isDarkMode} addToCart={addToCart} />
          <ComicSection title="Variants" comics={variants} isDarkMode={isDarkMode} addToCart={addToCart} />
          <ComicSection title="Clearance" comics={clearance} isDarkMode={isDarkMode} addToCart={addToCart} />
        </>
      )}
    </main>
  );
};

export default MainContent;