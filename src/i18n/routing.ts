import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'vi'],
  defaultLocale: 'vi',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/product': {
      en: '/product',
      zh: '/product-zh',
      vi: '/san-pham'
    },
    '/product/[id]': {
      en: '/product/[id]',
      zh: '/product-zh/[id]',
      vi: '/san-pham/[id]'
    },
    '/news': {
      en: '/news',
      zh: '/news-zh',
      vi: '/tin-tuc'
    },
    '/news/[id]': {
      en: '/news/[id]',
      zh: '/news-zh/[id]',
      vi: '/tin-tuc/[id]'
    },
    '/payment-for-instruction': {
      en: '/payment-for-instruction',
      zh: '/payment-for-instruction-zh',
      vi: '/huong-dan-thanh-toan-qua-ngan-luong'
    },
    '/payment-instruction': {
      en: '/payment-instruction',
      zh: '/payment-instruction-zh',
      vi: '/huong-dan-thanh-toan'
    },
    '/bank-transfer': {
      en: '/bank-transfer',
      zh: '/bank-transfer-zh',
      vi: '/chuyen-khoan-ngan-hang'
    },
    '/contact': {
      en: '/contact',
      zh: '/contact-zh',
      vi: '/lien-he'
    },
    '/product-catalog': {
      en: '/product-catalog',
      zh: '/product-catalog-zh',
      vi: '/danh-muc-san-pham'
    },
    '/product-catalog/[...id]': {  // Catch-all route
      en: '/product-catalog/[...id]',
      zh: '/product-catalog-zh/[...id]',
      vi: '/danh-muc-san-pham/[...id]'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
