// src/types.ts
// This file contains type definitions used throughout the application

export type Comic = {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
};

export type CartItem = Comic & { quantity: number };