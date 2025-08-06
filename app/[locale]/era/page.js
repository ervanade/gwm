import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import AboutUs from '@/components/discover/About';
import EraDetail from '@/components/discover/EraDetail';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Emergency Roadside Assistance | GWM Inchcape Indonesia",
      description:
        "Temukan lokasi dealer resmi GWM Inchcape terdekat di Indonesia. Dapatkan petunjuk arah, jam operasional, dan informasi kontak untuk kunjungan Anda.",
      keywords: ["dealer GWM", "lokasi dealer", "dealer mobil Indonesia"],
    },
    en: {
      title: "Emergency Roadside Assistance | GWM Inchcape Indonesia",
      description:
        "Find your nearest official GWM Inchcape dealers in Indonesia. Get directions, opening hours, and contact information for your visit.",
      keywords: ["GWM dealers", "Indonesia dealer locations", "GWM service"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/about`,
    ...meta[locale],
  });
}

const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-warranty.jpg"
        title={locale == "en" ? "ERA" : "ERA"}
        subtitle={locale == "en" ? "EMERGENCY ROADSIDE ASSISTANCE" : "EMERGENCY ROADSIDE ASSISTANCE"}
      />
      <EraDetail />
    </div>
  )
}

export default page
