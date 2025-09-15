"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
  const addScope = (selector) => {
    // Kalau sudah ada scopeClass, jangan ditambah lagi
    if (selector.includes(scopeClass)) return selector.trim();
    return `${scopeClass} ${selector.trim()}`;
  };

  // Tangani blok @media
  css = css.replace(/@media[^{]+\{([\s\S]+?)\}\s*\}/g, (match, inner) => {
    const scopedInner = inner.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (m, p1, selector) => {
      if (selector.startsWith("@")) return m;
      const scopedSelectors = selector
        .split(",")
        .map(sel => addScope(sel))
        .join(", ");
      return `${p1} ${scopedSelectors} {`;
    });
    return match.replace(inner, scopedInner);
  });

  // Tangani selector di luar @media
  css = css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
    if (selector.startsWith("@")) return match;
    const scopedSelectors = selector
      .split(",")
      .map(sel => addScope(sel))
      .join(", ");
    return `${p1} ${scopedSelectors} {`;
  });

  return css;
}



const EraDetail = ({ data }) => {
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
      cta_link: "https://wa.me/6285186821765?text=Halo%20GWM,%20saya%20telah%20mengunjungi%20WEBSITE%20GWM%20Inchcape%20Retail,%20dan%20tertarik%20ingin%20mendapatkan%20informasi%20lebih%20lanjut.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16relative scroll-mt-12 text-dark">
      {data ? (
        <div className="grapejs-wrapper">
          <div dangerouslySetInnerHTML={{ __html: JSON.parse(data?.html) }} />
          <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(JSON.parse(data?.css)),
            }}
          />
        </div>
      ) : (
        ""
      )}
      {/* <div className="w-full">
   

        {dummyTenants.map((item, index) => (
          <div
            key={item.id}
            className={`w-full justify-start items-center mt-12 gap-4 lg:gap-8 grid lg:grid-cols-2 grid-cols-1 ${
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

            <div className="w-full flex-col justify-start lg:items-start items-center  inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center flex">
                <h2 className="text-dark text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-8">
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
      </div> */}
    </section>
  );
};

export default EraDetail;
