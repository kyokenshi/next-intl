import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import PaymentForInstructionsContainer from '@/container/paymentForInstructionsContainer';

type Props = {
    params: { locale: string };
};

export default function PaymentForInstructionPage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            <PaymentForInstructionsContainer />

        </PageLayout>
    );
}
