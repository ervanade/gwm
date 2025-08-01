import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Lokasi Dealer Resmi GWM Indonesia",
      description:
        "Temukan lokasi dealer resmi GWM di kota Anda. Dapatkan layanan penjualan, test drive, dan purna jual terbaik.",
      keywords: ["dealer GWM", "lokasi dealer", "dealer mobil Indonesia"],
    },
    en: {
      title: "Official GWM Dealer Locations in Indonesia",
      description:
        "Find GWM authorized dealers near your location. Sales, test drives, and aftersales service available nationwide.",
      keywords: ["GWM dealers", "Indonesia dealer locations", "GWM service"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/dealer-locations`,
    ...meta[locale],
  });
}

const page = async ({params}) => {
  const { locale } = await params;
  return (
    <div>
       <PageHero
                image="/assets/hero-dealers.png"
                title={locale == "en" ? "Find a Dealer": "Lokasi Dealer"}
                subtitle={locale == "en" ? "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today.": "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini."}
            />
            <DealerSection />
    </div>
  )
}

export default page
