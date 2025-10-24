import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import TemplateWrapper from '@/components/TemplateWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio Website',
  description: 'Professional portfolio website showcasing work, skills, and experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PortfolioProvider>
          <TemplateWrapper>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TemplateWrapper>
          <Toaster />
        </PortfolioProvider>
      </body>
    </html>
  );
}
