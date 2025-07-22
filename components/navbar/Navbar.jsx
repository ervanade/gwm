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
    // Menentukan apakah halaman saat ini adalah homepage atau halaman detail model
    // `pathname` dari `usePathname()` adalah path tanpa prefix locale, contoh: '/', '/about', '/models/tank-500'
    const isHomepageOrModelDetailPage =
      pathname === "/" || pathname.startsWith("/models/");

    const handleScrollColor = () => {
      if (window.scrollY > 5) {
        // Jika di-scroll ke bawah, navbar selalu solid (color: true)
        setColor(true);
      } else {
        // Jika di paling atas halaman (scrollY <= 5)
        // Navbar solid jika BUKAN homepage/models detail page (color: true)
        // Navbar transparan jika homepage/models detail page (color: false)
        setColor(!isHomepageOrModelDetailPage);
      }
    };

    // Set warna awal navbar saat komponen di-mount atau pathname berubah
    // Ini adalah kondisi default saat scrollY = 0
    setColor(!isHomepageOrModelDetailPage);

    // Tambahkan event listener untuk scroll
    window.addEventListener("scroll", handleScrollColor);

    // Cleanup event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScrollColor);
    };
  }, [pathname]);

  useEffect(() => {
    // Tutup MegaMenu setiap kali route/path berubah
    setMegaMenuOpen(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMegaMenuOpen(null);
      }
    };
    // Gunakan event 'click' dan capture: true agar tetap menangkap event dari Swiper
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const navItems = t.raw("items");
  const subMenu = [
    { name: "ABOUT US", name_id: "TENTANG KAMI", link: "/about" },
    { name: "ERA", name_id: "ERA", link: "/era" },
  ];

  const filteredModels =
    activeTab === "all"
      ? dummyModels
      : dummyModels.filter((m) => m.title.toLowerCase().includes(activeTab));

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        color ? "bg-[#fff] shadow text-[#282828]" : "text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4 flex items-center justify-between text-sm font-bold">
        <Link href={`/${locale}/#hero`}>
          <Image
            src="/logo-gwm.svg"
            alt="Logo GWM"
            width={137}
            height={60}
            className="w-[137px] h-[60px]"
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
                    <div
                      // Style dan class untuk positioning (top, height, fixed, full width)
                      className="fixed left-0 right-0 w-full overflow-y-auto bg-white text-dark shadow-xl p-8 lg:p-12 z-40 transition-all duration-300 h-[80vh] top-[72px]"
                    >
                      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                        {" "}
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
                              href={`/${locale}/${car.link}`} // Gunakan properti link dari data
                              // Tambahkan group class agar hover pada elemen div bekerja
                              className=" group"
                            >
                              <div
                                key={car.id}
                                className="space-y-2 text-center"
                              >
                                <Image
                                  src={car.image}
                                  alt={car.title}
                                  width={278}
                                  height={172}
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
              <div className="absolute right-0 mt-2 bg-[#fff]  cursor-pointer rounded shadow-md z-50">
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
            href={`/${locale}/testdrive`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="button"
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm"
          >
            Test Drive
          </a>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`lg:hidden ${color ? "text-dark" : "text-white"} text-2xl`}
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE PANEL */}
      <div
        className={`lg:hidden overflow-auto fixed inset-0 z-50 bg-[#fff] text-dark p-6 transition-transform duration-300 ease-in-out max-h-screen ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Image src="/logo-gwm.svg" width={120} height={50} alt="Logo GWM" />
          <button onClick={() => setMenuOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {menuLevel === "main" && (
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="block w-full text-left text-lg cursor-pointer hover:text-primary font-bold"
                onClick={() => {
                  if (item.label.toLowerCase() === "models") {
                    setMenuLevel("models");
                  } else if (
                    item.label.toLowerCase() === "discover gwm" ||
                    item.label.toLowerCase() === "tentang gwm"
                  ) {
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
              className="mb-4 text-sky-400 cursor-pointer "
            >
              ← Back to menu
            </button>
            <h3 className="text-lg font-semibold">GWM MODELS</h3>
            <div className="flex gap-4 border-b border-gray-500 pb-2 mt-2">
              {modelTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 cursor-pointer hover:text-primary ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-dark"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="grid gap-2 mt-4">
              {filteredModels.map((car) => (
                <Link
                  key={car.id}
                  href={`/${locale}${car.link}`} // Gunakan properti link dari data
                  // Tambahkan group class agar hover pada elemen div bekerja
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
        )}

        {menuLevel === "discover" && (
          <div>
            <button
              onClick={() => setMenuLevel("main")}
              className="mb-4  text-sky-400 "
            >
              ← Back to menu
            </button>
            <div className="space-y-2">
              {subMenu.map((sub, i) => (
                <Link
                  key={i}
                  href={`/${locale}${sub.link}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-dark hover:text-sky-400"
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
