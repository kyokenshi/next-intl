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

    title: dataConfig?.seo?.metaTitle,
    description: dataConfig?.seo?.metaDescription,
    icons: {
      icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.logo?.url}`,
    },
    openGraph: {
      title: dataConfig?.seo?.metaTitle,
      description: dataConfig?.seo?.metaDescription,
      type: 'website',
      locale: localeCookie || 'vi',
      // images: [
      //   {
      //     url: `${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`,
      //     alt: dataConfig?.seo?.shareImage?.formats?.thumbnail?.name || 'Default Image',
      //   },
      // ],
      siteName: dataConfig?.seo?.metaTitle,
    },
    twitter: {
      card: 'summary_large_image',
      site: dataConfig?.seo?.metaTitle,
      title: dataConfig?.seo?.metaTitle,
      description: dataConfig?.seo?.metaDescription,
      // images: `${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`,
    },
    applicationName: dataConfig?.seo?.metaTitle,
    appleWebApp: {
      title: dataConfig?.seo?.metaTitle,
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
  const { data: dataConfig } = await getConfigData({ locale: localeCookie?.value ?? "vi" })


  return (
    <BaseLayout locale={localeCookie?.value ?? "vi"}>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataConfig?.seo?.shareImage?.formats?.thumbnail?.url}`} name="twitter:image"></meta>
      <meta property="article:tag" content={dataConfig?.seo?.tag}></meta>
      <PageLayout>
        <HomePageContainer params={{ locale: localeCookie?.value ?? "vi" }} />
      </PageLayout>
    </BaseLayout>
  );
}
