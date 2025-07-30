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


async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/homepage`, {
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

export default async function HomePage() {
    const { data } = await getData()
    return (
        <>
            <Hero dataHero={data?.banners || null} />
            <Models dataModels={data?.products || null} dataCategories={data?.categories} />
            <OverviewProduct />
            <AfterSales />
        </>
    );
}