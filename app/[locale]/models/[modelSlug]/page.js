import ExteriorColorSection from '@/components/exteriorColor/ExteriorColor'
import ProductHero from '@/components/hero/ProductHero'
import NavbarProduct from '@/components/navbar/NavbarProduct'
import Features from '@/components/product/Features'
import { Gallery } from '@/components/product/Gallery'
import { getBaseMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({ params }) {
  const useParams = await params
  const locale = await useParams.locale || "id";

  const slug = useParams.modelSlug;

  // Fetch model name based on slug if needed
  const modelName = slug.toUpperCase();

  const meta = {
    id: {
      title: `GWM ${modelName} - Spesifikasi & Fitur Mobil GWM`,
      description: `"Temukan GWM  ${modelName}, SUV premium dengan performa tangguh dan desain elegan. Cek fitur lengkap, harga, lokasi dealer, dan booking test drive di GWM Inchcape Indonesia.
`,
      keywords: [modelName, "SUV GWM", "Mobil Hybrid", "Spesifikasi"],
    },
    en: {
      title: `${modelName} Model - GWM Car Specifications & Features`,
      description: `Discover the GWM ${modelName}, a powerful and premium SUV designed for adventure and comfort. View full specs, price, dealer locations, and schedule a test drive with GWM Inchcape Indonesia.`,
      keywords: [modelName, "GWM SUV", "Hybrid car", "Car specs"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/models/${slug}`,
    ...meta[locale],
  });
}

const fetchModels = async (slug) => {
  // const res = await fetch(`http://10.29.101.99/api/news/slug/${slug}`, {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/products/slug/${slug}`,
    {
      next: { revalidate: 1 },
      // cache: 'no-store',
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    }
  );
  if (res?.status === 404) {
    return notFound(); // Pastikan tidak menyebabkan error
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const page = async ({ params }) => {
  const { modelSlug } = await params;
  const { data } = await fetchModels(modelSlug);


  return (
    <div className='bg-white text-dark'>
      <ProductHero
        image={data?.cover_url || "/hero-1.jpg"}
        title={data?.name || "HAVAL H6 HEV"}
        subtitle={data?.tipe || "Luxury Offroad SUV"}
        price={data?.price || "850.000.000"}
      />
      <NavbarProduct modelName="H6 HEV" />

      <ExteriorColorSection />

      <Features />

      <Gallery />

    </div>
  )
}

export default page