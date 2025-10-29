import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { PortfolioProvider } from '@/context/PortfolioContext';
import TemplateWrapper from '@/components/TemplateWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PortfolioProvider>
          <TemplateWrapper>
            <div className="flex flex-col min-h-screen pb-16">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <BottomNav />
          </TemplateWrapper>
          <Toaster />
        </PortfolioProvider>
      </body>
    </html>
  );
}
