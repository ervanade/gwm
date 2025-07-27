import TestDriveForm from '@/components/form/TestDriveForm';
import PageHero from '@/components/hero/PageHero'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'


export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Jadwalkan Test Drive GWM | Rasakan Sensasinya di GWM Inchcape",
      description:
        "Segera jadwalkan test drive mobil GWM impian Anda di GWM Inchcape. Rasakan performa dan kenyamanan langsung sebelum memutuskan. Daftar sekarang!",
      keywords: ["test drive GWM", "jadwal test drive", "mobil GWM"],
    },
    en: {
      title: "Schedule GWM Test Drive | Experience It at GWM Inchcape",
      description:
        "Schedule a test drive for your dream GWM car at GWM Inchcape today. Experience the performance and comfort firsthand before deciding. Book now!",
      keywords: ["GWM test drive", "car test drive", "drive before buy"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/test-drive`,
    ...meta[locale],
  });
}
const page = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        image="/assets/hero-testdrive.png"
        title={locale == "en" ? "Test Drive" : "Test Drive"}
        subtitle={locale == "en" ? "Experience the toughness and advanced technology of GWM. Schedule your test drive now!" : "Rasakan langsung ketangguhan serta teknologi canggih dari GWM. Jadwalkan test drive sekarang!"}
      />
      <TestDriveForm locale={locale} />
    </div>
  )
}

export default page
