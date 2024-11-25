import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cho phép truy cập trực tiếp vào "/"
  if (pathname === '/') {
    return NextResponse.next();
  }

  const currentLocale = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Lấy locale từ cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // Nếu URL có locale
  if (currentLocale) {
    // Nếu là locale mặc định (en) và đang ở trang chủ, redirect về "/"
    // if (currentLocale === 'en' && (pathname === '/en' || pathname === '/en/')) {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }

    // Xử lý các trường hợp khác như bình thường
    if (cookieLocale !== currentLocale) {
      const response = createMiddleware(routing)(request);
      response.cookies.set('NEXT_LOCALE', currentLocale);
      return response;
    }
  } else {
    // Nếu URL không có locale và không phải root path
    if (pathname !== '/') {
      const locale = cookieLocale || 'vi';
      const newUrl = new URL(`/${locale}${pathname}`, request.url);
      const response = NextResponse.redirect(newUrl);
      response.cookies.set('NEXT_LOCALE', locale);
      return response;
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    '/',
    '/(zh|en|vi)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
