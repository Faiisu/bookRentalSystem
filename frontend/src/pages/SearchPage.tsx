import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookGrid from "../components/BookGrid"; 
import { Book } from "../type"

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || ""; // ✅ Trim & lowercase query
  const [books, setBooks] = useState<Book[]>([]); // ✅ Define Book[] type
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch all books once when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8000/books"); // ✅ Updated endpoint
        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        setBooks(data.books || []); // ✅ Store all books
      } catch (err) {
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Apply search filter locally instead of making API calls
  useEffect(() => {
    if (!query) {
      setFilteredBooks(books); // ✅ Show all books if no search query
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );

      setFilteredBooks(filtered);
    }
  }, [query, books]); // ✅ Runs when query or books change

  return (
    <div className="w-screen min-h-screen pt-20 px-6">
      <h2 className="text-2xl font-bold">Search results for "{query}"</h2>

      {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error message */}
      {loading ? <p>Loading...</p> : <BookGrid books={filteredBooks} />}

      {!loading && filteredBooks.length === 0 && !error && (
        <p className="text-gray-500">No books found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;