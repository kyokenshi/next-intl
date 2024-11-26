import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import { Viewport } from 'next';
import { getConfigData } from '@/utils/axios/home';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};
export async function generateMetadata({ params }: any) {
  const { data: dataConfig } = await getConfigData({ locale: params.locale })

  return {

    title: dataConfig?.seo?.metaTitle,
    description: dataConfig?.seo?.metaDescription,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.logo?.url}`,
    },
    openGraph: {
      title: dataConfig?.seo?.metaTitle,
      description: dataConfig?.seo?.metaDescription,
      type: 'website',
      locale: params.locale || 'vi',
      siteName: dataConfig?.seo?.metaTitle,
    },
    twitter: {
      card: 'summary_large_image',
      site: dataConfig?.seo?.metaTitle,
      title: dataConfig?.seo?.metaTitle,
      description: dataConfig?.seo?.metaDescription,
    },
    applicationName: dataConfig?.seo?.metaTitle,
    appleWebApp: {
      title: dataConfig?.seo?.metaTitle,
    },
  }
}


export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const { data: dataConfig } = await getConfigData({ locale: locale ?? "vi" })

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>
    <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
    <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
    <meta property="og:image" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
    <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
    <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
    <meta content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`} name="twitter:image"></meta>
    <meta property="article:tag" content={dataConfig?.seo?.tag}></meta>
    {children}
  </BaseLayout>;
}
