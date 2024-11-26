import { clsx } from 'clsx';
import type { Metadata, Viewport } from "next";
import { Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from './Header/Navigation';
import Footer from './Footer';
import { getConfigData } from '@/utils/axios/home';
import Head from 'next/head';
import { routing } from '@/i18n/routing';

// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: ['400', '500', '700'],  // có thể thêm các weight khác nếu cần
  subsets: ['latin'],
  display: 'swap',
})


type Props = {
  children: ReactNode;
  locale: string;
};





export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const { data: dataConfig } = await getConfigData({ locale })



  return (
    <html className="h-full" lang={locale}>
      <head>
        <link rel="icon" href="./../app/favicon.ico" sizes="any" />
      </head>

      <body className={clsx('flex h-full flex-col', roboto.className)}>
        <NextIntlClientProvider messages={messages}>
          <Navigation dataConfig={dataConfig} />
          {children}
          <Footer dataConfig={dataConfig} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
