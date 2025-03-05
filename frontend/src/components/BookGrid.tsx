import React from "react";
import { Book } from "../type"; // ✅ Ensure correct type import
import BookCard from "./ProductCard"; // ✅ Import BookCard

const BookGrid: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book._id} {...book} /> // ✅ Pass book data to BookCard
      ))}
    </div>
  );
};

export default BookGrid;