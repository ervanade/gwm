import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/navbar/Navbar';
import localFont from 'next/font/local'
import "./globals.css";

const roboto = localFont({
    src: [
      {
        path: './Roboto-Regular.woff2',
        weight: '300',
        style: 'normal',
      },
      {
        path: './Roboto-Italic.woff2',
        weight: '300',
        style: 'normal',
      },
      {
        path: './Roboto-Bold.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: './Roboto-BoldItalic.woff2',
        weight: '700',
        style: 'normal',
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
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}