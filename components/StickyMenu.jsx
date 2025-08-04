"use client";
import {
  FaDownload,
  FaMapMarkerAlt,
  FaCar,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import { Link } from "@/i18n/navigation";



export default function StickyMenu({data}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
  { label: "Brochure", icon: <IoDocumentOutline />, link: data?.link_brochure || "/" },
  { label: "Dealer", icon: <FaMapMarkerAlt />, link: "/dealer-locations" },
  { label: "Test Drive", icon: <FaCar />, link: "/test-drive" },
  { label: "Contact", icon: <FaPhoneAlt />, link: "/contact" },
  {
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    link: `https://wa.me/${data?.whatsapp || ""}`,
  },
];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // ✅ Sticky Bottom Menu for Mobile
    return (
      <div className="fixed bottom-0 w-full bg-primary z-50 flex justify-around py-2 shadow-md">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target={item.label === "WhatsApp" || item.label === "Brochure" ? "_blank" : "_self"}
            className="flex flex-col items-center text-[10px] text-white hover:text-sky-200 cursor-pointer"
          >
            <div className="text-lg mb-1">{item.icon}</div>
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  // ✅ Desktop Vertical Hover Menu
  return (
    <div
      className="fixed right-0 top-2/5 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-primary text-white text-xs rounded-l-md overflow-hidden shadow-md transition-all duration-300">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target={item.label === "WhatsApp" || item.label === "Brochure" ? "_blank" : "_self"}
            className={`flex items-center gap-2 px-2 py-2 border-b border-primary transition-all duration-300 cursor-pointer ${
              isHovered ? "w-40 pl-3" : "w-12 justify-center"
            } hover:bg-primary`}
          >
            <span className="text-lg">{item.icon}</span>
            {isHovered && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
