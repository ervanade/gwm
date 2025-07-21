'use client';
import { FaDownload, FaMapMarkerAlt, FaCar, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoDocumentOutline } from "react-icons/io5";

const menuItems = [
  { label: "Brochure", icon: <IoDocumentOutline />, link: "/brochure" },
  { label: "Dealer", icon: <FaMapMarkerAlt />, link: "/dealer-location" },
  { label: "Test Drive", icon: <FaCar />, link: "/test-drive" },
  { label: "Contact", icon: <FaPhoneAlt />, link: "/contact" },
  { label: "WhatsApp", icon: <FaWhatsapp />, link: "https://wa.me/6281234567890" },
];

export default function StickyMenu() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
          <a
            key={index}
            href={item.link}
            target={item.label === "WhatsApp" ? "_blank" : "_self"}
            className="flex flex-col items-center text-[10px] text-white hover:text-yellow-300"
          >
            <div className="text-lg mb-1">{item.icon}</div>
            {item.label}
          </a>
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
          <a
            key={index}
            href={item.link}
            target={item.label === "WhatsApp" ? "_blank" : "_self"}
            className={`flex items-center gap-2 px-2 py-2 border-b border-primary transition-all duration-300 ${
              isHovered ? 'w-40 pl-3' : 'w-12 justify-center'
            } hover:bg-primary`}
          >
            <span className="text-lg">{item.icon}</span>
            {isHovered && <span>{item.label}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
