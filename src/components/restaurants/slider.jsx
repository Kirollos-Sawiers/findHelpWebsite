import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

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
        autoplay={{
          delay: interval,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
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
          '--swiper-pagination-color': '#f0a835',
          '--swiper-pagination-bullet-inactive-color': '#f0a835',
        }}
      >
        {images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <img className="w-[100%] h-[80%] object-contain rounded-lg" src={slide?.image?.url} alt="slides"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider