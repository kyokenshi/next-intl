import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ContactContainer from '@/container/contactContainer';
import { getConfigData } from '@/utils/axios/home';

type Props = {
    params: { locale: string };
};

export default async function ContactPage({ params: { locale } }: Props) {
    setRequestLocale(locale);

    const { data: dataConfig } = await getConfigData({ locale })

    return (
        <PageLayout>
            <ContactContainer dataConfig={dataConfig} />
        </PageLayout>
    );
}
