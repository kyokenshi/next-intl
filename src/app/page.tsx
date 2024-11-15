import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import HomePageContainer from '@/container/homePageContainer';
import PageLayout from '@/components/PageLayout';
import { cookies } from 'next/headers';

type Props = {
  params: { locale: string };
};

export default function PaymentInstructionPage({ params: { locale } }: Props) {
  // Enable static rendering
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  setRequestLocale(localeCookie?.value ?? 'en');

  const t = useTranslations('PathnamesPage');



  return (
    <BaseLayout locale={localeCookie?.value ?? "en"}>
      <PageLayout>
        <HomePageContainer />
      </PageLayout>
    </BaseLayout>
  );
}
