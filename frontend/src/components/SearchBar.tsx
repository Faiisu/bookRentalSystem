import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string, event?: React.FormEvent) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query, event);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl"> 
      {/* ✅ Increased width and added max-width */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
};

export default SearchBar;