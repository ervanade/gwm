import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/navbar/Navbar';
import localFont from 'next/font/local'
import { useLocale } from 'next-intl/server';
import "./globals.css";
import StickyMenu from '@/components/StickyMenu';
import Footer from '@/components/footer/Footer';
import ReCaptchaProviderWrapper from '@/components/ReCaptchaProviderWrapper';

const helvetica = localFont({
  src: [
    {
      path: './fonts/HelveticaNowDisplayLight.woff2',
      weight: '300',
      style: 'normal',
      display: 'swap',
      variable: '--font-helvetica',
    },
    {
      path: './fonts/HelveticaNowDisplayRegular.woff2',
      weight: '400',
      style: 'normal',
      display: 'swap',
      variable: '--font-helvetica',
    },
    {
      path: './fonts/HelveticaNowDisplayMedium.woff2',
      weight: '500',
      style: 'normal',
      display: 'swap',
      variable: '--font-helvetica',
    },
    {
      path: './fonts/HelveticaNowDisplayBold.woff2',
      weight: '700',
      style: 'normal',
      display: 'swap',
      variable: '--font-helvetica',
    },
  ],
})

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isEnglish = locale?.includes('en');

  return {
    title: isEnglish
      ? 'GWM Inchcape Indonesia | Official GWM Car Dealership in Indonesia'
      : 'GWM Inchcape Indonesia | Dealer Resmi Mobil GWM di Indonesia',
    description: isEnglish
      ? 'Visit GWM Inchcape, your official GWM car dealership in Indonesia. Explore the latest GWM models, attractive offers, and professional after-sales services.'
      : 'Kunjungi GWM Inchcape, dealer resmi mobil GWM di Indonesia. Temukan berbagai model GWM terbaru, penawaran menarik, dan layanan purna jual profesional.',
    keywords: isEnglish
      ? ['GWM Inchcape', 'dealer GWM', 'mobil GWM', 'harga GWM', 'GWM terbaru', 'beli GWM', 'Servis GWM']
      : ['GWM Inchcape', 'dealer GWM', 'mobil GWM', 'harga GWM', 'GWM terbaru', 'beli GWM', 'Servis GWM'],
    applicationName: 'GWM Inchcape',
    authors: [{ name: 'GWM Inchcape', url: 'https://gwminchcape.co.id' }],
    creator: 'GWM Inchcape',
    publisher: 'GWM Inchcape',
    metadataBase: new URL('https://gwminchcape.co.id'),
    // alternates: {
    //   canonical: `/?lang=${lang}`,
    //   languages: {
    //     'en': '/?lang=en',
    //     'id': '/?lang-id',
    //   },
    // },
    openGraph: {
      title: isEnglish
        ? 'GWM Inchcape Indonesia | Official GWM Car Dealership in Indonesia'
        : 'GWM Inchcape Indonesia | Dealer Resmi Mobil GWM di Indonesia',
      description: isEnglish
        ? 'Visit GWM Inchcape, your official GWM car dealership in Indonesia. Explore the latest GWM models, attractive offers, and professional after-sales services.'
        : 'Kunjungi GWM Inchcape, dealer resmi mobil GWM di Indonesia. Temukan berbagai model GWM terbaru, penawaran menarik, dan layanan purna jual profesional.',
      url: 'https://gwminchcape.co.id',
      siteName: 'GWM Inchcape',
      images: [
        {
          url: 'https://gwminchcape.co.id/logo_ori.svg',
          width: 1200,
          height: 630,
          alt: 'Logo GWM Inchcape',
        },
      ],
      locale: isEnglish ? 'en-US' : 'id-ID',
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/settings`, {
    // cache: 'no-store',
    next: { revalidate: 3600 * 24 },
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


export default async function LocaleLayout({
  children,
  params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const { data : dataSettings } = await getData()
  const { data } = await getDataProducts()
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={helvetica.className}>
      <body className='!font-helvetica'>
        <NextIntlClientProvider messages={messages}>
        <ReCaptchaProviderWrapper>

          <Navbar dataModels={data || []} />
          {children}
          <StickyMenu data={dataSettings || []}/>
          <Footer dataSettings={dataSettings || []}/>
        </ReCaptchaProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}