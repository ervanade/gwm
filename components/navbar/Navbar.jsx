"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data dummy (fallback)
const modelTabs = ["all", "tank", "haval", "ora"];
const dummyModels = [
  {
    id: 1,
    image: "/assets/tank-500.png",
    title: "TANK 500",
    subtitle: "Luxury Offroad",
    link: "/models/tank-500",
  },
  {
    id: 4,
    image: "/assets/tank-300.png",
    title: "TANK 300",
    subtitle: "Premium SUV",
    link: "/models/tank-300-hev",
  },
  {
    id: 2,
    image: "/assets/haval-h6.png",
    title: "HAVAL H6",
    subtitle: "SUV Hybrid",
    link: "/models/haval-h6",
  },
  {
    id: 6,
    image: "/assets/haval-jolion-hev.png",
    title: "HAVAL JOLION",
    subtitle: "JOLION HEV",
    link: "/models/haval-jolion-hev",
  },
  {
    id: 5,
    image: "/assets/haval-jolion.png",
    title: "HAVAL JOLION",
    subtitle: "JOLION ULTRA HEV",
    link: "/models/haval-jolion-ultra-hev",
  },
  {
    id: 3,
    image: "/assets/ora.png",
    title: "ORA O3 BEV",
    subtitle: "Electric Hatchback",
    link: "/models/ora-o3-bev",
  },
];

