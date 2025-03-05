import SlidingTemplate from "../../components/SlidingTemplate";
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";

const Slides = [ <Slide1 />, <Slide2 />, <Slide3 />]
const Home = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center text-center p-6 gap-16">
        <SlidingTemplate slides={Slides} />

      {/* ✅ Other Home Page Content */}
      <section className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Product 1", "Product 2", "Product 3"].map((product, i) => (
            <div key={i} className="border p-4 rounded-lg shadow-md">
              <img src="https://via.placeholder.com/150" alt={product} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{product}</h3>
              <p className="text-gray-600">${(i + 1) * 50}.99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;