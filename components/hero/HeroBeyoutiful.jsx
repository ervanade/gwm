"use client";
import React from "react";
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
import { useSelector } from "react-redux";
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");
const HeroBeyoutiful = ({ dataHero }) => {
  const lang = useSelector((state) => state.lang.lang); // Get language from Redux store
  const heroData = dataHero?.data || null;
  const metaData = dataHero?.metadata || null;
  const data = [
    {
      link: "/beyoutiful",
      image_default: "/assets/beyoutiful/hero-beyoutiful-4.png",
      title: `<span>Rasakan perbedaan transformasional di<br /> Beyoutiful Aesthetic</span>`,
      title_en:
        "Experience holistic wellness treatments at Beyoutiful Aesthetic",
      desc: "Dengan pendekatan holistik kami yang berfokus pada kesejahteraan Anda secara menyeluruh, menggabungkan teknik mutakhir dengan perawatan yang didesain khusus.",
      desc_en:
        "From aesthetic surgery to specialized therapies, designed to enhance your overall appearance and well-being.",
    },
  ];
  return (
    <div className="mx-auto w-full text-black font-montserrat" id="hero">
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
          {heroData
            ? heroData?.map((item, index) => (
                <SwiperSlide key={index}>
                  {/* <Link href={item?.link}> */}
                  <div className="w-full relative h-[calc(100vh-102px)]">
                    <Image
                      src={item.image_default}
                      alt={item.title || "Beyoutiful Hero"}
                      layout="fill" // Membuat gambar memenuhi kontainer
                      objectFit="cover" // Menjaga rasio aspek dan memotong bagian luar
                      objectPosition="center" // Memusatkan gambar
                      priority={index === 0} // Memuat gambar pertama lebih awal
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20" /> */}

                    <div className="absolute inset-0 flex items-center">
                      <div className="mx-auto w-full max-w-7xl px-6 lg:px-24 text-secondary z-10">
                        <div className="w-full lg:w-[70%] space-y-4 lg:space-y-8">
                          {item.content_id && item.content_en ? (
                            lang === "en" ? (
                              parse(HTMLDecoderEncoder.decode(item.content_en))
                            ) : (
                              parse(HTMLDecoderEncoder.decode(item.content_id))
                            )
                          ) : (
                            <p className="text-3xl lg:text-[40px] 2xl:text-[48px] text-[#F5F5F5] text-left leading-tight font-semibold">
                              {lang === "en"
                                ? parse(
                                    HTMLDecoderEncoder.decode(item?.title_en)
                                  )
                                : parse(HTMLDecoderEncoder.decode(item?.title))}
                            </p>
                          )}
                          {item.desc_id && item.desc_en ? (
                            lang === "en" ? (
                              parse(HTMLDecoderEncoder.decode(item.desc_en))
                            ) : (
                              parse(HTMLDecoderEncoder.decode(item.desc_id))
                            )
                          ) : (
                            <p className="text-base sm:text-lg 2xl:text-xl text-white/85 text-left leading-relaxed">
                              {lang === "en" ? item.desc_en : item.desc}{" "}
                              <span className="text-lg sm:text-xl 2xl:text-2xl  font-semibold">
                                #WhereHealthAndHappinessMeet
                              </span>
                            </p>
                          )}

                          <a
                            href={
                              item?.link
                                ? item?.link
                                : "https://wa.me/+628119790556"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-secondary text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-semibold"
                          >
                            {lang === "en"
                              ? "Consult Now"
                              : "Konsultasi Sekarang"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              ))
            : data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <SwiperSlide key={index}>
                    {/* <Link href={item?.link}> */}
                    <div className="w-full relative h-[calc(100vh-102px)]">
                      <Image
                        src={item.image_default}
                        alt={item.title || "T-Space Hero"}
                        layout="fill" // Membuat gambar memenuhi kontainer
                        objectFit="cover" // Menjaga rasio aspek dan memotong bagian luar
                        objectPosition="center" // Memusatkan gambar
                        priority={index === 0} // Memuat gambar pertama lebih awal
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20" /> */}

                      <div className="absolute inset-0 flex items-center">
                        <div className="mx-auto w-full max-w-7xl px-6 lg:px-24 text-secondary z-10">
                          <div className="w-full lg:w-[70%] space-y-4 lg:space-y-8">
                            <p className="text-3xl lg:text-[40px] 2xl:text-[48px] text-[#F5F5F5] text-left leading-tight font-semibold">
                              {lang === "en"
                                ? parse(
                                    HTMLDecoderEncoder.decode(item?.title_en)
                                  )
                                : parse(HTMLDecoderEncoder.decode(item?.title))}
                            </p>
                            <p className="text-base sm:text-lg 2xl:text-xl text-white/85 text-left leading-relaxed">
                              {lang === "en" ? item.desc_en : item.desc}{" "}
                              <span className="text-lg sm:text-xl 2xl:text-2xl  font-semibold">
                                #WhereHealthAndHappinessMeet
                              </span>
                            </p>
                            <a
                              href="https://wa.me/+628119790556
                          "
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-secondary text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-semibold"
                            >
                              {lang === "en"
                                ? "Consult Now"
                                : "Konsultasi Sekarang"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </SwiperSlide>
                </SwiperSlide>
              ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroBeyoutiful;
