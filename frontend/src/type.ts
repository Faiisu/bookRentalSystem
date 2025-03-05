// src/types.ts
export type Product = {
    _id: string;  // ✅ Ensure it's a string (MongoDB-style)
    name: string;
    price: number;
    image?: string;
    category?: string;
    rating?: number;
  };


  export type Book = {
    _id: string; // MongoDB ObjectId stored as a string
    title: string;
    author: string;
    description?: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string;
    created_at: string; // ISO Date format
  };
  

  export type BookGridProps = {
    books: Book[];
  };