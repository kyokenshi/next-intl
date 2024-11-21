import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import NewsContainer from '@/container/newsContainer';
import { getApiListCategoryArticle } from '@/utils/axios/news';

type Props = {
    params: { locale: string };
};

export default async function NewsPage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const { data } = await getApiListCategoryArticle({ locale })


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
            <NewsContainer dataListArtical={data} />
        </PageLayout>
    );
}
