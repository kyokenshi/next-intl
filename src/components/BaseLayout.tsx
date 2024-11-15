import { clsx } from 'clsx';
import type { Metadata, Viewport } from "next";
import { Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from './Header/Navigation';
import Footer from './Footer';

// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: ['400', '500', '700'],  // có thể thêm các weight khác nếu cần
  subsets: ['latin'],
  display: 'swap',
})

const title = `Thiết bị khai thác mỏ`;
const description =
  "Thiết bị khai thác mỏ";

export const metadata: Metadata = {
  title,
  description,
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx('flex h-full flex-col', roboto.className)}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
