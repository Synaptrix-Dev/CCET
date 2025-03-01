import React, { useState } from "react";
import Footer from "../components/Footer";

export default function ArabicWebsite() {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex > 3) newIndex = 1;
    if (newIndex < 1) newIndex = 3;
    setSlideIndex(newIndex);
  };

  return (
    <div className="bg-white">
      {/* Slider */}
      <div className="relative top-24 bg-[#D6E8DC]">
        <div className="relative w-[1200px] bg-[#D6E8DC] h-[500px] rounded-lg mx-auto">
          {/* Slide 1 */}
          <div
            className={`${slideIndex === 1 ? "block" : "hidden"} animate-fade`}
          >
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D"
              className="w-full h-[500px] object-cover rounded-lg"
              alt="Slide 1"
            />
          </div>

          {/* Slide 2 */}
          <div
            className={`${slideIndex === 2 ? "block" : "hidden"} animate-fade`}
          >
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D"
              className="w-full h-[500px] object-cover rounded-lg"
              alt="Slide 2"
            />
          </div>

          {/* Slide 3 */}
          <div
            className={`${slideIndex === 3 ? "block" : "hidden"} animate-fade`}
          >
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nob29sfGVufDB8fDB8fHww"
              className="w-full h-[500px] object-cover rounded-lg"
              alt="Slide 3"
            />
          </div>

          {/* Navigation buttons */}
          <button
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/80 text-[#5277a4] font-bold text-2xl rounded-full flex justify-center items-center shadow-md transition-all duration-300 right-[-70px]"
            onClick={() => plusSlides(1)}
          >
            &#10095;
          </button>
          <button
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/80 text-[#5277a4] font-bold text-2xl rounded-full flex justify-center items-center shadow-md transition-all duration-300 left-[-70px]"
            onClick={() => plusSlides(-1)}
          >
            &#10094;
          </button>
        </div>
      </div>
      <Footer />
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0.4;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade {
          animation-name: fade;
          animation-duration: 1.5s;
        }
      `}</style>
    </div>
  );
}
