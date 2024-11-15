import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import HomePageContainer from '@/container/homePageContainer';
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

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');


  return (
    <PageLayout>
      {/* <p className="">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p> */}
      <HomePageContainer />

    </PageLayout>
  );
}
