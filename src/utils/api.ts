// src/utils/api.ts
// This file contains utility functions for API calls

import { Comic } from '../types';

// Simulated API call
export const fetchComics = (section: string): Promise<Comic[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: `${section} Comic 1`, image: "/placeholder.svg?height=200&width=150", price: 3.99, originalPrice: section === 'Clearance' ? 9.99 : undefined },
        { id: 2, title: `${section} Comic 2`, image: "/placeholder.svg?height=200&width=150", price: 4.99, originalPrice: section === 'Clearance' ? 12.99 : undefined },
        { id: 3, title: `${section} Comic 3`, image: "/placeholder.svg?height=200&width=150", price: 5.99, originalPrice: section === 'Clearance' ? 14.99 : undefined },
        { id: 4, title: `${section} Comic 4`, image: "/placeholder.svg?height=200&width=150", price: 3.49, originalPrice: section === 'Clearance' ? 8.99 : undefined },
        { id: 5, title: `${section} Comic 5`, image: "/placeholder.svg?height=200&width=150", price: 6.99, originalPrice: section === 'Clearance' ? 15.99 : undefined },
        { id: 6, title: `${section} Comic 6`, image: "/placeholder.svg?height=200&width=150", price: 4.49, originalPrice: section === 'Clearance' ? 11.99 : undefined },
        { id: 7, title: `${section} Comic 7`, image: "/placeholder.svg?height=200&width=150", price: 5.49, originalPrice: section === 'Clearance' ? 13.99 : undefined },
        { id: 8, title: `${section} Comic 8`, image: "/placeholder.svg?height=200&width=150", price: 3.99, originalPrice: section === 'Clearance' ? 9.99 : undefined },
        { id: 9, title: `${section} Comic 9`, image: "/placeholder.svg?height=200&width=150", price: 7.99, originalPrice: section === 'Clearance' ? 17.99 : undefined },
        { id: 10, title: `${section} Comic 10`, image: "/placeholder.svg?height=200&width=150", price: 4.99, originalPrice: section === 'Clearance' ? 12.99 : undefined },
        { id: 11, title: `${section} Comic 11`, image: "/placeholder.svg?height=200&width=150", price: 6.49, originalPrice: section === 'Clearance' ? 14.99 : undefined },
        { id: 12, title: `${section} Comic 12`, image: "/placeholder.svg?height=200&width=150", price: 5.99, originalPrice: section === 'Clearance' ? 13.99 : undefined },
      ]);
    }, 1000);
  });
};