import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/navbar/Navbar';
import localFont from 'next/font/local'
import "./globals.css";

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

export default async function LocaleLayout({
  children,
  params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={helvetica.className}>
      <body className='!font-helvetica'>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}