import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import HomePageContainer from '@/container/homePageContainer';
import { Metadata } from 'next';
import { getConfigData } from '@/utils/axios/home';

type Props = {
  params: { locale: string };
};

// const title = `Thiết bị khai thác mỏ`;
// const description =
//   "Thiết bị khai thác mỏ";

// export const metadata: Metadata = {
//   title,
//   description,
// };

export default async function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const { data: dataConfig } = await getConfigData({ locale: locale ?? "vi" })


  return (
    <PageLayout>


      {/* <p className="">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p> */}
      <HomePageContainer params={{ locale }} />

    </PageLayout>
  );
}
