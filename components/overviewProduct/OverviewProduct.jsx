"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Pagination if you want dots
import { FaChevronRight } from "react-icons/fa"; // Import the chevron icon

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination"; // Uncomment if you use Pagination module
const highlightProductsData = [
  {
    id: 1,
    type: "square",
    mainTitle: "HAVAL",
    subTitle: "JOLION ULTRA",
    buttonText: "JOLION ULTRA",
    image: "/assets/h-jolion.png", // Make sure this path exists
    link: "#", // Replace with actual link
  },
  {
    id: 2,
    type: "square",
    mainTitle: "HAVAL",
    subTitle: "H6 HEV",
    buttonText: "H6 HEV",
    image: "/assets/h-havalh6.png", // Make sure this path exists
    link: "#",
  },
  {
    id: 3,
    type: "square",
    mainTitle: "ORA",
    subTitle: "O3 BEV",
    buttonText: "ORA O3 BEV",
    image: "/assets/h-ora.png", // Make sure this path exists
    link: "#",
  },
  {
    id: 4,
    type: "wide",
    mainTitle: "TANK",
    subTitle: "TANK 300",
    buttonText: "TANK 300",
    image: "/assets/h-tank300.png", // Make sure this path exists
    link: "#",
  },
  {
    id: 5,
    type: "wide",
    mainTitle: "TANK",
    subTitle: "TANK 500",
    buttonText: "TANK 500",
    image: "/assets/h-tank500.png", // Make sure this path exists
    link: "#",
  },
];
const OverviewProduct = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderProductCard = (product, index) => {
    const isSquare = product.type === "square";
    const imageComponent = (
      <Image
        src={product.image}
        alt={product.mainTitle + " " + product.subTitle}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
        priority={index < 3} // Preload first 3 images
      />
    );

    return (
      <div
        key={product.id}
        className={`relative overflow-hidden rounded-lg group ${
          isSquare
            ? "aspect-[1/1] md:aspect-[1/1]"
            : "aspect-[1/1] md:h-[384px] w-full"
        }`}
      >
        {imageComponent}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>{" "}
        {/* Overlay for text readability */}
        <div className="absolute top-6 left-6 text-white">
          <p className="text-base font-light">{product.mainTitle}</p>
          <h4 className="text-2xl font-bold leading-tight">
            {product.subTitle}
          </h4>
        </div>
        <a
          href={product.link}
          className="absolute bottom-5 right-4 flex items-center text-white text-lg font-semibold hover:text-sky-400 transition-colors"
        >
          {product.buttonText} <FaChevronRight className="ml-2 text-sm" />
        </a>
      </div>
    );
  };

  return (
    <div className="w-full   text-dark">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-12 md:pb-16">
        {/* Mobile Slider (Swiper) */}
        {isMobile ? (
          <Swiper
            className="h-auto overflow-hidden relative cursor-grab"
            slidesPerView={1.2} // Show 1.2 slides on mobile
            spaceBetween={16} // Gap 16px
            modules={[Navigation, Pagination]} // Add Pagination for dots if desired
            navigation={true} // Enable navigation arrows
            // pagination={{ clickable: true }} // Enable pagination dots
            breakpoints={{
              // Adjust for smaller mobile screens if needed
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
            }}
          >
            {highlightProductsData.map((product, index) => (
              <SwiperSlide key={product.id}>
                {renderProductCard(product, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Desktop Grid Layout
          <div className="grid grid-cols-1 gap-4">
            {" "}
            {/* Main grid for rows */}
            {/* First Row: 3 Images (Square Ratio) */}
            <div className="grid grid-cols-3 gap-4">
              {" "}
              {/* Grid for 3 items */}
              {highlightProductsData
                .slice(0, 3)
                .map((product, index) => renderProductCard(product, index))}
            </div>
            {/* Second Row: 2 Images (Non-Square, Fixed Height) */}
            <div className="grid grid-cols-2 gap-4">
              {" "}
              {/* Grid for 2 items, mt-4 for gap between rows */}
              {highlightProductsData.slice(3, 5).map(
                (product, index) => renderProductCard(product, index + 3) // Adjust index for priority if needed
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto w-full text-black" id="hero">
        {/* Hero Desktop */}
        <div className="">
          {/* <Link href={item?.link}> */}
          <div className="w-full relative h-[70vh] cursor-pointer">
            <Image
              src={`/assets/highlight1.png`}
              alt={"T-Space Hero"}
              layout="fill" // Membuat gambar memenuhi kontainer
              objectFit="cover" // Menjaga rasio aspek dan memotong bagian luar
              objectPosition="center" // Memusatkan gambar
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50" /> */}

            <div className="absolute top-[35%] left-0 right-0">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-2 items-center justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] text-center md:items-start md:text-left">
                  <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                    HAVAL JOLION HEV
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                    Dilengkapi 20 fitur ADAS, terbanyak di kelasnya, dengan
                    layar sentuh multimedia 12,3 inci dan panel instrumen LCD 7
                    inci.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/+6281181110556"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="button"
                      className="bg-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white"
                    >
                      Discover More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewProduct;
