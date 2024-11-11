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
      de: '/san-pham',
      vi: '/test'
    }

  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
