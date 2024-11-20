import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ProductContainer from '@/container/productContainer';

type Props = {
  params: { locale: string, id: any };
};

export default function ProductCatalogPage({ params: { locale, id } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('PathnamesPage');

  return (
    <PageLayout title={t('title')}>
      <ProductContainer params={{ id }} />
    </PageLayout>
  );
}
