import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Hero from '@/components/hero/Hero';
export default function HomePage() {
    const t = useTranslations('HomePage');
    return (
        <>
            <Hero dataHero={null} />
            <div>asdasd</div>
        </>
    );
}