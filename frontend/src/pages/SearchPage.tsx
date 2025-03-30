import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookGrid from "../components/BookGrid"; 
import { Book } from "../type";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ State สำหรับ checkbox filter
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // ✅ ดึงข้อมูลหนังสือจาก backend
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8000/books");
        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        setBooks(data.books || []);
      } catch (err) {
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ จัดการเมื่อเปลี่ยน category
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // ✅ Apply filter จาก search + checkbox
  useEffect(() => {
    let result = books;

    if (query) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    setFilteredBooks(result);
  }, [query, books, selectedCategories]);

  return (
    <div className="w-screen min-h-screen pt-20 px-6">
      <h2 className="text-2xl font-bold mb-4">Search results for "{query}"</h2>

      <div className="flex gap-6">
        {/* ✅ Sidebar Filter */}
        <aside className="w-64 border-r pr-4">
          <h3 className="font-semibold mb-3 text-lg">Filter by Category</h3>
          <div className="space-y-2">
            {["Action", "Fantasy", "Romance", "Shonen", "Mystery", "Horror"].map((cat) => (
              <label key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* ✅ Book Results */}
        <main className="flex-1">
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <BookGrid books={filteredBooks} />
              {!filteredBooks.length && (
                <p className="text-gray-500 mt-4">
                  No books found for "{query}".
                </p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;