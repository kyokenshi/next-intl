import { clsx } from 'clsx';
import type { Metadata, Viewport } from "next";
import { Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from './Header/Navigation';
import Footer from './Footer';
import { getApiSocials, getConfigData } from '@/utils/axios/home';
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
  const { data: dataSocial } = await getApiSocials()





  return (
    <html className="h-full" lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="rKa0c4F0R1NfjK4q4baK-7ExYvJCjsj-zypCeIxLqrc"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZFLB71CVEL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZFLB71CVEL');
              gtag('config', 'AW-17540507188');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N73KZHTR');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={clsx('flex h-full flex-col', roboto.className)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N73KZHTR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <Navigation dataConfig={dataConfig} dataSocial={dataSocial} />
          {children}
          <Footer dataConfig={dataConfig} dataSocial={dataSocial} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
