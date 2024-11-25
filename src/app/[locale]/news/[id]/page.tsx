import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import NewsDetailContainer from '@/container/newsDetailContainer';
import { getApiListCategoryArticle, getApiListNewsSSR, getApiNewsDetail } from '@/utils/axios/news';
import { getConfigData } from '@/utils/axios/home';
import { Metadata } from 'next';

type Props = {
    params: { locale: string, id: string };
};



// or Dynamic metadata
export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
    const { data } = await getApiNewsDetail({ locale, slug: id })

    return {
        title: data[0].title,
        description: data[0].description
    }
}

export default async function NewsDetail({ params: { locale, id } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);


    const { data } = await getApiNewsDetail({ locale, slug: id })
    const { data: dataConfig } = await getConfigData({ locale })

    const { data: dataListSSR } = await getApiListNewsSSR({ locale })



    return (
        <PageLayout >
            {/* <head>
                <title>{data[0]?.title}</title>
                <meta name="description" content={data[0]?.description} />
            </head> */}
            {/* <div className="max-w-[490px]">
                {t.rich('description', {
                    p: (chunks) => <p className="mt-4">{chunks}</p>,
                    code: (chunks) => (
                        <code className="font-mono text-white">{chunks}</code>
                    )
                })}
            </div> */}
            <NewsDetailContainer params={{ id }} dataListSSR={dataListSSR} dataDetail={data} dataConfig={dataConfig} />
        </PageLayout>
    );
}
