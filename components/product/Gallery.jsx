"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const galleryImages = [
  "/assets/cars/h6/h6-green-front.png",
  "/assets/cars/h6/h6-green-side.png",
  "/assets/cars/h6/h6-green-rear.png",
];

export function Gallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-bold text-left mb-12">GALLERY</h2>

      {/* Main Image with Navigation */}
      <div className="relative w-full aspect-[16/8] rounded-lg overflow-hidden mb-6 group">
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation={{
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover w-full h-full rounded-lg"
                sizes="100vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <button className="cursor-pointer gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 shadow p-2 rounded-full group-hover:opacity-100 opacity-0 transition">
          <FaChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <button className="cursor-pointer gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 shadow rounded-full group-hover:opacity-100 opacity-0 transition">
          <FaChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={12}
        slidesPerView={3}
        watchSlidesProgress
        className="w-full"
      >
        {galleryImages.map((img, idx) => (
          <SwiperSlide key={idx} className="!w-32 !h-20 cursor-pointer">
            <div
              className={`rounded-lg overflow-hidden w-full h-full border-2 ${
                activeIndex === idx
                  ? "border-primary opacity-100"
                  : "border-gray-300 opacity-70"
              } transition-all`}
            >
              <Image
                src={img}
                alt={`Thumb ${idx}`}
                width={160}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
