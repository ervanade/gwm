import Article from '@/components/article/Article';
import GwmArticlesByTag from '@/components/article/Tags';
import DealerSection from '@/components/dealers/DealerSection';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { slug, locale } = params;

  const meta = {
    id: {
      title: `Berita GWM Berdasarkan Tag: ${slug} | GWM Inchcape`,
      description:
        `Jelajahi berita dan promo GWM Inchcape dengan tag ${slug}. Dapatkan informasi relevan seputar mobil dan layanan terbaru.`,
      keywords: [`tag ${slug}`, "berita gwm", "promo gwm"],
    },
    en: {
      title: `GWM News by Tag: ${slug} | GWM Inchcape`,
      description:
        `Explore GWM Inchcape’s news and promotions tagged with ${slug}. Get the latest updates on vehicles and services.`,
      keywords: [`tag ${slug}`, "gwm news", "gwm promotions"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/news/tag/${slug}`,
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
      <GwmArticlesByTag slugTag={slug} />
    </div>
  )
}

export default page
