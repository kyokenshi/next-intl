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
      {/* <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.logo?.url}`} />
        <title>{dataConfig.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:locale" content={locale}></meta>
        <meta name="description" content={dataConfig.description} />
        <meta name="title" content={dataConfig.title} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={dataConfig.title}></meta>
        <meta property="og:description" content={dataConfig.description}></meta>
        <meta name="description" content={dataConfig.description}></meta>
        <meta property="og:image" content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg"></meta>
        <meta property="og:site_name" content="Vietcetera"></meta>
        <meta property="og:image:secure_url" content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg"></meta>
        <meta property="og:image:secure_url" content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg"></meta>
        <meta name="msapplication-TileImage" content="https://vietcetera.com/favicon.ico"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta content="@Vietcetera" name="twitter:site"></meta>
        <meta name="twitter:text:title" content={dataConfig.title}></meta>
        <meta content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg" name="twitter:image"></meta>
        <meta content={dataConfig.description} name="twitter:description"></meta>
        <meta content={dataConfig.title} name="twitter:title"></meta>
        <meta property="fb:pages" content="495498560610642"></meta>
        <meta property="fb:app_id" content="706286893457917"></meta>
        <meta charSet="UTF-8"></meta>
        <meta name="next-head-count" content="39"></meta>
        <meta name="apple-itunes-app" content="app-id=1564202068"></meta>
      </head> */}
      <meta property="og:image:secure_url" content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg"></meta>
      <meta property="og:image:secure_url" content="https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg"></meta>
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
