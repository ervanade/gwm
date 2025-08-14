"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Pagination if you want dots
import { FaChevronRight } from "react-icons/fa"; // Import the chevron icon
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
// import "swiper/css/pagination"; // Uncomment if you use Pagination module

const highlightProductsData = [
  {
    id: 1,
    type: "square",
    mainTitle: "HAVAL",
    subTitle: "JOLION",
    buttonText: "JOLION",
    image: "/assets/h-jolion.png",
    link: "/models/haval-jolion",
  },
  {
    id: 2,
    type: "square",
    mainTitle: "HAVAL",
    subTitle: "H6 HEV",
    buttonText: "H6 HEV",
    image: "/assets/h-havalh6.png",
    link: "/models/haval-h6-hev",
  },
  {
    id: 3,
    type: "square",
    mainTitle: "ORA",
    subTitle: "O3 BEV",
    buttonText: "ORA O3 BEV",
    image: "/assets/h-ora.png",
    link: "/models/ora-bev",
  },
  {
    id: 4,
    type: "wide",
    mainTitle: "TANK",
    subTitle: "TANK 300",
    buttonText: "TANK 300",
    image: "/assets/h-tank300.png",
    link: "/models/tank-300",
  },
  {
    id: 5,
    type: "wide",
    mainTitle: "TANK",
    subTitle: "TANK 500",
    buttonText: "TANK 500",
    image: "/assets/h-tank500.png",
    link: "/models/tank-500",
  },
];

function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
  return css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
    // Tambahkan prefix hanya pada selector, bukan pada @keyframes dll
    if (selector.startsWith("@")) return match;
    const scopedSelectors = selector
      .split(",")
      .map((sel) => `${scopeClass} ${sel.trim()}`)
      .join(", ");
    return `${p1} ${scopedSelectors} {`;
  });
}

const OverviewProduct = ({ overviewHtml, dataModels, dataAfterSales }) => {
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayData =
    dataModels && dataModels.length > 0
      ? dataModels
          .slice() // Buat salinan untuk menghindari mutasi array asli
          .sort((a, b) => (a.model || "").localeCompare(b.model || ""))
          .slice(0, 5)
          .map((model, idx) => ({
            id: model.id,
            type: idx < 3 ? "square" : "wide",
            mainTitle: model.category?.category || model.name || "-",
            subTitle: model.tipe || model.model || "-",
            buttonText: `${model.model || ""} `,
            image: model.overview_image_url,
            link: `/models/${model.slug}`,
          }))
      : highlightProductsData;

  const renderProductCard = (product, index) => {
    const isSquare = product.type === "square";
    const imageComponent = (
      <Image
        src={product.image}
        alt={product.mainTitle + " " + product.subTitle}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
        priority={index < 3}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-6 left-6 text-white">
          <p className="text-base font-light mb-2">{product.mainTitle}</p>
          <h4 className="text-xl font-bold leading-tight">
            {product.subTitle}
          </h4>
        </div>
        <Link
          href={product.link}
          className="absolute bottom-5 right-4 flex items-center text-white text-lg font-semibold hover:text-sky-400 transition-colors"
        >
          {product.buttonText} <FaChevronRight className="ml-2 text-sm" />
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full bg-white  text-dark">
      {/* {parse(HTMLDecoderEncoder.decode(overviewHtml?.html))} */}

      {/* <GrapesjsRenderer projectJson={JSON.parse(overviewHtml?.content)} /> */}

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-12 md:pb-16">
        {isMobile ? (
          <Swiper
            className="h-auto overflow-hidden relative cursor-grab"
            slidesPerView={1.2}
            spaceBetween={16}
            modules={[Navigation, Pagination]}
            navigation={true}
            breakpoints={{
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
            {displayData.map((product, index) => (
              <SwiperSlide key={product.id}>
                {renderProductCard(product, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-4">
              {displayData
                .slice(0, 3)
                .map((product, index) => renderProductCard(product, index))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {displayData
                .slice(3, 5)
                .map((product, index) => renderProductCard(product, index + 3))}
            </div>
          </div>
        )}
      </div>

      {/* <div className="mx-auto w-full text-black" id="hero">
        <div className="">
          <div className="w-full relative h-[70vh] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/50 to-transparent z-10"></div>
            <Image
              src={`/assets/highlight1.png`}
              alt={"GWM Hero"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute top-[35%] left-0 right-0 z-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-2 items-center justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] text-center md:items-start md:text-left">
                  <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                    HAVAL JOLION HEV
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                    {locale == "en"
                      ? `Equipped with 20 ADAS features, the most in its class, with a 12.3-inch multimedia touchscreen and a 7-inch LCD instrument panel.`
                      : `Dilengkapi 20 fitur ADAS, terbanyak di kelasnya, dengan layar sentuh multimedia 12,3 inci dan panel instrumen LCD 7 inci.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/models/haval-h6-hev"
                      aria-label="button"
                      className="cursor-pointer bg-transparent hover:bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white flex items-center gap-2"
                    >
                      DISCOVER MORE
                      <FaChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {overviewHtml ? (
        <div className="grapejs-wrapper">
          <div
            dangerouslySetInnerHTML={{ __html: JSON.parse(overviewHtml?.html) }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(JSON.parse(overviewHtml?.css)),
            }}
          />
        </div>
      ) : (
        ""
      )}

      {/* <style dangerouslySetInnerHTML={{ __html: JSON.parse(dataAfterSales?.css) }} /> */}
      {dataAfterSales ? (
        <div
          dangerouslySetInnerHTML={{ __html: JSON.parse(dataAfterSales?.html) }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default OverviewProduct;
