"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import AnimatedLayout from "@/components/layouts/AnimatedLayout";
import TemplateWrapper from "@/components/layouts/TemplateWrapper";
import BottomNav from "@/components/layouts/BottomNav";
import { Toaster } from "@/components/ui/toaster";
import { PortfolioProvider } from "@/components/context/PortfolioContext";
import { suspenseFallbacks } from "@/components/suspense/suspense-registry";
import { DefaultSkeleton } from "@/components/suspense/default-skeleton";
import ContentLayout from "@/app/content-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
  const fallback = suspenseFallbacks[pathname] ?? <DefaultSkeleton />;

  return (
    <PortfolioProvider>
      <AnimatedLayout>
        <TemplateWrapper>
          <Suspense fallback={fallback}>
            <ContentLayout>
              {children}
            </ContentLayout>
          </Suspense>
          <BottomNav />
        </TemplateWrapper>
        <Toaster />
      </AnimatedLayout>
    </PortfolioProvider>
  );
}
