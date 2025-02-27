import React, { useState } from "react";
import { Product } from "../types";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-72">
      <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex justify-between font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default Cart;