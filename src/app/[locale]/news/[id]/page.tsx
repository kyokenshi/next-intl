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
    const el = data[0]?.seo
    return {
        title: el?.metametaTitle,
        description: el?.description,
        applicationName: el?.metaTitle,
        appleWebApp: {
            title: el?.metaTitle,
        },
        openGraph: {
            title: el?.metaTitle,
            description: el?.description,
            type: 'website',
            locale: locale || 'vi',
            siteName: el?.metaTitle,
        },
        twitter: {
            site: el?.title,
            title: el?.title,
            description: el?.description,
        },
    }
}

export default async function NewsDetail({ params: { locale, id } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);


    const { data } = await getApiNewsDetail({ locale, slug: id })
    const { data: dataConfig } = await getConfigData({ locale })

    const { data: dataListSSR } = await getApiListNewsSSR({ locale })



    return (
        <>
            <meta property="article:tag" content={data[0]?.seo?.tag}></meta>
            <PageLayout>
                <NewsDetailContainer params={{ id }} dataListSSR={dataListSSR} dataDetail={data} dataConfig={dataConfig} />
            </PageLayout>
        </>

    );
}
