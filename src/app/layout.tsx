import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import { Roboto } from 'next/font/google';
import Header from '@/components/header/Header';
import ScrollToTop from '@/components/scrollToTop';
import { getAuthenticatedUser } from '@/utils/auth';
import Footer from '@/components/footer/Footer';
import { SidebarProvider } from './context/SidebarContext';
import UserProviderServer from './context/UserProviderServer';
const fontPrimary = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GoodViews',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUser();

  return (
    <html lang="pt-BR">
      <body className={fontPrimary.className}>
        <UserProviderServer>
          <SidebarProvider>
            <div className="flex min-h-screen">
              {user && <Sidebar />}
              <div
                data-scroll-container
                className={`${
                  user ? 'lg:w-[calc(100%-280px)]' : 'w-full'
                } max-h-screen overflow-y-auto p-0 flex flex-col justify-between`}
              >
                {/* {user && <Header />} */}
                <main className="flex flex-col">{children}</main>
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </UserProviderServer>
        <ScrollToTop />
      </body>
    </html>
  );
}
