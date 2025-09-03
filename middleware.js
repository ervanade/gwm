import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'id';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale
});

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Jika URL sudah mengandung locale prefix, langsung lanjutkan pakai next-intl
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return intlMiddleware(request);
  }

  // Jika URL adalah asset publik, api, dll, jangan redirect
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static file seperti .css, .js, .jpg
  ) {
    return NextResponse.next();
  }

  // Redirect ke default locale jika path tanpa prefix
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/((?!_next|favicon|api|assets|.*\\..*).*)'],
};
