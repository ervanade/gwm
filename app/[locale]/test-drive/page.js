import TestDriveForm from '@/components/form/TestDriveForm';
import PageHero from '@/components/hero/PageHero'
import ModelsTestDrive from '@/components/models/ModelsTestDrive';
import ReCaptchaProviderWrapper from '@/components/ReCaptchaProviderWrapper';
import { getBaseMeta } from '@/lib/seo';
import React from 'react'


export async function generateMetadata({ params }) {
  const { locale } = await params;

  const meta = {
    id: {
      title: "Jadwalkan Test Drive GWM | Rasakan Sensasinya di GWM Inchcape",
      description:
        "Daftar test drive GWM Tank 500, Tank 300, Ora 03, Haval Jolion & Haval H6. Rasakan performa dan pengalaman berkendara premium. Booking test drive di GWM Inchcape Indonesia",
      keywords: ["test drive GWM", "jadwal test drive", "mobil GWM"],
    },
    en: {
      title: "Schedule GWM Test Drive | Experience It at GWM Inchcape",
      description:
        "Register for a test drive of the GWM Tank 500, Tank 300, Ora 03, Haval Jolion, and Haval H6. Feel the premium performance and driving experience. Book test drive now only at GWM Inchcape Indonesia.",
      keywords: ["GWM test drive", "car test drive", "drive before buy"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/test-drive`,
    ...meta[locale],
  });
}

async function getDataProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/products`, {
    // cache: 'no-store',
    next: { revalidate: 3600 },
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_APP_X_API_KEY,
    },
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getDataCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories`, {
    // cache: 'no-store',
    next: { revalidate: 3600 },
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_APP_X_API_KEY,
    },
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const page = async ({ params }) => {
  const { locale } = await params;
  const { data: dataCategory } = await getDataCategories()
  const { data } = await getDataProducts()
  return (
    <ReCaptchaProviderWrapper>
    <div>
      <PageHero
        image="/assets/hero-testdrive.png"
        title={locale == "en" ? "Test Drive" : "Test Drive"}
        subtitle={locale == "en" ? "Experience the toughness and advanced technology of GWM. Schedule your test drive now!" : "Rasakan langsung ketangguhan serta teknologi canggih dari GWM. Jadwalkan test drive sekarang!"}
      />
      <ModelsTestDrive dataModels={data || []} dataCategories={dataCategory || []} />

      <TestDriveForm locale={locale} />
    </div>
    </ReCaptchaProviderWrapper>

  )
}

export default page
