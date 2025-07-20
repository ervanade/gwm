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
export default function HomePage() {
    const t = useTranslations('HomePage');
    return (
        <>
            <Hero dataHero={null} />
            <Models />
            <OverviewProduct />
            <AfterSales />
        </>
    );
}