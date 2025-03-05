import Yokoso from "../../../assets/homepagepic/Yokoso1.jpg";

const Slide1 = () => {
  return (
    <div className=" grid grid-cols-3 items-center w-full h-[500px] px-10 ">
      
{/* ✅ Left Side - Overlaying Column 2 */}
<div className="relative z-10  flex flex-col justify-self-end self-start urchin-bubble col-start-1 row-start-1 text-black text-right text-3xl mt-4 -mr-12">
  <h2>Wel-</h2>
  <h2>come...</h2>
</div>

      {/* ✅ Center - Image (Perfectly Centered) */}
      <div 
        className=" w-full h-[700px] bg-center bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url(${Yokoso})` }}
      ></div>

      {/* ✅ Right Side - Text */}
      <div className="border-black border-4 w-[400px] h-[500px] justify-self-center align-self-center font-animeace text-black text-center text-7xl font-bold">
        <h2>...TO</h2>
        <p>OUR</p>
        <p>BOOK</p>
        <p>STORE!</p>

        {/* ✅ Additional Small Paragraph */}
        <p className="text-xl font-normal mt-4">Discover a world of stories, knowledge, and adventure waiting for you!</p>
      </div>

    </div>
  );
};

export default Slide1;