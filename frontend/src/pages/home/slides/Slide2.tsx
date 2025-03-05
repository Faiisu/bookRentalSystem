import Takamura from "../../../assets/homepagepic/Takamura.jpg";

const Slide2 = () => {
  return (
    <div className="flex w-full h-[400px] px-10 items-center">
      {/* ✅ Left Side - Text (Centered in the Available Space) */}
      <div className="flex flex-col flex-grow justify-center items-center text-black font-animeace text-2xl font-bold">
        <h2 className="!text-7xl speech-bubble">Big Discounts</h2>
        <p>Save up to 50% on our best-selling items!</p>
      </div>

      {/* ✅ Right Side - Image (Fixed Size to Prevent Growth) */}
      <div 
        className="w-[400px] h-[700px] bg-center bg-cover transition-none"
        style={{ backgroundImage: `url(${Takamura})` }}
      ></div>
    </div>
  );
};

export default Slide2;