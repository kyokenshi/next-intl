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
    title: dataConfig?.title,
    description: dataConfig?.description,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.logo?.url}`,
    },
    openGraph: {
      title: dataConfig?.title,
      description: dataConfig?.description,
      type: 'website',
      locale: params.locale || 'vi',
      images: [
        {
          url: 'https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg',
          alt: dataConfig?.title || 'Default Image',
        },
      ],
      siteName: 'Vietcetera',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vietcetera',
      title: dataConfig?.title,
      description: dataConfig?.description,
      images: ['https://img.vietcetera.com/uploads/public/sharing-default-thumbnail.jpg'],
    },
    applicationName: 'Vietcetera',
    appleWebApp: {
      title: dataConfig?.title,
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

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
