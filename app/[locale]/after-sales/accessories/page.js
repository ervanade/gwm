import DetailAccessories from '@/components/afterSales/DetailAccessories';
import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Aksesoris GWM | GWM Inchcape Indonesia",
      description:
        "Nikmati layanan purna jual GWM terbaik di GWM Inchcape. Dapatkan informasi aksesoris gwm, perawatan kendaraan, suku cadang asli, dan dukungan teknis profesional.",
      keywords: ["aksesoris gwm, layanan purna jual gwm", "after sales gwm", "service gwm"],
    },
    en: {
      title: "GWM Accessories | GWM Inchcape Indonesia",
      description:
        "Enjoy premium after-sales service at GWM Inchcape. From gwm accessories information, vehicle maintenance to genuine parts and expert technical support, we have you covered.",
      keywords: ["gwm accessories, after sales gwm", "gwm service", "genuine parts gwm"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/after-sales/accessories`,
    ...meta[locale],
  });
}


const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-accessories2.png"
        title={locale == "en" ? "Accessories" : "Aksesoris"}
        subtitle={locale == "en" ? "Complete gwm accessories service for your comfort and peace of mind after owning a GWM vehicle." : "Layanan aksesoris gwm lengkap untuk kenyamanan dan ketenangan Anda setelah memiliki kendaraan GWM."}
      />
      <DetailAccessories />
    </div>
  )
}

export default page
