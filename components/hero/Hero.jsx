"use client";
import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import "./Hero.css";
import parse from "html-react-parser";
import { useLocale } from "next-intl";

const HTMLDecoderEncoder = require("html-encoder-decoder");

const Hero = ({ dataHero }) => {
  const locale = useLocale();
  const data = [
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en: "GWM Innovation in The New Energy Era",
    },
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en: "GWM Innovation in The New Energy Era",
    },
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en: "GWM Innovation in The New Energy Era",
    },
  ];
  return (
    <div className="mx-auto w-full text-black" id="hero">
      {/* Hero Desktop */}
      <div className="">
        <Swiper
          className="h-auto overflow-hidden"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          speed={1000}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {dataHero.length > 0
            ? dataHero?.map((item, index) => (
                <SwiperSlide key={index}>
                  {/* <Link href={item?.link}> */}
                  <div className="w-full relative h-screen cursor-pointer">
                    <Image
                      src={item.image_url}
                      alt={item.alt_text || "Hero Mobil GWM"}
                      layout="fill" // Membuat gambar memenuhi kontainer
                      objectFit="cover" // Menjaga rasio aspek dan memotong bagian luar
                      objectPosition="center" // Memusatkan gambar
                      priority={index === 0} // Memuat gambar pertama lebih awal
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50" /> */}

                    <div className="absolute top-[42%] md:top-[35%] left-0 right-0">
                      <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex flex-col gap-2 justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] md:items-start md:text-left">
                          <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                            {locale === "en" ? item.title_en : item.title}
                          </p>
                          <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                            {locale === "en"
                              ? item.description_en
                              : item.description}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 w-1/2 text-sm md:text-base">
                            <button
                              onClick={() => {
                                const el = document.getElementById("models");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              aria-label="button"
                              className="w-max cursor-pointer bg-primary text-white px-4 py-2 lg:px-6 rounded-lg font-semibold"
                            >
                              EXPLORE MODELS
                            </button>
                            <a
                              href={`/${locale}/test-drive`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="button"
                              className=" w-max text-center hover:bg-primary hover:border-transparent bg-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white"
                            >
                              TEST DRIVE
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              ))
            : data?.map((item, index) => (
                <SwiperSlide key={index}>
                  {/* <Link href={item?.link}> */}
                  <div className="w-full relative h-screen cursor-pointer">
                    <Image
                      src={item.image_default}
                      alt={item.title || "T-Space Hero"}
                      layout="fill" // Membuat gambar memenuhi kontainer
                      objectFit="cover" // Menjaga rasio aspek dan memotong bagian luar
                      objectPosition="center" // Memusatkan gambar
                      priority={index === 0} // Memuat gambar pertama lebih awal
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50" /> */}

                    <div className="absolute top-[42%] md:top-[35%] left-0 right-0">
                      <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex flex-col gap-2 items-center justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] text-center md:items-start md:text-left">
                          <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                            {locale === "en" ? item.title_en : item.title}
                          </p>
                          <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                            {locale === "en" ? item.desc_en : item.desc}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={() => {
                                const el = document.getElementById("models");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              aria-label="button"
                              className="cursor-pointer bg-primary text-white px-4 py-2 lg:px-6 rounded-lg font-semibold"
                            >
                              EXPLORE MODELS
                            </button>
                            <a
                              href={`/${locale}/test-drive`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="button"
                              className="hover:bg-primary hover:border-transparent bg-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white"
                            >
                              TEST DRIVE
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
