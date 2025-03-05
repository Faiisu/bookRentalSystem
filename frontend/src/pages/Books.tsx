import { useEffect, useState } from "react";
import { fetchBooks } from "../api"; // ✅ Updated API import
import { Book } from "../type"; // ✅ Ensure the correct type import
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import BookGrid from "../components/BookGrid";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]); // ✅ Changed products → books
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchBooks().then((data) => {
      console.log("Books received in Books.tsx:", data); // ✅ Debugging log
      setBooks(data);
      setFilteredBooks(data);
    });
  }, []);

  useEffect(() => {
    let updatedBooks = [...books];

    if (searchQuery) {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) // ✅ Changed `name` → `title`
      );
    }

    if (categoryFilter) {
      updatedBooks = updatedBooks.filter((book) => book.category === categoryFilter);
    }

    if (sortOrder === "low-high") {
      updatedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      updatedBooks.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(updatedBooks);
  }, [searchQuery, categoryFilter, sortOrder, books]);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col items-center justify-start pt-16">
      <div className="bg-white text-black p-6 r shadow-md">
        <SearchBar onSearch={setSearchQuery} />
        <Filters onFilterChange={setCategoryFilter} onSortChange={setSortOrder} />
      </div>
      <div className="flex-grow mt-6">
        <BookGrid books={filteredBooks} />
      </div>
    </div>
  );
};

export default Books;