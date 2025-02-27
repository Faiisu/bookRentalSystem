import React from "react";

const Checkout = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p>Complete your order</p>
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        Place Order
      </button>
    </div>
  );
};

export default Checkout;