import React from "react";
import { Product } from "../type";
import { Link } from "react-router-dom";

const ProductCard: React.FC<Product> = ({ _id, name, price, image }) => {
  return (
    <Link to={`/products/${_id}`} className="border-3 p-4 shadow hover:shadow-lg transition-transform hover:scale-105 text-black">
      {/* Product Image */}
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-black text-sm">Price: ${price.toFixed(2)}</p>

      </div>
    </Link>
  );
};

export default ProductCard;