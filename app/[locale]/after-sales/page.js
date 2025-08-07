import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Layanan Purna Jual GWM | GWM Inchcape Indonesia",
      description:
        "Nikmati layanan purna jual GWM terbaik di GWM Inchcape. Dapatkan perawatan kendaraan, suku cadang asli, dan dukungan teknis profesional.",
      keywords: ["layanan purna jual gwm", "after sales gwm", "service gwm"],
    },
    en: {
      title: "GWM After-Sales Services | GWM Inchcape Indonesia",
      description:
        "Enjoy premium after-sales service at GWM Inchcape. From vehicle maintenance to genuine parts and expert technical support, we have you covered.",
      keywords: ["after sales gwm", "gwm service", "genuine parts gwm"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/after-sales`,
    ...meta[locale],
  });
}


const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-warranty.jpg"
        title={locale == "en" ? "After Sales" : "After Sales"}
        subtitle={locale == "en" ? "Complete after-sales service for your comfort and peace of mind after owning a GWM vehicle." : "Layanan purna jual lengkap untuk kenyamanan dan ketenangan Anda setelah memiliki kendaraan GWM."}
      />
      <DetailAfterSales />
    </div>
  )
}

export default page
