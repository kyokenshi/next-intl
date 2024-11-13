import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import HomePageContainer from '@/container/homePageContainer';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: { locale: string };
};

export default function PaymentInstructionPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('PathnamesPage');

  return (
    <BaseLayout locale={locale}>
      <PageLayout>
        <HomePageContainer />
      </PageLayout>
    </BaseLayout>
  );
}
