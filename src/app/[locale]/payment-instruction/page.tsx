import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import PaymentInstructionsContainer from '@/container/paymentInstructionsContainer';

type Props = {
    params: { locale: string };
};

export default function PaymentInstructionPage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            <PaymentInstructionsContainer />

        </PageLayout>
    );
}
