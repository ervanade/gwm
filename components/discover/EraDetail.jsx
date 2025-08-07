"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

const EraDetail = () => {
  const locale = useLocale();

  const dummyTenants = [
    {
      id: "tank",
      title: "EMERGENCY ROADSIDE ASSISTANCE",
      image: "/assets/about/era1.jpg",
      desc_id:
        "Layanan Bantuan Darurat di Jalan kami siap memberikan dukungan segera kapan pun Anda membutuhkannya. Baik itu ban kempes, kehabisan bensin, mogok, atau kunci tertinggal/hilang, tim ahli kami hanya satu panggilan saja untuk memastikan Anda kembali melaju dengan aman dan nyaman. Karena setiap perjalanan layak mendapatkan keamanan tanpa hambatan. Kami mencakup lebih dari 200 kota dengan 600 mitra layanan. Layanan ini berlaku untuk seluruh lini kendaraan GWM.",
      desc_en:
        "Our Emergency Roadside Assistance service is ready to provide immediate support whenever you need it. Whether you have a flat tire, run out of gas, broken down, or lost/lost keys, our team of experts is just a call away to ensure you're back on the road safely and comfortably. Because every journey deserves seamless security. We cover over 200 cities with 600 service partners. This service applies to the entire GWM vehicle lineup.",
    },
    {
      id: "ora",
      title: "CUSTOMER SERVICE",
      image: "/assets/about/era2.jpg",
      desc_id: "HUBUNGI GWM CUSTOMER CENTER DI: 150 - 496 (GWM) 24 JAM",
      desc_en: "CONTACT GWM CUSTOMER CENTER AT: 150 - 496 (GWM) 24 HOURS",
      cta_link: "https://wa.me/+628187654321",
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
              className={`relative mx-auto w-full sm:w-2/3 lg:w-full rounded-sm lg:px-4 overflow-hidden aspect-[3/2] ${
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
                <p className="text-dark/80 text-sm md:text-base font-normal leading-relaxed lg:text-start text-center">
                  {locale === "en" ? item.desc_en : item.desc_id}
                </p>
                {item.cta_link && (
                  <a
                    href={item.cta_link}
                    target="_blank"
                    className="mt-4 w-max md:w-auto text-center bg-primary hover:border-transparent text-white px-4 py-2 lg:px-6  rounded-lg font-semibold border border-white uppercase"
                  >
                    {locale === "en" ? "CONTACT US" : "HUBUNGI KAMI"}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EraDetail;
