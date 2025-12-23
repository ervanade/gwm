import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import dynamic from "next/dynamic";
// import Hero from '@/components/hero/Hero';
// import Models from '@/components/models/Models';
// import OverviewProduct from '@/components/overviewProduct/OverviewProduct';
// import AfterSales from '@/components/afterSales/AfterSales';
import { getBaseMeta } from "@/lib/seo";
import HomepageClient from "@/components/HomePageClient";

export async function generateMetadata({ params }) {
  const useParams = await params;
  const locale = (await useParams.locale) || "id";

  const meta = {
    id: {
      title: `GWM Indonesia | Dealer Resmi GWM Indonesia & Harga Mobil GWM`,
      description: `"GWM Indonesia oleh Inchcape. Cek harga mobil GWM terbaru, termasuk GWM Tank 500 dan GWM Ora 03. Dealer resmi GWM Jakarta, test drive, promo, dan layanan purna jual terpercaya.`,
      keywords: [
        "gwm indonesia",
        "harga mobil gwm terbaru",
        "dealer gwm jakarta",
        "gwm tank 500",
        "gwm ora 03",
        "mobil gwm",
        "dealer resmi gwm",
        "GWM Inchcape",
        "dealer GWM",
        "mobil GWM",
        "harga GWM",
        "GWM terbaru",
        "beli GWM",
        "Servis GWM",
      ],
    },
    en: {
      title: `GWM Indonesia | Official GWM Indonesia Dealer & GWM Car Prices`,
      description: `Visit GWM Inchcape, your official GWM car dealership in Indonesia. Explore the latest GWM models, attractive offers, test drive, dealer locations and professional after-sales services.`,
      keywords: [
        "gwm indonesia",
        "gwm car price",
        "gwm dealer jakarta",
        "gwm tank 500",
        "gwm ora 03",
        "official gwm dealer",
        "GWM Inchcape",
        "GWM dealer",
        "GWM car",
        "GWM price",
        "latest GWM",
        "buy GWM",
        "GWM service",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/`,
    ...meta[locale],
  });
}

async function getData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/homepage?language=${locale}`,
    {
      // cache: 'no-store',
      // next: { revalidate: 300 },
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Cache-Control": "max-age=300", // browser dan CDN cache 5 menit
      },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function HomePage({ params }) {
  const useParams = await params;
  const locale = (await useParams.locale) || "id";
  const { data } = await getData(locale === "en" ? "EN" : "ID");
  const productHighlight =
    locale === "en"
      ? data?.pages?.["product-highlight-en"] || {}
      : data?.pages?.["product-highlight"] || {};

  const dataAfterSales =
    locale === "en"
      ? data?.pages?.["gwm-after-sales-en"]
      : data?.pages?.["gwm-after-sales"] || {};

  const dataWhy =
    locale === "en"
      ? data?.pages?.["why-gwm-inchcape-en"]
      : data?.pages?.["why-gwm-inchcape"] || {};
  return <HomepageClient data={{ ...data, locale }} />;
}
