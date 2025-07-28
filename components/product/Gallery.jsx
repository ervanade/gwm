"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const galleryImages = [
  { src: "/assets/cars/h6/h6-green-front.png", type: "exterior" },
  { src: "/assets/cars/h6/h6-green-side.png", type: "exterior" },
  { src: "/assets/cars/h6/h6-green-rear.png", type: "exterior" },
  { src: "/assets/cars/h6/h6-interior-1.png", type: "interior" },
  { src: "/assets/cars/h6/h6-interior-2.png", type: "interior" },
  { src: "/assets/cars/h6/h6-interior-3.png", type: "interior" },
];

const tabs = ["all", "exterior", "interior"];

export function Gallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredImages = useMemo(() => {
    return activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.type === activeTab);
  }, [activeTab]);

  // Reset index to 0 on tab change
  useEffect(() => {
    setActiveIndex(0);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  }, [activeTab]);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-bold text-left mb-6 lg:mb-12">GALLERY</h2>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 uppercase font-medium text-sm md:text-base cursor-pointer ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Swiper */}
      <div className="relative w-full rounded-lg overflow-hidden mb-6 group">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="h-full w-full"
          key={activeTab}
        >
          {filteredImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="aspect-[16/9] md:aspect-[1920/800] relative w-full">
                <Image
                  src={img.src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover w-full rounded-lg"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <button
          ref={prevRef}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 shadow p-2 rounded-full group-hover:opacity-100 opacity-100 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <button
          ref={nextRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 shadow rounded-full group-hover:opacity-100 opacity-100 transition"
        >
          <FaChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto">
        {filteredImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              if (swiperInstance) swiperInstance.slideTo(idx);
            }}
            className={`w-20 h-12 lg:w-28 lg:h-16 border rounded-md overflow-hidden cursor-pointer ${
              activeIndex === idx
                ? "border-primary opacity-100"
                : "border-gray-300 opacity-70"
            }`}
          >
            <Image
              src={img.src}
              alt={`Thumbnail ${idx}`}
              width={160}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
