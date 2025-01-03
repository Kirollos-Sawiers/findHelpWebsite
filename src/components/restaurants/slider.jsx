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

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const ImageSlider = ({ images, interval = 3000 }) => {
  return (
    <div className="w-full relative">
      <Swiper
        centeredSlides={true}
        loop={true}
        spaceBetween={30}
        slideToClickedSlide={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          1920: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        className=""
        style={{
          '--swiper-pagination-color': '#4F46E5',
          '--swiper-pagination-bullet-inactive-color': '#4F46E5',
        }}
      >
        {images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <img className="w-[100%] h-[80%] " src={slide?.image?.url} alt="slides"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider;
