import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import ExternalLink from './ExternalLink';
import { StyledPageLayout } from './styles';
import { Metadata } from 'next';

type Props = {
  children?: ReactNode;
  title?: ReactNode;
};


export default function PageLayout({ children, title }: Props) {
  const t = useTranslations('PageLayout');

  return (
    <StyledPageLayout>
      {children}
    </StyledPageLayout>
  );
}
