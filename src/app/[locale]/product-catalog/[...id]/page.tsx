import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';
import { getCategoryProduct } from '@/utils/axios/productCategory';
import { getProductNew } from '@/utils/axios/product';

type Props = {
  params: { locale: string, id: any };
};

export default async function ProductCatalogPage({ params: { locale, id } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const { data } = await getCategoryProduct({ locale });
  const { data: dataProductNew } = await getProductNew({ locale });

  return (
    <PageLayout >
      <ProductContainer params={{ id }} dataCategoryProduct={data.data} dataProductNew={dataProductNew.data} />
    </PageLayout>
  );
}
