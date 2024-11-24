import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import DynamicContainer from '@/container/dynamicContainer';
import { getHeaderDataSSR } from '@/utils/axios/header';
import { getApiCheckPage } from '@/utils/axios/checpage';
type Props = {
    params: { locale: string, dynamic: string };
};

export default async function DynamicPage({ params: { locale, dynamic } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const { data } = await getApiCheckPage({ locale, slug: dynamic })

    return (
        <PageLayout>
            <DynamicContainer />
        </PageLayout>
    );
}
