import Article from '@/components/article/Article';
import GwmArticlesByTag from '@/components/article/Tags';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const meta = {
    id: {
      title: `${slug} | News dan Promo GWM Indonesia`,
      description:
        "Temukan News dan Promo GWM di kota Anda. Dapatkan layanan penjualan, test drive, dan purna jual terbaik.",
      keywords: ["dealer GWM", "lokasi dealer", "dealer mobil Indonesia"],
    },
    en: {
      title: `${slug} | News and Promo GWM Indonesia`,
      description:
        "Find GWM authorized dealers near your location. Sales, test drives, and aftersales service available nationwide.",
      keywords: ["GWM dealers", "Indonesia dealer locations", "GWM service"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/news`,
    ...meta[locale],
  });
}


const page = async ({ params }) => {
  const { locale, slug } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-news.png"
        title={locale == "en" ? "News & Promo" : "News & Promo"}
        subtitle={locale == "en" ? "Visit GWM convenient & premium dealers. Enjoy freshly-brewed free coffee from our barista everyday and book your test drive today." : "Kunjungi dealer GWM yang nyaman dan premium. Nikmati kopi hangat langsung dari barista terbaik, gratis untuk anda setiap hari dan jadwalkan test drive Anda hari ini."}
      />
      <GwmArticlesByTag slugTag={slug}/>
    </div>
  )
}

export default page
