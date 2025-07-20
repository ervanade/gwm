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

const HTMLDecoderEncoder = require("html-encoder-decoder");

const Hero = ({ dataHero }) => {
  const heroData = dataHero?.data || null;
  const metaData = dataHero?.metadata || null;
  const lang = "id";
  const data = [
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en:
        "Experience the unique space to create, connect, and collaborate in the heart of Bintaro.",
    },
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en:
        "Experience the unique space to create, connect, and collaborate in the heart of Bintaro.",
    },
    {
      link: "/",
      image_default: "/hero-1.jpg",
      title: "DRIVE THE FUTURE WITH GWM",
      title_en: "DRIVE THE FUTURE WITH GWM",
      desc: "GWM Innovation in The New Energy Era",
      desc_en:
        "Experience the unique space to create, connect, and collaborate in the heart of Bintaro.",
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
          {data?.map((item, index) => (
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

                <div className="absolute top-[35%] left-0 right-0">
                  <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col gap-2 items-center justify-start text-white space-y-4 lg:space-y-8 max-w-[600px] text-center md:items-start md:text-left">
                      <p className="font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight">
                        {lang === "en" ? item.title_en : item.title}
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed">
                        {lang === "en" ? item.desc_en : item.desc}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href="https://wa.me/+6281181110556"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="button"
                          className="bg-sky-500 text-white px-4 py-2 lg:px-6  rounded-lg font-semibold"
                        >
                          EXPLORE MODELS
                        </a>
                        <a
                          href="https://wa.me/+6281181110556"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="button"
                          className="bg-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white"
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
