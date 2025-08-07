import Article from '@/components/article/Article';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Berita & Promo Terbaru GWM | GWM Inchcape Indonesia",
      description:
        "Dapatkan update terbaru tentang GWM Inchcape: promo mobil, peluncuran model baru, dan berita industri otomotif di Indonesia.",
      keywords: ["berita gwm", "promo gwm", "info mobil baru"],
    },
    en: {
      title: "Latest GWM News & Promotions | GWM Inchcape Indonesia",
      description:
        "Stay updated with the latest GWM Inchcape news: car promotions, model launches, and automotive industry insights in Indonesia.",
      keywords: ["gwm news", "car promotion", "automotive indonesia"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/news`,
    ...meta[locale],
  });
}


// async function getDataCategory() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/tags`, {
//     // cache: 'no-store',
//     next: { revalidate: 300 },
//     method: 'GET',
//     headers: {
//       'X-Api-Key': process.env.NEXT_PUBLIC_APP_X_API_KEY,
//     },
//   })
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-news.png"
        title={locale == "en" ? "News & Promo" : "News & Promo"}
        subtitle={locale == "en" ? "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today." : "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini."}
      />
      <Article />
    </div>
  )
}

export default page
