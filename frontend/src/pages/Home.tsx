import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" w-screen h-screen bg-gray-100 flex flex-col items-center text-center p-6">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4"> Welcome to Our Store</h1>
        <p className="text-lg text-gray-600 mb-6">
        これはウェブサイトのテスト用のランダムな日本語の文章です。文字の表示やフォントの確認に使用できます。
        </p>
        
        {/* Navigation Buttons */}
        <div className=" flex justify-center gap-6">
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
      </div>
      
    </div>
  );
};

export default Home;