// src/types.ts
export type Product = {
    _id: string;  // ✅ Ensure it's a string (MongoDB-style)
    name: string;
    price: number;
    image?: string;
    category?: string;
    rating?: number;
  };