import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import DynamicContainer from '@/container/dynamicContainer';
import { getHeaderDataSSR } from '@/utils/axios/header';
import { getApiCheckPage } from '@/utils/axios/checpage';
import { redirect } from 'next/navigation';
import NotFoundPage from '../not-found';
import { Metadata } from 'next';
import Head from 'next/head';
type Props = {
    params: { locale: string, dynamic: string };
};


// or Dynamic metadata
export async function generateMetadata({ params: { locale, dynamic } }: Props): Promise<Metadata> {
    const { data } = await getApiCheckPage({ locale, slug: dynamic })
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

export default async function DynamicPage({ params: { locale, dynamic } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);
    const { data } = await getApiCheckPage({ locale, slug: dynamic })

    if (data?.length === 0 || !data) {
        redirect('/');
    }

    return (
        <>
            <meta property="article:tag" content={data[0]?.seo?.tag}></meta>
            <PageLayout>
                <DynamicContainer data={data[0]} />
            </PageLayout>
        </>

    );
}
