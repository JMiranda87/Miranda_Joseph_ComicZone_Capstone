// src/components/ComicSection.tsx
// This component renders a section of comics

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Comic } from '../types';

interface ComicSectionProps {
  title: string;
  comics: Comic[];
  isDarkMode: boolean;
  addToCart: (comic: Comic) => void;
}

const ComicSection: React.FC<ComicSectionProps> = ({ title, comics, isDarkMode, addToCart }) => {
  const [visibleRows, setVisibleRows] = useState(1);
  const maxRows = 3;
  const comicsPerRow = 4;
  const visibleComics = comics.slice(0, visibleRows * comicsPerRow);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleVisibleRows = () => {
    if (visibleRows < maxRows) {
      setVisibleRows(prev => prev + 1);
    } else {
      setVisibleRows(1);
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={sectionRef} className={`mb-12 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleComics.map((comic) => (
          <Card key={comic.id} className={`${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-blue-200'} hover:shadow-lg transition-shadow duration-300`}>
            <CardHeader className={isDarkMode ? 'bg-gray-600' : 'bg-blue-100'}>
              <CardTitle className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>{comic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={comic.image} alt={comic.title} className="w-full h-auto" />
            </CardContent>
            <CardFooter className={`flex flex-col items-start ${isDarkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
              <div className="w-full flex justify-between items-center mb-2">
                <span className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>${comic.price.toFixed(2)}</span>
                {comic.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${comic.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <Button 
                onClick={() => addToCart(comic)}
                className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95`}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {comics.length > comicsPerRow && (
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={toggleVisibleRows} 
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {visibleRows < maxRows ? (
              <>View More <ChevronRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>View Less <ChevronUp className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default ComicSection;