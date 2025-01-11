import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ImageSlider = ({
  images,
  interval = 3000,
  width= "[100%]",
  height = "[50%]",
  isRTL = "false",
}) => {
  return (
    <div className="w-full relative m-3" dir={isRTL ? "rtl" : "ltr"}>
      <Swiper
        centeredSlides={true}
        loop={true}
        spaceBetween={10}
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
            spaceBetween: 10,
          },
          1020: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          900: {
            slidesPerView:3,
            spaceBetween: 10,
          },
        }}
        className=""
        style={{
          "--swiper-pagination-color": "#f0a835",
          "--swiper-pagination-bullet-inactive-color": "#f0a835",
        }}
        dir={isRTL ? "rtl" : "ltr"}
        rtl={isRTL}
      >
        {images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`bg-indigo-50 rounded-2xl w-[100%] h-auto flex justify-center items-center`}>
              <img
                className={`w-${width} h-${height} object-cover rounded-lg`}
                src={slide?.image?.url}
                alt="slides"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
