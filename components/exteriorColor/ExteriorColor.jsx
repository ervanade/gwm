"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import classNames from "classnames";

const dummyColorOptions = [
  {
    name: "Crystal Green",
    colorCode: "#ABBCC2",
    image: "/assets/cars/h6/h6-green-front.png",
    thumbnails: [
      "/assets/cars/h6/h6-green-front.png",
      "/assets/cars/h6/h6-green-side.png",
      "/assets/cars/h6/h6-green-rear.png",
    ],
  },
  {
    name: "HB Blue",
    colorCode: "#002B69",
    image: "/assets/cars/h6/h6-blue-side.png",
    thumbnails: ["/assets/cars/h6/h6-blue-side.png", "/assets/cars/h6/h6-blue-rear.png"],
  },
  {
    name: "Ayers Grey",
    colorCode: "#B4BABC",
    image: "/assets/cars/h6/h6-grey-side.png",
    thumbnails: ["/assets/cars/h6/h6-grey-side.png"],
  },
  {
    name: "Hamilton White",
    colorCode: "#DCDDE0",
    image: "/assets/cars/h6/h6-white-side.png",
    thumbnails: ["/assets/cars/h6/h6-white-side.png", "/assets/cars/h6/h6-white-side2.png"],
  },
  {
    name: "Sun Black",
    colorCode: "#000000",
    image: "/assets/cars/h6/h6-black-side.png",
    thumbnails: ["/assets/cars/h6/h6-black-side.png"],
  },
];

export default function ExteriorColorSection({ dataColors }) {
  const parsedApiColors = useMemo(() => {
    if (!dataColors) return null;

    const grouped = Object.values(dataColors).map((items) => {
      const sorted = [...items].sort((a, b) => a.id - b.id);
      return {
        name: sorted[0]?.name || "Color",
        colorCode: sorted[0]?.hexa || "#000000",
        image: sorted[0]?.image_url || "",
        thumbnails: sorted.map((img) => img.image_url),
      };
    });

    return grouped.sort((a, b) => a.name.localeCompare(b.name));
  }, [dataColors]);

  const colorsToUse =
    Array.isArray(parsedApiColors) && parsedApiColors.length > 0
      ? parsedApiColors
      : [];

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(colorsToUse[0]?.image || "");

  const selectedColor = colorsToUse[selectedColorIndex];

  useEffect(() => {
    if (selectedColor) {
      setSelectedThumbnail(selectedColor.image);
    }
  }, [selectedColorIndex]);

  const isEmpty = colorsToUse.length === 0;

  return (
    <section id="exterior" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="lg:px-8 xl:px-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar: Color options */}
        <div className="w-full lg:w-1/5 flex flex-col items-center lg:items-start gap-4">
          <h2 className="text-2xl font-semibold mb-4">Color Options</h2>
          <p className="text-lg font-semibold text-gray-800">
            {isEmpty ? "-" : selectedColor?.name}
          </p>

          {!isEmpty && (
            <div className="flex flex-row lg:flex-col gap-3">
              {colorsToUse.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedColorIndex(idx);
                    setSelectedThumbnail(color.image);
                  }}
                  className={classNames(
                    "p-[6px] rounded-full transition cursor-pointer",
                    selectedColorIndex === idx
                      ? "border-2 border-primary"
                      : "border border-gray-300"
                  )}
                >
                  <div
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                    style={{ backgroundColor: color.colorCode }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Image and Thumbnails */}
        <div className="flex-1">
          {isEmpty ? (
            <div className="w-full flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-300 rounded-lg">
              
          
              <p className="text-lg font-semibold text-gray-600 mb-2">
              Warna belum tersedia untuk model ini.
              </p>
                <p className="text-sm font-base text-gray-500">
                 Kami sedang menyiapkan warna untuk kendaraan ini. Silahkan cek kembali nanti.
                </p>
            </div>
          ) : (
            <>
              <div className="w-full lg:w-4/5 rounded-lg overflow-hidden mb-6">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg relative">
                  <Image
                    src={selectedThumbnail}
                    alt={selectedColor?.name}
                    className="w-full object-cover rounded-lg transition-all duration-300"
                    sizes="100vw"
                    fill
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {(selectedColor?.thumbnails || []).map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedThumbnail(thumb)}
                    className={classNames(
                      "w-20 h-12 lg:w-28 lg:h-16 border rounded-md overflow-hidden cursor-pointer",
                      thumb === selectedThumbnail
                        ? "border-primary"
                        : "border-gray-300 opacity-70"
                    )}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${i}`}
                      width={300}
                      height={168}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
