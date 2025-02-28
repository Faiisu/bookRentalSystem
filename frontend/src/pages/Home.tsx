import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center text-center p-6 gap-16">
      {/* ✅ Hero Section */}
      <section className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to Our Store</h1>
        <p className="text-lg text-gray-600 mb-6">
          これはウェブサイトのテスト用のランダムな日本語の文章です。文字の表示やフォントの確認に使用できます。
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6">
          <div className="speech-bubble flex items-center justify-center">
            <Link
              to="/products"
              className="relative px-6 py-3 text-black font-bold text-lg rounded-lg transition-all duration-300 
                        before:absolute before:left-1/2 before:top-1/2 before:w-0 before:h-0 before:bg-black 
                        before:transition-all before:duration-300 hover:before:w-full hover:before:h-full 
                        before:opacity-50 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2"
            >
              Trending
            </Link>
          </div>
          <div className="speech-bubble flex items-center justify-center">
            <Link
              to="/new"
              className="px-6 py-3 text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition"
            >
              NEW!
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Featured Products Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Product Cards (Replace with real data) */}
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold">Product 1</h3>
            <p className="text-gray-600">$49.99</p>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold">Product 2</h3>
            <p className="text-gray-600">$79.99</p>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold">Product 3</h3>
            <p className="text-gray-600">$99.99</p>
          </div>
        </div>
      </section>

      {/* ✅ Popular Write Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Testimonial 1 */}
          <div className="border p-4 rounded-lg shadow-md">
            <p className="text-gray-600 italic">"Amazing quality! The best purchase I've made in years."</p>
            <p className="text-gray-800 font-bold mt-2">- John Doe</p>
          </div>
          {/* Testimonial 2 */}
          <div className="border p-4 rounded-lg shadow-md">
            <p className="text-gray-600 italic">"Fast shipping and great customer support. Highly recommend!"</p>
            <p className="text-gray-800 font-bold mt-2">- Jane Smith</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;