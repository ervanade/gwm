"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";
import parse from "html-react-parser";
import { Link } from "@/i18n/navigation";
const HTMLDecoderEncoder = require("html-encoder-decoder");

const DetailAfterSales = () => {
  const locale = useLocale();

  const dummyTenants = [
    {
      id: "warranty",
      title_id: "WARRANTY",
      title_en: "WARRANTY",
      image: "/assets/warranty.png",
      desc_id: `
<section class="text-dark">
  <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide">
    Berkendara Jelajahi Berbagai Medan dengan Bebas Khawatir.
  </h3>

  <ol class="mt-4 space-y-5 list-decimal pl-5">
    <li>
      <h4 class="font-semibold">TANK 500 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">TANK 300 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL H6 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
        <li><span class="font-medium">3 Tahun / 30.000 KM</span> – Suku Cadang & Jasa Perawatan Tahunan</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL Jolion Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Tahun / 200.000 KM</span> – Garansi Baterai Hybrid</li>
        <li><span class="font-medium">7 Tahun / 200.000 KM</span> – Garansi Umum</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">ORA 03 Warranty</h4>
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
    Drive Across Any Terrain with Peace of Mind.
  </h3>

  <ol class="mt-4 space-y-5 list-decimal pl-5">
    <li>
      <h4 class="font-semibold">TANK 500 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Warranty</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Warranty</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">TANK 300 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Warranty</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Warranty</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL H6 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Warranty</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Warranty</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Annual Maintenance Parts & Labor</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">HAVAL Jolion Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Hybrid Battery Warranty</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Warranty</li>
      </ul>
    </li>

    <li>
      <h4 class="font-semibold">ORA 03 Warranty</h4>
      <ul class="mt-2 space-y-1 list-disc pl-4 text-sm md:text-base">
        <li><span class="font-medium">8 Years / 200,000 KM</span> – Battery Warranty</li>
        <li><span class="font-medium">7 Years / 200,000 KM</span> – General Warranty</li>
        <li><span class="font-medium">3 Years / 30,000 KM</span> – Free Maintenance and Service Fee</li>
      </ul>
    </li>
  </ol>
</section>
`,
    },
    {
      id: "accessories",
      title_id: "AKSESORIS",
      title_id: "ACCESSORIES",
      image: "/assets/accessories.png",
      desc_id:
        "Maksimalkan Gaya Kendaraan Kesayangan Anda Dengan Aksesoris Gwm. Hubungi Atau Kunjungi Dealer Terdekat Untuk Mendapatkan Informasi Seputar Koleksi Aksesoris Gwm.",
      desc_en:
        "Maximize The Style Of Your Beloved Vehicle With Gwm Accessories. Contact Or Visit The Nearest Dealer To Get Information About The Gwm Accessories Collection.",
    },
    {
      id: "afterservice",
      title_id: "Dealer Kami",
      title_en: "Our Dealers",
      image: "/assets/dealers/tomang.png",
      desc_id:
        "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini.",
      desc_en:
        "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today.",
      dealer_link: "/dealer-locations",
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailAfterSales;
