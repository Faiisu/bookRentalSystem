import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../api";
import { Book } from "../type";
import { useCartStore } from "../store/cartStore";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  console.log("Book ID from useParams:", id); // ✅ Debugging log

  useEffect(() => {
    if (!id) {
      console.error("Error: Book ID is undefined!"); // ✅ Log issue
      return;
    }

    fetchBook(id).then((data) => {
      if (!data) {
        console.error("Error: Book not found in API!"); // ✅ Log issue
      }
      setBook(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="w-screen min-h-screen p-8 max-w-4xl mx-auto">
      <img src={book.image_url} alt={book.title} className="w-full h-80 object-cover rounded-lg shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
      <p className="text-black-600 text-lg">${book.price.toFixed(2)}</p>
      <p className="text-black-500 mt-2">Category: {book.category}</p>
      <button
        onClick={() => addToCart(book)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookDetail;