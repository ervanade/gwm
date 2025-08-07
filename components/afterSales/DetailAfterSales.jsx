"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

const DetailAfterSales = () => {
  const locale = useLocale();

  const dummyTenants = [
    {
      id: "warranty",
      title: "WARRANTY",
      image: "/assets/warranty.png",
      desc_id:
        "Rasakan pengalaman menjelajahi dunia off-road dengan mobil TANK dari GWM. Zona ini dirancang untuk Anda yang ingin merasakan kekuatan dan kenyamanan secara langsung.",
      desc_en:
        "Experience the thrill of off-road adventure with GWM’s TANK vehicles. This zone is designed for those who want to feel the power and comfort firsthand.",
    },
    {
      id: "accessories",
      title: "ACCESSORIES",
      image: "/assets/accessories.png",
      desc_id:
        "Nikmati suasana santai dengan kopi dan makanan ringan sambil mengenal lebih dekat mobil listrik ORA dari GWM.",
      desc_en:
        "Relax and recharge at the ORA Café Lounge while getting to know GWM’s electric vehicle lineup up close.",
    },
    {
      id: "afterservice",
      title: "AFTER SALES CENTER",
      image: "/assets/dealers/pondokindah.png",
      desc_id:
        "Layanan purna jual lengkap untuk kenyamanan dan ketenangan Anda setelah memiliki kendaraan GWM.",
      desc_en:
        "A complete after-sales service center to ensure your peace of mind after owning a GWM vehicle.",
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
            className={`w-full justify-start items-center mt-12 gap-8 grid lg:grid-cols-2 grid-cols-1 ${
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
                <h2 className="text-dark text-3xl font-bold text-center mb-6 lg:mb-8">
                  {item.title}
                </h2>
                <p className="text-dark/80 text-base font-normal leading-relaxed lg:text-start text-center">
                  {locale === "en" ? item.desc_en : item.desc_id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailAfterSales;
