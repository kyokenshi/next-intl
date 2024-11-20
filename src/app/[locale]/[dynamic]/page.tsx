import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import DynamicContainer from '@/container/dynamicContainer';

type Props = {
    params: { locale: string };
};

export default function IntroducePage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);
    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout>
            <DynamicContainer />
        </PageLayout>
    );
}
