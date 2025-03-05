import React from "react";
import { Book } from "../type";
import { Link } from "react-router-dom";

const BookCard: React.FC<Book> = ({ _id, title, price, image_url }) => {
  return (
    <div className="border-3 p-4 shadow hover:shadow-lg transition-transform hover:scale-105 text-black rounded-md">
      <Link to={`/books/${_id}`} className="block w-full h-full">
        {/* Book Image */}
        <img src={image_url} alt={title} className="w-full h-40 object-cover rounded-md" />

        {/* Book Details */}
        <div className="mt-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-black text-sm">Price: ${price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;