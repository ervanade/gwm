"use client";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "exterior", label: "Exterior Color" },
  { id: "features", label: "Car Features" },
  { id: "specs", label: "Specification" },
];

export default function ProductNavbar({ modelName = "TANK 500" }) {
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight - 100;
      setIsSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // offset karena sticky navbar (utama + produk)
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={navbarRef}
      className={`w-full  transition-all duration-300 ${
        isSticky ? "fixed top-[90px] bg-white shadow z-[51] border-t border-black/10 " : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between border-b border-gray-200 text-sm font-medium">
        <div className="text-lg font-bold text-gray-800">{modelName}</div>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="hover:text-primary transition cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
