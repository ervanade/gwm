"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const PageHero = ({ image, title, subtitle, price }) => {
  const locale = useLocale();

  return (
    <div className="relative w-full h-[50vh]" id="hero">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="z-0"
      />

      {/* Overlay Text Content */}
      <div className="absolute bottom-1/8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 text-white">
          <div className="max-w-[500px] lg:max-w-3/5 flex flex-col gap-3 text-left">
            <h1 className="text-3xl md:text-[40px] font-bold">{title}</h1>
            <p className="text-base 2xl:text-lg font-regular text-white/90">{subtitle}</p>

            {/* Tombol Aksi */}

          </div>
        </div>
      </div>

      {/* Optional Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-[1]" />
    </div>
  );
};

export default PageHero;
