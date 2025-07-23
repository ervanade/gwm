"use client";
import { useState } from "react";
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
    thumbnails: [
      "/assets/cars/h6/h6-blue-side.png",
      "/assets/cars/h6/h6-blue-rear.png",
    ],
  },
  {
    name: "Ayers Grey",
    colorCode: "#B4BABC",
    image: "/assets/cars/h6/h6-grey-side.png",
    thumbnails: [
      "/assets/cars/h6/h6-grey-side.png",
    ],
  },
  {
    name: "Hamilton White",
    colorCode: "#DCDDE0",
    image: "/assets/cars/h6/h6-white-side.png",
    thumbnails: [
      "/assets/cars/h6/h6-white-side.png",
      "/assets/cars/h6/h6-white-side2.png",
    ],
  },
  {
    name: "Sun Black",
    colorCode: "#000000",
    image: "/assets/cars/h6/h6-black-side.png",
    thumbnails: [
      "/assets/cars/h6/h6-black-side.png",
    ],
  },
];

export default function ExteriorColorSection() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    dummyColorOptions[0].image
  );

  const selectedColor = dummyColorOptions[selectedColorIndex];

  return (
    <section id="exterior" className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
     

      <div className="lg:px-8 xl:px-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar: Color options */}
        <div className="w-full lg:w-1/5 flex flex-col items-center lg:items-start gap-4">
        <h2 className="text-2xl font-semibold mb-4">Color Options
        </h2>
          {/* <p className="text-sm uppercase tracking-wide text-gray-500">
            Color Options
          </p> */}
          <p className="text-lg font-semibold text-gray-800">
            {selectedColor.name}
          </p>

          <div className="flex flex-row lg:flex-col gap-3">
            {dummyColorOptions.map((color, idx) => (
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
        </div>

        {/* Main Image and Thumbnails */}
        <div className="flex-1">
          <div className="w-full lg:w-4/5 rounded-lg overflow-hidden mb-6">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg relative">
                          <Image
                           src={selectedThumbnail}
                           alt={selectedColor.name}
                           className="w-full object-cover rounded-lg transition-all duration-300"
                            sizes="100vw"
                            fill
                          />
                        </div>
          </div>

          <div className="flex gap-4">
            {selectedColor.thumbnails.map((thumb, i) => (
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
        </div>
      </div>
    </section>
  );
}
