"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React, { useState } from "react";

const ModelsTestDrive = ({ dataModels = [], dataCategories = [] }) => {
  const [activeTab, setActiveTab] = useState(
    dataCategories?.[0]?.id || null
  );

  const getFilteredModels = () => {
    const models =
      dataModels.length > 0
        ? dataModels.map((m) => ({
            id: m.id,
            title: m.model,
            subtitle: m.tipe,
            image: m.main_image_url,
            link: `/models/${m.slug}`,
            category_id: m.category_id, // ✅ pakai category_id
          }))
        : [];

    return models.filter((m) => m.category_id === activeTab);
  };

  const filteredModels = getFilteredModels();

  return (
    <div>
      <div
        className="max-w-7xl mx-auto w-full py-8 xl:py-10 bg-slate-50 text-dark px-6 scroll-mt-[120px]"
        id="models"
      >
        <h2 className="text-3xl font-bold text-center mb-6">MODELS</h2>

        {/* Tabs */}
        <div
          className="flex justify-center gap-2 md:gap-4 lg:gap-8 mb-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {dataCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}  // ✅ pakai id
              className="flex cursor-pointer flex-col items-center justify-center pb-2 px-4 relative group"
            >
              {tab.image ? (
                <Image
                  src={tab.image}
                  alt={tab.category}
                  width={100}
                  height={80}
                  className="object-contain cursor-pointer"
                />
              ) : (
                <span
                  className={`text-lg font-semibold ${
                    activeTab === tab.id
                      ? "text-sky-500"
                      : "text-gray-600 group-hover:text-sky-500"
                  }`}
                >
                  {tab.category}
                </span>
              )}

              <span
                className={`absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 transition-transform duration-300 ease-in-out ${
                  activeTab === tab.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Model Cards */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {filteredModels.map((car) => (
            <Link
              key={car.id}
              href={car.link}
              className="group p-4 rounded-lg block relative overflow-hidden 
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
                <h3 className="font-semibold text-lg">{car.title}</h3>
                <p className="text-sm text-gray-600">{car.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelsTestDrive;
