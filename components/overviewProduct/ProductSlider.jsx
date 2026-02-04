"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

// Swiper styles
import "swiper/css";

const ProductSlider = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // ✅ proper navigation binding
  //   useEffect(() => {
  //     if (swiperInstance && prevRef.current && nextRef.current) {
  //       swiperInstance.params.navigation = {
  //         prevEl: prevRef.current,
  //         nextEl: nextRef.current,
  //       };

  //       swiperInstance.navigation.destroy();
  //       swiperInstance.navigation.init();
  //       swiperInstance.navigation.update();
  //     }
  //   }, [swiperInstance]);

  return (
    <section className="max-w-7xl mx-auto w-full py-8 xl:py-16 bg-white text-dark px-6 scroll-mt-[120px]">
      {/* TITLE */}
      <h2 className="text-[28px] lg:text-[36px] font-semibold text-center mb-10 tracking-wide">
        MODELS
      </h2>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative">
        {/* SLIDER */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.25}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={setSwiperInstance}
          breakpoints={{
            0: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.25,
              spaceBetween: 28,
            },
          }}
          className="cursor-grab"
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="group">
                {/* IMAGE */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt={`${item.mainTitle || ""} ${item.subTitle || ""}`}
                      fill
                      className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  )}

                  {/* soft premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="pt-5 flex flex-col gap-3">
                  {/* TITLE ROW */}
                  <div className="flex items-end justify-between">
                    <h3 className="text-lg lg:text-xl font-semibold tracking-wide text-dark">
                      {item.buttonText}
                    </h3>

                    <span className="text-sm text-gray-500 tracking-wide">
                      {item.subTitle}
                    </span>
                  </div>

                  {/* CTA */}
                  <div>
                    <Link
                      href={item?.link}
                      className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-dark
                      opacity-80 hover:opacity-100 transition"
                    >
                      {"Detail" || item.buttonText}
                      <FaArrowRight className="text-xs translate-y-[1px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PREMIUM CENTER ARROWS */}
        <div className="flex justify-center items-center gap-10 mt-10">
          <button
            ref={prevRef}
            className="group cursor-pointer flex items-center gap-2 text-sm tracking-widest uppercase text-gray-500 
            hover:text-dark transition"
            aria-label="Previous"
          >
            <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
            Prev
          </button>

          <div className="w-[1px] h-6 bg-gray-200" />

          <button
            ref={nextRef}
            className="group cursor-pointer flex items-center gap-2 text-sm tracking-widest uppercase text-gray-500 
            hover:text-dark transition"
            aria-label="Next"
          >
            Next
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
