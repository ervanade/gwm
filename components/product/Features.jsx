
"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { FaChevronRight, FaChevronLeft, FaChevronDown } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import parse from "html-react-parser";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";


const highlightFeaturesData = [
  {
    id: 1,
    type: "square",
    mainTitle: "PERFORMANCE",
    desc: "1.5L Turbo Hybrid Engine Producing 243 PS / 530Nm with 19.2 km/L Fuel Economy",
    image: "/assets/cars/h6/feature-1.png", // Make sure this path exists
    link: "#", // Replace with actual link
  },
  {
    id: 2,
    type: "square",
    mainTitle: "SAFETY & PLATFORM",
    desc: "Tingkatkan pengalaman berkendara Anda dengan aksesori resmi GWM yang dirancang untuk setiap model.",
    image: "/assets/cars/h6/feature-2.png", // Make sure this path exists
    link: "#",
  },
  {
    id: 3,
    type: "square",
    mainTitle: "6 AIRBAGS",
    desc: "Ensure the safety of everyone on board with 6 airbags to provide optimal protection for the driver and passengers.",
    image: "/assets/cars/h6/feature-3.png", // Make sure this path exists
    link: "#",
  },
];

const dummySpecs = [
  {
    title: "Dimensions & Weight",
    content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Length: 5070 mm</li>
          <li>Width: 1934 mm</li>
          <li>Height: 1905 mm</li>
          <li>Wheelbase: 2850 mm</li>
          <li>Kerb Weight: 2450 kg</li>
        </ul>
      `,
  },
  {
    title: "Engine & Transmission",
    content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Engine: 2.0L Turbo Petrol</li>
          <li>Transmission: 9-Speed Automatic</li>
          <li>Fuel Tank Capacity: 80 Liters</li>
          <li>Drive Type: AWD</li>
        </ul>
      `,
  },
  {
    title: "Brakes & Suspension",
    content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Front Brakes: Ventilated Disc</li>
          <li>Rear Brakes: Disc</li>
          <li>Front Suspension: Double Wishbone</li>
          <li>Rear Suspension: Multi-link</li>
        </ul>
      `,
  },
];

const Features = ({ dataFeature, dataSpec, dataHl }) => {
  const [activeIdx, setActiveIdx] = useState(null);

  const renderProductCard = (product, index) => {
    const imageComponent = (
      <Image
        src={product.image_url}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
        priority={index < 3}
      />
    );

    return (
      <div className="flex flex-col gap-4">
        <div
          key={product.id}
          className="relative overflow-hidden rounded-lg group aspect-[1/1] md:aspect-[1/1]"
        >
          {imageComponent}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <h4 className="text-base font-bold">{product.title}</h4>
        <p className="text-dark text-sm lg:text-base md:min-h-18">
          {product.description}
        </p>
      </div>
    );
  };

  const hasFeature = Array.isArray(dataFeature) && dataFeature.length > 0;
  const hasSpec = Array.isArray(dataSpec) && dataSpec.length > 0;
  const locale = useLocale();

  return (
    <div className="bg-white text-dark">
      <div
        className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16"
        id="features"
      >
        <h2 className="text-3xl font-bold mb-8 lg:mb-12">FEATURES</h2>

        <div className="relative group">
          {hasFeature ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              navigation={{
                nextEl: ".feature-next",
                prevEl: ".feature-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {dataFeature.map((feature, index) => (
                <SwiperSlide key={feature.id}>
                  {renderProductCard(feature, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-16 w-full border border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col">

              <p className="text-lg font-semibold text-gray-600 mb-2">
                Feature belum tersedia.
              </p>
                <p className="text-sm font-base text-gray-500">
                 Kami sedang menyiapkan feature untuk kendaraan ini. Silahkan cek kembali nanti.
                </p>
            </div>
          )}

          {hasFeature && (
            <>
              <button className="cursor-pointer feature-prev absolute left-0 top-2/5 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow opacity-100 transition text-primary">
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button className="cursor-pointer feature-next absolute right-0 top-2/5 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow opacity-100 transition text-primary">
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* HERO */}
      {
        dataHl ? 
        <div className="mx-auto w-full text-black" id="hero">
        <div className="">
          <div className="w-full relative h-[70vh] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/50 to-transparent z-10"></div>
            <Image
              src={dataHl?.image_hl_url || `/assets/highlight1.png`}
              alt={dataHl?.title || "GWM Hero"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute top-[35%] left-0 right-0 z-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-2 items-center justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] text-center md:items-start md:text-left">
                  <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                  {locale === "en" ? dataHl.title_en : dataHl.title}
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                  {locale === "en"
                              ? dataHl.description_en
                              : dataHl.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/test-drive"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="button"
                      className="bg-transparent hover:bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white flex items-center gap-2"
                    >
                      Test Drive
                      <FaChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      : ""
      }
    

      {/* SPECS */}
      <section id="specs" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 lg:mb-12">
          HAVAL H6 - SPECIFICATION
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          <div className="lg:w-1/2 w-full">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg relative">
              <Image
                src={dataHl?.spec_image_url || "/assets/cars/h6/h6-grey-side.png"}
                alt="Spec Illustration"
                className="rounded-lg w-full object-cover"
                sizes="100vw"
                fill
              />
            </div>
          </div>

          <div className="lg:w-1/2 w-full space-y-4">
            {hasSpec ? (
              dataSpec.map((item, i) => {
                const isOpen = activeIdx === i;
                return (
                  <div
                    key={i}
                    className="border-b border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveIdx(isOpen ? null : i)}
                      className="w-full px-5 py-4 flex justify-between items-center text-left font-medium text-gray-800 cursor-pointer"
                    >
                      {item.title}
                      <FaChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 px-5 overflow-hidden ${
                        isOpen ? "max-h-[500px] py-3" : "max-h-0"
                      }`}
                    >
                      <div className="text-sm text-gray-600">
                        {parse(item.description || "")}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 w-full border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">

                <p className="text-lg font-semibold text-gray-600 mb-2">
                  Spesifikasi belum tersedia.
                </p>
                <p className="text-sm font-base text-gray-500">
                 Kami sedang menyiapkan spesifikasi untuk kendaraan ini. Silahkan cek kembali nanti.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

