import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import AboutUs from '@/components/discover/About';
import EraDetail from '@/components/discover/EraDetail';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

const fetchEra = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/pages/slug/${slug}`, {
    next: { revalidate: 3600 },
    method: "GET",
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch era");

  return res.json();
};


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
  const { data } = await fetchEra(locale === "en" ? "gwm-era-en" : "gwm-era");
  if (!data) return notFound();

  return (
    <div>
      <PageHero
        image="/assets/hero-era.jpg"
        title={locale == "en" ? "ERA" : "ERA"}
        subtitle={locale == "en" ? "GWM Inchcape’s Emergency Roadside Assistance ensures your peace of mind on every journey. Get support anytime, anywhere across Indonesia." : "Layanan Emergency Roadside Assistance dari GWM Inchcape siap membantu Anda kapan pun dibutuhkan. Aman berkendara bersama dukungan terpercaya kami."}
      />
      <EraDetail data={data || {}} />
    </div>
  )
}

export default page
