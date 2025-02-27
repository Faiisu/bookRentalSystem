import React from "react";

type FiltersProps = {
  onFilterChange: (category: string) => void;
  onSortChange: (sortOrder: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      {/* Category Filter */}
      <select onChange={(e) => onFilterChange(e.target.value)} className="p-2 border rounded-md">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="home">Home</option>
      </select>

      {/* Sorting Options */}
      <select onChange={(e) => onSortChange(e.target.value)} className="p-2 border rounded-md">
        <option value="">Sort By</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filters;