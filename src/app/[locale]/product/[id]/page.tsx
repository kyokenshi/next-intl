import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';
import ProductDetailContainer from '@/container/productDetailContainer';
import { getApiProductDetail, getProductNew } from '@/utils/axios/product';

type Props = {
  params: { locale: string, id: string };
};

export default async function ProductDetailPage({ params: { locale, id } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const { data } = await getApiProductDetail({ locale, slug: id });

  const { data: dataProductNew } = await getProductNew({ locale });

  return (
    <PageLayout >
      <ProductDetailContainer data={data} dataProductNew={dataProductNew.data} />
    </PageLayout>
  );
}
