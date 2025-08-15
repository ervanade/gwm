"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";
import parse from "html-react-parser";
import { Link } from "@/i18n/navigation";
const HTMLDecoderEncoder = require("html-encoder-decoder");
const ContactUs = () => {
  const locale = useLocale();

  const dummyTenants = [
    {
      id: "tank",
      title_id: "Kontak Kami",
      title_en: "Contact Us",
      image: "/assets/about/era2.jpg",
      desc_id: `<p>Tim <strong>GWM Customer Center</strong> siap membantu Anda 24 jam untuk segala kebutuhan informasi, layanan, maupun bantuan darurat. Hubungi kami melalui telepon di <a  className ="font-bold" href="tel:150496">150-496 (GWM)</a> atau WhatsApp di <a classname ="font-bold" href="https://wa.me/6285186821765">+62 851-8682-1765</a>. Anda juga dapat mengirim email ke <a classname ="font-bold" href="mailto:gwm.info@inchcape.co.id">gwm.info@inchcape.co.id</a>. <br/>Untuk informasi langsung dan test drive, silakan kunjungi dealer resmi kami di bawah ini.</p>`,
      desc_en: `<p>Our <strong>GWM Customer Center</strong> team is ready 24/7 to assist you with information, services, and emergency support. Contact us via phone at <a className ="font-bold" href="tel:150496">150-496 (GWM)</a> or WhatsApp at <a classname ="font-bold" href="https://wa.me/6285186821765">+62 851-8682-1765</a>. You can also email us at <a classname ="font-bold" href="mailto:gwm.info@inchcape.co.id">gwm.info@inchcape.co.id</a><br/>For direct information and test drives, please visit our authorized dealers listed below.</p>`,
      cta_link: "https://wa.me/+6285186821765",
    },
    {
      id: "ora",
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

            {/* Konten */}
            <div className="w-full flex-col justify-start lg:items-start items-center  inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center flex">
                <h2 className="text-dark text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-8">
                  {locale === "en" ? item.title_en : item.title_id}
                </h2>
                <p className="text-dark/80 text-sm md:text-base font-normal leading-relaxed lg:text-start text-center">
                  {locale === "en"
                    ? parse(HTMLDecoderEncoder.decode(item.desc_en))
                    : parse(HTMLDecoderEncoder.decode(item.desc_id))}

                  {/* {locale === "en" ? item.desc_en : item.desc_id} */}
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

export default ContactUs;
