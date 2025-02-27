import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();

  // Calculate Total Price
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col  p-16">
      <h1 className=" text-3xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between py-2 border-b">
                <div>
                  <p className="text-black font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            onClick={clearCart}
          >
            Checkout
          </button>
        </>
      )}

      <Link to="/products" className="mt-4 block text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;