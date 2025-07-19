"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const modelTabs = ["all", "tank", "haval", "ora"];
const dummyModels = [
  {
    id: 1,
    image: "/assets/tank-500.png",
    title: "TANK 500",
    subtitle: "Luxury Offroad",
  },
  {
    id: 2,
    image: "/assets/haval-h6.png",
    title: "HAVAL H6",
    subtitle: "SUV Hybrid",
  },
  {
    id: 3,
    image: "/assets/ora.png",
    title: "ORA O3 BEV",
    subtitle: "Electric Hatchback",
  },
  {
    id: 4,
    image: "/assets/tank-300.png",
    title: "TANK 300",
    subtitle: "Premium SUV",
  },
  {
    id: 5,
    image: "/assets/haval-jolion.png",
    title: "HAVAL JOLION",
    subtitle: "Smart SUV",
  },
];

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [menuLevel, setMenuLevel] = useState("main");

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const menuRef = useRef(null);

  const switchLocale = (lang) => {
    router.replace({ pathname, params }, { locale: lang });
  };

  useEffect(() => {
    const changeColor = () => setColor(window.scrollY > 5);
    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMegaMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = t.raw("items");
  const subMenu = [
    { name: "About Us", name_id: "Tentang Kami", link: "/about" },
    { name: "ERA", name_id: "ERA", link: "/era" },
  ];

  const filteredModels =
    activeTab === "all"
      ? dummyModels
      : dummyModels.filter((m) => m.title.toLowerCase().includes(activeTab));

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        color ? "bg-[#fff] shadow-md text-[#282828]" : "text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4 flex items-center justify-between ">
        <Link href={`/${locale}/#hero`}>
          <Image
            src="/logo-gwm.svg"
            alt="Logo GWM"
            width={137}
            height={60}
            className="w-[137px] h-[60px]"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => {
            if (item.label.toLowerCase() === "models") {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() =>
                      setMegaMenuOpen(
                        megaMenuOpen === "models" ? null : "models"
                      )
                    }
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    {item.label} <FaChevronDown className="text-xs" />
                  </button>
                  {megaMenuOpen === "models" && (
                    <div className="absolute left-[245%] -translate-x-1/2 top-full -ml-2 mt-8 w-screen max-w-7xl max-h-[80vh] overflow-auto bg-white text-dark shadow-xl p-8">
                      <h3 className="text-xl font-semibold mb-4">GWM Models</h3>
                      <div className="flex gap-6 mb-6">
                        {modelTabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-1 border-b-2 ${
                              activeTab === tab
                                ? "border-sky-500 text-sky-500 font-semibold"
                                : "border-transparent hover:text-sky-500"
                            }`}
                          >
                            {tab.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {filteredModels.map((car) => (
                          <div key={car.id} className="space-y-2 text-center">
                            <Image
                              src={car.image}
                              alt={car.title}
                              width={300}
                              height={200}
                              className="w-full h-40 object-cover rounded-md"
                            />
                            <h4 className="font-semibold text-lg">
                              {car.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {car.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (item.label.toLowerCase() === "discover") {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() =>
                      setMegaMenuOpen(
                        megaMenuOpen === "discover" ? null : "discover"
                      )
                    }
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    {item.label} <FaChevronDown className="text-xs" />
                  </button>
                  {megaMenuOpen === "discover" && (
                    <div className="absolute top-full mt-2 bg-white text-dark rounded shadow-md p-4 min-w-[200px]">
                      {subMenu.map((sub, i) => (
                        <Link
                          key={i}
                          href={`/${locale}${sub.link}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                        >
                          {locale === "id" ? sub.name_id : sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={`/${locale}${item.link}`}
                className="hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-2 py-1 rounded  border-white cursor-pointer flex items-center gap-1"
            >
              {locale.toUpperCase()} <FaChevronDown className="text-xs" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-[#2a2a2a] cursor-pointer border border-gray-600 rounded shadow-md z-50">
                {["id", "en"].map((lng) => (
                  <button
                    key={lng}
                    disabled={locale === lng}
                    onClick={() => {
                      switchLocale(lng);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition ${
                      locale === lng
                        ? "bg-sky-500 text-white font-bold cursor-default"
                        : "text-white hover:bg-[#3a3a3a]"
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://wa.me/+6281181110556"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="button"
            className="bg-sky-500 text-white px-6 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold text-sm"
          >
            Test Drive
          </a>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE PANEL */}
      <div
        className={`lg:hidden overlow-auto fixed inset-0 z-50 bg-[#3D3D3D] text-white p-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Image src="/logo-gwm.svg" width={120} height={50} alt="Logo" />
          <button onClick={() => setMenuOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {menuLevel === "main" && (
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="block w-full text-left text-lg"
                onClick={() => {
                  if (item.label.toLowerCase() === "models") {
                    setMenuLevel("models");
                  } else if (item.label.toLowerCase() === "discover") {
                    setMenuLevel("discover");
                  } else {
                    router.push(`/${locale}${item.link}`);
                    setMenuOpen(false);
                  }
                }}
              >
                {locale === "id" && item.label_id ? item.label_id : item.label}
              </button>
            ))}
          </div>
        )}

        {menuLevel === "models" && (
          <div>
            <button
              onClick={() => setMenuLevel("main")}
              className="mb-4 text-sm text-sky-400 underline"
            >
              ← Back to menu
            </button>
            <h3 className="text-lg font-semibold">GWM Models</h3>
            <div className="flex gap-4 border-b border-gray-500 pb-2 mt-2">
              {modelTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 ${
                    activeTab === tab
                      ? "border-b-2 border-sky-500 text-sky-500"
                      : "text-white/70"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="grid gap-4 mt-4">
              {filteredModels.map((car) => (
                <div key={car.id} className="space-y-2">
                  <Image
                    src={car.image}
                    alt={car.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h4 className="font-semibold">{car.title}</h4>
                  <p className="text-sm text-white/70">{car.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {menuLevel === "discover" && (
          <div>
            <button
              onClick={() => setMenuLevel("main")}
              className="mb-4 text-sm text-sky-400 underline"
            >
              ← Back to menu
            </button>
            <div className="space-y-2">
              {subMenu.map((sub, i) => (
                <Link
                  key={i}
                  href={`/${locale}${sub.link}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white hover:text-sky-400"
                >
                  {locale === "id" ? sub.name_id : sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
