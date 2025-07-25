import ExteriorColorSection from '@/components/exteriorColor/ExteriorColor'
import ProductHero from '@/components/hero/ProductHero'
import NavbarProduct from '@/components/navbar/NavbarProduct'
import Features from '@/components/product/Features'
import { Gallery } from '@/components/product/Gallery'
import { getBaseMeta } from '@/lib/seo'
import React from 'react'

export async function generateMetadata({ params }) {
    const locale = await params.locale || "id";
    const slug = await params.modelSlug;
  
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

const page = () => {
    return (
        <div className='bg-white text-dark'>
            <ProductHero
                image="/hero-1.jpg"
                title="HAVAL H6 HEV"
                subtitle="Luxury Offroad SUV"
                price="850.000.000"
            />
            <NavbarProduct modelName="H6 HEV" />

<ExteriorColorSection />

           <Features />

           <Gallery />

        </div>
    )
}

export default page