import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
const highlightProductsData = [
  {
    id: 1,
    type: "square",
    mainTitle: "GWM After Sales",
    subTitle: "WARRANTY",
    desc: "Cakupan garansi yang komprehensif sehingga memberikan ketenangan di setiap perjalanan.",
    image: "/assets/warranty.png", // Make sure this path exists
    link: "#", // Replace with actual link
  },
  {
    id: 2,
    type: "square",
    mainTitle: "GWM After Sales",
    subTitle: "ACCESSORIES",
    desc: "Tingkatkan pengalaman berkendara Anda dengan aksesori resmi GWM yang dirancang untuk setiap model.",
    image: "/assets/accessories.png", // Make sure this path exists
    link: "#",
  },
];
const whyGWM = [
  {
    id: 1,
    type: "square",
    mainTitle: "Perusahaan Global",
    desc: "Inchcape adalah perusahaan yang berpusat di Inggris dengan pengalaman lebih dari 175 tahun, beroperasi di lebih dari 40 negara sebagai distributor, produsen, dan pengecer global berbagai merek otomotif.",
    image: "/assets/icons/logo-inchape.png", // Make sure this path exists
  },
  {
    id: 2,
    type: "square",
    mainTitle: "Dipercaya oleh Merek Terkemuka",
    desc: "Mitra dari merek GWM, Jaguar, Land Rover, Mercedes-Benz, Harley-Davidson, dan banyak lagi – dikenal dengan layanan otomotif kelas dunia.",
    image: "/assets/icons/hand.png", // Make sure this path exists
  },
  {
    id: 3,
    type: "square",
    mainTitle: "Fokus Pada Kepuasan Pelanggan",
    desc: "Inchcape memastikan pengalaman kepemilikan kendaraan yang premium dan nyaman – dari pembelian hingga purnajual.",
    image: "/assets/icons/car-icon.png", // Make sure this path exists
  },
];
const AfterSales = () => {
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
      <div className="flex flex-col gap-4">
        <div
          key={product.id}
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
              {product.subTitle}
            </h4>
          </div>
        </div>
        <p className="text-dark text-sm lg:text-base md:min-h-18">
          {" "}
          {product.desc}
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
      <div className="flex flex-col gap-4 items-center">
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
          {product.mainTitle}
        </h3>
        {/* --- Deskripsi --- */}
        <p className="text-dark text-sm lg:text-base md:min-h-18 text-center">
          {" "}
          {product.desc}
        </p>
      </div>
    );
  };
  return (
    <div className="bg-white text-dark">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-left mb-8 lg:mb-12">GWM AFTER SALES</h2>{" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {" "}
            {/* Grid for 3 items */}
            {highlightProductsData
              .slice(0, 3)
              .map((product, index) => renderProductCard(product, index))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-8 lg:mb-12">
          WHY GWM INCHCAPE
        </h2>{" "}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {" "}
            {/* Grid for 3 items */}
            {whyGWM
              .slice(0, 3)
              .map((product, index) => renderWhyCard(product, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterSales;
