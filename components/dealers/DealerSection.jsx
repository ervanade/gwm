"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useLocale } from "next-intl";

// Dummy fallback jika API gagal
const fallbackDealers = [
  {
    name: "GWM PONDOK INDAH MALL – 1S",
    area: "Jakarta Selatan",
    address:
      "Pondok Indah Mall 1, GF – Lobby 3A Jl. Metro Pondok Indah No.1, Pd. Pinang, Kec. Kby.Lama, Jakarta Selatan, DKI Jakarta 12310",
    phone: "+62 21 12345678",
    image: "/assets/dealers/pondokindah.png",
    gmaps: "https://maps.app.goo.gl/nzvHYWa8Uw6vrU9v5",
    slug: "gwm-pondok-indah-mall-1s",
  },
  {
    name: "GWM TOMANG – 3S",
    area: "Jakarta Barat",
    address:
      "Jl. Arjuna Utara No.188 kav.89, RT.1/RW.1, Tj. Duren Sel., Kec. Grogol petamburan, Jakarta Barat, DKI Jakarta 11470",
    phone: "+62 21 23456789",
    image: "/assets/dealers/tomang.png",
    gmaps: "https://maps.app.goo.gl/pSf16TLgpxmqg2877",
    slug: "gwm-tomang-3s",
  },
  {
    name: "GWM Tank Studio",
    area: "Jakarta Pusat",
    address:
      "Agora Mall, L2 Floor, Jl. M.H. Thamrin No.10, Kb. Melati, Kecamatan Tanah Abang, Jakarta Pusat, DKI Jakarta 10230",
    phone: "+62 21 34567890",
    image: "/assets/dealers/tankstudio.png",
    gmaps: "https://maps.app.goo.gl/9hVyvUmCWpHPr3aW9",
    slug: "gwm-tank-studio",
  },
];

export default function DealerSection({ dataDealers }) {
  const [visible, setVisible] = useState(6);
  const [areaFilter, setAreaFilter] = useState("All Area");
  const locale = useLocale();

  // Normalize data: dari API jika ada, fallback ke dummy
  const dealers = useMemo(() => {
    if (!dataDealers?.length) return fallbackDealers;

    return dataDealers.map((d) => ({
      name: d.name || d.title,
      area: d.area || "JAKARTA",
      address: d.location,
      phone: d.phone,
      image: d.image,
      gmaps: d.maps,
      slug: d.slug,
    }));
  }, [dataDealers]);

  // Buat daftar area unik dari data
  const areaList = useMemo(() => {
    const areas = dealers.map((d) => d.area?.toUpperCase() || "LAINNYA");
    const unique = [...new Set(areas)];
    return ["All Area", ...unique];
  }, [dealers]);

  const filtered =
    areaFilter === "All Area"
      ? dealers
      : dealers.filter((d) => d.area?.toUpperCase() === areaFilter);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 bg-white text-dark">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-1">
            {locale === "en" ? "DEALER LOCATIONS" : "LOKASI DEALER"}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {locale === "en"
              ? "Find Official Dealer GWM in Indonesia"
              : "Temukan lokasi dealer resmi GWM di seluruh Indonesia"}
          </p>
        </div>
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-sm"
        >
          {areaList.map((area) => (
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
              <p className="text-sm text-sm md:text-base text-gray-600 flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary mt-1 text-base" />
                {dealer.address}
              </p>
              <p className="text-sm text-sm md:text-base text-gray-600 flex items-center gap-2">
                <FaPhoneAlt className="text-primary" /> {dealer.phone}
              </p>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/${locale}/dealer-locations/${dealer.slug}`}
                  className="text-sm px-4 py-1.5 border border-primary text-primary rounded"
                >
                  Detail
                </Link>
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
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisible(visible + 3)}
            className="px-6 py-3 rounded-md cursor-pointer hover:bg-primary hover:text-white border border-primary text-primary"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
