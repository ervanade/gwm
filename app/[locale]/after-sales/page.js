import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Lokasi Dealer GWM Inchcape Terdekat | GWM Inchcape Indonesia",
      description:
        "Temukan lokasi dealer resmi GWM Inchcape terdekat di Indonesia. Dapatkan petunjuk arah, jam operasional, dan informasi kontak untuk kunjungan Anda.",
      keywords: ["dealer GWM", "lokasi dealer", "dealer mobil Indonesia"],
    },
    en: {
      title: "Nearest GWM Inchcape Official Dealers Location | GWM Inchcape Indonesia",
      description:
        "Find your nearest official GWM Inchcape dealers in Indonesia. Get directions, opening hours, and contact information for your visit.",
      keywords: ["GWM dealers", "Indonesia dealer locations", "GWM service"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/dealer-locations`,
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
        subtitle={locale == "en" ? "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today." : "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini."}
      />
      <DetailAfterSales />
    </div>
  )
}

export default page
