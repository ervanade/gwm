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
        "Temukan lokasi dealer resmi GWM Inchcape terdekat di Jakarta & sekitarnya. Dapatkan petunjuk lokasi, jam operasional, dan informasi kontak untuk kunjungan Anda.",
      keywords: ["dealer GWM", "lokasi dealer", "dealer mobil Indonesia"],
    },
    en: {
      title: "Nearest GWM Inchcape Official Dealers Location | GWM Inchcape Indonesia",
      description:
        "Find the nearest authorized GWM Inchcape dealer in Jakarta and the surrounding area. Get directions, operating hours, and contact information for your visit.",
      keywords: ["GWM dealers", "Indonesia dealer locations", "GWM service"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/dealer-locations`,
    ...meta[locale],
  });
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/dealer`, {
    // cache: 'no-store',
    next: { revalidate: 300 },
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_APP_X_API_KEY,
    },
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const page = async ({ params }) => {
  const { locale } = await params;
  const { data } = await getData()

  return (
    <div>
      <PageHero
        image="/assets/hero-dealers2.jpg"
        title={locale == "en" ? "Find a Dealer" : "Lokasi Dealer"}
        subtitle={locale == "en" ? "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today." : "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini."}
      />
      <DealerSection dataDealers={data} />
    </div>
  )
}

export default page
