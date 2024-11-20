import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import NewsDetailContainer from '@/container/newsDetailContainer';

type Props = {
    params: { locale: string, id: string };
};

export default function NewsDetail({ params: { locale, id } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            {/* <div className="max-w-[490px]">
                {t.rich('description', {
                    p: (chunks) => <p className="mt-4">{chunks}</p>,
                    code: (chunks) => (
                        <code className="font-mono text-white">{chunks}</code>
                    )
                })}
            </div> */}
            <NewsDetailContainer params={{ id }} />
        </PageLayout>
    );
}
