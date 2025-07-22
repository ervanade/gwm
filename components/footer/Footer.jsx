"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import {
  FaBuilding,
  FaHome,
  FaMapMarker,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaMessage, FaPhoneFlip } from "react-icons/fa6";

const Footer = ({ dataSettings }) => {
  const data = {
    facebook: "https://www.facebook.com/gwmigri/",
    instagram: "https://www.instagram.com/gwmigri/",
    twitter: "",
    tiktok: "https://www.tiktok.com/@gwmigri",
    tokopedia: "",
    shopee: "",
  };

  return (
    <div className="footer">
      <section className="footer bg-[#F6F6F6] text-dark ">
        <div className="container mx-auto max-w-[1200px] px-8  py-12 space-x-3 overflow-hidden">
          <div className="flex justify-around gap-7 flex-col lg:flex-row">
            <div className="center flex-[2_2_0%] space-y-3">
              <ul className="space-y-3">
                <li>
                  <Link href={`/`} className="">
                    {/* <p className="font-bebas text-[40px] text-white">T-SPACE</p> */}
                    <Image
                      src="/logo-gwm.svg"
                      width={120}
                      height={50}
                      alt="Logo"
                    />
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaBuilding size={24} className="!text-2xl" />
                  <span className="text-sm">
                    {dataSettings?.contact2_address
                      ? dataSettings?.contact2_address
                      : ` Jl. Arjuna Utara No.188 kav.89, RT.1/RW.1, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Bara`}
                  </span>
                </li>
                <li className="flex lg:items-center lg:flex-row flex-col gap-4 mt-2">
                  <ul>
                    <li className="flex items-center gap-2">
                      <FaPhoneAlt />
                      <span className="text-sm">
                        {dataSettings?.contact_phone
                          ? dataSettings?.contact_phone
                          : `+62 811-1234-5678`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaMessage />
                      <span className="text-sm">
                        {dataSettings?.contact_email
                          ? dataSettings?.contact_email
                          : `gwmigri@gwminchape.co.id`}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="center flex-1 space-y-3">
              <h3 className="font-bold">GWM MODELS</h3>
              <ul className="space-y-3 lg:pt-4">
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    HAVAL
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    TANK
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    ORA
                  </Link>
                </li>
              </ul>
            </div>

            <div className="center flex-1 space-y-3">
              <h3 className="font-bold">DISCOVER</h3>
              <ul className="space-y-3 lg:pt-4">
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    ABOUT GWM
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    ERA
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </div>

            <div className="center flex-1 space-y-3">
              <h3 className="font-bold">AFTER SALES</h3>
              <ul className="space-y-3 lg:pt-4">
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    WARRANTY
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    ACCESSORIES
                  </Link>
                </li>
              </ul>
            </div>

            <div className="center flex-1 space-y-3">
              <h3 className="font-bold">HELP</h3>
              <ul className="space-y-3 lg:pt-4">
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    TEST DRIVE
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    LOKASI DEALER
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-sm font-normal hover:text-primary"
                  >
                    NEWS & PROMO
                  </Link>
                </li>
              </ul>
            </div>

            <div className="right flex-1 space-y-3 flex flex-col lg:pt-4">
              <h2 className="text-dark font-bold text-sm">FIND US</h2>
              <div className="flex items-center gap-4 pb-5 w-max">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    dataSettings?.facebook
                      ? dataSettings?.facebook
                      : data.facebook
                  }
                >
                  <Image
                    src="/assets/icons/facebook-icon.png"
                    width={24}
                    height={24}
                    alt="Social Media Icons"
                  />{" "}
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    dataSettings?.instagram
                      ? dataSettings?.instagram
                      : data.instagram
                  }
                >
                  <Image
                    src="/assets/icons/ig-icon.png"
                    width={24}
                    height={24}
                    alt="Social Media Icons"
                  />{" "}
                </a>
                {/* <a target="_blank" rel="noopener noreferrer" href={data.threads || "https://threads.com"} ><Image src="/assets/icons/threads-icon.png" width={24} height={24} alt='Social Media Icons' /> </a>
                        <a target="_blank" rel="noopener noreferrer" href={data.twitter || "https://twitter.com"} ><Image src="/assets/icons/x-icon.png" width={24} height={24} alt='Social Media Icons' /> </a> */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    dataSettings?.tiktok ? dataSettings?.tiktok : data.tiktok
                  }
                >
                  <Image
                    src="/assets/icons/tiktok-icon.png"
                    width={24}
                    height={24}
                    alt="Social Media Icons"
                  />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
