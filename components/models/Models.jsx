"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React, { useState } from "react";

const modelTabs = [
  { name: "haval", label: "HAVAL", logo: "/logo/haval.png" },
  { name: "tank", label: "TANK", logo: "/logo/tank.png" },
  { name: "ora", label: "ORA", logo: "/logo/ora.png" },
];

const dummyModels = [
  {
    id: 1,
    image: "/assets/tank-500.png",
    title: "TANK 500",
    subtitle: "Luxury Offroad",
    link: "/models/tank-500",
  },
  {
    id: 2,
    image: "/assets/haval-h6.png",
    title: "HAVAL H6",
    subtitle: "SUV Hybrid",
    link: "/models/haval-h6",
  },
  {
    id: 3,
    image: "/assets/ora.png",
    title: "ORA O3 BEV",
    subtitle: "Electric Hatchback",
    link: "/models/ora-o3-bev",
  },
  {
    id: 4,
    image: "/assets/tank-300.png",
    title: "TANK 300",
    subtitle: "Premium SUV",
    link: "/models/tank-300",
  },
  {
    id: 5,
    image: "/assets/haval-jolion.png",
    title: "HAVAL JOLION",
    subtitle: "JOLION ULTRA HEV",
    link: "/models/haval-jolion-ultra-hev",
  },
  {
    id: 6,
    image: "/assets/haval-jolion-hev.png",
    title: "HAVAL JOLION",
    subtitle: "JOLION HEV",
    link: "/models/haval-jolion-hev",
  },
];

const Models = ({ dataModels = [], dataCategories = [] }) => {
  const [activeTab, setActiveTab] = useState("haval");

  const getFilteredModels = () => {
    const models = dataModels.length > 0
      ? dataModels.map((m) => ({
          id: m.id,
          title: m.name + " " + (m.model || ""),
          subtitle: m.tipe,
          image: m.image_url,
          link: `/models/${m.slug}`,
          categorySlug: m.category?.slug || "",
        }))
      : dummyModels.map((m) => ({
          ...m,
          categorySlug: m.title.toLowerCase().includes("haval")
            ? "haval"
            : m.title.toLowerCase().includes("tank")
            ? "tank"
            : "ora",
        }));

    return models.filter((m) => m.categorySlug === activeTab);
  };

  const filteredModels = getFilteredModels();

  return (
    <div>
      <div
        className="max-w-7xl mx-auto w-full py-8 xl:py-16 bg-white text-dark px-6 scroll-mt-[120px]"
        id="models"
      >
        <h2 className="text-3xl font-bold text-center mb-6 lg:mb-12">MODELS</h2>

        {/* Tabs */}
        <div
          className="flex justify-center gap-2 md:gap-4 lg:gap-8 mb-6 overflow-x-auto pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: activeTab ? "rgb(59, 130, 246) transparent" : "transparent",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {dataCategories.length > 0
            ? dataCategories.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`flex cursor-pointer flex-col items-center justify-center pb-2 px-4 relative group`}
                >
                  {tab.image_url ? (
                    <Image
                      src={tab.image_url}
                      alt={tab.category}
                      width={100}
                      height={80}
                      className="object-contain cursor-pointer"
                    />
                  ) : (
                    <span
                      className={`text-lg font-semibold ${
                        activeTab === tab.slug
                          ? "text-sky-500"
                          : "text-gray-600 group-hover:text-sky-500"
                      }`}
                    >
                      {tab.category}
                    </span>
                  )}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 transition-transform duration-300 ease-in-out
                      ${activeTab === tab.slug ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                  ></span>
                </button>
              ))
            : modelTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex cursor-pointer flex-col items-center justify-center pb-2 px-4 relative group`}
                >
                  <Image
                    src={tab.logo}
                    alt={tab.label}
                    width={100}
                    height={80}
                    className="object-contain cursor-pointer"
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 transition-transform duration-300 ease-in-out
                      ${activeTab === tab.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                  ></span>
                </button>
              ))}
        </div>

        {/* Model Cards */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {filteredModels.map((car) => (
            <Link
              key={car.id}
              href={car.link}
              className=" group p-4 rounded-lg block relative overflow-hidden 
                         w-full flex items-center gap-4 text-left 
                         sm:w-[calc(50%-12px)] sm:max-w-[300px] sm:flex-col sm:text-center sm:space-y-2 sm:gap-0 
                         md:w-[calc(33.333%-16px)] 
                         lg:w-[calc(25%-18px)]"
            >
              <div className="flex-shrink-0 w-2/5 sm:w-full">
                <div className="aspect-[500/280] relative w-full rounded-md overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-grow sm:flex-none">
                <h4 className="font-semibold text-lg">{car.title}</h4>
                <p className="text-sm text-gray-600">{car.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
