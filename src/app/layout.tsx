import { ReactNode } from 'react';
import './styles.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import StyledJsxRegistry from '@/lib/registry';


type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return <StyledJsxRegistry><AntdRegistry>{children}</AntdRegistry></StyledJsxRegistry>;
}
