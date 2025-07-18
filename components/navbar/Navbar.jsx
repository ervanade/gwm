"use client";

import { useEffect, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";
import { Locale, routing, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();

  const pathname = usePathname();

  const switchLocale = (lang) => {
    router.replace({ pathname, params }, { locale: lang });
  };

  useEffect(() => {
    const changeColor = () => setColor(window.scrollY > 5);
    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  const navItems = t.raw("items");

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div
      className={`${
        color ? "!bg-[#fff] !text-[#282828] !top-0 shadow-md" : ""
      } navbar-fixed fixed top-0 left-0 w-full z-50 text-white`}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-4 flex items-center">
        {/* LOGO */}
        <div className="left-navbar mr-auto">
          <Link href={`/${locale}/#hero`}>
            <Image
              src={color ? "/logo-gwm.svg" : "/logo-gwm.svg"}
              alt="Logo TSpace"
              width={137}
              height={60}
              className="w-[41px] h-[52px] sm:w-[137px] sm:h-[60px]"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="center-navbar lg:flex space-x-5 hidden items-center">
          {navItems.map((item) =>
            item.link.startsWith("#") ? (
              <button
                key={item.link}
                onClick={() => scrollToId(item.link.replace("#", ""))}
                className={`text-sm ${
                  color
                    ? "text-textDark hover:text-black"
                    : "text-[#fff] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.link}
                href={`/${locale}${item.link}`}
                className={`text-sm ${
                  color
                    ? "text-textDark hover:text-black"
                    : "text-[#fff] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}

          {/* LANGUAGE SWITCHER */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-[60px] text-sm px-2 py-1 rounded border border-gray-600 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] flex items-center justify-between gap-1"
            >
              {locale.toUpperCase()}
              <FaChevronDown className="text-xs" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-[#2a2a2a] border border-gray-600 rounded shadow-md z-50">
                {["id", "en"].map((lng) => (
                  <button
                    key={lng}
                    disabled={locale === lng}
                    onClick={() => {
                      if (locale !== lng) switchLocale(lng);
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
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars className={color ? "text-textDark" : "text-white"} />
        </button>

        {/* MOBILE MENU PANEL */}
        <div
          className={`right-navbar z-50 space-y-6 flex flex-col items-center fixed top-0 ${
            menuOpen ? "right-0" : "-right-[999px]"
          } lg:hidden w-full max-w-[320px] py-12 px-8 bg-[#fff] text-dark h-full duration-300 transition-all ease-in-out shadow-lg`}
        >
          <button
            className="absolute top-5 right-6"
            onClick={() => setMenuOpen(false)}
          >
            <FaBars className="text-3xl text-dark hover:text-secondary transition duration-200" />
          </button>

          {navItems.map((item) =>
            item.link.startsWith("#") ? (
              <button
                key={item.link}
                onClick={() => {
                  scrollToId(item.link.replace("#", ""));
                  setMenuOpen(false);
                }}
                className="text-lg text-dark hover:text-orange-500 font-medium"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.link}
                href={`/${locale}${item.link}`}
                className="text-lg text-dark hover:text-orange-500 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          {/* LANG SWITCH MOBILE */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              {locale.toUpperCase()}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-textDark border rounded shadow-md">
                {["id", "en"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => {
                      switchLocale(lng);
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`overlay w-screen h-screen absolute top-0 left-0 bg-black/20 z-[2] transition-all duration-300 lg:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </div>
  );
};

export default Navbar;
