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

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
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
        {/* Google Analytics + Google Ads */}
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
        {/* Hàm theo dõi conversion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-17540507188/NECOCLKxwaEbELTM-6tB',
                  'event_callback': callback
                });
                return false;
              }
              window.gtag_report_conversion = gtag_report_conversion;
            `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K7NCXHDJ');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var _hmt = _hmt || [];
             (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?00a307f9484d2b9f178b229ec0186850";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={clsx('flex h-full flex-col', roboto.className)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7NCXHDJ"
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
