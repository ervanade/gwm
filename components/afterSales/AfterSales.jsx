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
            <p className="text-base font-light">{product.mainTitle}</p>
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
          className="bg-transparent text-primary w-max px-4 py-2 lg:px-6  rounded-lg font-medium border border-primary  flex items-center text-base hover:text-sky-400 transition-colors"
        >
          LEARN MORE <FaChevronRight className="ml-2 text-sm" />
        </a>
      </div>
    );
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-left mb-12">GWM AFTER SALES</h2>{" "}
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
    </div>
  );
};

export default AfterSales;
