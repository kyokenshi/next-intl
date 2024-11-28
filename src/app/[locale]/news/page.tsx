import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import NewsContainer from '@/container/newsContainer';
import { getApiListCategoryArticle } from '@/utils/axios/news';
import { getConfigData } from '@/utils/axios/home';
import Head from 'next/head';
import { Suspense } from 'react';

type Props = {
    params: { locale: string };
};

export default async function NewsPage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const { data } = await getApiListCategoryArticle({ locale })
    const { data: dataConfig } = await getConfigData({ locale })


    return (
        <PageLayout>

            {/* <div className="max-w-[490px]">
                {t.rich('description', {
                    p: (chunks) => <p className="mt-4">{chunks}</p>,
                    code: (chunks) => (
                        <code className="font-mono text-white">{chunks}</code>
                    )
                })}
            </div> */}
            <Suspense fallback={<div>....Loading</div>}>
                <NewsContainer dataListArtical={data} dataConfig={dataConfig} />
            </Suspense>
        </PageLayout>
    );
}
