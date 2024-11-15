import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ContactContainer from '@/container/contactContainer';

type Props = {
    params: { locale: string };
};

export default function ContactPage({ params: { locale } }: Props) {
    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            <ContactContainer />
        </PageLayout>
    );
}
