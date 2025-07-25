"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const ProductHero = ({ image, title, subtitle, price }) => {
  const locale = useLocale();

  return (
    <div className="relative w-full h-[80vh]" id="hero">
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
          <div className="max-w-[480px] flex flex-col gap-3 text-left">
            <p className="text-lg font-medium text-white/80">{subtitle}</p>
            <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>

            {/* Harga */}
            {price && (
              <p className="text-xl md:text-2xl font-bold text-white  rounded-md inline-block w-fit">
                <span className="font-normal">IDR </span>
                {price}
              </p>
            )}

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href={`/${locale}/test-drive`}
                className="bg-primary text-center text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition"
              >
                Book Test Drive
              </Link>
              <a
                href={`/${locale}/contact`}
                className="border border-white text-center text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-white hover:text-primary transition"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-[1]" />
    </div>
  );
};

export default ProductHero;
