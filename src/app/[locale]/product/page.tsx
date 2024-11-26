import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';
import { getApiProduct, getProductNew } from '@/utils/axios/product';
import { getCategoryProduct } from '@/utils/axios/productCategory';
import { getConfigData } from '@/utils/axios/home';
import { Suspense } from 'react';

type Props = {
  params: { locale: string, id: string };
};

const ProductPage = async ({ params: { locale, id } }: Props) => {
  // Enable static rendering
  setRequestLocale(locale);

  const { data } = await getCategoryProduct({ locale });
  const { data: dataProductNew } = await getProductNew({ locale });

  const { data: dataConfig } = await getConfigData({ locale: locale })


  return (
    <PageLayout >
      <Suspense fallback={<div>Loading...</div>}>
        <ProductContainer params={{ id }} dataConfig={dataConfig} dataCategoryProduct={data.data} dataProductNew={dataProductNew.data} />
      </Suspense>
    </PageLayout >
  );
}
export default ProductPage