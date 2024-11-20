import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import BankTransferContainer from '@/container/bankTransferContainer';

type Props = {
    params: { locale: string };
};

export default function IntroducePage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            <BankTransferContainer />
        </PageLayout>
    );
}
