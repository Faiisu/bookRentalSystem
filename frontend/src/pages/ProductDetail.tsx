import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api"; // ✅ Use correct API function
import { Product } from "../type";
import { useCartStore } from "../store/cartStore";

const ProductDetail = () => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  useEffect(() => {
    if (!id) return; // ✅ Avoid undefined errors
    fetchProduct(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="w-screen min-h-screen p-8 max-w-4xl mx-auto">
      <img  alt={product.name} className="w-full h-80 object-cover rounded-lg shadow-md"/>
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-black-600 text-lg">${product.price}</p>
      <p className="text-black-500 mt-2">{product.category}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;