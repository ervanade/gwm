"use client";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "exterior", label: "Exterior Color" },
  { id: "features", label: "Car Features" },
  { id: "specs", label: "Specification" },
];

export default function ProductNavbar({ modelName = "TANK 500" }) {
  const [isSticky, setIsSticky] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8 - 80;
      setIsSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`w-full transition-all duration-200 ${
        isSticky
          ? "fixed top-[90px] bg-white shadow z-[51] border-t border-black/10"
          : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex flex-row lg:flex-row items-start lg:items-center justify-between border-b border-gray-200 gap-2">
        {/* Model Name */}
        <div className="text-lg font-bold text-gray-800 min-w-max">
          {modelName}
        </div>

        {/* Scrollable Sections */}
        <div className="w-full lg:w-auto overflow-x-auto scroll-smooth">
          <div
            ref={scrollRef}
            className="flex gap-3 min-w-max pb-1 border-b border-gray-200"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-sm lg:text-base cursor-pointer whitespace-nowrap px-3 py-1 border-b-2 border-transparent hover:border-primary hover:text-primary transition font-medium text-dark"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
