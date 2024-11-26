import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';
import ProductDetailContainer from '@/container/productDetailContainer';
import { getApiProductDetail, getProductNew } from '@/utils/axios/product';
import { Metadata } from 'next';
import Head from 'next/head';

type ExtendedMetadata = Metadata & {
  articleTag?: string; // Thêm articleTag vào kiểu
};

type Props = {
  params: { locale: string, id: string };
};

// or Dynamic metadata
export async function generateMetadata({ params: { locale, id } }: Props): Promise<ExtendedMetadata> {
  const { data } = await getApiProductDetail({ locale, slug: id });
  const el = data[0]?.seo
  return {
    title: el?.metametaTitle,
    description: el?.description,
    applicationName: el?.metaTitle,
    appleWebApp: {
      title: el?.metaTitle,
    },
    openGraph: {
      title: el?.metaTitle,
      description: el?.description,
      type: 'website',
      locale: locale || 'vi',
      siteName: el?.metaTitle,
    },
    twitter: {
      site: el?.title,
      title: el?.title,
      description: el?.description,
    },
  }
}



export default async function ProductDetailPage({ params: { locale, id } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const { data } = await getApiProductDetail({ locale, slug: id });

  const { data: dataProductNew } = await getProductNew({ locale });


  return (

    <>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`}></meta>
      <meta content={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data[0]?.seo?.shareImage?.formats?.thumbnail?.url}`} name="twitter:image"></meta>
      <meta property="article:tag" content={data[0]?.seo?.tag}></meta>
      <PageLayout>
        <ProductDetailContainer data={data} dataProductNew={dataProductNew.data} />
      </PageLayout>

    </>
  );
}
