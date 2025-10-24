"use client";

import { ReactNode } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function TemplateWrapper({ children }: { children: ReactNode }) {
  const { template } = usePortfolio();

  return (
    <div className={`template-${template}`} data-template={template}>
      {children}
    </div>
  );
}
