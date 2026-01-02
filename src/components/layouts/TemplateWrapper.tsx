"use client";

import { ReactNode } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import ModernTemplate from "@/templates/ModernTemplate";
import ClassicTemplate from "@/templates/ClassicTemplate";
import MinimalTemplate from "@/templates/MinimalTemplate";

export default function TemplateWrapper({ children }: { children: ReactNode }) {
  const { templateType } = usePortfolio();

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  }[templateType];

  return <TemplateComponent>{children}</TemplateComponent>;
}
