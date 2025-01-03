// import React, { useState, useEffect } from 'react';

// const ImageSlider = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
// console.log(images[0].image.url)
//   // Function to go to the next slide
//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Auto-slide effect
//   useEffect(() => {
//     const timer = setInterval(goToNext, interval); // Change slide every `interval` milliseconds
//     return () => clearInterval(timer); // Cleanup timer on component unmount
//   }, [currentIndex]); // Re-run effect when `currentIndex` changes

//   return (
//     <div className="relative w-full max-w-lg mx-auto h-fit">
//       {/* Image */}
//       <div className="overflow-hidden rounded-lg">
//         <img
//         src={images[currentIndex]?.image?.url}
//         alt={`Slide ${currentIndex}`}
//         className="w-full h-44 object-fill transition-transform duration-500 ease-in-out transform hover:scale-105"
//       />
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;
import { useState, useEffect } from 'react'

export default function ImageSlider({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [currentIndex, interval])

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Slider container */}
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={image.image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover bg-[#EEF1FF] transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-indigo-600 text-2xl font-medium">
                    Slide {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-indigo-600' : 'bg-indigo-200'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}