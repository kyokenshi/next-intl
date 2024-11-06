import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Lấy locale từ URL path
  const pathname = request.nextUrl.pathname;
  const currentLocale = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Lấy locale từ cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // Nếu URL có locale
  if (currentLocale) {
    // Nếu cookie khác với locale trong URL, cập nhật cookie
    if (cookieLocale !== currentLocale) {
      const response = createMiddleware(routing)(request);
      response.cookies.set('NEXT_LOCALE', currentLocale);
      return response;
    }
  } else {
    // Nếu URL không có locale, redirect với locale từ cookie hoặc mặc định
    const locale = cookieLocale || 'en';
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale);
    return response;
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
