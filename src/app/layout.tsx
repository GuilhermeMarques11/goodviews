import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import { Roboto } from 'next/font/google';
import Header from '@/components/header/Header';
import ScrollToTop from '@/components/scrollToTop';

const fontPrimary = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Good Views',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={fontPrimary.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div
            data-scroll-container
            className="w-[calc(100%-280px)] max-h-screen scrollbar-gutter-stable overflow-y-auto pl-8 pr-6 py-8 "
          >
            <Header />
            <main className="mt-10 p-5 flex flex-col">{children}</main>
          </div>
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
