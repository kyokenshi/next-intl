import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import HomePageContainer from '@/container/homePageContainer';
import PageLayout from '@/components/PageLayout';
import { cookies } from 'next/headers';
import { Viewport } from 'next';
import { Metadata } from 'next';
import { getConfigData } from '@/utils/axios/home';

type Props = {
  params: { locale: string };
};

// const title = `Thiết bị khai thác mỏ`;
// const description =
//   "Thiết bị khai thác mỏ";

// export const metadata: Metadata = {
//   title,
//   description,
// };



export async function generateMetadata() {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

  const { data: dataConfig } = await getConfigData({ locale: localeCookie })
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
      locale: localeCookie || 'vi',
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

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default async function HomePage() {
  // Enable static rendering
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  setRequestLocale(localeCookie?.value ?? 'vi');


  return (
    <BaseLayout locale={localeCookie?.value ?? "vi"}>
      <PageLayout>
        <HomePageContainer params={{ locale: localeCookie?.value ?? "vi" }} />
      </PageLayout>
    </BaseLayout>
  );
}
