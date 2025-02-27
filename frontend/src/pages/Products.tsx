import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import { Product } from "../type";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      updatedProducts = updatedProducts.filter((product) => product.category === categoryFilter);
    }

    if (sortOrder === "low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, categoryFilter, sortOrder, products]);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col items-center justify-start pt-16">
      <div className=" bg-white text-black p-6 r shadow-md">
        <SearchBar onSearch={setSearchQuery} />
        <Filters onFilterChange={setCategoryFilter} onSortChange={setSortOrder} />
      </div>
      <div className=" flex-grow mt-6">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
