"use client";

import { ReactNode } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";

export default function TemplateWrapper({ children }: { children: ReactNode }) {
  const { templateType } = usePortfolio();

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  }[templateType];

  return <TemplateComponent>{children}</TemplateComponent>;
}
