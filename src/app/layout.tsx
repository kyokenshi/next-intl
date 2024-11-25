import { ReactNode } from 'react';
import './styles.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StyledJsxRegistry from '@/lib/registry';
import { GlobalStyles } from './GlobalStyles';
import { Metadata } from 'next';


type Props = {
  children: ReactNode;
};


// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return <StyledJsxRegistry><AntdRegistry><GlobalStyles />{children}</AntdRegistry></StyledJsxRegistry>;
}
