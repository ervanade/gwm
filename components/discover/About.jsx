"use client";

import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
  return css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
    // Tambahkan prefix hanya pada selector, bukan pada @keyframes dll
    if (selector.startsWith("@")) return match;
    const scopedSelectors = selector
      .split(",")
      .map((sel) => `${scopeClass} ${sel.trim()}`)
      .join(", ");
    return `${p1} ${scopedSelectors} {`;
  });
}
const dummyTenants = [
  {
    id: "tank",
    title: "ABOUT US",
    image: "/assets/about/why-gwm1.jpg",
    desc_id:
      "Di GWM, keyakinan yang sama mengalir di setiap karyawan dan bergema di seluruh departemen global kami. Keyakinan inilah yang telah menjadi kekuatan pendorong sejak perusahaan didirikan pada tahun 1990, mendorong batasan dari apa yang dapat dicapai oleh sebuah kendaraan. Dengan semangat ini, GWM berspesialisasi dalam membangun kendaraan yang dirancang secara cermat untuk tujuan tertentu. Setiap model dirancang secara mendetail dengan tujuan tidak hanya memenuhi, tetapi juga melampaui kebutuhan unik pelanggan kami, menggabungkan inspirasi dan inovasi dalam setiap kreasi otomotif.",
    desc_en:
      "At GWM, the same belief runs through every employee and resonates throughout our global departments. This belief has been a driving force since the company's founding in 1990, pushing the boundaries of what a vehicle can achieve. With this spirit, GWM specializes in building purpose-built vehicles. Each model is meticulously crafted with the goal of not only meeting but exceeding our customers' unique needs, combining inspiration and innovation in every automotive creation.",
  },
  {
    id: "ora",
    title: "Pusat Teknologi HAVAL GWM",
    image: "/assets/about/why-gwm2.jpg",
    desc_id: `GWM telah diakui secara luas, memperoleh berbagai penghargaan prestisius, termasuk sebagai "pusat teknologi yang diakui negara," "unit dengan program pascadoktoral," dan "perusahaan inovatif nasional", yang diberikan oleh otoritas utama seperti Komisi Pembangunan dan Reformasi Nasional serta Kementerian Sains dan Teknologi.`,
    desc_en: `GWM has been widely recognized, receiving various prestigious awards, including being designated as a “state-recognized technology center,” “unit with postdoctoral programs,” and “national innovative enterprise,” awarded by key authorities such as the National Development and Reform Commission and the Ministry of Science and Technology.`,
  },
  {
    id: "afterservice",
    title: "GWM INCHCAPE",
    image: "/assets/about/brand.jpg",
    desc_id:
      "Inchcape adalah perusahaan yang berpusat di Inggris dengan pengalaman lebih dari 175 tahun, beroperasi di lebih dari 40 negara sebagai distributor, produsen, dan pengecer global berbagai merek otomotif.",
    desc_en:
      "Inchcape is a UK-based company with 175+ years of experience, operating in over 40 countries as global distributor, manufacturer and retailer of various automotive brands.",
  },
];

const whyGWM = [
  {
    id: 1,
    type: "square",
    mainTitle: "Perusahaan Global",
    mainTitle_en: "A Global Company",
    desc_en:
      "Inchcape is a UK-based company with 175+ years of experience, operating in over 40 countries as global distributor, manufacturer and retailer of various automotive brands.",
    desc: "Inchcape adalah perusahaan yang berpusat di Inggris dengan pengalaman lebih dari 175 tahun, beroperasi di lebih dari 40 negara sebagai distributor, produsen, dan pengecer global berbagai merek otomotif.",
    image: "/assets/icons/logo-inchape.png", // Make sure this path exists
  },
  {
    id: 2,
    type: "square",
    mainTitle: "Dipercaya oleh Merek Terkemuka",
    desc: "Mitra dari merek GWM, Jaguar, Land Rover, Mercedes-Benz, Harley-Davidson, dan banyak lagi – dikenal dengan layanan otomotif kelas dunia.",
    mainTitle_en: "Trusted by Leading Brands",
    desc_en:
      "Partner of GWM, Jaguar, Land Rover, Mercedes-Benz, Harley- Davidson, and more – known for world-class automotive services.",
    image: "/assets/icons/hand.png", // Make sure this path exists
  },
  {
    id: 3,
    type: "square",
    mainTitle: "Fokus Pada Kepuasan Pelanggan",
    desc: "Inchcape memastikan pengalaman kepemilikan kendaraan yang premium dan nyaman – dari pembelian hingga purnajual.",
    mainTitle_en: "Excellence in Service & Support",
    desc_en:
      "Inchcape ensures a premium and pleasant vehicle ownership experience – from purchase to aftersales.",
    image: "/assets/icons/car-icon.png", // Make sure this path exists
  },
];
const AboutUs = ({ data }) => {
  const locale = useLocale();

  const renderWhyCard = (product, index) => {
    // Ukuran ikon yang diinginkan (contoh: 80px)
    const iconSize = 124;

    return (
      <div className="flex flex-col gap-4 items-center" key={index}>
        <div className="w-[124px] h-[124px] relative overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.mainTitle + " " + product.subTitle}
            width={iconSize} // Lebar eksplisit
            height={iconSize} // Tinggi eksplisit (sama dengan lebar untuk square)
            className="object-contain" // Penting: 'object-contain' agar seluruh ikon terlihat (tidak terpotong)
            // 'object-cover' akan memotong jika rasio gambar tidak pas dengan container
            priority={index < 3} // Preload 3 gambar pertama
          />
        </div>
        {/* --- Akhir Bagian Gambar --- */}

        {/* --- Judul (Sekarang berada di bawah ikon) --- */}
        <h3 className="text-2xl font-bold leading-tight text-center">
          {locale == "en" ? product.mainTitle_en : product.mainTitle}
        </h3>
        {/* --- Deskripsi --- */}
        <p className="text-dark text-sm lg:text-base md:min-h-18 text-center">
          {" "}
          {locale == "en" ? product.desc_en : product.desc}
        </p>
      </div>
    );
  };

  return (
    <section className=" text-dark">
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
      {/* <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16relative scroll-mt-12">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-8 lg:mb-12">
          WHY GWM INCHCAPE
        </h2>{" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {" "}
            {whyGWM
              .slice(0, 3)
              .map((product, index) => renderWhyCard(product, index))}
          </div>
        </div>
      </div>
      <div className="py-6 md:py-8 px-6 bg-gray-100">
        <h2 className="text-2xl lg:text-3xl font-bold mb-1 text-center text-primary">
          {locale === "en" ? "Awards & Achievements" : "Penghargaan & Prestasi"}
        </h2>
        <p className="text-sm md:text-base text-gray-600 text-center">
          {locale === "en"
            ? "GWM has consistently earned global recognition and numerous awards for its design, engineering, 4WD capabilities and exceptional value over the years."
            : "GWM secara konsisten mendapatkan pengakuan global dan berbagai penghargaan atas desain, rekayasa, kemampuan 4WD, serta nilai luar biasa yang ditawarkan selama bertahun-tahun."}
        </p>
      </div>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg relative">
        <Image
          src={`/assets/about/award.jpg`}
          alt={"GWM Award"}
          sizes="100vw"
          fill
          className="object-cover"
          priority
        />
      </div> */}
    </section>
  );
};

export default AboutUs;