// Perubahan: Navbar sekarang menerima `dataModels` sebagai prop
const Navbar = ({ dataModels }) => {
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
    const isHomepageOrModelDetailPage =
      pathname === "/" ||
      pathname.startsWith("/models/") ||
      pathname.startsWith("/test-drive") ||
      pathname.startsWith("/dealer-locations");

    const handleScrollColor = () => {
      if (window.scrollY > 5) {
        setColor(true);
      } else {
        setColor(!isHomepageOrModelDetailPage);
      }
    };

    setColor(!isHomepageOrModelDetailPage);

    window.addEventListener("scroll", handleScrollColor);
    return () => {
      window.removeEventListener("scroll", handleScrollColor);
    };
  }, [pathname]);

  useEffect(() => {
    setMegaMenuOpen(null);
    setMenuOpen(false);
    setMenuLevel("main");
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMegaMenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const navItems = t.raw("items");
  const subMenu = [
    { name: "ABOUT US", name_id: "TENTANG KAMI", link: "/about" },
    { name: "ERA", name_id: "ERA", link: "/era" },
  ];

  // Perubahan: Logika untuk memilih data model dari API atau dummy
  // Logika mapping disesuaikan dengan contoh `Models` component Anda
  const getModelsWithCategories = () => {
    const models =
      dataModels && dataModels.length > 0
        ? dataModels.map((m) => ({
            id: m.id,
            image: m.main_image_url,
            title: m.model,
            subtitle: m.tipe,
            link: `/models/${m.slug}`,
            category: m.model?.toLowerCase() || "",
          }))
        : dummyModels.map((m) => ({
            ...m,
            category: m.title.toLowerCase().includes("haval")
              ? "haval"
              : m.title.toLowerCase().includes("tank")
              ? "tank"
              : "ora",
          }));
    return models;
  };

  const modelsWithCategories = getModelsWithCategories();

  const filteredModels =
    activeTab === "all"
      ? modelsWithCategories
      : modelsWithCategories.filter((m) => m.category.includes(activeTab));

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[55] ${
        color ? "bg-[#fff] shadow text-[#282828] !sticky" : "text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-2 lg:py-4 flex items-center justify-between text-xs xl:text-sm font-bold">
        <Link href={`/${locale}/#hero`}>
          <Image
            src="/logo-gwm.svg"
            alt="Logo GWM"
            width={137}
            height={60}
            className="w-[114px] h-[50px] lg:w-[137px] lg:h-[60px]"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-4 lg:gap-6">
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
                    className={`flex items-center gap-1 hover:text-sky-400 cursor-pointer`}
                  >
                    {item.label} <FaChevronDown className="text-xs" />
                  </button>
                  {megaMenuOpen === "models" && (
                    <div className="fixed left-0 right-0 w-full overflow-y-auto bg-white text-dark shadow-xl px-8 lg:px-16 py-8 z-[53] transition-all duration-300 h-[80vh] top-[72px]">
                      <div className="max-w-7xl mx-auto ">
                        <h3 className="text-xl font-semibold mb-4">
                          GWM MODELS
                        </h3>
                        <div className="flex gap-6 mb-6">
                          {modelTabs.map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`pb-1 cursor-pointer border-b-2 ${
                                activeTab === tab
                                  ? "border-primary text-primary font-semibold"
                                  : "border-transparent hover:text-primary"
                              }`}
                            >
                              {tab.toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6">
                          {filteredModels.map((car) => (
                            <Link
                              key={car.id}
                              href={`/${locale}${car.link}`}
                              className=" group"
                            >
                              <div className="space-y-2 text-center">
                                <Image
                                  src={car.image}
                                  alt={car.title}
                                  width={500}
                                  height={280}
                                  className="w-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                />
                                <h4 className="font-semibold text-lg">
                                  {car.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {car.subtitle}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (
              item.label.toLowerCase() === "tentang gwm" ||
              item.label.toLowerCase() === "discover gwm"
            ) {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() =>
                      setMegaMenuOpen(
                        megaMenuOpen === "discover" ? null : "discover"
                      )
                    }
                    className="flex items-center gap-1 hover:text-sky-400 cursor-pointer"
                  >
                    {item.label} <FaChevronDown className="text-xs" />
                  </button>
                  {(megaMenuOpen === "discover gwm" ||
                    megaMenuOpen === "tentang gwm" ||
                    megaMenuOpen === "discover") && (
                    <div className="absolute top-full mt-2 bg-white text-dark rounded shadow-md p-4 min-w-[200px] z-[54]">
                      {subMenu.map((sub, i) => (
                        <Link
                          key={i}
                          href={`/${locale}${sub.link}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 rounded font-bold"
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
                className="hover:text-sky-400 cursor-pointer"
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
              <div className="absolute right-0 mt-2 bg-[#fff]  cursor-pointer rounded shadow-md z-[60]">
                {["id", "en"].map((lng) => (
                  <button
                    key={lng}
                    disabled={locale === lng}
                    onClick={() => {
                      switchLocale(lng);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition cursor-pointer ${
                      locale === lng
                        ? "bg-primary text-white font-bold cursor-default"
                        : "text-[#282828] hover:bg-[#ededed]"
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={`/${locale}/test-drive`}
            aria-label="button"
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm"
          >
            Test Drive
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className={`lg:hidden ${
            color ? "text-dark" : "text-white"
          } text-2xl cursor-pointer`}
        >
          <FaBars />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-auto fixed inset-0 z-[52] bg-white text-dark p-6 transition-transform duration-300 ease-in-out max-h-screen ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href={`/${locale}`}>
            <Image src="/logo-gwm.svg" width={120} height={50} alt="Logo GWM" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {menuLevel === "main" && (
          <div className="space-y-1 border-t border-gray-200 divide-y divide-gray-200 text-lg">
            {navItems.map((item, index) => {
              const label =
                locale === "id" && item.label_id ? item.label_id : item.label;
              const hasSubMenu = [
                "models",
                "discover gwm",
                "tentang gwm",
              ].includes(item.label.toLowerCase());

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (hasSubMenu) {
                      setMenuLevel(
                        item.label.toLowerCase() === "models"
                          ? "models"
                          : "discover"
                      );
                    } else {
                      router.push(`/${item.link}`);
                      setMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-between py-3 text-lg font-semibold text-gray-800 hover:text-primary cursor-pointer"
                >
                  <span>{label}</span>
                  {hasSubMenu && (
                    <FaChevronRight className="text-sm text-gray-500" />
                  )}
                </button>
              );
            })}

            <div className="relative px-1 py-3">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
              >
                {locale.toUpperCase()} <FaChevronDown className="text-xs" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white  rounded shadow-md z-50">
                  {["id", "en"].map((lng) => (
                    <button
                      key={lng}
                      disabled={locale === lng}
                      onClick={() => {
                        switchLocale(lng);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        locale === lng
                          ? "bg-primary text-white font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <a
                href={`/${locale}/test-drive`}
                className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-lg"
              >
                Test Drive
              </a>
            </div>
          </div>
        )}

        {/* MODELS SUBMENU */}
        {menuLevel === "models" && (
          <div className="flex flex-col h-full">
            <button
              onClick={() => setMenuLevel("main")}
              className="mb-4 hover:text-primary font-bold text-lg flex items-center gap-2 cursor-pointer"
            >
              <FaChevronLeft /> MODELS
            </button>

            <div className="flex gap-4 border-b border-gray-500 pb-2 mt-2">
              {modelTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 font-semibold cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-dark"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid gap-1 lg:gap-4 mt-4">
              {filteredModels.map((car) => (
                <Link
                  key={car.id}
                  href={`/${locale}${car.link}`}
                  className=" group p-4 rounded-lg block relative overflow-hidden 
                                         w-full /* Item mengambil lebar penuh di mobile */
                                         flex items-center gap-4 text-left /* Layout horizontal: gambar kiri, teks kanan */
                
                                         /* Kelas untuk breakpoint 'sm' (misal: 640px) dan seterusnya: */
                                         lg:w-[calc(50%-12px)] /* 2 kolom di breakpoint sm, sesuaikan dengan gap 6 (24px total) */
                                         lg:max-w-[300px] /* Batas lebar maksimum per item di sm+ */
                                         lg:flex-col lg:text-center lg:space-y-2 lg:gap-0 /* Revert ke layout vertikal, teks di tengah */
                
                                         /* Kelas untuk breakpoint 'md' (misal: 768px) dan seterusnya: */
                                         md:w-[calc(50%)] /* 3 kolom di breakpoint md, sesuaikan dengan gap 6 */
                
                                         /* Kelas untuk breakpoint 'lg' (misal: 1024px) dan seterusnya: */
                                        "
                >
                  {/* Kontainer Gambar */}
                  <div className="flex-shrink-0 w-2/5 lg:w-full overflow-hidden rounded-md">
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
                  {/* Kontainer Teks */}
                  <div className="flex-grow sm:flex-none">
                    <h4 className="font-semibold text-lg">{car.title}</h4>
                    <p className="text-sm text-gray-600">{car.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* DISCOVER SUBMENU */}
        {menuLevel === "discover" && (
          <div>
            <button
              onClick={() => setMenuLevel("main")}
              className="mb-6 hover:text-primary font-bold text-lg flex items-center gap-2 cursor-pointer"
            >
              <FaChevronLeft /> {locale === "id" ? "TENTANG GWM" : "DISCOVER"}
            </button>
            <div className="space-y-3 ">
              {subMenu.map((item, i) => (
                <Link
                  key={i}
                  href={`/${locale}${item.link}`}
                  onClick={() => setMenuOpen(false)}
                  className="block font-semibold text-lg text-gray-800 hover:text-primary "
                >
                  {locale === "id" ? item.name_id : item.name}
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
