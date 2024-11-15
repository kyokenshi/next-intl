import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'vi'],
  defaultLocale: 'en',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/product': {
      en: '/product',
      de: '/product-de',
      vi: '/san-pham'
    },
    '/product/[id]': {
      en: '/product/[id]',
      de: '/product-de/[id]',
      vi: '/san-pham/[id]'
    },
    '/news': {
      en: '/news',
      de: '/news-de',
      vi: '/tin-tuc'
    },
    '/news/[id]': {
      en: '/news/[id]',
      de: '/news-de/[id]',
      vi: '/tin-tuc/[id]'
    },
    '/payment-for-instruction': {
      en: '/payment-for-instruction',
      de: '/payment-for-instruction-de',
      vi: '/huong-dan-thanh-toan-qua-ngan-luong'
    },
    '/payment-instruction': {
      en: '/payment-instruction',
      de: '/payment-instruction-de',
      vi: '/huong-dan-thanh-toan'
    },
    '/bank-transfer': {
      en: '/bank-transfer',
      de: '/bank-transfer-de',
      vi: '/chuyen-khoan-ngan-hang'
    },
    '/contact': {
      en: '/contact',
      de: '/contact-de',
      vi: '/lien-he'
    },
    '/product-catalog': {
      en: '/product-catalog',
      de: '/product-catalog-de',
      vi: '/danh-muc-san-pham'
    },
    '/product-catalog/[...id]': {  // Catch-all route
      en: '/product-catalog/[...id]',
      de: '/product-catalog-de/[...id]',
      vi: '/danh-muc-san-pham/[...id]'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
