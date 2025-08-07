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
      title: "Bantuan Darurat GWM | Emergency Roadside Assistance",
      description:
        "Layanan Emergency Roadside Assistance dari GWM Inchcape siap membantu Anda kapan pun dibutuhkan. Aman berkendara bersama dukungan terpercaya kami.",
      keywords: ["bantuan darurat gwm", "gwm ERA", "emergency roadside"],
    },
    en: {
      title: "GWM Emergency Roadside Assistance | ERA Service",
      description:
        "GWM Inchcape’s Emergency Roadside Assistance ensures your peace of mind on every journey. Get support anytime, anywhere across Indonesia.",
      keywords: ["gwm emergency", "roadside assistance", "ERA gwm"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/era`,
    ...meta[locale],
  });
}


const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-era.jpg"
        title={locale == "en" ? "ERA" : "ERA"}
        subtitle={locale == "en" ? "GWM Inchcape’s Emergency Roadside Assistance ensures your peace of mind on every journey. Get support anytime, anywhere across Indonesia." : "Layanan Emergency Roadside Assistance dari GWM Inchcape siap membantu Anda kapan pun dibutuhkan. Aman berkendara bersama dukungan terpercaya kami."}
      />
      <EraDetail />
    </div>
  )
}

export default page
