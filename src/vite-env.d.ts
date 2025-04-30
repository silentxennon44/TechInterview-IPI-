/// <reference types="vite/client" />

type Product = {
  id: bigint;
  name: string;
  description: string;
  category: string; // You can adjust this to include more categories
  price: float;
  sizes: string[]; // S, M, L, XL, etc.
  colors: string[]; // Array of color strings
  material: string;
  gender: string; // You can expand this as needed
  stock: number;
  brand: string;
  discount: smallint;
  isOnSale: boolean; // It's better to use boolean instead of a string
  isHot: boolean;
  tags: string[]; // Array of tags like "Casual", "Basic"
  images: string[]; // Array of image URLs
  thumbnail: string; // URL of the thumbnail image
  sales?: number;
  featured?: boolean;
  created_at: Date;
};