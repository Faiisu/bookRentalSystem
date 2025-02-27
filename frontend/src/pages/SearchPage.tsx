import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://localhost:8000/products?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="w-screen min-h-screen pt-20 px-6">
      <h2 className="text-2xl font-bold">Search results for "{query}"</h2>
      {loading ? <p>Loading...</p> : <ProductGrid products={products} />}
    </div>
  );
};

export default SearchPage;