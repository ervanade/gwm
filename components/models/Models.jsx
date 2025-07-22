"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React, { useState } from "react";

// Perbarui data modelTabs untuk menyertakan path logo
const modelTabs = [
  //   { name: "all", label: "ALL", logo: null }, // Tambahkan tab 'All'
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
    link: "/models/tank-500", // Tambahkan properti link
  },
  {
    id: 2,
    image: "/assets/haval-h6.png",
    title: "HAVAL H6",
    subtitle: "SUV Hybrid",
    link: "/models/haval-h6", // Tambahkan properti link
  },
  {
    id: 3,
    image: "/assets/ora.png",
    title: "ORA O3 BEV",
    subtitle: "Electric Hatchback",
    link: "/models/ora-o3-bev", // Tambahkan properti link
  },
  {
    id: 4,
    image: "/assets/tank-300.png",
    title: "TANK 300",
    subtitle: "Premium SUV",
    link: "/models/tank-300", // Tambahkan properti link
  },
  {
    id: 5,
    image: "/assets/haval-jolion.png",
    title: "HAVAL JOLION",
    subtitle: "Smart SUV",
    link: "/models/haval-jolion", // Tambahkan properti link
  },
];

const Models = () => {
  const [activeTab, setActiveTab] = useState("haval"); // Set 'all' sebagai default aktif

  const filteredModels =
    activeTab === "all"
      ? dummyModels
      : dummyModels.filter((m) => m.title.toLowerCase().includes(activeTab));

  return (
    <div>
      <div
        className="max-w-7xl mx-auto w-full py-8 xl:py-16 bg-white text-dark p-8"
        id="models"
      >
        <h2 className="text-3xl font-bold text-center mb-12">MODELS</h2>{" "}
        {/* Tambah mb untuk spasi */}
        <div
          className="flex justify-center  gap-8 mb-6 overflow-x-auto pb-2 scrollbar-hide" // Tambah overflow-x-auto dan scrollbar-hide
          style={{
            // CSS kustom untuk scrollbar, bisa ditambahkan ke global.css atau langsung di sini
            // Untuk scrollbar aktif (biru)
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: activeTab
              ? "rgb(59, 130, 246) transparent"
              : "transparent transparent", // Blue scrollbar for active tab
            WebkitOverflowScrolling: "touch", // For smoother scrolling on iOS
          }}
        >
          {modelTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex cursor-pointer flex-col items-center justify-center pb-2 px-4 relative group
                ${activeTab === tab.name ? "" : ""}`} // Kelas aktif akan ditangani oleh border dan text
            >
              {tab.logo ? (
                <Image
                  src={tab.logo}
                  alt={`${tab.label} Logo`}
                  width={100} // Lebar logo
                  height={80} // Tinggi logo agar sama
                  className="object-contain" // Pastikan gambar tidak terpotong
                />
              ) : (
                // Teks "ALL" jika tidak ada logo
                <span
                  className={`text-lg font-semibold ${
                    activeTab === tab.name
                      ? "text-sky-500"
                      : "text-gray-600 group-hover:text-sky-500"
                  }`}
                >
                  {tab.label}
                </span>
              )}
              {/* Garis biru di bawah tab aktif */}
              <span
                className={`absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 transition-transform duration-300 ease-in-out
                  ${
                    activeTab === tab.name
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50"
                  }`} // Animate border
              ></span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {filteredModels.map((car) => (
            // Bungkus seluruh kartu dengan Link (jika internal) atau tag a
            // Jika menggunakan 'Link' dari next/link, pastikan mengimpornya di atas
            <Link
              key={car.id}
              href={`${car.link}`} // Gunakan properti link dari data
              // Tambahkan group class agar hover pada elemen div bekerja
              className=" group p-4 rounded-lg block relative overflow-hidden 
                         w-full /* Item mengambil lebar penuh di mobile */
                         flex items-center gap-4 text-left /* Layout horizontal: gambar kiri, teks kanan */

                         /* Kelas untuk breakpoint 'sm' (misal: 640px) dan seterusnya: */
                         sm:w-[calc(50%-12px)] /* 2 kolom di breakpoint sm, sesuaikan dengan gap 6 (24px total) */
                         sm:max-w-[300px] /* Batas lebar maksimum per item di sm+ */
                         sm:flex-col sm:text-center sm:space-y-2 sm:gap-0 /* Revert ke layout vertikal, teks di tengah */

                         /* Kelas untuk breakpoint 'md' (misal: 768px) dan seterusnya: */
                         md:w-[calc(33.333%-16px)] /* 3 kolom di breakpoint md, sesuaikan dengan gap 6 */

                         /* Kelas untuk breakpoint 'lg' (misal: 1024px) dan seterusnya: */
                         lg:w-[calc(25%-18px)] /* 4 kolom di breakpoint lg, sesuaikan dengan gap 6 */
                        "
            >
              {/* Kontainer Gambar */}
              <div className="flex-shrink-0 w-1/3 sm:w-full overflow-hidden rounded-md">
                <Image
                  src={car.image}
                  alt={car.title}
                  width={278}
                  height={172}
                  // Tambahkan transisi dan efek scale saat hover pada gambar itu sendiri
                  className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Kontainer Teks */}
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
