import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import HomePageContainer from '@/container/homePageContainer';
import PageLayout from '@/components/PageLayout';
import { cookies } from 'next/headers';
import { Viewport } from 'next';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

const title = `Thiết bị khai thác mỏ`;
const description =
  "Thiết bị khai thác mỏ";

export const metadata: Metadata = {
  title,
  description,
};

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
