import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';
import { getApiProduct } from '@/utils/axios/product';
import { getCategoryProduct } from '@/utils/axios/productCategory';
import { getProductNew } from '@/utils/axios/productNew';

type Props = {
  params: { locale: string, id: string };
};

const ProductPage = async ({ params: { locale, id } }: Props) => {
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
export default ProductPage