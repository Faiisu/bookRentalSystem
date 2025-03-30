import SlidingTemplate from "../../components/SlidingTemplate";
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import { useEffect, useState } from "react";
import { fetchBestSellingBooks } from "../../api";
import { Book } from "../../type";

const Slides = [<Slide1 />, <Slide2 />, <Slide3 />];

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBestSellingBooks();
      console.log("📚 fetched books:", data); // ✅ ดูใน console
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center text-center p-6 gap-16">
      <SlidingTemplate slides={Slides} />

      {/* ✅ Top 3 Manga Section */}
      <section className="w-full max-w-5xl">
  <h2 className="text-4xl font-bold text-gray-800 mb-6">Top 3 Manga</h2>

  {books.length === 0 ? (
    <p className="text-gray-500">Loading or no manga found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md">
          <img
            src={book.image_url || "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-gray-600">${book.price.toFixed(2)}</p>
          {book.sold_count !== undefined && (
            <p className="text-sm text-gray-500">{book.sold_count} sold</p>
          )}
        </div>
      ))}
    </div>
  )}
</section>
    </div>
  );
};

export default Home;