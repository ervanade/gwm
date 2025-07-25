"use client";
import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useLocale } from "next-intl";

const allDealers = [
  {
    name: "GWM PONDOK INDAH MALL – 1S",
    area: "Jakarta Selatan",
    address:
      "Pondok Indah Mall 1, GF – Lobby 3A Jl. Metro Pondok Indah No.1, Pd. Pinang, Kec. Kby.Lama, Jakarta Selatan, DKI Jakarta 12310",
    phone: "+62 21 12345678",
    image: "/assets/dealers/pondokindah.png",
    gmaps: "https://maps.app.goo.gl/nzvHYWa8Uw6vrU9v5",
  },
  {
    name: "GWM TOMANG – 3S",
    area: "Jakarta Barat",
    address:
      "Jl. Arjuna Utara No.188 kav.89, RT.1/RW.1, Tj. Duren Sel., Kec. Grogol petamburan, Jakarta Barat, DKI Jakarta 11470",
    phone: "+62 21 23456789",
    image: "/assets/dealers/tomang.png",
    gmaps: "https://maps.app.goo.gl/pSf16TLgpxmqg2877",
  },
  {
    name: "GWM Tank Studio",
    area: "Jakarta Pusat",
    address:
      "Agora Mall, L2 Floor, Jl. M.H. Thamrin No.10, Kb. Melati, Kecamatan Tanah Abang, Jakarta Pusat, DKI Jakarta 10230",
    phone: "+62 21 34567890",
    image: "/assets/dealers/tankstudio.png",
    gmaps: "https://maps.app.goo.gl/9hVyvUmCWpHPr3aW9",
  },
  // Tambah 3 data dummy lagi
//   {
//     name: "GWM KELAPA GADING – 3S",
//     area: "Jakarta Utara",
//     address: "Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara",
//     phone: "+62 21 11112222",
//     image: "/assets/dealers/gading.jpg",
//     gmaps: "https://maps.google.com/?q=Kelapa+Gading",
//   },
//   {
//     name: "GWM BEKASI – 3S",
//     area: "Bekasi",
//     address: "Jl. Ahmad Yani, Bekasi Selatan",
//     phone: "+62 21 22223333",
//     image: "/assets/dealers/bekasi.jpg",
//     gmaps: "https://maps.google.com/?q=GWM+Bekasi",
//   },
//   {
//     name: "GWM BSD – 1S",
//     area: "Tangerang Selatan",
//     address: "The Breeze BSD City, Jl. BSD Grand Boulevard, Tangsel",
//     phone: "+62 21 33334444",
//     image: "/assets/dealers/bsd.jpg",
//     gmaps: "https://maps.google.com/?q=BSD+The+Breeze",
//   },
];

const allAreas = ["All Area", "Jakarta Barat", "Jakarta Selatan", "Jakarta Pusat", "Jakarta Utara", "Bekasi", "Tangerang Selatan"];

export default function DealerSection() {
  const [visible, setVisible] = useState(3);
  const [areaFilter, setAreaFilter] = useState("All Area");
  const locale = useLocale()

  const filtered = areaFilter === "All Area"
    ? allDealers
    : allDealers.filter((d) => d.area === areaFilter);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 bg-white text-dark">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-1">{locale ==  "en" ? "DEALER LOCATIONS": "LOKASI DEALER"}</h2>
          <p className="text-gray-600">{locale ==  "en" ? "Find Official Dealer GWM in Indonesia": "Temukan lokasi dealer resmi GWM di seluruh Indonesia"}</p>
        </div>
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-sm"
        >
          {allAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, visible).map((dealer, idx) => (
          <div key={idx} className="rounded-lg  shadow-sm overflow-hidden">
            <div className="aspect-[4/3] relative w-full">
              <Image
                src={dealer.image}
                alt={dealer.name}
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg">{dealer.name}</h3>
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary mt-1 text-base" /> {dealer.address}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaPhoneAlt className="text-primary" /> {dealer.phone}
              </p>
              <div className="flex gap-2 pt-2 ">
                <button className="text-sm px-4 py-1.5 border border-primary text-primary rounded">
                  Detail
                </button>
                <a
                  href={dealer.gmaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                  Lihat di Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible < filtered.length && (
        <div className="flex justify-center mt-8 ">
          <button onClick={() => setVisible(visible + 3)} className="px-6 py-3 rounded-md cursor-pointer hover:bg-primary hover:text-white border border-primary text-primary">
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
