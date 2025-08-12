import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import AboutUs from '@/components/discover/About';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'


const fetchAbout = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/pages/slug/${slug}`, {
    next: { revalidate: 3600 },
    method: "GET",
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch about");

  return res.json();
};

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Tentang Kami | GWM Inchcape Indonesia",
      description:
        "Kenali GWM Inchcape Indonesia lebih dekat. Pelajari visi, misi, dan komitmen kami dalam menghadirkan mobil berkualitas dan layanan terbaik di Indonesia.",
      keywords: ["tentang gwm", "gwm indonesia", "dealer mobil resmi"],
    },
    en: {
      title: "About Us | GWM Inchcape Indonesia",
      description:
        "Learn more about GWM Inchcape Indonesia. Discover our mission, vision, and commitment to delivering premium vehicles and top service in Indonesia.",
      keywords: ["about gwm", "gwm indonesia", "official car dealer"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/about-us`,
    ...meta[locale],
  });
}


const page = async ({ params }) => {
  const { locale } = await params;
  const { data } = await fetchAbout(locale === "en" ? "about-us" : "about-us");
  if (!data) return notFound();
  return (
    <div>
      <PageHero
        image="/assets/hero-about2.jpg"
        title={locale == "en" ? "About Us" : "Tentang Kami"}
        subtitle={locale == "en" ? "Learn more about GWM Inchcape Indonesia. Discover our mission, vision, and commitment to delivering premium vehicles and top service in Indonesia." : "Kenali GWM Inchcape Indonesia lebih dekat. Pelajari visi, misi, dan komitmen kami dalam menghadirkan mobil berkualitas dan layanan terbaik di Indonesia."}
      />
      <AboutUs data={data || {}} />
    </div>
  )
}

export default page
