"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";
import parse from "html-react-parser";
import { Link } from "@/i18n/navigation";
const HTMLDecoderEncoder = require("html-encoder-decoder");

const DetailAccessories = () => {
  const locale = useLocale();

  const dummyTenants = [
    {
      id: "Kit",
      title_id: "AKSESORIS",
      title_en: "ACCESSORIES",
      image: "/assets/tank-300-acc.png",
      desc_id: `
<section class="text-dark">
  <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide">
   Exterior Part
  </h3>

  <ol class="mt-4 space-y-5 list-decimal pl-5">
    <li>
      <h4 class="font-semibold">TANK 300 Fury Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">TANK 500 Fury Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL H6 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL Jolion Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">ORA 03 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Gratis Perawatan & Biaya Servis</li>
      </ul>
    </li>
  </ol>
</section>
`,

      desc_en: `
<section class="text-dark">
  <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide">
   Exterior Part
  </h3>

  <ol class="mt-4 space-y-5 list-decimal pl-5">
    <li>
      <h4 class="font-semibold">TANK 500 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Kit</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Kit</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">TANK 300 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Kit</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Kit</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL H6 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Kit</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Kit</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL Jolion Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Kit</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Kit</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">ORA 03 Kit</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Battery Kit</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Kit</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Free Maintenance and Service Fee</li>
      </ul>
    </li>
  </ol>
</section>
`,
    },
    {
      id: "accessories",
      title_id: "TANK 500 FURY VERSION",
      title_en: "TANK 500 FURY VERSION",
      image: "/assets/tank-500-fury.png",
      desc_id:
        "Dibuat untuk para petualang sejati, TANK 500 FURY adalah kendaraan off-road yang telah dikustomisasi sepenuhnya untuk menaklukkan medan paling ekstrem. Dilengkapi dengan roof rack, side ladder, adjustable shock absorbers, dan lebih banyak fitur lainnya, kendaraan ini menawarkan ketahanan serta performa yang luar biasa. Baik saat menjelajahi alam liar maupun mendorong batas eksplorasi, TANK 500 FURY memastikan setiap perjalanan menjadi petualangan yang tak terlupakan.",
      desc_en:
        "Built for true adventurers, the TANK 500 FURY is a fully customized off-road vehicle designed to conquer the most extreme terrain. Equipped with a roof rack, side ladder, adjustable shock absorbers, and more, it offers exceptional durability and performance. Whether exploring the wilderness or pushing the boundaries of exploration, the TANK 500 FURY ensures every journey is an unforgettable adventure.",
    },
    
    {
      id: "afterservice",
      title_id: "TANK 300 FURY VERSION",
      title_en: "TANK 300 FURY VERSION",
      image: "/assets/tank-300-fury2.png",
      desc_id:
        "TANK 300 FURY adalah monster off-road yang telah dimodifikasi sepenuhnya, dirancang untuk mereka yang haus akan petualangan. Dilengkapi dengan roof rack, side ladder, adjustable shock absorbers, dan masih banyak lagi, kendaraan ini menawarkan daya tahan dan performa maksimal di segala medan. Baik saat menaklukkan jalur terjal maupun menjelajahi wilayah yang belum terjamah, TANK 300 FURY siap menghadapi setiap tantangan dengan percaya diri.",
      desc_en:
        "The TANK 300 FURY is a fully modified off-road monster designed for those with a thirst for adventure. Equipped with a roof rack, side ladder, adjustable shock absorbers, and more, it offers maximum durability and performance in all terrains. Whether conquering rugged trails or exploring uncharted territory, the TANK 300 FURY is ready to face any challenge with confidence.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16relative scroll-mt-12 text-dark">
      <div className="w-full">
        {/* <div className="mb-16">
          <h1 className="text-3xl font-bold mb-6">
            {locale === "en" ? "GWM After Sales" : "GWM After Sales"}
          </h1>
          <p className="sub-title">
            {locale === "en"
              ? "Learn more about the exclusive experience zones of GWM."
              : "Jelajahi berbagai zona pengalaman eksklusif dari GWM."}
          </p>
        </div> */}

        {dummyTenants.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            className={`w-full justify-start items-center mt-12 gap-4 lg:gap-8 grid lg:grid-cols-2 grid-cols-1 ${
              index === 0 ? "" : "mt-12"
            }`}
          >
            <div
              className={`relative mx-auto w-full sm:w-2/3 lg:w-full rounded-md lg:px-4 overflow-hidden aspect-[3/2] ${
                (index + 1) % 2 === 0
                  ? "order-first lg:order-last lg:mr-0"
                  : "lg:ml-0"
              }`}
            >
              <Image
                src={item.image}
                alt={`${item.title} image`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Konten */}
            <div className="w-full flex-col justify-start lg:items-start items-center  inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center flex">
                <h2 className="text-dark text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-8">
                  {locale === "en" ? item.title_en : item.title_id}
                </h2>
                <p className="text-dark/80 text-sm md:text-base font-normal leading-relaxed ">
                  {locale === "en"
                    ? parse(HTMLDecoderEncoder.decode(item.desc_en))
                    : parse(HTMLDecoderEncoder.decode(item.desc_id))}
                </p>
                {item.dealer_link && (
                  <Link
                    href={item.dealer_link}
                    target="_blank"
                    className="mt-4 w-max md:w-auto text-center bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white uppercase"
                  >
                    {locale === "en" ? "Dealer Locations" : "Lokasi Dealer"}
                  </Link>
                )}

{item.detail_link && (
                  <Link
                    href={item.detail_link}
                    target="_blank"
                    className="mt-4 w-max md:w-auto text-center bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white uppercase"
                  >
                    {locale === "en" ? "Detail" : "Detail"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailAccessories;
