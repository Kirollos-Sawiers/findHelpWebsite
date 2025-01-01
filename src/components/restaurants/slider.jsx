import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(images[0].image.url)
  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(goToNext, interval); // Change slide every `interval` milliseconds
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [currentIndex]); // Re-run effect when `currentIndex` changes

  return (
    <div className="relative w-full max-w-lg mx-auto h-fit">
      {/* Image */}
      <div className="overflow-hidden rounded-lg">
        <img
        src={images[currentIndex]?.image?.url}
        alt={`Slide ${currentIndex}`}
        className="w-full h-44 object-fill transition-transform duration-500 ease-in-out transform hover:scale-105"
      />
      </div>

      {/* Navigation Buttons (Optional) */}
      {/* <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button> */}

      {/* Dots Indicator */}
      {/* <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? 'bg-black' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;