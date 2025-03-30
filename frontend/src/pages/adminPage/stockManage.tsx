import { useEffect, useState } from "react";
import { Book } from "../../type";
import { fetchBooks, deleteBook, addBook, updateBook } from "../../api";
import BookFormModal from "../../components/BookFormModal";

// Custom function to validate if an ID is a valid MongoDB ObjectId (24-character hex string)
const isValidObjectId = (id: string) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  };


const StockManage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  // Fetch books from API
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        console.log("Fetched books:", data); // Debug: Log fetched books
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
        console.error("Error fetching books:", err); // Debug: Log error fetching books
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);


  const handleDelete = async (id: string) => {
    console.log("Attempting to delete book with ID:", id);  // Debug log
  
    // Validate that ID is in the correct format (24-character hex string)
    if (!isValidObjectId(id)) {
      console.error("Invalid ID format:", id);
      alert("Invalid ID format, cannot delete.");
      return;
    }
  
    // Confirm delete
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        console.log("Sending DELETE request with book ID:", id);  // Debug log
  
        // Ensure you're passing the correct URL to delete the book
        const response = await deleteBook(id);  // Correct API call to delete book
  
        if (response.status === 200) {
          // Update the state to remove the book from the list
          setBooks((prev) => prev.filter((book) => book._id !== id));  
        } else {
          console.error("Failed to delete the book. Response:", response);
        }
      } catch (err) {
        alert("Failed to delete book");
        console.error("Error deleting book:", err);  // Log error during deletion
      }
    }
  };
  const handleSave = async (book: Book) => {
    console.log("Saving book with ID:", book._id);  // Debug log to check the book ID
  
    try {
      if (editBook) {
        // Check if the book has a valid _id for updating
        if (!book._id) {
          console.error("Book does not have a valid ID for update.");
          alert("Book ID is missing for update.");
          return;
        }
  
        // Debug log for update operation
        console.log("Updating book with ID:", book._id);
  
        // Update existing book
        const updatedBook = await updateBook(book._id, book);  // Ensure the correct _id is passed
  
        // Update the state with the updated book
        setBooks((prev) =>
          prev.map((b) => (b._id === book._id ? updatedBook : b))  // Make sure to replace the updated book
        );
        console.log("Book updated successfully:", updatedBook);
      } else {
        // Add new book if it's a new book and has no _id
        console.log("Adding new book");
  
        // Ensure the book object does not contain _id for new book
        const { _id, ...newBookData } = book; // Destructure and remove _id
  
        // Add new book, MongoDB will generate the _id
        const newBook = await addBook(newBookData);  // No _id required for new book
  
        // Update the state to include the new book
        setBooks((prev) => [...prev, newBook]);
        console.log("New book added successfully:", newBook);
      }
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book");
    } finally {
      // Close the modal regardless of success or failure
      setShowModal(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
      <button
        onClick={() => { setEditBook(null); setShowModal(true); }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add Book
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">${book.price}</td>
                <td className="p-2">{book.stock}</td>
                <td className="p-2">
                  <button
                    onClick={() => { setEditBook(book); setShowModal(true); }}
                    className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                                    <button
                    onClick={() => {
                        if (book._id) {
                        handleDelete(book._id);
                        } else {
                        console.error("Book _id is missing");
                        }
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                    >
                    Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* BookFormModal will be rendered when showModal is true */}
      {showModal && (
        <BookFormModal
          book={editBook}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default StockManage;