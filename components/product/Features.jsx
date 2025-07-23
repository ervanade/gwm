'use client'
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import parse from "html-react-parser";
import { FaChevronDown } from "react-icons/fa";
const highlightProductsData = [
  {
    id: 1,
    type: "square",
    mainTitle: "PERFORMANCE",
    subTitle: "WARRANTY",
    desc: "1.5L Turbo Hybrid Engine Producing 243 PS / 530Nm with 19.2 km/L Fuel Economy",
    image: "/assets/cars/h6/feature-1.png", // Make sure this path exists
    link: "#", // Replace with actual link
  },
  {
    id: 2,
    type: "square",
    mainTitle: "SAFETY & PLATFORM",
    subTitle: "ACCESSORIES",
    desc: "Tingkatkan pengalaman berkendara Anda dengan aksesori resmi GWM yang dirancang untuk setiap model.",
    image: "/assets/cars/h6/feature-2.png", // Make sure this path exists
    link: "#",
  },
  {
    id: 3,
    type: "square",
    mainTitle: "6 AIRBAGS",
    subTitle: "ACCESSORIES",
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
const Features = () => {
    const [activeIdx, setActiveIdx] = useState(null);

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
      <div className="flex flex-col gap-4">
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
        </div>
        <h4 className="text-base font-bold">{product.mainTitle}</h4>
        <p className="text-dark text-sm lg:text-base md:min-h-18">
          {" "}
          {product.desc}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white text-dark">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-left mb-12">FEATURES</h2>{" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {" "}
            {/* Grid for 3 items */}
            {highlightProductsData
              .slice(0, 3)
              .map((product, index) => renderProductCard(product, index))}
          </div>
        </div>
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
                      className="bg-transparent hover:bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white flex items-center gap-2"
                    >
                      Discover More
                      <FaChevronRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="specs" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">HAVAL H6 - SPECIFICATION</h2>{" "}
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
        {/* Left: Image */}
        <div className="lg:w-1/2 w-full">
          <Image
            src="/assets/cars/h6/h6-grey-side.png"
            alt="Spec Illustration"
            width={800}
            height={600}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Right: Accordion */}
        <div className="lg:w-1/2 w-full space-y-4">
          {dummySpecs.map((item, i) => {
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
                    {parse(item.content)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Features;
