"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import AnimatedLayout from "@/components/layouts/AnimatedLayout";
import TemplateWrapper from "@/components/layouts/TemplateWrapper";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import BottomNav from "@/components/layouts/BottomNav";
import { Toaster } from "@/components/ui/toaster";
import { PortfolioProvider } from "@/components/context/PortfolioContext";
import { suspenseFallbacks } from "@/components/suspense/suspense-registry";
import { DefaultSkeleton } from "@/components/suspense/default-skeleton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fallback = suspenseFallbacks[pathname] ?? <DefaultSkeleton />;

  return (
    <PortfolioProvider>
      <AnimatedLayout>
        <TemplateWrapper>
          <Suspense fallback={fallback}>
            <div className="flex flex-col min-h-screen pb-16">
              <Header />
              <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </Suspense>
          <BottomNav />
        </TemplateWrapper>
        <Toaster />
      </AnimatedLayout>
    </PortfolioProvider>
  );
}
