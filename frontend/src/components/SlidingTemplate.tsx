import { useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlidingTemplateProps {
  slides: ReactNode[];
}

const SlidingTemplate: React.FC<SlidingTemplateProps> = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const autoSlideTimeout = setTimeout(() => {
      handleNext();
    }, 3000);
    return () => clearTimeout(autoSlideTimeout);
  }, [index]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 300);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  };

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute w-full h-full transition-transform duration-500 ${
              i === index ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* ✅ Navigation Arrows */}
      <button 
        className="absolute left-6 z-20 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
        onClick={handlePrev}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      <button 
        className="absolute right-6 z-20 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
        onClick={handleNext}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* ✅ Dots Indicator */}
      <div className="absolute bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-black" : "bg-gray-500"
            } transition-all duration-300`}
          ></button>
        ))}
      </div>

    </section>
  );
};

export default SlidingTemplate;