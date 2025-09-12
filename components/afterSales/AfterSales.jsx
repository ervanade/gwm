import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
const highlightProductsData = [
  {
    id: 1,
    type: "square",
    mainTitle: "GWM AFTER SALES",
    subTitle_en: "WARRANTY",
    subTitle: "GARANSI",
    desc: "Cakupan garansi yang komprehensif sehingga memberikan ketenangan di setiap perjalanan.",
    desc_en:
      "Comprehensive warranty coverage for peace of mind on every journey.",
    image: "/assets/warranty.png", // Make sure this path exists
    link: "#", // Replace with actual link
  },
  {
    id: 2,
    type: "square",
    mainTitle: "GWM AFTER SALES",
    subTitle: "AKSESORIS",
    subTitle_en: "ACCESSORIES",
    desc: "Tingkatkan pengalaman berkendara Anda dengan aksesori resmi GWM yang dirancang untuk setiap model.",
    desc_en:
      "Enhance your driving experience with official GWM accessories tailored for each model.",

    image: "/assets/accessories.png", // Make sure this path exists
    link: "#",
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



const AfterSales = ({ dataWhy }) => {
  const locale = useLocale();
  const renderProductCard = (product, index) => {
    const isSquare = product.type === "square";
    const imageComponent = (
      <Image
        src={product.image}
        alt={product.mainTitle + " " + product.subTitle}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
        priority={index < 3} // Preload first 3 images
      />
    );

    return (
      <div className="flex flex-col gap-4" key={product.id}>
        <div
          className={`relative overflow-hidden rounded-lg group ${
            isSquare
              ? "aspect-[1/1] md:aspect-[1/1]"
              : "aspect-[1/1] md:h-[384px] w-full"
          }`}
        >
          {imageComponent}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>{" "}
          {/* Overlay for text readability */}
          <div className="absolute top-6 left-6 text-white">
            <p className="text-base font-light mb-2">{product.mainTitle}</p>
            <h4 className="text-2xl font-bold leading-tight">
              {locale == "en" ? product.subTitle_en : product.subTitle}
            </h4>
          </div>
        </div>
        <p className="text-dark text-sm lg:text-base md:min-h-18">
          {" "}
          {locale == "en" ? product.desc_en : product.desc}
        </p>
        <a
          href={product.link}
          className="bg-transparent text-primary w-max px-4 py-2 lg:px-6  rounded-lg font-medium border border-primary  flex items-center text-base hover:text-white hover:bg-primary transition-colors"
        >
          LEARN MORE <FaChevronRight className="ml-2 text-sm" />
        </a>
      </div>
    );
  };

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
    <div className="bg-white text-dark">
      {/* <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-left mb-8 lg:mb-12">
          GWM AFTER SALES
        </h2>{" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {" "}
            {highlightProductsData
              .slice(0, 3)
              .map((product, index) => renderProductCard(product, index))}
          </div>
        </div>
      </div> */}

      {dataWhy ? (
        <div className="grapejs-wrapper">
          <div
            dangerouslySetInnerHTML={{ __html: JSON.parse(dataWhy?.html) }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(JSON.parse(dataWhy?.css)),
            }}
          />
        </div>
      ) : (
        ""
      )}

      {/* <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
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
      </div> */}
    </div>
  );
};

export default AfterSales;
