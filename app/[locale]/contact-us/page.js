import DetailAfterSales from '@/components/afterSales/DetailAfterSales';
import DealerSection from '@/components/dealers/DealerSection';
import AboutUs from '@/components/discover/About';
import ContactUs from '@/components/discover/ContactUs';
import EraDetail from '@/components/discover/EraDetail';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
    const locale = params.locale || "id";

    const meta = {
        id: {
            title: "Kontak Kami | GWM Inchcape Indonesia",
            description:
                "Hubungi GWM Inchcape Indonesia untuk pertanyaan, informasi dealer, layanan purna jual, dan test drive. Kami siap membantu kebutuhan Anda.",
            keywords: ["hubungi gwm", "gwm dealer", "gwm kontak", "layanan gwm"],
        },
        en: {
            title: "Contact Us | GWM Inchcape Indonesia",
            description:
                "Get in touch with GWM Inchcape Indonesia for inquiries, dealer information, after-sales service, and test drive bookings. We are here to assist you.",
            keywords: ["contact gwm", "gwm dealer", "gwm contact", "gwm service"],
        },
    };

    return getBaseMeta({
        locale,
        path: `/contact-us`,
        ...meta[locale],
    });
}



const page = async ({ params }) => {
    const { locale } = await params;
    return (
        <div>
            <PageHero
                image="/assets/hero-era.jpg"
                title={locale == "en" ? "Contact Us" : "Kontak Kami"}
                subtitle={locale == "en" ? "Get in touch with GWM Inchcape Indonesia for inquiries, dealer information, after-sales service, and test drive bookings. We are here to assist you." : "Hubungi GWM Inchcape Indonesia untuk pertanyaan, informasi dealer, layanan purna jual, dan test drive. Kami siap membantu kebutuhan Anda."}
            />
            <ContactUs />
        </div>
    )
}

export default page
