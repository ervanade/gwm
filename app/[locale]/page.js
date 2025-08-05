import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Hero from '@/components/hero/Hero';
import Models from '@/components/models/Models';
import OverviewProduct from '@/components/overviewProduct/OverviewProduct';
import AfterSales from '@/components/afterSales/AfterSales';
import { getBaseMeta } from '@/lib/seo';


export async function generateMetadata({ params }) {
  const useParams = await params
  const locale = await useParams.locale || "id";

  const meta = {
    id: {
      title: `GWM Inchcape Indonesia | Dealer Resmi GWM di Indonesia`,
      description: `"GWM Inchcape Indonesia menghadirkan dealer resmi GWM di Indonesia – model lengkap, layanan purnajual, test drive, dan lokasi dealer terpercaya.
`,
      keywords: ['GWM Inchcape', 'dealer GWM', 'mobil GWM', 'harga GWM', 'GWM terbaru', 'beli GWM', 'Servis GWM'],
    },
    en: {
      title: `GWM Inchcape Indonesia | Official GWM Dealer in Indonesia`,
      description: `Discover GWM Inchcape Indonesia, Indonesia’s official GWM dealer with full model range, aftersales support, test drive booking & trusted dealership locations.`,
      keywords:
        ['GWM Inchcape', 'GWM dealer', 'GWM car', 'GWM price', 'latest GWM', 'buy GWM', 'GWM service'],
    },
  };

  return getBaseMeta({
    locale,
    path: `/`,
    ...meta[locale],
  });
}


async function getData(locale) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/homepage?language=${locale}`, {
    // cache: 'no-store',
    next: { revalidate: 300 },
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

export default async function HomePage({ params }) {
  const useParams = await params
  const locale = await useParams.locale || "id";
  const { data } = await getData(locale === "en" ? "EN" : "ID")
  const productHighlight = locale === "en"
    ? data?.pages_en?.["product-highlight-en"]?.[0] || {}
    : data?.pages?.["product-highlight"]?.[0] || {};

  const dataAfterSales = locale === "en"
    ? data?.pages_en?.["gwm-after-sales-en"]?.[0]
    : data?.pages?.["gwm-after-sales"]?.[0] || {};
  return (
    <>
      <Hero dataHero={data?.banners || null} />
      <Models dataModels={data?.products || []} dataCategories={data?.categories || []} />
      <OverviewProduct
        overviewHtml={productHighlight}
        dataModels={data?.products_overview || []}
        dataAfterSales={dataAfterSales}
      />
      <AfterSales />
    </>
  );
}