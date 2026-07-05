import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { baseUrl, createMetadata } from '@/lib/metadata';
import { Inter } from 'next/font/google';

export const metadata = createMetadata({
  title: {
    template: '%s | Hoard CTI',
    default: 'Hoard CTI',
  },
  description: 'Hoard CTI is an open-source enterprise level cyber threat intelligence feed.',
  metadataBase: baseUrl,
});

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
